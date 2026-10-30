import { NextResponse } from "next/server";

interface ContactRequestBody {
  fullName?: string;
  companyName?: string;
  businessEmail?: string;
  phone?: string;
  industry?: string;
  requirement?: string;
  message?: string;
  honeypot?: string; // spam protection
}

const ALLOWED_INDUSTRIES = [
  "Banking",
  "Healthcare",
  "IT",
  "Information Technology",
  "Digital",
  "Digitalization",
  "Artificial Intelligence",
  "Consulting",
  "Infrastructure",
  "Other",
];

function sanitizeString(str: string): string {
  return str.replace(/<[^>]*>?/gm, "").trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();

    // Honeypot spam trap
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json(
        { error: "Spam submission detected." },
        { status: 400 }
      );
    }

    const fullName = sanitizeString(body.fullName || "");
    const companyName = sanitizeString(body.companyName || "");
    const businessEmail = sanitizeString(body.businessEmail || "");
    const phone = sanitizeString(body.phone || "");
    const industry = sanitizeString(body.industry || "");
    const requirement = sanitizeString(body.requirement || "");
    const message = sanitizeString(body.message || "");

    // Validation
    const errors: Record<string, string> = {};

    if (!fullName || fullName.length < 2) {
      errors.fullName = "Please enter your full name (at least 2 characters).";
    }

    if (!companyName || companyName.length < 2) {
      errors.companyName = "Please enter your company or organization name.";
    }

    if (!businessEmail || !isValidEmail(businessEmail)) {
      errors.businessEmail = "Please enter a valid business email address.";
    }

    if (phone && phone !== "Via Web" && phone.length < 5) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (!industry) {
      errors.industry = "Please select an industry category.";
    }

    if (!requirement || requirement.length < 5) {
      errors.requirement = "Please briefly specify your requirement.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors, message: "Validation failed. Please correct the highlighted fields." },
        { status: 400 }
      );
    }

    const referenceId = `REQ-${Date.now().toString(36).toUpperCase()}`;
    const recipientEmail = process.env.CONTACT_EMAIL_TO || "vivek.bandari@alboriss.com";

    // Prepare lead payload
    const leadPayload = {
      referenceId,
      fullName,
      companyName,
      businessEmail,
      phone,
      industry,
      requirement,
      message,
      submittedAt: new Date().toISOString(),
      recipient: recipientEmail,
    };

    // 1. If RESEND_API_KEY (or RESEND_APT_KEY) is configured, send official email
    const resendApiKey = process.env.RESEND_API_KEY || process.env.RESEND_APT_KEY;
    let emailStatus = { sent: false, details: "" };

    if (resendApiKey) {
      try {
        const fromAddress = process.env.RESEND_FROM || "onboarding@resend.dev";
        const emailBody = {
          from: fromAddress,
          to: [recipientEmail],
          reply_to: businessEmail,
          subject: `[New Lead ${referenceId}] ${fullName} - ${companyName} (${industry})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #00C878; margin-top: 0;">New Outsourcing Requirement Received</h2>
              <p><strong>Reference ID:</strong> ${referenceId}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
              <p><strong>Full Name:</strong> ${fullName}</p>
              <p><strong>Company:</strong> ${companyName}</p>
              <p><strong>Business Email:</strong> <a href="mailto:${businessEmail}">${businessEmail}</a></p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Industry:</strong> ${industry}</p>
              <p><strong>Requirement Details:</strong></p>
              <blockquote style="background:#f9f9f9; padding: 14px; border-left: 4px solid #00C878; margin: 10px 0; font-size: 14px; line-height: 1.5;">${requirement}</blockquote>
              ${message ? `<p><strong>Additional Message:</strong></p><p style="color: #555;">${message}</p>` : ""}
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #888;">Submitted via Vivek Bandari Portfolio (<a href="https://vivekbandari.com">vivekbandari.com</a>) on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
            </div>
          `,
        };

        let resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey.trim()}`,
          },
          body: JSON.stringify(emailBody),
        });

        let resendData = await resendRes.json();

        // If Resend free tier rejects due to test email restriction (onboarding@resend.dev can only send to account owner):
        if (!resendRes.ok) {
          console.warn("Primary Resend dispatch failed:", resendRes.status, resendData);
          const errorMsg = resendData?.message || "";
          const match = errorMsg.match(/to your own email address \(([^)]+)\)/i);

          if (match && match[1]) {
            const fallbackOwnerEmail = match[1];
            console.log(`Auto-retrying Resend with verified owner email: ${fallbackOwnerEmail}`);
            emailBody.to = [fallbackOwnerEmail];

            resendRes = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendApiKey.trim()}`,
              },
              body: JSON.stringify(emailBody),
            });
            resendData = await resendRes.json();
          }
        }

        if (resendRes.ok) {
          emailStatus = { sent: true, details: `Delivered via Resend: ${resendData?.id || "OK"}` };
          console.log("Email successfully dispatched via Resend:", resendData);
        } else {
          emailStatus = { sent: false, details: resendData?.message || "Failed" };
          console.error("Resend API error:", resendRes.status, resendData);
        }
      } catch (emailErr) {
        console.error("Failed to dispatch email via Resend:", emailErr);
      }
    }

    // 2. If an external webhook is configured (e.g., Slack, Zapier, Make, CRM), dispatch to it
    const externalWebhook = process.env.CONTACT_WEBHOOK_URL;
    if (externalWebhook) {
      try {
        await fetch(externalWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadPayload),
        });
      } catch (webhookError) {
        console.error("Failed to forward lead to external webhook:", webhookError);
      }
    }

    // Server log
    console.log("New B2B Requirement Received for Vivek Bandari:", {
      referenceId,
      fullName,
      companyName,
      businessEmail,
      industry,
      requirement,
    });

    return NextResponse.json({
      success: true,
      message: "Requirement received successfully. Vivek will review your scope and get in touch within 24 hours.",
      data: {
        referenceId,
        name: fullName,
        company: companyName,
        industry,
      },
    });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while submitting your requirement. Please try again or reach out directly via WhatsApp." },
      { status: 500 }
    );
  }
}

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
  "Digitalization",
  "Artificial Intelligence",
  "Consulting",
  "Infrastructure",
  "ML / Robotics",
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

    // Prepare lead payload
    const leadPayload = {
      fullName,
      companyName,
      businessEmail,
      phone,
      industry,
      requirement,
      message,
      submittedAt: new Date().toISOString(),
      recipient: "vivek.bandari@alboriss.com",
    };

    // If an external webhook or endpoint is configured in environment, dispatch to it
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

    // In-memory / server log
    console.log("New B2B Requirement Received for Vivek Bandari:", {
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
        referenceId: `REQ-${Date.now().toString(36).toUpperCase()}`,
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

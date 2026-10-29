"use client";

import React from "react";
import ContactForm from "./ContactForm";
import { Mail, MessageSquare, Linkedin } from "lucide-react";
import { PERSONAL_INFO, getWhatsappUrl } from "@/data/portfolioData";

interface ContactSectionProps {
  preselectedIndustry?: string;
  preselectedRequirement?: string;
}

export default function ContactSection({
  preselectedIndustry,
  preselectedRequirement,
}: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-36 border-t border-[#1A3025]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          {/* LEFT: Personal Business Conversation Intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-3 sm:mb-4 block font-semibold">
              08 // DIRECT INITIATION
            </span>

            <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-[#F4F7F5] uppercase leading-[1.12] sm:leading-[0.98] mb-4 sm:mb-6">
              LET&apos;S DISCUSS
              <br />
              <span className="font-bold text-[#00C878]">THE REQUIREMENT.</span>
            </h2>

            <p className="text-sm xs:text-base text-[#9AA7A0] leading-relaxed mb-6 sm:mb-8 max-w-sm">
              &ldquo;Have a project, outsourcing requirement or partnership opportunity?&rdquo;
            </p>

            {/* Direct Contact Details */}
            <div className="pt-6 border-t border-[#1A3025]">
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-bold font-mono tracking-wider text-[#F4F7F5] uppercase">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs font-mono text-[#00C878] uppercase tracking-wider mt-0.5">
                  {PERSONAL_INFO.roleTitle}
                </p>
                <p className="text-xs text-[#9AA7A0] mt-0.5">
                  {PERSONAL_INFO.company}
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-3">
                <a
                  href={getWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs sm:text-sm font-mono text-[#F4F7F5] hover:text-[#00C878] transition-colors py-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span className="break-all sm:break-normal">WhatsApp: {PERSONAL_INFO.phone}</span>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3 text-xs sm:text-sm font-mono text-[#F4F7F5] hover:text-[#00C878] transition-colors py-1.5"
                >
                  <Mail className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span className="break-all sm:break-normal">{PERSONAL_INFO.email}</span>
                </a>

                <a
                  href={PERSONAL_INFO.personalLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs sm:text-sm font-mono text-[#F4F7F5] hover:text-[#00C878] transition-colors py-1.5"
                >
                  <Linkedin className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span className="break-all sm:break-normal">Vivek Bandari on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Minimal Form (No Huge Box Container) */}
          <div className="lg:col-span-7">
            <ContactForm
              preselectedIndustry={preselectedIndustry}
              preselectedRequirement={preselectedRequirement}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

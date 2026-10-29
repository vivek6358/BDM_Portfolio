"use client";

import React from "react";
import { Calendar, MessageSquare } from "lucide-react";
import { getWhatsappUrl } from "@/data/portfolioData";

interface ConsultationSectionProps {
  onOpenMeeting: () => void;
}

export default function ConsultationSection({ onOpenMeeting }: ConsultationSectionProps) {
  return (
    <section id="consultation" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-36 border-t border-[#1A3025]/60 relative text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Heading */}
        <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-[#F4F7F5] uppercase leading-[1.12] sm:leading-[0.98] mb-4 sm:mb-6">
          HAVE A
          <br />
          <span className="font-bold text-[#00C878]">REQUIREMENT IN MIND?</span>
        </h2>

        {/* Supporting Text */}
        <p className="text-sm xs:text-base sm:text-lg text-[#9AA7A0] font-normal max-w-md mx-auto mb-8 sm:mb-10">
          Let&apos;s explore the right outsourcing path.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenMeeting}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-[#050706] bg-[#00C878] hover:bg-[#20E58A] transition-colors cursor-pointer shadow-glow-emerald-sm"
          >
            <Calendar className="w-4 h-4 text-[#050706]" />
            <span>BOOK A MEETING</span>
          </button>

          <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-semibold text-[#F4F7F5] bg-[#09110D] border border-[#1A3025] hover:border-[#00C878]/60 hover:text-[#00C878] transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#00C878]" />
            <span>WHATSAPP</span>
          </a>
        </div>
      </div>
    </section>
  );
}

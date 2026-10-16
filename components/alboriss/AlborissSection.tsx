"use client";

import React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

const CAPABILITY_TAGS = [
  "BUSINESS DEVELOPMENT",
  "OUTSOURCING",
  "TECHNOLOGY",
  "DIGITAL SOLUTIONS",
];

export default function AlborissSection() {
  return (
    <section id="alboriss" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-36 border-t border-[#1A3025]/60 relative text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-3 sm:mb-4 block font-semibold">
          07 // CREDIBILITY &amp; ORGANIZATION
        </span>

        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#9AA7A0] uppercase mb-3 sm:mb-4 leading-tight">
          THE ORGANIZATION
          <br />
          BEHIND THE CAPABILITY.
        </h2>

        {/* Large Company Name */}
        <h3 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F4F7F5] uppercase mb-6 sm:mb-8">
          ALBORISS <span className="font-light text-xl xs:text-2xl sm:text-4xl text-[#00C878]">PVT. LTD.</span>
        </h3>

        {/* 4 Tags */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 xs:gap-x-4 sm:gap-x-6 gap-y-2 text-[11px] xs:text-xs sm:text-sm font-mono text-[#C2D1C9] mb-8 sm:mb-10">
          {CAPABILITY_TAGS.map((tag, idx) => (
            <React.Fragment key={tag}>
              <span>{tag}</span>
              {idx < CAPABILITY_TAGS.length - 1 && (
                <span className="text-[#00C878]">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Simple Link */}
        <div>
          <a
            href={PERSONAL_INFO.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 min-h-[44px] py-2 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-widest text-[#F4F7F5] hover:text-[#00C878] transition-colors"
          >
            <span>VISIT ALBORISS</span>
            <ArrowRight className="w-4 h-4 text-[#00C878] transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

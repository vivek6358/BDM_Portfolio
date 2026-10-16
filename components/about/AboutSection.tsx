"use client";

import React from "react";
import { UserCheck } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-36 border-t border-[#1A3025]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: Large Editorial Heading */}
          <div className="lg:col-span-6">
            <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-4 sm:mb-6 block font-semibold">
              01 // ABOUT
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F7F5] leading-[1.06] sm:leading-[0.98] uppercase">
              BUSINESS
              <br />
              <span className="font-semibold text-white">DEVELOPMENT</span>
              <br />
              WITH A
              <br />
              <span className="text-[#00C878] font-bold">REQUIREMENT-FIRST</span>
              <br />
              MINDSET.
            </h2>
          </div>

          {/* RIGHT: Professional Portrait Placeholder & Personal Brand Intro */}
          <div className="lg:col-span-6 flex flex-col items-start sm:items-start">
            {/* Elegant Portrait Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-2xl bg-[#09110D] border border-[#1A3025] overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-lg group mx-auto sm:mx-0">
              {/* Subtle architectural grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#1A3025_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

              {/* Sophisticated Placeholder Avatar Icon */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#050706] border border-[#1A3025] flex items-center justify-center text-[#00C878] mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-mono font-bold tracking-wider">VB</span>
              </div>

              {/* Identity Details */}
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#F4F7F5] font-mono uppercase">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-[#00C878] tracking-widest uppercase mt-1">
                  BUSINESS DEVELOPMENT MANAGER
                </p>
                <p className="text-xs text-[#9AA7A0] font-sans mt-0.5">
                  {PERSONAL_INFO.company} • {PERSONAL_INFO.location}
                </p>
              </div>

              <div className="relative z-10 mt-3 sm:mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050706] border border-[#1A3025] text-[10px] font-mono text-[#6F7E76]">
                <UserCheck className="w-3 h-3 text-[#00C878]" />
                <span>EXECUTIVE PROFILE</span>
              </div>
            </div>

            {/* Under the image: 3 small keywords */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-[#F4F7F5] tracking-wider sm:tracking-widest uppercase mt-6">
              <span>OUTSOURCING</span>
              <span className="text-[#00C878]">•</span>
              <span>PARTNERSHIPS</span>
              <span className="text-[#00C878]">•</span>
              <span>BUSINESS GROWTH</span>
            </div>

            {/* One short sentence */}
            <p className="text-sm xs:text-base sm:text-lg text-[#9AA7A0] font-normal leading-relaxed mt-4 max-w-md">
              &ldquo;I connect business requirements with the right outsourcing capabilities.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

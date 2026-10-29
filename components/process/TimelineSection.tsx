"use client";

import React from "react";
import { PROCESS_STEPS } from "@/data/portfolioData";

export default function TimelineSection() {
  return (
    <section id="process" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-36 border-t border-[#1A3025]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16 md:mb-24">
          <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-3 sm:mb-4 block font-semibold">
            04 // PROCESS
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-[#F4F7F5] uppercase leading-[1.12] sm:leading-[0.98]">
            HOW I <span className="font-bold text-[#00C878]">WORK</span>
          </h2>
        </div>

        {/* Single Unified Responsive Process Flow (Rendered ONCE in DOM) */}
        <div className="relative my-8 sm:my-12">
          {/* Continuous top line on Desktop (lg+) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-4 left-6 right-6 h-[1px] bg-[#1A3025] pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="relative flex lg:flex-col items-start group gap-4 lg:gap-0"
              >
                {/* Mobile vertical line connector */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="lg:hidden absolute left-3 top-8 bottom-[-24px] w-[1px] bg-[#1A3025] pointer-events-none"
                  />
                )}

                {/* Node on the line */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#050706] border border-[#1A3025] group-hover:border-[#00C878] flex items-center justify-center transition-colors lg:mb-6 flex-shrink-0 z-10">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00C878]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5 lg:pt-0">
                  {/* Number */}
                  <span className="text-lg sm:text-2xl font-mono font-bold text-[#6F7E76] group-hover:text-[#00C878] transition-colors block mb-1 lg:mb-2">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold font-mono tracking-wider text-[#F4F7F5] group-hover:text-[#00C878] transition-colors uppercase mb-1.5 lg:mb-2">
                    {step.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#9AA7A0] leading-relaxed">
                    {step.line}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

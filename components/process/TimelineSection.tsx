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
          <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F7F5] uppercase leading-[1.04] sm:leading-[0.98]">
            HOW I <span className="font-bold text-[#00C878]">WORK</span>
          </h2>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP HORIZONTAL PROCESS (NO CARDS, NO BOXES)          */}
        {/* ======================================================== */}
        <div className="hidden lg:block relative my-12">
          {/* Simple Continuous Line */}
          <div className="absolute top-4 left-6 right-6 h-[1px] bg-[#1A3025]" />

          <div className="grid grid-cols-5 gap-8 relative z-10">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="flex flex-col items-start group select-none">
                {/* Node on the line */}
                <div className="w-8 h-8 rounded-full bg-[#050706] border border-[#1A3025] group-hover:border-[#00C878] flex items-center justify-center transition-colors mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#00C878]" />
                </div>

                {/* Number */}
                <span className="text-2xl font-mono font-bold text-[#6F7E76] group-hover:text-[#00C878] transition-colors mb-2">
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold font-mono tracking-wider text-[#F4F7F5] group-hover:text-[#00C878] transition-colors uppercase mb-2">
                  {step.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#9AA7A0] leading-relaxed">
                  {step.line}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE VERTICAL PROCESS (< lg screens)                   */}
        {/* ======================================================== */}
        <div className="block lg:hidden relative py-2">
          <div className="space-y-3">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.number} className="relative flex items-start gap-4">
                {/* Timeline track column */}
                <div className="relative flex flex-col items-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#050706] border border-[#00C878] flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00C878]" />
                  </div>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <div className="w-[1px] bg-[#1A3025] h-14 my-1" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-0.5 pb-4">
                  <span className="text-lg xs:text-xl font-mono font-bold text-[#6F7E76] block mb-0.5">
                    {step.number}
                  </span>
                  <h3 className="text-sm xs:text-base font-bold font-mono tracking-wider text-[#F4F7F5] uppercase mb-1">
                    {step.title}
                  </h3>
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

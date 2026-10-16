"use client";

import React from "react";
import { PRINCIPLES } from "@/data/portfolioData";

export default function ApproachSection() {
  return (
    <section id="why-work-with-me" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-36 border-t border-[#1A3025]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          {/* LEFT: Large Editorial Statement */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-3 sm:mb-4 block font-semibold">
              05 // VALUE PROPOSITION
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F7F5] uppercase leading-[1.04] sm:leading-[0.98]">
              THE RIGHT
              <br />
              <span className="font-bold text-[#00C878]">CONNECTION</span>
              <br />
              MATTERS.
            </h2>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-[#9AA7A0] max-w-sm leading-relaxed">
              Strategic alignment between business intent and dedicated capability, without friction.
            </p>
          </div>

          {/* RIGHT: 4 Clean Statements with Thin Horizontal Separators */}
          <div className="lg:col-span-7 divide-y divide-[#1A3025] border-y border-[#1A3025]">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.id}
                className="py-6 sm:py-8 group cursor-default"
              >
                <h3 className="text-base sm:text-xl font-bold font-mono tracking-wider text-[#F4F7F5] group-hover:text-[#00C878] transition-colors uppercase mb-1.5 sm:mb-2">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-base text-[#9AA7A0] font-normal leading-relaxed">
                  {principle.statement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

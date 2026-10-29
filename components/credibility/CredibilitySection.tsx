"use client";

import React from "react";
import { METRICS } from "@/data/portfolioData";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

export default function CredibilitySection() {
  return (
    <section id="credibility" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-32 border-t border-[#1A3025]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow & Title */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-3 sm:mb-4 block font-semibold">
            05 // PROOF &amp; TRACK RECORD
          </span>
          <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F7F5] uppercase leading-[1.04] sm:leading-[0.98]">
            PROVEN IMPACT.
            <br />
            <span className="font-bold text-[#00C878]">MEASURABLE TRUST.</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-[#9AA7A0] leading-relaxed max-w-xl">
            Every engagement starts with your operational problem. Here is how specialized capability matching delivers rapid, reliable execution for enterprise partners.
          </p>
        </div>

        {/* 4 Quantitative Metrics Grid with Smooth Count-Up Animation */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="p-4 xs:p-5 sm:p-7 rounded-2xl bg-[#09110D] border border-[#1A3025] hover:border-[#00C878]/50 transition-all duration-300 shadow-lg group"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-[#00C878] mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
                <AnimatedNumber
                  value={metric.numericValue}
                  prefix={metric.prefix || ""}
                  suffix={metric.suffix || ""}
                  duration={1600}
                />
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#F4F7F5] mb-1.5">
                {metric.label}
              </div>
              <p className="text-[11px] sm:text-xs text-[#9AA7A0] leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

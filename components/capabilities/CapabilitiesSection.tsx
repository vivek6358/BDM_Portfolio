"use client";

import React from "react";
import IndustryShowcase from "./IndustryShowcase";
import CapabilityFlow from "./CapabilityFlow";
import { Industry } from "@/data/portfolioData";

interface CapabilitiesSectionProps {
  onSelectIndustry: (industry: Industry) => void;
}

export default function CapabilitiesSection({ onSelectIndustry }: CapabilitiesSectionProps) {
  return (
    <section id="capabilities" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-36 border-t border-[#1A3025]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* SECTION 3: WHAT CAN I HELP YOU OUTSOURCE? (EDITORIAL LIST) */}
        {/* ======================================================== */}
        <div className="mb-16 sm:mb-24 md:mb-36">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-3 sm:mb-4 block font-semibold">
              02 // CAPABILITIES
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F7F5] uppercase leading-[1.04] sm:leading-[0.98]">
              WHAT CAN I
              <br />
              <span className="font-bold text-[#00C878]">HELP YOU OUTSOURCE?</span>
            </h2>
          </div>

          <IndustryShowcase onSelectIndustry={onSelectIndustry} />
        </div>

        {/* ======================================================== */}
        {/* SECTION 4: VISUAL CAPABILITY SHOWCASE (CLEAN DIAGRAM)    */}
        {/* ======================================================== */}
        <div className="pt-12 sm:pt-16 border-t border-[#1A3025]">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-3 sm:mb-4 block font-semibold">
              03 // PROCESS ARCHITECTURE
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F7F5] uppercase leading-[1.04] sm:leading-[0.98]">
              FROM REQUIREMENT
              <br />
              <span className="font-bold text-[#00C878]">TO THE RIGHT CAPABILITY.</span>
            </h2>
          </div>

          <CapabilityFlow />
        </div>
      </div>
    </section>
  );
}

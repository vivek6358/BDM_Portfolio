"use client";

import React, { useState } from "react";
import { INDUSTRIES, Industry } from "@/data/portfolioData";
import { ArrowRight, Check } from "lucide-react";

interface RequirementPlannerProps {
  selectedPlannerOption: string;
  onSelectPlannerOption: (optionId: string) => void;
  onProceedToContact: (industryName: string, subCapabilities: string) => void;
}

export default function RequirementPlanner({
  selectedPlannerOption,
  onSelectPlannerOption,
  onProceedToContact,
}: RequirementPlannerProps) {
  const currentIndustry: Industry =
    INDUSTRIES.find((ind) => ind.id === selectedPlannerOption) || INDUSTRIES[1];

  const [selectedCaps, setSelectedCaps] = useState<string[]>([currentIndustry.capabilities[0]]);

  const handleIndustrySelect = (indId: string) => {
    onSelectPlannerOption(indId);
    const ind = INDUSTRIES.find((i) => i.id === indId);
    if (ind && ind.capabilities.length > 0) {
      setSelectedCaps([ind.capabilities[0]]);
    } else {
      setSelectedCaps([]);
    }
  };

  const toggleCap = (cap: string) => {
    setSelectedCaps((prev) => {
      if (prev.includes(cap)) {
        if (prev.length === 1) return prev;
        return prev.filter((c) => c !== cap);
      }
      return [...prev, cap];
    });
  };

  const handleDiscuss = () => {
    const capsString = selectedCaps.join(", ") || currentIndustry.keywords.join(", ");
    onProceedToContact(currentIndustry.name, capsString);
  };

  return (
    <section id="planner" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-36 border-t border-[#1A3025]/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-3 sm:mb-4 block font-semibold">
            06 // CONSULTATION SELECTOR
          </span>
          <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F7F5] uppercase leading-[1.04] sm:leading-[0.98]">
            WHAT ARE YOU
            <br />
            <span className="font-bold text-[#00C878]">LOOKING TO OUTSOURCE?</span>
          </h2>
        </div>

        {/* Category Buttons with mobile-optimized touch sizing */}
        <div className="flex flex-wrap items-center justify-center gap-2 xs:gap-2.5 sm:gap-4 mb-10 sm:mb-16">
          {INDUSTRIES.map((ind) => {
            const isSelected = ind.id === currentIndustry.id;

            return (
              <button
                key={ind.id}
                onClick={() => handleIndustrySelect(ind.id)}
                className={`min-h-[42px] px-3.5 xs:px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-colors duration-200 cursor-pointer uppercase flex items-center justify-center ${
                  isSelected
                    ? "bg-[#00C878] text-[#050706] font-bold shadow-glow-emerald-sm"
                    : "bg-[#09110D] border border-[#1A3025] text-[#9AA7A0] hover:text-[#F4F7F5] hover:border-[#00C878]/50"
                }`}
              >
                {ind.shortName || ind.name}
              </button>
            );
          })}
        </div>

        {/* Selected Capabilities Reveal (Clean, Spacious) */}
        <div className="text-center py-8 sm:py-10 border-t border-[#1A3025] max-w-2xl mx-auto">
          <span className="text-xs font-mono text-[#6F7E76] uppercase tracking-widest block mb-4 sm:mb-6">
            CAPABILITIES AVAILABLE FOR {currentIndustry.name.toUpperCase()}:
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {currentIndustry.capabilities.map((cap) => {
              const isChecked = selectedCaps.includes(cap);

              return (
                <button
                  key={cap}
                  onClick={() => toggleCap(cap)}
                  className={`min-h-[40px] px-3 xs:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                    isChecked
                      ? "bg-[#00C878]/15 border border-[#00C878] text-[#F4F7F5]"
                      : "bg-[#050706] border border-[#1A3025] text-[#9AA7A0] hover:text-[#F4F7F5]"
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />}
                  <span>{cap}</span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div>
            <button
              onClick={handleDiscuss}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-mono text-xs sm:text-sm font-bold text-[#050706] bg-[#00C878] hover:bg-[#20E58A] transition-colors cursor-pointer shadow-glow-emerald-sm"
            >
              <span>DISCUSS THIS REQUIREMENT</span>
              <ArrowRight className="w-4 h-4 text-[#050706]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { INDUSTRIES, Industry } from "@/data/portfolioData";
import {
  ShieldCheck,
  Activity,
  Code2,
  Globe2,
  BrainCircuit,
  Users,
  Server,
  Bot,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface IndustryShowcaseProps {
  onSelectIndustry: (industry: Industry) => void;
}

const ICONS: Record<string, React.ElementType> = {
  banking: ShieldCheck,
  healthcare: Activity,
  it: Code2,
  digital: Globe2,
  ai: BrainCircuit,
  consulting: Users,
  infrastructure: Server,
  robotics: Bot,
};

export default function IndustryShowcase({ onSelectIndustry }: IndustryShowcaseProps) {
  const [activeId, setActiveId] = useState<string>("healthcare");

  const activeIndustry =
    INDUSTRIES.find((ind) => ind.id === activeId) || INDUSTRIES[1];

  const handleItemClick = (ind: Industry) => {
    // If clicking same item on mobile, keep it open; otherwise switch active
    setActiveId(ind.id);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* LEFT: Large Vertical Editorial Menu (01 to 08) with Mobile Accordion Expansion */}
        <div className="lg:col-span-7 divide-y divide-[#1A3025] border-y border-[#1A3025]">
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.id] || Code2;
            const isActive = ind.id === activeId;

            return (
              <div key={ind.id} className="transition-colors duration-200">
                {/* Accordion Header Row */}
                <div
                  onMouseEnter={() => setActiveId(ind.id)}
                  onClick={() => handleItemClick(ind)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleItemClick(ind);
                    }
                  }}
                  className={`py-4 sm:py-5 px-2 flex items-center justify-between cursor-pointer group ${
                    isActive ? "bg-[#09110D]/60" : "hover:bg-[#09110D]/30"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                    {/* Number */}
                    <span
                      className={`text-xs sm:text-base font-mono font-bold transition-colors flex-shrink-0 ${
                        isActive ? "text-[#00C878]" : "text-[#6F7E76] group-hover:text-[#9AA7A0]"
                      }`}
                    >
                      {ind.number}
                    </span>

                    {/* Icon */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                        isActive
                          ? "text-[#00C878] bg-[#00C878]/10"
                          : "text-[#6F7E76] group-hover:text-[#F4F7F5]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>

                    {/* Name & Keywords */}
                    <div className="min-w-0">
                      <h3
                        className={`text-sm xs:text-base sm:text-xl font-bold tracking-tight uppercase transition-colors truncate ${
                          isActive
                            ? "text-[#F4F7F5]"
                            : "text-[#C2D1C9] group-hover:text-[#F4F7F5]"
                        }`}
                      >
                        {ind.name}
                      </h3>
                      <p className="text-[10px] xs:text-xs font-mono text-[#9AA7A0] mt-0.5 truncate">
                        {ind.keywords.join(" • ")}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Icon: Rotates down on mobile when active, points right on desktop */}
                  <div
                    className={`transition-all duration-200 flex-shrink-0 ml-2 ${
                      isActive
                        ? "opacity-100 rotate-90 lg:rotate-0 translate-x-0"
                        : "opacity-40 lg:opacity-0 -translate-x-1 lg:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  >
                    <ArrowRight className="w-4 h-4 text-[#00C878]" />
                  </div>
                </div>

                {/* INLINE MOBILE EXPANSION (< lg screens) */}
                {isActive && (
                  <div className="block lg:hidden px-3 pt-2 pb-6 bg-[#09110D]/90 rounded-b-xl border-x border-b border-[#1A3025] mb-2 animate-in fade-in duration-200">
                    <span className="text-[10px] font-mono tracking-widest text-[#00C878] uppercase block mb-1.5 font-semibold">
                      DOMAIN // {ind.number}
                    </span>

                    <p className="text-xs sm:text-sm text-[#9AA7A0] leading-relaxed mb-4">
                      {ind.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-[#1A3025] mb-5">
                      <span className="text-[10px] font-mono tracking-wider text-[#6F7E76] uppercase block mb-2">
                        CORE CAPABILITIES DELIVERED:
                      </span>
                      {ind.capabilities.map((cap) => (
                        <div key={cap} className="flex items-center gap-2 text-xs text-[#F4F7F5]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onSelectIndustry(ind)}
                      className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs font-bold text-[#050706] bg-[#00C878] hover:bg-[#20E58A] transition-colors cursor-pointer shadow-glow-emerald-sm"
                    >
                      <span>DISCUSS {ind.name.toUpperCase()} REQUIREMENT</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#050706]" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT: Sophisticated Editorial Capability Showcase (Desktop >= lg only) */}
        <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-32">
          <div className="p-8 rounded-2xl bg-[#09110D] border border-[#1A3025]">
            <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase block mb-2 font-semibold">
              DOMAIN // {activeIndustry.number}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F7F5] uppercase mb-3">
              {activeIndustry.name}
            </h3>

            <p className="text-sm text-[#9AA7A0] leading-relaxed mb-6">
              {activeIndustry.description}
            </p>

            {/* Scope Capabilities */}
            <div className="space-y-2.5 pt-4 border-t border-[#1A3025] mb-8">
              <span className="text-[11px] font-mono tracking-wider text-[#6F7E76] uppercase block mb-3">
                CORE CAPABILITIES DELIVERED:
              </span>
              {activeIndustry.capabilities.map((cap) => (
                <div key={cap} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F4F7F5]">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              onClick={() => onSelectIndustry(activeIndustry)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-mono text-xs font-bold text-[#050706] bg-[#00C878] hover:bg-[#20E58A] transition-colors cursor-pointer"
            >
              <span>DISCUSS {activeIndustry.name.toUpperCase()} REQUIREMENT</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#050706]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

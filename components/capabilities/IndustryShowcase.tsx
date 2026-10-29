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
};

export default function IndustryShowcase({ onSelectIndustry }: IndustryShowcaseProps) {
  const [activeId, setActiveId] = useState<string>("healthcare");

  const activeIndustry =
    INDUSTRIES.find((ind) => ind.id === activeId) || INDUSTRIES[1];

  const handleItemClick = (ind: Industry) => {
    setActiveId(ind.id);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* LEFT: Large Vertical Editorial Menu (01 to 07) */}
        <div className="lg:col-span-7 divide-y divide-[#1A3025] border-y border-[#1A3025]">
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.id] || Code2;
            const isActive = ind.id === activeId;

            return (
              <div
                key={ind.id}
                onMouseEnter={() => setActiveId(ind.id)}
                onClick={() => handleItemClick(ind)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleItemClick(ind);
                  }
                }}
                className={`py-4 sm:py-5 px-3 flex items-center justify-between cursor-pointer group transition-colors duration-200 ${
                  isActive ? "bg-[#09110D] border-l-2 border-l-[#00C878]" : "hover:bg-[#09110D]/40"
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

                {/* Indicator Arrow */}
                <div
                  className={`transition-all duration-200 flex-shrink-0 ml-2 ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-30 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                >
                  <ArrowRight className="w-4 h-4 text-[#00C878]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT / MOBILE BOTTOM: Single Unified Capability Showcase Card (Rendered ONCE in DOM) */}
        <div className="w-full lg:col-span-5 lg:sticky lg:top-32">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#09110D] border border-[#1A3025] shadow-lg">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase font-semibold">
                DOMAIN // {activeIndustry.number}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#050706] border border-[#1A3025] text-[#9AA7A0]">
                {activeIndustry.badge}
              </span>
            </div>

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
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-mono text-xs font-bold text-[#050706] bg-[#00C878] hover:bg-[#20E58A] transition-colors cursor-pointer shadow-glow-emerald-sm"
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

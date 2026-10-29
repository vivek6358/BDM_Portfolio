"use client";

import React from "react";
import { FileText, Compass, Layers, Users } from "lucide-react";

const FLOW_STEPS = [
  {
    number: "01",
    title: "BUSINESS REQUIREMENT",
    description: "Clarifying true operational scope & deliverables",
    icon: FileText,
  },
  {
    number: "02",
    title: "DISCOVERY",
    description: "Assessing domain specifications & resourcing",
    icon: Compass,
  },
  {
    number: "03",
    title: "CAPABILITY",
    description: "Matching specialized delivery squads at Alboriss",
    icon: Layers,
  },
  {
    number: "04",
    title: "RIGHT CONNECTION",
    description: "Direct executive alignment & project kickoff",
    icon: Users,
  },
];

export default function CapabilityFlow() {
  return (
    <div className="w-full py-8 sm:py-12 relative">
      {/* Background Subtle Corporate Diagram Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A3025_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Single Unified Responsive Flow (Rendered ONCE in DOM) */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6 relative">
          {FLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative flex md:flex-col items-start md:items-center text-left md:text-center group gap-4 md:gap-0"
              >
                {/* Desktop Connector Line to next step */}
                {idx < FLOW_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-7 left-[60%] right-[-40%] h-[1px] bg-[#1A3025] -z-0 pointer-events-none"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00C878]/60" />
                  </div>
                )}

                {/* Mobile vertical line to next step */}
                {idx < FLOW_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="md:hidden absolute left-5 top-11 bottom-[-16px] w-[1px] bg-[#1A3025] -z-0 pointer-events-none"
                  />
                )}

                {/* Step Node Icon */}
                <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#050706] border border-[#1A3025] group-hover:border-[#00C878] flex items-center justify-center text-[#9AA7A0] group-hover:text-[#00C878] transition-colors md:mb-4 flex-shrink-0">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#00C878] md:text-inherit" />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 pt-0.5 md:pt-0">
                  <span className="text-[10px] md:text-[11px] font-mono text-[#00C878] font-bold tracking-widest uppercase block mb-1">
                    PHASE {step.number}
                  </span>

                  <h4 className="text-xs md:text-sm font-bold font-mono tracking-wider text-[#F4F7F5] uppercase mb-1 md:mb-2">
                    {step.title}
                  </h4>

                  <p className="text-xs text-[#9AA7A0] leading-relaxed max-w-[240px] md:max-w-[190px]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

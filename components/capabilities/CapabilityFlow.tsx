"use client";

import React from "react";
import { ArrowRight, FileText, Compass, Layers, Users } from "lucide-react";

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
    <div className="w-full py-12 relative">
      {/* Background Subtle Corporate Diagram Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A3025_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* ======================================================== */}
      {/* DESKTOP HORIZONTAL FLOW (>= md screens)                   */}
      {/* ======================================================== */}
      <div className="hidden md:block relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-4 gap-6 relative">
          {FLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative flex flex-col items-center text-center group">
                {/* Connector Line to next step */}
                {idx < FLOW_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute top-7 left-[60%] right-[-40%] h-[1px] bg-[#1A3025] -z-0"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00C878]/60" />
                  </div>
                )}

                {/* Step Node */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#050706] border border-[#1A3025] group-hover:border-[#00C878] flex items-center justify-center text-[#9AA7A0] group-hover:text-[#00C878] transition-colors mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <span className="text-[11px] font-mono text-[#00C878] font-bold tracking-widest uppercase mb-1">
                  PHASE {step.number}
                </span>

                <h4 className="text-sm font-bold font-mono tracking-wider text-[#F4F7F5] uppercase mb-2">
                  {step.title}
                </h4>

                <p className="text-xs text-[#9AA7A0] leading-relaxed max-w-[190px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE VERTICAL FLOW (< md screens)                      */}
      {/* ======================================================== */}
      <div className="block md:hidden relative z-10 py-2">
        <div className="space-y-2">
          {FLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative flex items-start gap-4">
                {/* Timeline track column */}
                <div className="relative flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#050706] border border-[#00C878] flex items-center justify-center text-[#00C878] shadow-sm z-10">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {/* Vertical connecting line */}
                  {idx < FLOW_STEPS.length - 1 && (
                    <div className="w-[1px] bg-[#1A3025] h-12 my-1" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1 pb-4">
                  <span className="text-[10px] font-mono text-[#00C878] font-bold tracking-widest uppercase block mb-0.5">
                    PHASE {step.number}
                  </span>
                  <h4 className="text-sm font-bold font-mono tracking-wider text-[#F4F7F5] uppercase mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#9AA7A0] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Minimal Legend */}
      <div className="mt-12 text-center text-xs font-mono text-[#6F7E76] uppercase tracking-widest">
        STREAMLINED B2B CONSULTATION ARCHITECTURE
      </div>
    </div>
  );
}

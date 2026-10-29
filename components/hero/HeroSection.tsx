"use client";

import React from "react";
import { ArrowRight, Calendar, MapPin, Briefcase } from "lucide-react";
import AbstractNetworkVisual from "./AbstractNetworkVisual";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface HeroSectionProps {
  onOpenMeeting: () => void;
}

export default function HeroSection({ onOpenMeeting }: HeroSectionProps) {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const plannerEl = document.getElementById("planner");
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: "smooth" });
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] sm:min-h-[92vh] flex items-center pt-20 xs:pt-24 sm:pt-28 md:pt-36 pb-10 sm:pb-16 md:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          {/* Left Column: Focused Executive Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Small label (Hidden on mobile as requested, clean on tablet/desktop) */}
            <div className="hidden sm:block mb-3 sm:mb-5">
              <span className="editorial-eyebrow font-mono text-[8px] xs:text-[9.5px] sm:text-xs inline-flex max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] animate-pulse flex-shrink-0" />
                <span className="truncate xs:whitespace-normal">BUSINESS DEVELOPMENT • OUTSOURCING • PARTNERSHIPS</span>
              </span>
            </div>

            {/* Large headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-semibold tracking-tight text-[#F4F7F5] leading-[1.16] sm:leading-[1.1] mb-3 sm:mb-6 uppercase">
              TURNING BUSINESS
              <br className="hidden xs:inline" />
              {" "}REQUIREMENTS INTO
              <br />
              <span className="text-[#00C878] font-bold">
                SCALABLE SOLUTIONS.
              </span>
            </h1>

            {/* Supporting line */}
            <p className="text-xs xs:text-sm sm:text-base md:text-xl text-[#9AA7A0] leading-relaxed max-w-xl font-normal mb-5 sm:mb-8">
              I connect businesses with the right outsourcing and technology capabilities.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 mb-5 sm:mb-8">
              {/* Primary CTA */}
              <a
                href="#planner"
                onClick={scrollToContact}
                className="group inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 sm:px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#050706] bg-[#00C878] hover:bg-[#20E58A] transition-all duration-200 shadow-glow-emerald-sm w-full sm:w-auto cursor-pointer"
              >
                <span>DISCUSS A PROJECT</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#050706]" />
              </a>

              {/* Secondary CTA */}
              <button
                onClick={onOpenMeeting}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-[#F4F7F5] bg-[#0D1712]/60 hover:bg-[#0D1712] border border-[#00C878]/60 hover:border-[#20E58A] transition-all duration-200 w-full sm:w-auto cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#00C878]" />
                <span>BOOK A MEETING</span>
              </button>
            </div>

            {/* Small metadata */}
            <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 sm:gap-3 text-[9px] xs:text-[10px] sm:text-xs font-mono text-[#9AA7A0]">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0D1712] border border-[#1A3025]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] flex-shrink-0 animate-pulse" />
                <span className="text-[#F4F7F5] font-bold">
                  <AnimatedNumber value={15} suffix="+" /> B2B ENGAGEMENTS
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0D1712] border border-[#1A3025]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] flex-shrink-0" />
                <span className="text-[#F4F7F5] font-semibold">
                  <AnimatedNumber value={7} /> DOMAINS
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0D1712] border border-[#1A3025]">
                <Briefcase className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />
                <span>ALBORISS PVT. LTD.</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0D1712] border border-[#1A3025]">
                <MapPin className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />
                <span>HYDERABAD, INDIA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Ecosystem Visual */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <AbstractNetworkVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

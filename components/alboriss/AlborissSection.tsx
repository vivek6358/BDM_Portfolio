"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink, MapPin, Building2, Linkedin } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

const CAPABILITY_TAGS = [
  "STRATEGIC OUTSOURCING",
  "ENTERPRISE TECHNOLOGY",
  "HEALTHCARE RCM",
  "OPERATIONAL SCALING",
  "DATA & AI SERVICES",
];

export default function AlborissSection() {
  return (
    <section id="alboriss" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-36 border-t border-[#1A3025]/60 relative text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-3 sm:mb-4 block font-semibold">
          08 // CREDIBILITY &amp; ORGANIZATION
        </span>

        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#9AA7A0] uppercase mb-4 sm:mb-6 leading-tight">
          THE ORGANIZATION
          <br />
          BEHIND THE CAPABILITY.
        </h2>

        {/* Official Alboriss Logo (Real PNG provided by user) */}
        <div className="flex justify-center items-center my-6 sm:my-8">
          <div className="px-6 py-4 sm:px-8 sm:py-5 rounded-2xl bg-[#09110D] border border-[#1A3025] inline-flex items-center justify-center hover:border-[#00C878]/50 transition-all shadow-xl group">
            <Image
              src="/alboriss-logo-clean.png"
              alt="Alboriss Pvt. Ltd. Official Logo"
              width={360}
              height={192}
              priority
              className="h-14 sm:h-20 w-auto object-contain filter brightness-105 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Corporate Headline */}
        <p className="text-sm sm:text-base text-[#9AA7A0] max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8 font-normal">
          Alboriss Pvt. Ltd. provides global enterprises with turnkey outsourcing squads, high-efficiency business operations, and specialized technical execution from Hyderabad’s premier business district.
        </p>

        {/* 5 Capability Tags */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 xs:gap-x-4 sm:gap-x-6 gap-y-2 text-[11px] xs:text-xs sm:text-sm font-mono text-[#C2D1C9] mb-8 sm:mb-10">
          {CAPABILITY_TAGS.map((tag, idx) => (
            <React.Fragment key={tag}>
              <span>{tag}</span>
              {idx < CAPABILITY_TAGS.length - 1 && (
                <span className="text-[#00C878]">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Address and Credentials */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#6F7E76] mb-8">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#00C878]" />
            <span>Gachibowli, Hyderabad, India</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#00C878]" />
            <span>JQ Chambers, Plot No. 5</span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <a
            href={PERSONAL_INFO.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 min-h-[46px] py-3 px-5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider text-[#050706] bg-[#00C878] hover:bg-[#20E58A] transition-all shadow-glow-emerald-sm w-full sm:w-auto"
          >
            <span>VISIT ALBORISS WEBSITE</span>
            <ExternalLink className="w-4 h-4 text-[#050706]" />
          </a>

          <a
            href={PERSONAL_INFO.companyLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[46px] py-3 px-5 rounded-xl font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#F4F7F5] bg-[#09110D] border border-[#1A3025] hover:border-[#00C878] transition-colors w-full sm:w-auto"
          >
            <Linkedin className="w-4 h-4 text-[#00C878]" />
            <span>ALBORISS LINKEDIN</span>
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { UserCheck, Linkedin, Mail, Phone } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 md:py-36 border-t border-[#1A3025]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: Large Editorial Heading */}
          <div className="lg:col-span-6">
            <span className="text-xs font-mono tracking-widest text-[#00C878] uppercase mb-4 sm:mb-6 block font-semibold">
              01 // ABOUT
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-[#F4F7F5] leading-[1.12] sm:leading-[0.98] uppercase">
              BUSINESS
              <br />
              <span className="font-semibold text-white">DEVELOPMENT</span>
              <br />
              WITH A
              <br />
              <span className="text-[#00C878] font-bold">REQUIREMENT-FIRST</span>
              <br />
              MINDSET.
            </h2>

            <div className="mt-8 space-y-4 max-w-lg text-sm sm:text-base text-[#9AA7A0] leading-relaxed">
              <p>
                As a Business Development Manager at Alboriss, I bridge high-impact business requirements
                with specialized delivery squads across IT, Healthcare RCM, Banking operations, AI datasets, and enterprise infrastructure.
              </p>
              <p>
                My focus is direct, zero-friction alignment: understanding your operational goals first,
                then structuring the exact capability partner to execute without trial and error.
              </p>
            </div>

            {/* Social & Direct Contact Links */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 xs:gap-3">
              <a
                href={PERSONAL_INFO.personalLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#09110D] border border-[#1A3025] hover:border-[#00C878] text-[11px] xs:text-xs font-mono text-[#F4F7F5] hover:text-[#00C878] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#09110D] border border-[#1A3025] hover:border-[#00C878] text-[11px] xs:text-xs font-mono text-[#F4F7F5] hover:text-[#00C878] transition-colors max-w-full"
              >
                <Mail className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>
              <a
                href={`tel:${PERSONAL_INFO.rawPhone}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#09110D] border border-[#1A3025] hover:border-[#00C878] text-[11px] xs:text-xs font-mono text-[#F4F7F5] hover:text-[#00C878] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Professional Portrait & Personal Brand Intro */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end w-full">
            {/* Elegant Portrait Frame with Vivek's Real Photo */}
            <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md rounded-2xl bg-[#09110D] border border-[#1A3025] overflow-hidden shadow-2xl group transition-all duration-300 hover:border-[#00C878]/50">
              {/* Subtle top emerald glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00C878] to-transparent z-20" />

              {/* Photo Container */}
              <div className="relative w-full h-[300px] xs:h-[350px] sm:h-[420px] overflow-hidden bg-[#050706]">
                <Image
                  src="/vivek-pic.png"
                  alt="Vivek Bandari - Business Development Manager at Alboriss"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  className="object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle gradient overlay at bottom of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09110D] via-[#09110D]/20 to-transparent" />

                {/* Status Pill in Corner */}
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050706]/80 backdrop-blur-md border border-[#1A3025] text-[10px] font-mono text-[#00C878]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] animate-pulse" />
                  <span>DIRECT EXECUTIVE</span>
                </div>
              </div>

              {/* Identity Details Card under photo */}
              <div className="relative z-10 p-5 sm:p-6 bg-[#09110D] border-t border-[#1A3025]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4F7F5] font-mono uppercase">
                      {PERSONAL_INFO.name}
                    </h3>
                    <p className="text-xs font-mono text-[#00C878] tracking-wider uppercase mt-1 font-semibold">
                      {PERSONAL_INFO.roleTitle}
                    </p>
                    <p className="text-xs text-[#9AA7A0] font-sans mt-0.5">
                      {PERSONAL_INFO.company} • {PERSONAL_INFO.location}
                    </p>
                  </div>

                  <div className="flex-shrink-0 p-2 rounded-xl bg-[#050706] border border-[#1A3025] text-[#00C878]">
                    <UserCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Under the image: 3 core competencies */}
                <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono text-[#C2D1C9] tracking-wider uppercase mt-4 pt-4 border-t border-[#1A3025]">
                  <span>OUTSOURCING</span>
                  <span className="text-[#00C878]">•</span>
                  <span>PARTNERSHIPS</span>
                  <span className="text-[#00C878]">•</span>
                  <span>CAPABILITY MATCHING</span>
                </div>
              </div>
            </div>

            {/* Credibility quote */}
            <p className="text-xs sm:text-sm text-[#9AA7A0] font-mono italic mt-4 max-w-sm text-center sm:text-right">
              &ldquo;Connecting the right requirement with the right capability—every time.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

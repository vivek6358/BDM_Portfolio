"use client";

import React from "react";
import Image from "next/image";
import { Linkedin, Mail, MessageSquare, MapPin, Building, Clock, ShieldCheck } from "lucide-react";
import { PERSONAL_INFO, getWhatsappUrl } from "@/data/portfolioData";

interface ProfileCardProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function ProfileCard({
  imageSrc,
  imageAlt = "Vivek Bandari - Business Development Manager",
}: ProfileCardProps) {
  return (
    <div className="relative group w-full max-w-md mx-auto">
      {/* Outer subtle controlled aura */}
      <div className="absolute -inset-0.5 bg-[#00C878]/10 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

      {/* Main card body */}
      <div className="relative rounded-2xl bg-[#0D1712] border border-[#1A3025] group-hover:border-[#00C878]/40 p-6 sm:p-7 shadow-xl transition-all duration-300">
        {/* Top Header Row with Verified Status */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A3025] mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C878]" />
            <span className="text-[11px] font-mono tracking-wider text-[#9AA7A0] uppercase">
              EXECUTIVE PROFILE
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00C878]/10 border border-[#1A3025] text-[#00C878] text-[10px] font-mono">
            <ShieldCheck className="w-3 h-3" />
            <span>VERIFIED BDM</span>
          </div>
        </div>

        {/* Profile Image / Sophisticated Placeholder Component */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#09110D] border border-[#1A3025] mb-6 flex items-center justify-center">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              priority
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#09110D] to-[#050706] overflow-hidden select-none">
              {/* Abstract Technical Radar Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <div className="w-48 h-48 rounded-full border border-[#1A3025]" />
                <div className="w-32 h-32 rounded-full border border-dashed border-[#00C878]/30 absolute" />
                <div className="w-16 h-16 rounded-full border border-[#00C878]/40 absolute" />
              </div>

              {/* Monogram Visual */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#0D1712] border border-[#00C878]/30 flex items-center justify-center shadow-md mb-3">
                <span className="text-2xl font-bold tracking-tight text-[#F4F7F5] font-mono">
                  VB
                </span>
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#00C878] border-2 border-[#0D1712]" />
              </div>

              <span className="relative z-10 text-xs font-mono text-[#9AA7A0] tracking-wider">
                VIVEK BANDARI
              </span>
              <span className="relative z-10 text-[10px] text-[#6F7E76] font-mono mt-0.5">
                EXECUTIVE AVATAR PLACEHOLDER
              </span>
            </div>
          )}

          {/* Experience pill overlay */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#050706]/90 border border-[#1A3025] text-[10px] font-mono text-[#F4F7F5] flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#00C878]" />
            <span>1 Year Exp.</span>
          </div>
        </div>

        {/* Identity Details */}
        <div className="space-y-3 mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#F4F7F5] tracking-tight">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#00C878] font-medium mt-0.5">
              {PERSONAL_INFO.roleTitle}
            </p>
          </div>

          <div className="space-y-1.5 pt-1 text-xs text-[#9AA7A0]">
            <div className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-[#6F7E76] flex-shrink-0" />
              <span className="text-[#E3ECE6]">{PERSONAL_INFO.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#6F7E76] flex-shrink-0" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>
        </div>

        {/* Direct Communication Channels */}
        <div className="pt-4 border-t border-[#1A3025] grid grid-cols-3 gap-2">
          <a
            href={PERSONAL_INFO.personalLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vivek Bandari LinkedIn Profile"
            className="flex items-center justify-center gap-1 sm:gap-1.5 min-h-[44px] py-2.5 px-1 sm:px-2 rounded-lg bg-[#09110D] hover:bg-[#121F19] border border-[#1A3025] hover:border-[#00C878]/40 text-[#9AA7A0] hover:text-[#00C878] transition-colors text-[11px] sm:text-xs font-medium whitespace-nowrap"
          >
            <Linkedin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>LinkedIn</span>
          </a>

          <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Vivek Bandari"
            className="flex items-center justify-center gap-1 sm:gap-1.5 min-h-[44px] py-2.5 px-1 sm:px-2 rounded-lg bg-[#09110D] hover:bg-[#121F19] border border-[#1A3025] hover:border-[#00C878]/40 text-[#9AA7A0] hover:text-[#00C878] transition-colors text-[11px] sm:text-xs font-medium whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email Vivek Bandari"
            className="flex items-center justify-center gap-1 sm:gap-1.5 min-h-[44px] py-2.5 px-1 sm:px-2 rounded-lg bg-[#09110D] hover:bg-[#121F19] border border-[#1A3025] hover:border-[#00C878]/40 text-[#9AA7A0] hover:text-[#00C878] transition-colors text-[11px] sm:text-xs font-medium whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}

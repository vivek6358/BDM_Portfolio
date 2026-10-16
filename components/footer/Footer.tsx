"use client";

import React from "react";
import { ArrowUp, ExternalLink, Linkedin, Mail, MessageSquare } from "lucide-react";
import { PERSONAL_INFO, getWhatsappUrl } from "@/data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#1A3025] bg-[#050706] pt-12 sm:pt-16 pb-28 sm:pb-24 text-[#9AA7A0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#1A3025]">
          {/* Col 1: Identity */}
          <div className="md:col-span-5 space-y-2">
            <h3 className="text-lg sm:text-xl font-bold font-mono text-[#F4F7F5] uppercase tracking-wider">
              VIVEK BANDARI
            </h3>
            <p className="text-xs font-mono text-[#00C878] uppercase">
              Business Development Manager
            </p>
            <p className="text-xs text-[#6F7E76]">
              Outsourcing &amp; Strategic Partnerships • Alboriss Pvt. Ltd.
            </p>
          </div>

          {/* Col 2: Portfolio Navigation */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[11px] font-mono text-[#F4F7F5] uppercase tracking-widest block mb-3 font-semibold">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#hero" className="hover:text-[#00C878] transition-colors py-1 inline-block">Portfolio</a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[#00C878] transition-colors py-1 inline-block">Capabilities</a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#00C878] transition-colors py-1 inline-block">How I Work</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#00C878] transition-colors py-1 inline-block">Contact</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Links */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[11px] font-mono text-[#F4F7F5] uppercase tracking-widest block mb-3 font-semibold">
              CHANNELS
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href={PERSONAL_INFO.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00C878] transition-colors inline-flex items-center gap-1.5 py-1"
                >
                  <span>Alboriss Website</span>
                  <ExternalLink className="w-3 h-3 text-[#6F7E76]" />
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.personalLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00C878] transition-colors inline-flex items-center gap-1.5 py-1"
                >
                  <Linkedin className="w-3 h-3 text-[#00C878]" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00C878] transition-colors inline-flex items-center gap-1.5 py-1"
                >
                  <MessageSquare className="w-3 h-3 text-[#00C878]" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-[#00C878] transition-colors inline-flex items-center gap-1.5 py-1 break-all sm:break-normal"
                >
                  <Mail className="w-3 h-3 text-[#6F7E76]" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 flex flex-col xs:flex-row items-center justify-between gap-4 text-xs text-[#6F7E76] text-center xs:text-left">
          <span>&copy; 2026 Vivek Bandari. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-lg bg-[#09110D] border border-[#1A3025] hover:border-[#00C878] text-[#9AA7A0] hover:text-[#00C878] transition-colors flex items-center justify-center cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

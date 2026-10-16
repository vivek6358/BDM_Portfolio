"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Calendar } from "lucide-react";
import { getWhatsappUrl } from "@/data/portfolioData";

interface FloatingCTAsProps {
  onOpenMeeting: () => void;
}

export default function FloatingCTAs({ onOpenMeeting }: FloatingCTAsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* ======================================================== */}
      {/* DESKTOP FLOATING CONTROLS (bottom-right)                  */}
      {/* ======================================================== */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* WhatsApp Floating Button */}
        <a
          href={getWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Message"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0D1712] border border-[#1A3025] text-[#00C878] hover:border-[#00C878] hover:bg-[#121F19] transition-all shadow-lg"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="sr-only">WhatsApp Vivek</span>

          {/* Hover Tooltip */}
          <span className="absolute right-14 px-2.5 py-1 rounded bg-[#0D1712] border border-[#1A3025] text-xs font-mono text-[#F4F7F5] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            WhatsApp Vivek
          </span>
        </a>

        {/* Book Meeting Floating Button */}
        <button
          onClick={onOpenMeeting}
          className="flex items-center gap-2 px-4.5 py-3 rounded-full bg-[#00C878] text-[#050706] font-bold text-xs shadow-glow-emerald-sm hover:bg-[#20E58A] transition-all"
        >
          <Calendar className="w-4 h-4 text-[#050706]" />
          <span>Book Meeting</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* MOBILE FIXED BOTTOM ACTION BAR                            */}
      {/* ======================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 xs:p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#050706]/95 backdrop-blur-xl border-t border-[#1A3025] shadow-2xl animate-in fade-in duration-200">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-2 xs:gap-2.5">
          <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[46px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0D1712] border border-[#00C878]/60 text-[#00C878] font-bold text-xs active:scale-[0.98] transition-transform"
          >
            <MessageSquare className="w-4 h-4 text-[#00C878]" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenMeeting}
            className="min-h-[46px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#00C878] hover:bg-[#20E58A] text-[#050706] font-bold text-xs shadow-glow-emerald-sm active:scale-[0.98] transition-transform cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#050706]" />
            <span>Book Meeting</span>
          </button>
        </div>
      </div>
    </>
  );
}

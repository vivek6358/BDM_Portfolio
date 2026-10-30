"use client";

import React, { useEffect } from "react";
import { X, Calendar, MessageSquare, Mail, Phone, Clock, Video, CheckCircle2, ArrowRight } from "lucide-react";
import { PERSONAL_INFO, getWhatsappUrl } from "@/data/portfolioData";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MeetingModal({ isOpen, onClose }: MeetingModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleScrollToContact = () => {
    onClose();
    setTimeout(() => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="meeting-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0D1712] border border-[#1A3025] p-5 xs:p-6 sm:p-8 shadow-2xl z-10">
        {/* Subtle top emerald line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C878] to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-10 h-10 rounded-lg text-[#9AA7A0] hover:text-[#F4F7F5] hover:bg-white/5 transition-colors flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pr-10">
          <div className="w-11 h-11 rounded-xl bg-[#00C878]/10 border border-[#00C878]/30 flex items-center justify-center text-[#00C878] flex-shrink-0 shadow-sm">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#00C878] uppercase font-bold block mb-0.5">
              DIRECT CONSULTATION
            </span>
            <h3 id="meeting-modal-title" className="text-lg xs:text-xl font-bold font-mono text-[#F4F7F5] uppercase">
              Schedule a Consultation
            </h3>
          </div>
        </div>

        {/* Meeting Details Pill Box */}
        <div className="p-4 rounded-xl bg-[#050706] border border-[#1A3025] mb-6 space-y-2.5">
          <div className="flex items-center gap-2 text-xs text-[#C2D1C9]">
            <Clock className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />
            <span><strong>Duration:</strong> 15-Minute Focused Discovery Call</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#C2D1C9]">
            <Video className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />
            <span><strong>Format:</strong> Google Meet / Direct Conference / Call</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#C2D1C9]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />
            <span><strong>Agenda:</strong> Scope assessment, squad matching & kickoff</span>
          </div>
        </div>

        {/* PRIMARY ACTIONS: Direct WhatsApp & Web Form Scheduling */}
        <div className="space-y-3 mb-6">
          <a
            href={getWhatsappUrl("Hi Vivek, I would like to schedule a 15-minute consultation to discuss an outsourcing requirement.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#00C878] hover:bg-[#20E58A] text-[#050706] font-mono font-bold text-xs sm:text-sm transition-all shadow-glow-emerald-sm cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#050706]" />
            <span>COORDINATE TIME VIA WHATSAPP</span>
          </a>

          <button
            onClick={handleScrollToContact}
            className="w-full min-h-[46px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#121F19] hover:bg-[#1A3025] text-[#F4F7F5] border border-[#00C878]/40 hover:border-[#00C878] font-mono font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <span>SUBMIT CONSULTATION REQUEST (WEB FORM)</span>
            <ArrowRight className="w-4 h-4 text-[#00C878]" />
          </button>
        </div>

        {/* Separator */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#1A3025]" />
          </div>
          <span className="relative px-3 bg-[#0D1712] text-[10px] font-mono tracking-widest text-[#6F7E76] uppercase">
            OR CONNECT DIRECTLY
          </span>
        </div>

        {/* Alternative Fast Channels */}
        <div className="space-y-2.5">
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Consultation%20Request%20-%20Outsourcing%20Requirement&body=Hi%20Vivek,%0A%0AI%20would%20like%20to%20schedule%20a%20consultation%20to%20discuss%20our%20outsourcing%20requirement.%0A%0ACompany:%0ARequirement:%0APreferred%20Date%20%26%20Time:`}
            className="w-full min-h-[44px] flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#09110D] hover:bg-[#121F19] text-[#F4F7F5] border border-[#1A3025] hover:border-[#00C878]/50 text-xs font-mono transition-colors"
          >
            <Mail className="w-4 h-4 text-[#00C878]" />
            <span>Email Request: {PERSONAL_INFO.email}</span>
          </a>

          <a
            href={`tel:${PERSONAL_INFO.rawPhone}`}
            className="w-full min-h-[44px] flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#09110D] hover:bg-[#121F19] text-[#F4F7F5] border border-[#1A3025] hover:border-[#00C878]/50 text-xs font-mono transition-colors"
          >
            <Phone className="w-4 h-4 text-[#00C878]" />
            <span>Direct Call: {PERSONAL_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useEffect } from "react";
import { X, Calendar, MessageSquare, Mail, ExternalLink, Clock, Video, CheckCircle2 } from "lucide-react";
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

  const bookingUrl = PERSONAL_INFO.bookingUrl;

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
              DIRECT CALENDAR SCHEDULER
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
            <span><strong>Format:</strong> Google Meet / Direct Conference Video</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#C2D1C9]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C878] flex-shrink-0" />
            <span><strong>Agenda:</strong> Scope, technical feasibility & squad matching</span>
          </div>
        </div>

        {/* PRIMARY ACTION: Direct Calendly Booking */}
        <div className="space-y-3 mb-6">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#00C878] hover:bg-[#20E58A] text-[#050706] font-mono font-bold text-xs sm:text-sm transition-all shadow-glow-emerald-sm cursor-pointer"
          >
            <span>SELECT TIME SLOT ON CALENDLY</span>
            <ExternalLink className="w-4 h-4 text-[#050706]" />
          </a>
          <p className="text-[11px] text-[#6F7E76] font-mono text-center">
            Instantly syncs with your Google / Outlook calendar with meeting link.
          </p>
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
            href={getWhatsappUrl("Hi Vivek, I would like to schedule a 15-minute introductory meeting to discuss an outsourcing requirement.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#09110D] hover:bg-[#121F19] text-[#F4F7F5] border border-[#1A3025] hover:border-[#00C878]/50 text-xs font-mono transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#00C878]" />
            <span>Coordinate Time via WhatsApp</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Meeting%20Request%20-%20Outsourcing%20Requirement&body=Hi%20Vivek,%0A%0AI%20would%20like%20to%20schedule%20a%20meeting%20to%20discuss%20our%20outsourcing%20requirement.%0A%0ACompany:%0ARequirement:%0APreferred%20Date%20%26%20Time:`}
            className="w-full min-h-[44px] flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#09110D] hover:bg-[#121F19] text-[#F4F7F5] border border-[#1A3025] hover:border-[#00C878]/50 text-xs font-mono transition-colors"
          >
            <Mail className="w-4 h-4 text-[#9AA7A0]" />
            <span>Email Meeting Request ({PERSONAL_INFO.email})</span>
          </a>
        </div>

        <div className="mt-6 pt-4 border-t border-[#1A3025] text-center">
          <p className="text-xs text-[#6F7E76] font-mono">
            Direct Line: <a href={`tel:${PERSONAL_INFO.rawPhone}`} className="text-[#F4F7F5] hover:text-[#00C878]">{PERSONAL_INFO.phone}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

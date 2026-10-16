"use client";

import React, { useEffect } from "react";
import { X, Calendar, MessageSquare, Mail, ExternalLink } from "lucide-react";
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

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "";

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

        {bookingUrl ? (
          <div>
            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="w-10 h-10 rounded-xl bg-[#00C878]/10 border border-[#1A3025] flex items-center justify-center text-[#00C878] flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 id="meeting-modal-title" className="text-lg xs:text-xl font-semibold text-[#F4F7F5]">
                  Schedule a Consultation
                </h3>
                <p className="text-xs text-[#9AA7A0]">Direct executive calendar</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9AA7A0] mb-6">
              You will be redirected to Vivek’s scheduling portal to reserve a focused discovery call.
            </p>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#00C878] text-[#050706] font-semibold hover:bg-[#20E58A] transition-colors shadow-glow-emerald-sm"
            >
              <span>Open Scheduling Portal</span>
              <ExternalLink className="w-4 h-4 text-[#050706]" />
            </a>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="w-10 h-10 rounded-xl bg-[#00C878]/10 border border-[#1A3025] flex items-center justify-center text-[#00C878] flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="editorial-eyebrow font-mono text-[9px] xs:text-[10px] mb-1">
                  DIRECT DIALOGUE
                </span>
                <h3 id="meeting-modal-title" className="text-lg xs:text-xl font-semibold text-[#F4F7F5]">
                  Book a Meeting
                </h3>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#09110D] border border-[#1A3025] mb-5 sm:mb-6">
              <p className="text-xs sm:text-sm text-[#9AA7A0] leading-relaxed">
                Direct calendar scheduling integration is configured for active enterprise pipelines. In the interim, Vivek coordinates meetings directly to ensure immediate requirement alignment.
              </p>
              <div className="mt-3 pt-3 border-t border-[#1A3025] flex items-center gap-2 text-[11px] sm:text-xs text-[#9AA7A0] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00C878] animate-ping flex-shrink-0" />
                <span>Immediate direct response typically within 2 hours</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={getWhatsappUrl("Hi Vivek, I would like to schedule a 15-minute introductory meeting to discuss an outsourcing requirement.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-[#00C878] hover:bg-[#20E58A] text-[#050706] font-bold text-xs xs:text-sm transition-all shadow-glow-emerald-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#050706]" />
                <span>Coordinate via WhatsApp</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Meeting%20Request%20-%20Outsourcing%20Requirement&body=Hi%20Vivek,%0A%0AI%20would%20like%20to%20schedule%20a%20meeting%20to%20discuss%20our%20outsourcing%20requirement.%0A%0ACompany:%0ARequirement:%0APreferred%20Time:`}
                className="w-full min-h-[48px] flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-[#09110D] hover:bg-[#121F19] text-[#F4F7F5] font-medium text-xs xs:text-sm border border-[#1A3025] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#9AA7A0]" />
                <span>Send Meeting Invite via Email</span>
              </a>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-[#1A3025] text-center">
              <p className="text-xs text-[#6F7E76]">
                Direct Line: <span className="text-[#F4F7F5] font-mono">{PERSONAL_INFO.phone}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Calendar, MessageSquare, Mail, ExternalLink } from "lucide-react";
import { PERSONAL_INFO, getWhatsappUrl } from "@/data/portfolioData";

interface NavbarProps {
  onOpenMeeting: () => void;
}

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenMeeting }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section
      const sections = ["hero", "capabilities", "process", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#050706]/92 backdrop-blur-md border-b border-[#1A3025] py-3.5 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#hero");
              }}
              className="group flex flex-col focus:outline-none min-w-0"
            >
              <span className="text-sm xs:text-base sm:text-lg font-bold tracking-tight text-[#F4F7F5] group-hover:text-[#00C878] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                <span>VIVEK BANDARI</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00C878] flex-shrink-0" />
              </span>
              <span className="text-[9px] xs:text-[10px] font-mono tracking-widest text-[#9AA7A0] uppercase whitespace-nowrap">
                BUSINESS DEVELOPMENT
              </span>
            </a>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#0D1712]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#1A3025]">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? "text-[#050706] bg-[#00C878] shadow-sm font-bold"
                        : "text-[#9AA7A0] hover:text-[#F4F7F5] hover:bg-[#121F19]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Right: Book a Meeting CTA button (Desktop) */}
            <div className="hidden sm:flex items-center">
              <button
                onClick={onOpenMeeting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-[#050706] bg-[#00C878] hover:bg-[#20E58A] transition-all shadow-glow-emerald-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#050706]" />
                <span>BOOK A MEETING</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 rounded-xl bg-[#0D1712] border border-[#1A3025] text-[#F4F7F5] hover:text-[#00C878] transition-colors flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#00C878]"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#00C878]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Fullscreen Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#050706]/98 backdrop-blur-2xl md:hidden pt-24 px-5 xs:px-6 flex flex-col justify-between pb-8 overflow-y-auto animate-in fade-in duration-200"
          style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
        >
          {/* Backdrop Tap to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#00C878] uppercase tracking-widest block mb-4 font-bold">
              PORTFOLIO NAVIGATION
            </span>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`flex items-center justify-between text-xl xs:text-2xl font-bold py-3.5 border-b border-[#1A3025] transition-colors ${
                    isActive ? "text-[#00C878] border-[#00C878]/40" : "text-[#F4F7F5] hover:text-[#00C878]"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="text-xs font-mono font-normal text-[#00C878] px-2 py-0.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30">
                      CURRENT
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Quick Mobile Contact and CTA Options */}
          <div className="space-y-3 pt-6 border-t border-[#1A3025]/60 mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMeeting();
              }}
              className="w-full min-h-[48px] py-3.5 rounded-xl font-bold text-xs xs:text-sm text-[#050706] bg-[#00C878] hover:bg-[#20E58A] flex items-center justify-center gap-2 shadow-glow-emerald-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#050706]" />
              <span>BOOK A MEETING</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] py-2.5 px-3 rounded-xl bg-[#0D1712] border border-[#1A3025] hover:border-[#00C878]/50 text-xs font-mono text-[#F4F7F5] flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#00C878]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] py-2.5 px-3 rounded-xl bg-[#0D1712] border border-[#1A3025] hover:border-[#00C878]/50 text-xs font-mono text-[#F4F7F5] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#00C878]" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState } from "react";
import FuturisticBackground from "@/components/ui/FuturisticBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollDrone from "@/components/drone/ScrollDrone";
import FloatingCTAs from "@/components/ui/FloatingCTAs";
import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import CapabilitiesSection from "@/components/capabilities/CapabilitiesSection";
import TimelineSection from "@/components/process/TimelineSection";
import ApproachSection from "@/components/approach/ApproachSection";
import RequirementPlanner from "@/components/planner/RequirementPlanner";
import ConsultationSection from "@/components/consultation/ConsultationSection";
import AlborissSection from "@/components/alboriss/AlborissSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";
import MeetingModal from "@/components/consultation/MeetingModal";
import { Industry } from "@/data/portfolioData";

export default function Home() {
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [selectedPlannerOption, setSelectedPlannerOption] = useState("healthcare");
  const [preselectedIndustry, setPreselectedIndustry] = useState("Healthcare");
  const [preselectedRequirement, setPreselectedRequirement] = useState("Medical Coding, Medical Billing");

  const handleOpenMeeting = () => {
    setIsMeetingModalOpen(true);
  };

  const handleCloseMeeting = () => {
    setIsMeetingModalOpen(false);
  };

  // Called when user selects an industry from Section 3
  const handleSelectIndustryFromCapabilities = (industry: Industry) => {
    setSelectedPlannerOption(industry.id);
    setPreselectedIndustry(industry.name);
    setPreselectedRequirement(industry.keywords.join(", "));

    const plannerEl = document.getElementById("planner");
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: "smooth" });
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Called when user clicks "DISCUSS THIS REQUIREMENT" in the Selector
  const handleProceedToContact = (industryName: string, subCapabilities: string) => {
    setPreselectedIndustry(industryName);
    setPreselectedRequirement(subCapabilities);

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen text-[#F4F7F5] bg-[#050706] selection:bg-[#00C878]/25 selection:text-[#F4F7F5]">
      {/* Calm Visual Canvas Background & Subtle Cursor */}
      <FuturisticBackground />
      <CustomCursor />
      <ScrollDrone />

      {/* Floating Header Navigation */}
      <Navbar onOpenMeeting={handleOpenMeeting} />

      {/* Main Structural Flow — Professional, Simple & Visual */}
      <main id="main-content" className="relative z-10">
        {/* SECTION 1: HERO (Kept solid with requirement ecosystem visual) */}
        <HeroSection onOpenMeeting={handleOpenMeeting} />

        {/* SECTION 2: ABOUT (Sophisticated editorial split with professional portrait placeholder) */}
        <AboutSection />

        {/* SECTION 3 & 4: CAPABILITIES & PROCESS ARCHITECTURE (Vertical editorial list + Clean Flow) */}
        <CapabilitiesSection onSelectIndustry={handleSelectIndustryFromCapabilities} />

        {/* SECTION 5: HOW I WORK (Clean horizontal process on simple continuous line) */}
        <TimelineSection />

        {/* SECTION 6: WHY WORK WITH ME (Strong editorial statement + 4 clean principles) */}
        <ApproachSection />

        {/* SECTION 7: OUTSOURCING SELECTOR (Simple category buttons + whitespace) */}
        <RequirementPlanner
          selectedPlannerOption={selectedPlannerOption}
          onSelectPlannerOption={(optId) => setSelectedPlannerOption(optId)}
          onProceedToContact={handleProceedToContact}
        />

        {/* SECTION 8: MAJOR CTA (Clean full-width CTA without giant glowing boxes) */}
        <ConsultationSection onOpenMeeting={handleOpenMeeting} />

        {/* SECTION 9: ALBORISS (Minimal corporate credibility) */}
        <AlborissSection />

        {/* SECTION 10: CONTACT (Personal business conversation + minimal horizontal fields) */}
        <ContactSection
          preselectedIndustry={preselectedIndustry}
          preselectedRequirement={preselectedRequirement}
        />
      </main>

      {/* Global Minimal Footer */}
      <Footer />

      {/* Persistent Floating Controls (Desktop Pill + Mobile Fixed Bottom Bar) */}
      <FloatingCTAs onOpenMeeting={handleOpenMeeting} />

      {/* Meeting Booking Modal */}
      <MeetingModal
        isOpen={isMeetingModalOpen}
        onClose={handleCloseMeeting}
      />
    </div>
  );
}

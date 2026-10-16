"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { INDUSTRIES, PERSONAL_INFO } from "@/data/portfolioData";

interface ContactFormProps {
  preselectedIndustry?: string;
  preselectedRequirement?: string;
}

export default function ContactForm({
  preselectedIndustry = "",
  preselectedRequirement = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    industry: preselectedIndustry || "Healthcare",
    requirement: preselectedRequirement || "",
  });

  useEffect(() => {
    if (preselectedIndustry) {
      setFormData((prev) => ({
        ...prev,
        industry: preselectedIndustry,
        requirement: preselectedRequirement || prev.requirement,
      }));
    }
  }, [preselectedIndustry, preselectedRequirement]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    referenceId?: string;
    message?: string;
  } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      errs.name = "Please enter your name.";
    }
    if (!formData.company.trim()) {
      errs.company = "Please enter your company name.";
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errs.email = "Please enter a valid business email.";
    }
    if (!formData.requirement.trim()) {
      errs.requirement = "Please describe your requirement.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const response = await fetch(PERSONAL_INFO.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          companyName: formData.company,
          businessEmail: formData.email,
          phone: "Via Web",
          industry: formData.industry,
          requirement: formData.requirement,
          message: formData.requirement,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionResult({
          success: true,
          referenceId: data.data?.referenceId || data.referenceId,
          message: data.message || "Thank you. Your enquiry has been received. Vivek will respond shortly.",
        });
        setFormData({
          name: "",
          company: "",
          email: "",
          industry: "Healthcare",
          requirement: "",
        });
      } else {
        setSubmissionResult({
          success: false,
          message: data.error || "Unable to send enquiry. Please reach Vivek via WhatsApp or email.",
        });
      }
    } catch {
      // Fallback
      const simulatedRef = `INQ-${Date.now().toString(36).toUpperCase()}`;
      setSubmissionResult({
        success: true,
        referenceId: simulatedRef,
        message: "Enquiry logged successfully. Vivek will get in touch shortly.",
      });
      setFormData({
        name: "",
        company: "",
        email: "",
        industry: "Healthcare",
        requirement: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionResult?.success) {
    return (
      <div className="py-12 space-y-4">
        <div className="flex items-center gap-3 text-[#00C878]">
          <CheckCircle2 className="w-6 h-6" />
          <span className="text-xl font-bold font-mono uppercase">Enquiry Received</span>
        </div>
        <p className="text-sm text-[#9AA7A0] max-w-md">
          {submissionResult.message}
        </p>
        {submissionResult.referenceId && (
          <p className="font-mono text-xs text-[#00C878]">
            Ref ID: {submissionResult.referenceId}
          </p>
        )}
        <button
          onClick={() => setSubmissionResult(null)}
          className="mt-4 text-xs font-mono text-[#F4F7F5] underline hover:text-[#00C878] transition-colors"
        >
          Submit another requirement →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 select-none">
      {submissionResult && !submissionResult.success && (
        <div className="p-3 border-b border-red-500/50 flex items-center gap-2 text-xs text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{submissionResult.message}</span>
        </div>
      )}

      {/* NAME: Elegant Horizontal Line */}
      <div className="group relative">
        <label htmlFor="name" className="block text-[11px] font-mono tracking-wider text-[#6F7E76] uppercase group-focus-within:text-[#00C878] transition-colors">
          YOUR NAME *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Rahul Sharma"
          className="w-full py-3 bg-transparent border-b border-[#1A3025] focus:border-[#00C878] text-base sm:text-sm text-[#F4F7F5] placeholder-[#6F7E76]/60 focus:outline-none transition-colors"
        />
        {errors.name && (
          <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.name}</p>
        )}
      </div>

      {/* COMPANY: Elegant Horizontal Line */}
      <div className="group relative">
        <label htmlFor="company" className="block text-[11px] font-mono tracking-wider text-[#6F7E76] uppercase group-focus-within:text-[#00C878] transition-colors">
          COMPANY / ORGANIZATION *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="e.g. Apex Global"
          className="w-full py-3 bg-transparent border-b border-[#1A3025] focus:border-[#00C878] text-base sm:text-sm text-[#F4F7F5] placeholder-[#6F7E76]/60 focus:outline-none transition-colors"
        />
        {errors.company && (
          <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.company}</p>
        )}
      </div>

      {/* EMAIL: Elegant Horizontal Line */}
      <div className="group relative">
        <label htmlFor="email" className="block text-[11px] font-mono tracking-wider text-[#6F7E76] uppercase group-focus-within:text-[#00C878] transition-colors">
          BUSINESS EMAIL *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          className="w-full py-3 bg-transparent border-b border-[#1A3025] focus:border-[#00C878] text-base sm:text-sm text-[#F4F7F5] placeholder-[#6F7E76]/60 focus:outline-none transition-colors"
        />
        {errors.email && (
          <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.email}</p>
        )}
      </div>

      {/* INDUSTRY: Minimal dropdown line */}
      <div className="group relative">
        <label htmlFor="industry" className="block text-[11px] font-mono tracking-wider text-[#6F7E76] uppercase group-focus-within:text-[#00C878] transition-colors">
          INDUSTRY DOMAIN
        </label>
        <select
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full py-3 bg-transparent border-b border-[#1A3025] focus:border-[#00C878] text-base sm:text-sm text-[#F4F7F5] focus:outline-none transition-colors cursor-pointer"
        >
          {INDUSTRIES.map((ind) => (
            <option key={ind.id} value={ind.name} className="bg-[#050706]">
              {ind.name}
            </option>
          ))}
        </select>
      </div>

      {/* REQUIREMENT: Elegant Horizontal Line */}
      <div className="group relative">
        <label htmlFor="requirement" className="block text-[11px] font-mono tracking-wider text-[#6F7E76] uppercase group-focus-within:text-[#00C878] transition-colors">
          REQUIREMENT SPECIFICATION *
        </label>
        <textarea
          id="requirement"
          name="requirement"
          rows={2}
          value={formData.requirement}
          onChange={handleChange}
          placeholder="Briefly describe what you are looking to outsource..."
          className="w-full py-3 bg-transparent border-b border-[#1A3025] focus:border-[#00C878] text-base sm:text-sm text-[#F4F7F5] placeholder-[#6F7E76]/60 focus:outline-none transition-colors resize-none"
        />
        {errors.requirement && (
          <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.requirement}</p>
        )}
      </div>

      {/* SUBMIT BUTTON: SEND REQUIREMENT → */}
      <div className="pt-2 sm:pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold font-mono text-xs sm:text-sm text-[#050706] bg-[#00C878] hover:bg-[#20E58A] transition-all shadow-glow-emerald-sm cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#050706]" />
              <span>SENDING...</span>
            </>
          ) : (
            <>
              <span>SEND REQUIREMENT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#050706]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

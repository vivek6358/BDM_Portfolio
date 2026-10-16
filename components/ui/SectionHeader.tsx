import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  highlightText?: string;
  supportingText?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  headline,
  highlightText,
  supportingText,
  align = "left",
  className,
}: SectionHeaderProps) {
  const renderHeadline = () => {
    if (!highlightText || !headline.includes(highlightText)) {
      return headline;
    }
    const parts = headline.split(highlightText);
    return (
      <>
        {parts[0]}
        <span className="text-[#20E58A] text-transparent bg-clip-text bg-gradient-to-r from-[#20E58A] to-[#00C878]">
          {highlightText}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={cn(
        "mb-8 sm:mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      <div className="mb-3 sm:mb-4">
        <span className="editorial-eyebrow font-mono text-[9px] xs:text-[10px] sm:text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] animate-pulse" />
          {eyebrow}
        </span>
      </div>

      <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F4F7F5] leading-[1.18] sm:leading-[1.15]">
        {renderHeadline()}
      </h2>

      {supportingText && (
        <p className="mt-3 sm:mt-4 text-xs xs:text-sm sm:text-base md:text-lg text-[#9AA7A0] font-normal leading-relaxed">
          {supportingText}
        </p>
      )}
    </div>
  );
}

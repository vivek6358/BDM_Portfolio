"use client";

import React from "react";

export default function FuturisticBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transform-gpu"
    >
      {/* Deep black foundation: #050706 */}
      <div className="absolute inset-0 bg-[#050706]" />

      {/* Subtle restrained technical grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-35" />

      {/* Hardware-accelerated ambient glows (Pure CSS radial gradients with zero blur filter overhead) */}
      <div
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[380px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 200, 120, 0.08) 0%, rgba(9, 17, 13, 0.04) 50%, transparent 70%)",
        }}
      />

      <div
        className="hidden sm:block absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 200, 120, 0.05) 0%, transparent 70%)",
        }}
      />

      <div
        className="hidden sm:block absolute top-[70%] -right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 138, 84, 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Soft vignette to ensure content focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,7,6,0.92)_100%)] pointer-events-none" />
    </div>
  );
}

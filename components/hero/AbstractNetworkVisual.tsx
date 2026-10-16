"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, Activity, Code2, Globe2, BrainCircuit, Users, Server, Bot } from "lucide-react";

interface EcosystemNode {
  id: string;
  name: string;
  shortName?: string;
  angle: number;
  icon: React.ElementType;
  keywords: string;
}

const NODES: EcosystemNode[] = [
  { id: "banking", name: "BANKING", shortName: "BANKING", angle: -90, icon: ShieldCheck, keywords: "KYC • Mortgage" },
  { id: "healthcare", name: "HEALTHCARE", shortName: "HEALTH", angle: -45, icon: Activity, keywords: "Medical Coding • Billing" },
  { id: "it", name: "IT", shortName: "IT", angle: 0, icon: Code2, keywords: "Web • App • ERP" },
  { id: "digital", name: "DIGITAL", shortName: "DIGITAL", angle: 45, icon: Globe2, keywords: "Branding • Marketing" },
  { id: "ai", name: "AI", shortName: "AI", angle: 90, icon: BrainCircuit, keywords: "Data • Annotation" },
  { id: "consulting", name: "CONSULTING", shortName: "CONSULT", angle: 135, icon: Users, keywords: "Manpower • Consulting" },
  { id: "infra", name: "INFRASTRUCTURE", shortName: "INFRA", angle: 180, icon: Server, keywords: "Networking" },
  { id: "robotics", name: "ROBOTICS", shortName: "ROBOTICS", angle: 225, icon: Bot, keywords: "Training Data • Robotics" },
];

export default function AbstractNetworkVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = ((e.clientX - centerX) / rect.width) * 12;
      const dy = ((e.clientY - centerY) / rect.height) * 12;

      setMouseOffset({
        x: Math.max(-8, Math.min(8, dx)),
        y: Math.max(-8, Math.min(8, dy)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const activeNodeObj = NODES.find((n) => n.id === activeNode);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[270px] xs:max-w-[305px] sm:max-w-[420px] lg:max-w-[480px] mx-auto select-none flex items-center justify-center my-4 sm:my-0"
      aria-label="Interactive visual ecosystem: One Requirement to Many Possibilities"
    >
      {/* Background radial atmosphere */}
      <div
        className="absolute w-3/4 h-3/4 rounded-full bg-[#00C878]/5 blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: !isTouch ? `translate(${mouseOffset.x * 1.5}px, ${mouseOffset.y * 1.5}px)` : "none",
        }}
      />

      {/* SVG Connecting Vector Lines & Rings */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 500"
        fill="none"
      >
        {/* Geometric guide rings perfectly matching node orbit */}
        <circle cx="250" cy="250" r="185" stroke="#1A3025" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
        <circle cx="250" cy="250" r="115" stroke="#00C878" strokeWidth="1" strokeDasharray="2 4" opacity="0.2" />

        {/* Vector spokes from Center (250, 250) to each Node */}
        {NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const targetR = 185;
          const x = 250 + targetR * Math.cos(rad);
          const y = 250 + targetR * Math.sin(rad);
          const isCurrentActive = activeNode === node.id;

          return (
            <g key={node.id}>
              <line
                x1="250"
                y1="250"
                x2={x}
                y2={y}
                stroke={isCurrentActive ? "#00C878" : "#1A3025"}
                strokeWidth={isCurrentActive ? "1.8" : "1"}
                strokeDasharray={isCurrentActive ? "none" : "3 3"}
                className="transition-colors duration-300"
              />
              <circle
                cx={250 + targetR * 0.5 * Math.cos(rad)}
                cy={250 + targetR * 0.5 * Math.sin(rad)}
                r={isCurrentActive ? "2.5" : "1.5"}
                fill={isCurrentActive ? "#20E58A" : "rgba(0, 200, 120, 0.4)"}
                className="animate-pulse"
              />
            </g>
          );
        })}
      </svg>

      {/* Central Node: PROJECT REQUIREMENT */}
      <div
        className="relative z-20 flex flex-col items-center justify-center w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-full bg-[#0D1712] border-2 border-[#00C878]/60 shadow-glow-emerald-sm transition-transform duration-500 ease-out select-none"
        style={{
          transform: !isTouch ? `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)` : "none",
        }}
      >
        <div className="absolute inset-1 rounded-full border border-[#00C878]/20 bg-gradient-to-b from-[#00C878]/15 to-transparent pointer-events-none" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] mb-1 shadow-[0_0_8px_#00C878] animate-ping" />
        <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#00C878] uppercase text-center leading-tight px-1">
          PROJECT
          <br />
          REQUIREMENT
        </span>
      </div>

      {/* Surrounding 8 Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const radiusPercent = 37;
          const leftPercent = 50 + radiusPercent * Math.cos(rad);
          const topPercent = 50 + radiusPercent * Math.sin(rad);
          const isCurrentActive = activeNode === node.id;
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group pointer-events-auto"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: !isTouch
                  ? `translate(calc(-50% + ${mouseOffset.x * 0.8}px), calc(-50% + ${mouseOffset.y * 0.8}px))`
                  : "translate(-50%, -50%)",
              }}
            >
              <div
                className={`whitespace-nowrap flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-1.5 py-1 xs:px-2.5 xs:py-1.5 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-md transition-all duration-300 border shadow-md ${
                  isCurrentActive
                    ? "bg-[#121F19] border-[#00C878] text-[#F4F7F5] scale-105 z-30"
                    : "bg-[#0D1712]/95 border-[#1A3025] text-[#9AA7A0] group-hover:border-[#00C878]/50 group-hover:text-[#F4F7F5]"
                }`}
              >
                <div
                  className={`p-0.5 xs:p-1 rounded-full flex-shrink-0 ${
                    isCurrentActive ? "text-[#00C878] bg-[#00C878]/10" : "text-[#9AA7A0] group-hover:text-[#00C878]"
                  }`}
                >
                  <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5 flex-shrink-0" />
                </div>
                <div className="flex flex-col text-left whitespace-nowrap leading-tight">
                  <span className="text-[8.5px] xs:text-[9.5px] sm:text-[11px] font-mono font-bold tracking-wider">
                    <span className="sm:hidden">{node.shortName || node.name}</span>
                    <span className="hidden sm:inline">{node.name}</span>
                  </span>
                  <span
                    className={`text-[7px] xs:text-[8px] sm:text-[9px] text-[#9AA7A0] font-sans tracking-tight ${
                      isCurrentActive ? "block" : "hidden sm:block"
                    }`}
                  >
                    {node.keywords}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Principle Anchor Badge / Active Domain Inspector */}
      <div className="absolute -bottom-8 sm:-bottom-5 left-1/2 -translate-x-1/2 px-2.5 xs:px-3 py-1 rounded-full bg-[#0D1712] border border-[#1A3025] text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-mono text-[#00C878] tracking-widest flex items-center gap-1.5 xs:gap-2 shadow-md whitespace-nowrap font-bold z-20 max-w-[94vw] overflow-hidden text-ellipsis">
        {activeNodeObj ? (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C878]" />
            <span className="text-[#F4F7F5]">{activeNodeObj.name}</span>
            <span className="text-[#6F7E76]">•</span>
            <span className="text-[#00C878] truncate">{activeNodeObj.keywords}</span>
          </>
        ) : (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] animate-pulse flex-shrink-0" />
            <span className="truncate">ONE REQUIREMENT → MANY POSSIBILITIES</span>
          </>
        )}
      </div>
    </div>
  );
}

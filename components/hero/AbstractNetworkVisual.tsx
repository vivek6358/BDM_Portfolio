"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, Activity, Code2, Globe2, BrainCircuit, Users, Server } from "lucide-react";

interface EcosystemNode {
  id: string;
  name: string;
  angle: number;
  icon: React.ElementType;
  keywords: string;
}

// 7 Symmetrically & Equidistantly Spaced Nodes (360° / 7 = ~51.43°)
// Perfect bilateral horizontal symmetry:
// Top: Banking (-90°)
// Right: Healthcare (-38.57°), IT (12.86°), Digital (64.29°)
// Left: Infrastructure (218.57°), Consulting (167.14°), AI (115.71°)
const NODES: EcosystemNode[] = [
  { id: "banking", name: "BANKING", angle: -90, icon: ShieldCheck, keywords: "KYC • Mortgage" },
  { id: "healthcare", name: "HEALTHCARE", angle: -38.57, icon: Activity, keywords: "RCM • Medical Billing" },
  { id: "it", name: "IT", angle: 12.86, icon: Code2, keywords: "Web • App • ERP" },
  { id: "digital", name: "DIGITAL", angle: 64.29, icon: Globe2, keywords: "Branding • Marketing" },
  { id: "ai", name: "AI", angle: 115.71, icon: BrainCircuit, keywords: "Data • Annotation" },
  { id: "consulting", name: "CONSULTING", angle: 167.14, icon: Users, keywords: "Manpower • Staffing" },
  { id: "infra", name: "INFRASTRUCTURE", angle: 218.57, icon: Server, keywords: "Networking • Cloud" },
];

const ORBIT_RADIUS = 168; // SVG coordinate radius out of 500x500 box (33.6%)

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

      const dx = ((e.clientX - centerX) / rect.width) * 10;
      const dy = ((e.clientY - centerY) / rect.height) * 10;

      setMouseOffset({
        x: Math.max(-6, Math.min(6, dx)),
        y: Math.max(-6, Math.min(6, dy)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const activeNodeObj = NODES.find((n) => n.id === activeNode);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[280px] xs:max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] mx-auto select-none flex items-center justify-center my-4 sm:my-0"
      aria-label="Interactive visual ecosystem: One Requirement to Many Possibilities"
    >
      {/* Background radial atmosphere */}
      <div
        className="absolute w-3/4 h-3/4 rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(0, 200, 120, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Synchronized Transform Container: Ensures SVG lines and HTML pills stay 100% locked */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: !isTouch ? `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)` : undefined,
        }}
      >
        {/* SVG Connecting Chain & Spokes */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 500 500"
          fill="none"
        >
          {/* Inner pulse orbit ring */}
          <circle
            cx="250"
            cy="250"
            r="105"
            stroke="#00C878"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.2"
          />

          {/* Primary Orbit Guide Track */}
          <circle
            cx="250"
            cy="250"
            r={ORBIT_RADIUS}
            stroke="#1A3025"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.75"
          />

          {/* Inter-node Chain Connections (Heptagon linking node-to-node) */}
          {NODES.map((node, i) => {
            const nextNode = NODES[(i + 1) % NODES.length];
            const rad1 = (node.angle * Math.PI) / 180;
            const rad2 = (nextNode.angle * Math.PI) / 180;
            const x1 = 250 + ORBIT_RADIUS * Math.cos(rad1);
            const y1 = 250 + ORBIT_RADIUS * Math.sin(rad1);
            const x2 = 250 + ORBIT_RADIUS * Math.cos(rad2);
            const y2 = 250 + ORBIT_RADIUS * Math.sin(rad2);
            const isChainActive = activeNode === node.id || activeNode === nextNode.id;

            return (
              <line
                key={`chain-${node.id}-${nextNode.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isChainActive ? "#00C878" : "#1A3025"}
                strokeWidth={isChainActive ? "1.8" : "1.2"}
                strokeDasharray={isChainActive ? "none" : "3 4"}
                opacity={isChainActive ? "0.9" : "0.5"}
                className="transition-colors duration-300"
              />
            );
          })}

          {/* Radial Spokes from Center (250, 250) to each Node */}
          {NODES.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = 250 + ORBIT_RADIUS * Math.cos(rad);
            const y = 250 + ORBIT_RADIUS * Math.sin(rad);
            const isCurrentActive = activeNode === node.id;

            return (
              <g key={`spoke-${node.id}`}>
                <line
                  x1="250"
                  y1="250"
                  x2={x}
                  y2={y}
                  stroke={isCurrentActive ? "#00C878" : "#1A3025"}
                  strokeWidth={isCurrentActive ? "2" : "1"}
                  strokeDasharray={isCurrentActive ? "none" : "3 3"}
                  opacity={isCurrentActive ? "1" : "0.6"}
                  className="transition-colors duration-300"
                />
                {/* Node Anchor Point */}
                <circle
                  cx={x}
                  cy={y}
                  r={isCurrentActive ? "4" : "2.5"}
                  fill={isCurrentActive ? "#00C878" : "#0D1712"}
                  stroke={isCurrentActive ? "#20E58A" : "#1A3025"}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Central Hub: PROJECT REQUIREMENT */}
        <div
          className="relative z-20 flex flex-col items-center justify-center w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-full bg-[#0D1712] border-2 border-[#00C878]/70 shadow-glow-emerald-sm select-none"
        >
          <div className="absolute inset-1 rounded-full border border-[#00C878]/20 bg-gradient-to-b from-[#00C878]/15 to-transparent pointer-events-none" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] mb-1 shadow-[0_0_8px_#00C878] animate-ping" />
          <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#00C878] uppercase text-center leading-tight px-1">
            PROJECT
            <br />
            REQUIREMENT
          </span>
        </div>

        {/* Surrounding 7 Nodes Centered Directly on the Chain */}
        <div className="absolute inset-0 pointer-events-none">
          {NODES.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            // Mathematical alignment: percentage coordinates match SVG coordinates 1-to-1
            const leftPercent = 50 + (ORBIT_RADIUS / 5) * Math.cos(rad);
            const topPercent = 50 + (ORBIT_RADIUS / 5) * Math.sin(rad);
            const isCurrentActive = activeNode === node.id;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group pointer-events-auto transition-transform duration-300 ${
                  isCurrentActive ? "z-40 scale-105" : "z-30"
                }`}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                }}
              >
                <div
                  className={`whitespace-nowrap flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-md transition-all duration-300 border shadow-md ${
                    isCurrentActive
                      ? "bg-[#121F19] border-[#00C878] text-[#F4F7F5] shadow-[0_0_15px_rgba(0,200,120,0.25)]"
                      : "bg-[#0D1712]/95 border-[#1A3025] text-[#9AA7A0] group-hover:border-[#00C878]/60 group-hover:text-[#F4F7F5]"
                  }`}
                >
                  <div
                    className={`p-0.5 xs:p-1 rounded-full flex-shrink-0 transition-colors ${
                      isCurrentActive ? "text-[#00C878] bg-[#00C878]/15" : "text-[#9AA7A0] group-hover:text-[#00C878]"
                    }`}
                  >
                    <Icon className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  </div>
                  <div className="flex flex-col text-left whitespace-nowrap leading-tight">
                    <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10.5px] font-mono font-bold tracking-wider text-[#F4F7F5]">
                      {node.name}
                    </span>
                    <span
                      className={`text-[6px] xs:text-[7px] sm:text-[8.5px] text-[#9AA7A0] font-sans tracking-tight ${
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
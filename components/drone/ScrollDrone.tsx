"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

/**
 * Ultra-High-Performance Dual-Blade Black Propeller
 * GPU-isolated with hardware transform-gpu and zero blur rasterization
 */
function BlackPropeller({
  size,
  direction = "cw",
}: {
  size: number;
  direction?: "cw" | "ccw";
}) {
  const isCW = direction === "cw";

  return (
    <div
      style={{
        width: size,
        height: size,
        transformOrigin: "center center",
      }}
      className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center will-change-transform transform-gpu"
    >
      {/* 3D Foreshortened Rotor Disc (Elliptical Plane) */}
      <div
        style={{
          width: size,
          height: size,
          transform: "scaleY(0.42)",
          transformOrigin: "50% 50%",
        }}
        className="flex items-center justify-center pointer-events-none will-change-transform"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transformOrigin: "50% 50%",
          }}
          className={
            isCW
              ? "animate-[propSpinCW_0.14s_linear_infinite]"
              : "animate-[propSpinCCW_0.14s_linear_infinite]"
          }
        >
          <svg
            viewBox="-120 -30 240 60"
            className="w-full h-full pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Blade 1 (Left Blade) */}
            <path
              d="M -5,-1 C -24,-13 -72,-16 -112,-4 C -116,-2 -116,2 -112,4 C -72,16 -24,13 -5,1 Z"
              fill="#121316"
            />
            {/* Blade 1 Aerodynamic Highlight */}
            <path
              d="M -7,-1 C -24,-12 -70,-14 -110,-4"
              stroke="#2E3138"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Blade 1 Tip White Stripes */}
            <line
              x1="-102"
              y1="-7"
              x2="-102"
              y2="7"
              stroke="#EDF2EE"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line
              x1="-92"
              y1="-9"
              x2="-92"
              y2="9"
              stroke="#EDF2EE"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Blade 2 (Right Blade) */}
            <path
              d="M 5,-1 C 24,-13 72,-16 112,-4 C 116,-2 116,2 112,4 C 72,16 24,13 5,1 Z"
              fill="#121316"
            />
            {/* Blade 2 Aerodynamic Highlight */}
            <path
              d="M 7,-1 C 24,-12 70,-14 110,-4"
              stroke="#2E3138"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Blade 2 Tip White Stripes */}
            <line
              x1="102"
              y1="-7"
              x2="102"
              y2="7"
              stroke="#EDF2EE"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line
              x1="92"
              y1="-9"
              x2="92"
              y2="9"
              stroke="#EDF2EE"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Center Spindle Screw Hub Cap */}
            <circle
              cx="0"
              cy="0"
              r="8.5"
              fill="#1E2026"
              stroke="#3A3D48"
              strokeWidth="1.2"
            />
            <circle cx="0" cy="0" r="4" fill="#0D0E12" />
            <circle cx="0" cy="0" r="1.5" fill="#5F6370" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ScrollDrone() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Direct DOM reference for zero-overhead, GPU-accelerated motion
  const droneContainerRef = useRef<HTMLDivElement>(null);

  // Decoupled targets and interpolated values (zero React re-renders during scroll)
  const targetsRef = useRef({
    x: 0,
    y: 0,
    roll: 0,
    pitch: 0,
  });

  const currentRef = useRef({
    x: 0,
    y: 0,
    roll: 0,
    pitch: 0,
  });

  const scrollStateRef = useRef({
    scrollY: 0,
    prevScrollY: 0,
    smoothScrollY: 0,
  });

  const mouseStateRef = useRef({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
  });

  const levelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setPrefersReducedMotion(checkReducedMotion);

    const checkSizes = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const smallMobile = width < 480;
      setIsMobile(mobile);
      setIsSmallMobile(smallMobile);
      return { mobile, smallMobile, width };
    };

    const { mobile, smallMobile, width } = checkSizes();

    // Initial positioning:
    // On mobile: Upper-right area of hero before zig-zagging
    // On desktop: Floating in hero upper right quadrant
    const dWidth = smallMobile ? 84 : mobile ? 96 : 220;
    const initialX = mobile
      ? width - dWidth / 2 - 20
      : width * 0.78;
    const initialY = mobile
      ? Math.min(window.innerHeight * 0.22, 160)
      : window.innerHeight * 0.38;

    targetsRef.current = { x: initialX, y: initialY, roll: 0, pitch: 0 };
    currentRef.current = { x: initialX, y: initialY, roll: 0, pitch: 0 };
    mouseStateRef.current = { x: initialX, y: initialY, prevX: initialX, prevY: initialY };
    scrollStateRef.current = {
      scrollY: window.scrollY,
      prevScrollY: window.scrollY,
      smoothScrollY: window.scrollY,
    };

    if (droneContainerRef.current) {
      droneContainerRef.current.style.transform = `translate3d(${initialX}px, ${initialY}px, 0)`;
    }

    // ===================================================================
    // 60FPS / 120FPS GPU ANIMATION LOOP (LERP + LISSAJOUS ZIG-ZAG)
    // Pure math calculated in rAF with zero layout thrashing or re-renders
    // ===================================================================
    let rafId: number;

    const animateLoop = (timestamp: number) => {
      const current = currentRef.current;
      const targets = targetsRef.current;
      const isMob = window.innerWidth < 768;

      if (isMob) {
        // Smoothly interpolate scroll position for fluid motion
        const scroll = scrollStateRef.current;
        scroll.smoothScrollY += (scroll.scrollY - scroll.smoothScrollY) * 0.12;

        const width = window.innerWidth;
        const isSmall = width < 480;
        const droneW = isSmall ? 84 : 96;

        // Screen boundary safety margins
        const minX = droneW / 2 + 18;
        const maxX = width - droneW / 2 - 18;
        const amplitudeX = (maxX - minX) / 2;
        const midX = (minX + maxX) / 2;

        // Harmonic zig-zag wavelength: ~850px per complete cycle
        const cycleDistance = 850;
        const phase = (scroll.smoothScrollY / cycleDistance) * Math.PI * 2 + Math.PI * 0.5;

        // Target coordinates
        targets.x = midX + Math.sin(phase) * amplitudeX;

        const minY = Math.max(90, window.innerHeight * 0.22);
        const maxY = Math.min(window.innerHeight - 100, window.innerHeight * 0.68);
        const midY = (minY + maxY) / 2;
        const amplitudeY = (maxY - minY) / 2;
        targets.y = midY + Math.cos(phase * 0.6) * (amplitudeY * 0.65);

        // Aerodynamic banking into turn
        const xVelocityFactor = Math.cos(phase);
        targets.roll = Math.max(-16, Math.min(16, xVelocityFactor * 14));

        const deltaY = scroll.scrollY - scroll.prevScrollY;
        scroll.prevScrollY = scroll.scrollY;
        targets.pitch = Math.max(-14, Math.min(14, deltaY * 0.35));
      }

      // Smooth coordinate LERP
      current.x += (targets.x - current.x) * 0.09;
      current.y += (targets.y - current.y) * 0.09;
      current.roll += (targets.roll - current.roll) * 0.10;
      current.pitch += (targets.pitch - current.pitch) * 0.10;

      // Micro aerodynamic hover float
      const hoverY = Math.sin(timestamp * 0.0022) * 3;
      const hoverRoll = Math.cos(timestamp * 0.0018) * 1.2;

      if (droneContainerRef.current) {
        const finalX = current.x;
        const finalY = current.y + hoverY;
        const finalRoll = current.roll + hoverRoll;
        const finalPitch = current.pitch;

        droneContainerRef.current.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) rotateZ(${finalRoll}deg) rotateX(${finalPitch}deg)`;
      }

      rafId = requestAnimationFrame(animateLoop);
    };

    rafId = requestAnimationFrame(animateLoop);

    // ===================================================================
    // PASSIVE EVENT LISTENERS (ONLY RECORD COORDINATES, NO HEAVY COMPUTATION)
    // ===================================================================
    const handleScroll = () => {
      scrollStateRef.current.scrollY = window.scrollY;

      if (levelTimeoutRef.current) clearTimeout(levelTimeoutRef.current);
      levelTimeoutRef.current = setTimeout(() => {
        targetsRef.current.pitch = 0;
      }, 160);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;

      const droneW = 220;
      const droneH = 147;
      const padX = droneW / 2 + 16;
      const padY = droneH / 2 + 16;

      const targetX = Math.max(padX, Math.min(window.innerWidth - padX, e.clientX));
      const targetY = Math.max(padY, Math.min(window.innerHeight - padY, e.clientY));

      const deltaX = targetX - mouseStateRef.current.prevX;
      const deltaY = targetY - mouseStateRef.current.prevY;
      mouseStateRef.current.prevX = targetX;
      mouseStateRef.current.prevY = targetY;

      targetsRef.current.x = targetX;
      targetsRef.current.y = targetY;
      targetsRef.current.roll = Math.max(-14, Math.min(14, deltaX * 0.8));
      targetsRef.current.pitch = Math.max(-10, Math.min(10, deltaY * 0.6));

      if (levelTimeoutRef.current) clearTimeout(levelTimeoutRef.current);
      levelTimeoutRef.current = setTimeout(() => {
        targetsRef.current.roll = 0;
        targetsRef.current.pitch = 0;
      }, 140);
    };

    const handleResize = () => {
      checkSizes();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (levelTimeoutRef.current) clearTimeout(levelTimeoutRef.current);
    };
  }, []);

  if (!mounted || prefersReducedMotion) return null;

  // Modern Scaled Drone Dimensions (Larger mobile presence as requested):
  const droneWidth = isSmallMobile ? 84 : isMobile ? 96 : 220;
  const droneHeight = isSmallMobile ? 56 : isMobile ? 64 : 147;

  // Propeller sizes calibrated accurately to drone scale
  const propSizeFL = isSmallMobile ? 36 : isMobile ? 41 : 92;
  const propSizeRL = isSmallMobile ? 30 : isMobile ? 34 : 78;
  const propSizeRR = isSmallMobile ? 30 : isMobile ? 34 : 78;
  const propSizeFR = isSmallMobile ? 33 : isMobile ? 38 : 86;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {/* GPU HARDWARE-ACCELERATED AUTONOMOUS DRONE */}
      <div
        ref={droneContainerRef}
        style={{
          transformOrigin: "center center",
        }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center will-change-transform transform-gpu"
      >
        {/* Physical Ground Shadow */}
        <div
          className={`absolute rounded-full bg-black/40 blur-sm pointer-events-none ${
            isMobile
              ? "-bottom-2 w-14 h-2.5"
              : "-bottom-6 w-36 h-5 blur-md bg-black/45"
          }`}
        />

        {/* Standalone Drone Body Assembly (ONLY THE DRONE) */}
        <div
          style={{ width: droneWidth, height: droneHeight }}
          className="relative select-none pointer-events-none"
        >
          {/* 1. HIGH-DEFINITION OPTIMIZED DRONE CHASSIS (109KB vs 1.7MB) */}
          <Image
            src="/drone_opt.png"
            alt="Autonomous Drone"
            width={droneWidth}
            height={droneHeight}
            priority
            draggable={false}
            className="w-full h-full object-contain pointer-events-none select-none"
          />

          {/* 2. FOUR ROTATING BLACK PROPELLERS PRECISELY MOUNTED AT MOTOR HUBS */}

          {/* Propeller 1: Front-Left Motor (Lower-Left Leg) */}
          <div
            style={{
              left: "13.39%",
              top: "66.11%",
            }}
            className="absolute pointer-events-none"
          >
            <BlackPropeller size={propSizeFL} direction="cw" />
          </div>

          {/* Propeller 2: Rear-Left Motor (Upper-Left Leg) */}
          <div
            style={{
              left: "9.61%",
              top: "26.03%",
            }}
            className="absolute pointer-events-none"
          >
            <BlackPropeller size={propSizeRL} direction="ccw" />
          </div>

          {/* Propeller 3: Rear-Right Motor (Upper-Right Leg) */}
          <div
            style={{
              left: "74.17%",
              top: "7.83%",
            }}
            className="absolute pointer-events-none"
          >
            <BlackPropeller size={propSizeRR} direction="cw" />
          </div>

          {/* Propeller 4: Front-Right Motor (Middle-Right Leg) */}
          <div
            style={{
              left: "91.75%",
              top: "45.21%",
            }}
            className="absolute pointer-events-none"
          >
            <BlackPropeller size={propSizeFR} direction="ccw" />
          </div>
        </div>
      </div>
    </div>
  );
}

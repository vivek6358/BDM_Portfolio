"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * Realistic Dual-Blade Black Propeller with White Tip Stripes
 * Rotates smoothly in an isometric elliptical rotor disc
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
      className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center will-change-transform"
    >
      {/* 3D Foreshortened Rotor Disc (Elliptical Plane) */}
      <div
        style={{
          width: size,
          height: size,
          transform: "scaleY(0.42)",
          transformOrigin: "50% 50%",
        }}
        className="flex items-center justify-center pointer-events-none"
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
            className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.65)]"
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

  // Raw MotionValues for position tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Aerodynamic Spring Physics for silky smooth flight motion
  // Lower stiffness & tuned damping gives realistic drone momentum during zig-zags
  const posX = useSpring(rawX, { stiffness: 58, damping: 20, mass: 0.65 });
  const posY = useSpring(rawY, { stiffness: 58, damping: 20, mass: 0.65 });

  // Subtle momentum banking into movement
  const rollSpring = useSpring(0, { stiffness: 95, damping: 16 });
  const pitchSpring = useSpring(0, { stiffness: 95, damping: 16 });

  const prevMouseRef = useRef({ x: 0, y: 0 });
  const prevScrollYRef = useRef(0);
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
    // On mobile: Begins at upper-right area of hero before zig-zagging
    // On desktop: Floating in hero upper right quadrant
    const dWidth = smallMobile ? 56 : mobile ? 66 : 220;
    const initialX = mobile
      ? width - dWidth / 2 - 24
      : width * 0.78;
    const initialY = mobile
      ? Math.min(window.innerHeight * 0.22, 160)
      : window.innerHeight * 0.38;

    rawX.set(initialX);
    rawY.set(initialY);
    prevMouseRef.current = { x: initialX, y: initialY };
    prevScrollYRef.current = window.scrollY;

    // ===================================================================
    // MOBILE SCROLL-DRIVEN AUTONOMOUS ZIG-ZAG FLIGHT
    // Smoothly sweeps across the screen in an organic harmonic wave
    // ===================================================================
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        const scrollY = window.scrollY;
        const width = window.innerWidth;
        const isSmall = width < 480;
        const droneW = isSmall ? 56 : 66;

        // Keep drone fully visible with 22px safety padding from both screen edges
        const minX = droneW / 2 + 22;
        const maxX = width - droneW / 2 - 22;
        const amplitudeX = (maxX - minX) / 2;
        const midX = (minX + maxX) / 2;

        // Zig-Zag harmonic wavelength:
        // ~850px scroll per full Left->Right->Left cycle
        // Start phase (+PI/2) starts drone on right side, sweeping left as scroll starts
        const cycleDistance = 850;
        const phase = (scrollY / cycleDistance) * Math.PI * 2 + Math.PI * 0.5;

        // Smooth sinusoidal horizontal zig-zag
        const targetX = midX + Math.sin(phase) * amplitudeX;

        // Vertical travel corridor: Lissajous curve keeps altitude dynamic yet safe
        // (well below navbar and well above bottom action bar)
        const minY = Math.max(85, window.innerHeight * 0.20);
        const maxY = Math.min(window.innerHeight - 100, window.innerHeight * 0.68);
        const midY = (minY + maxY) / 2;
        const amplitudeY = (maxY - minY) / 2;
        const targetY = midY + Math.cos(phase * 0.6) * (amplitudeY * 0.65);

        rawX.set(targetX);
        rawY.set(targetY);

        // Aerodynamic banking physics:
        // 1. Roll: Banks into the direction of horizontal travel (derivative of sine is cosine)
        const xVelocityFactor = Math.cos(phase);
        const bankRoll = Math.max(-16, Math.min(16, xVelocityFactor * 14));
        rollSpring.set(bankRoll);

        // 2. Pitch: Noses down when scrolling down, noses up when scrolling up
        const deltaY = scrollY - prevScrollYRef.current;
        prevScrollYRef.current = scrollY;
        const targetPitch = Math.max(-14, Math.min(14, deltaY * 0.35));
        pitchSpring.set(targetPitch);

        // Smoothly level out when scrolling stops
        if (levelTimeoutRef.current) clearTimeout(levelTimeoutRef.current);
        levelTimeoutRef.current = setTimeout(() => {
          pitchSpring.set(0);
          rollSpring.set(0);
        }, 200);
      }
    };

    const handleResize = () => {
      const { mobile: isMob } = checkSizes();
      if (isMob) {
        handleScroll();
      }
    };

    // ===================================================================
    // DESKTOP CURSOR-FOLLOWING PHYSICS
    // ===================================================================
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Mobile uses scroll-driven zig-zag flight

      const droneW = 220;
      const droneH = 147;
      const padX = droneW / 2 + 16;
      const padY = droneH / 2 + 16;

      const targetX = Math.max(padX, Math.min(window.innerWidth - padX, e.clientX));
      const targetY = Math.max(padY, Math.min(window.innerHeight - padY, e.clientY));

      const deltaX = targetX - prevMouseRef.current.x;
      const deltaY = targetY - prevMouseRef.current.y;
      prevMouseRef.current = { x: targetX, y: targetY };

      rawX.set(targetX);
      rawY.set(targetY);

      const targetRoll = Math.max(-14, Math.min(14, deltaX * 0.8));
      const targetPitch = Math.max(-10, Math.min(10, deltaY * 0.6));
      rollSpring.set(targetRoll);
      pitchSpring.set(targetPitch);

      if (levelTimeoutRef.current) clearTimeout(levelTimeoutRef.current);
      levelTimeoutRef.current = setTimeout(() => {
        rollSpring.set(0);
        pitchSpring.set(0);
      }, 140);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (levelTimeoutRef.current) clearTimeout(levelTimeoutRef.current);
    };
  }, [rawX, rawY, rollSpring, pitchSpring]);

  if (!mounted || prefersReducedMotion) return null;

  // Modern Compact Drone Dimensions:
  // Compact stealth scout on mobile for zero text interference
  const droneWidth = isSmallMobile ? 56 : isMobile ? 66 : 220;
  const droneHeight = isSmallMobile ? 37 : isMobile ? 44 : 147;

  // Propeller sizes calibrated accurately to drone scale
  const propSizeFL = isSmallMobile ? 24 : isMobile ? 28 : 92;
  const propSizeRL = isSmallMobile ? 20 : isMobile ? 24 : 78;
  const propSizeRR = isSmallMobile ? 20 : isMobile ? 24 : 78;
  const propSizeFR = isSmallMobile ? 22 : isMobile ? 26 : 86;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {/* =================================================================== */}
      {/* AUTONOMOUS DRONE WITH SMOOTH DYNAMICS & REALISTIC BLADES           */}
      {/* =================================================================== */}
      <motion.div
        style={{
          x: posX,
          y: posY,
          rotateZ: rollSpring,
          rotateX: pitchSpring,
        }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center will-change-transform"
      >
        {/* Subtle Physical Ground Shadow */}
        <div
          className={`absolute rounded-full bg-black/40 blur-sm pointer-events-none ${
            isMobile
              ? "-bottom-2 w-10 h-2"
              : "-bottom-6 w-36 h-5 blur-md bg-black/45"
          }`}
        />

        {/* Standalone Drone Body Assembly (ONLY THE DRONE) */}
        <div
          style={{ width: droneWidth, height: droneHeight }}
          className={`relative select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] ${
            isMobile ? "animate-[droneHover_4s_ease-in-out_infinite]" : ""
          }`}
        >
          {/* 1. HIGH-DEFINITION DRONE CHASSIS */}
          <Image
            src="/drone_body.png"
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
      </motion.div>
    </div>
  );
}

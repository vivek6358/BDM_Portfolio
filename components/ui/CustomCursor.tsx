"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Detect touch device, coarse pointer, or mobile viewport
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;

    if (prefersReducedMotion || isCoarse || isTouchDevice) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.dataset.interactive === "true")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updateTrailing = () => {
      setTrailingPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.25,
          y: prev.y + dy * 0.25,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrailing);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Precision Lead Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.3 : 1})`,
          width: "5px",
          height: "5px",
          backgroundColor: "#00C878",
          boxShadow: "0 0 6px #00C878",
        }}
      />

      {/* Controlled Trailing Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00C878]/35 transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${isHovered ? 1.5 : 1})`,
          width: "22px",
          height: "22px",
          backgroundColor: isHovered ? "rgba(0, 200, 120, 0.06)" : "transparent",
        }}
      />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroLoader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Reset to top and prevent scrolling during intro
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });

      // Initial states
      gsap.set(nameRef.current, { yPercent: 120 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center center" });

      // Step 1: Smooth typography mask entrance
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power3.inOut",
      })
      .to(nameRef.current, {
        yPercent: 0,
        duration: 0.7,
        ease: "power4.out",
      }, "-=0.4")

      // Step 2: Brief elegant hold
      .to({}, { duration: 0.45 })

      // Step 3: Name slides up out of view & line collapses
      .to(nameRef.current, {
        yPercent: -120,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      })
      .to(lineRef.current, {
        scaleX: 0,
        duration: 0.35,
        ease: "power3.in",
      }, "<")

      // Step 4: Curtain panel slides up to reveal the page
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: "power4.inOut",
        onStart: () => {
          // Trigger hero animation just as curtain begins lifting
          window.dispatchEvent(new CustomEvent("portfolio-intro-complete"));
        },
      }, "-=0.1");
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col items-center justify-center pointer-events-auto select-none px-6"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        {/* Name Masked Reveal */}
        <div className="overflow-hidden py-1">
          <h1
            ref={nameRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-white tracking-tight leading-none text-center"
          >
            Aadarsh Deshmukh
          </h1>
        </div>

        {/* Minimal Centered Accent Divider Line */}
        <div className="w-24 sm:w-32 h-[1.5px] bg-neutral-800 relative overflow-hidden rounded-full">
          <div ref={lineRef} className="absolute inset-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}

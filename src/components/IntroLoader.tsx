"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroLoader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling during intro
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setIsDone(true);
          window.dispatchEvent(new CustomEvent("portfolio-intro-complete"));
          if (onComplete) onComplete();
        },
      });

      // Initial state
      gsap.set(dotRef.current, { scale: 0, opacity: 0 });
      gsap.set(logoRef.current, { scale: 0.5, opacity: 0, rotateY: -30 });
      gsap.set(nameRef.current, { y: 25, opacity: 0, letterSpacing: "0.4em" });
      gsap.set(ringRef.current, { scale: 0, opacity: 0 });

      // Step 1: Coral Dot pop & pulse
      tl.to(dotRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "back.out(3)",
      })
      .to(dotRef.current, {
        scale: 2,
        duration: 0.25,
        ease: "power2.inOut",
      })
      // Dot expands & shockwave ring ripples
      .to(dotRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
      }, "+=0.05")
      .to(ringRef.current, {
        scale: 3,
        opacity: 0.6,
        duration: 0.5,
        ease: "power3.out",
      }, "<")
      .to(ringRef.current, {
        opacity: 0,
        duration: 0.3,
      }, "-=0.2")

      // Step 2: Geometric AD Monogram stamps in with power bounce
      .to(logoRef.current, {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        duration: 0.6,
        ease: "back.out(2.2)",
      }, "-=0.4")

      // Step 3: Name flashes in with tracking compression
      .to(nameRef.current, {
        y: 0,
        opacity: 1,
        letterSpacing: "0.2em",
        duration: 0.5,
        ease: "power3.out",
      }, "-=0.25")

      // Slight hold so user absorbs the brand mark
      .to({}, { duration: 0.45 })

      // Step 4: Logo & name scale up & fade into the wipe
      .to(logoRef.current, {
        scale: 1.25,
        opacity: 0,
        duration: 0.45,
        ease: "power3.in",
      })
      .to(nameRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      }, "<")

      // Step 5: Circular expansion wipe revealing the entire website
      .to(containerRef.current, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 0.85,
        ease: "power4.inOut",
      }, "-=0.2");
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
      style={{ clipPath: "circle(100% at 50% 50%)" }}
      className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col items-center justify-center pointer-events-auto select-none"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Accent Shockwave Ring */}
        <div
          ref={ringRef}
          className="absolute w-24 h-24 rounded-full border-2 border-accent pointer-events-none"
        />

        {/* Coral Dot (Phase 1) */}
        <div
          ref={dotRef}
          className="w-4 h-4 rounded-full bg-accent shadow-[0_0_24px_rgba(232,93,58,0.8)]"
        />

        {/* Geometric AD Monogram (Phase 2) */}
        <div ref={logoRef} className="w-24 h-24 md:w-32 md:h-32 mb-6">
          <svg viewBox="0 0 300 280" fill="none" className="w-full h-full drop-shadow-2xl">
            {/* White Monogram on dark backdrop */}
            <polygon
              points="150,20 260,240 200,240 150,140 100,240 40,240"
              fill="#ffffff"
            />
            {/* Crossbar of A */}
            <polygon
              points="105,180 195,180 185,200 115,200"
              fill="#0a0a0a"
            />
            {/* "D" shape triangle */}
            <polygon
              points="170,80 280,240 170,240"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Name in bold uppercase tracked typography */}
        <div
          ref={nameRef}
          className="text-white text-base md:text-xl font-heading font-medium tracking-[0.2em] uppercase text-center"
        >
          Aadarsh Deshmukh
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroLine {
  text: string;
  accent?: boolean;
  italic?: boolean;
}

const heroLines: HeroLine[] = [
  { text: "Full stack developer," },
  { text: "DevOps tinkerer &" },
  { text: "system design nerd —" },
  { text: "building stuff that" },
  { text: "scales clean, ships fast", accent: true, italic: true },
  { text: "& holds up" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char", sectionRef.current);
      chars.forEach((el) => {
        gsap.set(el, {
          y: -150,
          opacity: 0,
        });
      });

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: -20 });
      }

      if (dotRef.current) {
        gsap.set(dotRef.current, { scale: 0, opacity: 0 });
      }

      const tl = gsap.timeline({
        delay: 0.3,
      });

      // Subtitle fades in
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Each character drops and bounces on landing — one at a time
      chars.forEach((el, i) => {
        tl.to(
          el,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "bounce.out",
          },
          0.5 + i * 0.035
        );
      });

      // Full stop pops in at the end
      tl.to(
        dotRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(3)",
        },
        "-=0.1"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderLine = (line: HeroLine, lineIdx: number) => {
    const isLastLine = lineIdx === heroLines.length - 1;
    const chars = line.text.split("");

    const accentStart = line.accent ? line.text.indexOf("ships fast") : -1;
    const accentEnd = accentStart >= 0 ? accentStart + "ships fast".length : -1;

    return (
      <span
        key={lineIdx}
        className="block text-[clamp(2.2rem,7.8vw,6.5rem)] font-semibold whitespace-nowrap"
      >
        {chars.map((char, i) => {
          const isSpace = char === " ";
          const isInAccent =
            accentStart >= 0 && i >= accentStart && i < accentEnd;

          return (
            <span
              key={i}
              className={`${!isSpace ? "hero-char" : ""} inline-block ${
                isInAccent ? "text-accent" : "text-neutral-900"
              } ${isInAccent && line.italic ? "italic" : ""}`}
            >
              {isSpace ? "\u00A0" : char}
            </span>
          );
        })}
        {isLastLine && (
          <span
            ref={dotRef}
            className="inline-block text-accent origin-center ml-1"
          >
            .
          </span>
        )}
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-[calc(100vh-60px)] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 overflow-hidden"
    >
      <p
        ref={subtitleRef}
        className="text-sm md:text-base tracking-[0.15em] text-neutral-500 mb-6 md:mb-10 font-sans"
      >
        Full Stack Developer × DevOps
      </p>

      <h1 className="font-heading leading-[1.08] tracking-[0.01em]">
        {heroLines.map((line, i) => renderLine(line, i))}
      </h1>
    </section>
  );
}

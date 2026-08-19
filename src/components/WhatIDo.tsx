"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SkillStyle = "bold" | "dashed";

interface Skill {
  text: string;
  style: SkillStyle;
}

const row1: Skill[] = [
  { text: "React", style: "bold" },
  { text: "WebDesign", style: "dashed" },
  { text: "Prototyping", style: "bold" },
  { text: "Next.js", style: "dashed" },
  { text: "Python", style: "bold" },
  { text: "HTML", style: "dashed" },
  { text: "CSS", style: "bold" },
  { text: "JavaScript", style: "dashed" },
];

const row2: Skill[] = [
  { text: "TypeScript", style: "bold" },
  { text: "Node.js", style: "dashed" },
  { text: "TailwindCSS", style: "bold" },
  { text: "Angular", style: "dashed" },
  { text: "Vue", style: "bold" },
  { text: "Flutter", style: "dashed" },
  { text: "Redux", style: "bold" },
  { text: "Express", style: "dashed" },
];

const row3: Skill[] = [
  { text: "Django", style: "bold" },
  { text: "FastAPI", style: "dashed" },
  { text: "MongoDB", style: "bold" },
  { text: "PostgreSQL", style: "dashed" },
  { text: "MySQL", style: "bold" },
  { text: "Docker", style: "dashed" },
  { text: "AWS", style: "bold" },
  { text: "Kubernetes", style: "dashed" },
];

const row4: Skill[] = [
  { text: "Firebase", style: "bold" },
  { text: "GCP", style: "dashed" },
  { text: "Jenkins", style: "bold" },
  { text: "Java", style: "dashed" },
  { text: "C++", style: "bold" },
  { text: "Solidity", style: "dashed" },
  { text: "Dart", style: "bold" },
  { text: "Sass", style: "dashed" },
];

const row5: Skill[] = [
  { text: "Supabase", style: "bold" },
  { text: "Vercel", style: "dashed" },
  { text: "Figma", style: "bold" },
  { text: "Arduino", style: "dashed" },
  { text: "RaspberryPi", style: "bold" },
  { text: "Pandas", style: "dashed" },
  { text: "NumPy", style: "bold" },
  { text: "PowerBI", style: "dashed" },
];

const allRows = [row1, row2, row3, row4, row5];

function MarqueeRow({
  skills,
  direction,
  speed,
}: {
  skills: Skill[];
  direction: "left" | "right";
  speed: number;
}) {
  const items = [...skills, ...skills];

  return (
    <div className="overflow-hidden w-full group/row">
      <div
        className={`flex gap-8 md:gap-12 w-max group-hover/row:[animation-play-state:paused] ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((skill, i) => (
          <span
            key={i}
            className={`font-heading text-[clamp(1.8rem,5vw,4rem)] shrink-0 cursor-default select-none transition-all duration-300 hover:text-accent ${
              skill.style === "bold"
                ? "font-bold text-neutral-900"
                : "font-semibold skill-dashed"
            }`}
          >
            {skill.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function WhatIDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen flex items-center py-28 md:py-40"
    >
      <div className="w-full">
        <h2
          ref={headingRef}
          className="text-xl md:text-2xl font-heading font-bold text-neutral-900 mb-10 md:mb-16 px-6 md:px-16 lg:px-24"
        >
          what are the technical things I do.
        </h2>

        <div className="flex flex-col gap-3 md:gap-5">
          {allRows.map((row, i) => {
            const speeds = [18, 30, 22, 34, 20];
            return (
              <MarqueeRow
                key={i}
                skills={row}
                direction={i % 2 === 0 ? "left" : "right"}
                speed={speeds[i]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

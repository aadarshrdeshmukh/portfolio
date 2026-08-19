"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const children = textRef.current.querySelectorAll(".about-reveal");
        gsap.from(children, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      if (logoRef.current) {
        gsap.from(logoRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 75%",
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
      id="about"
      className="min-h-screen flex items-center py-28 md:py-40 px-6 md:px-16 lg:px-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center w-full">
        {/* Left — Text */}
        <div ref={textRef}>
          <h2 className="about-reveal text-3xl md:text-4xl font-heading font-semibold text-neutral-900 mb-1.5">
            Aadarsh Deshmukh.
          </h2>
          <p className="about-reveal text-sm md:text-base text-neutral-500 mb-1 font-sans">
            Full stack developer & DevOps
          </p>
          <p className="about-reveal text-sm md:text-base text-neutral-400 mb-10 font-sans">
            India
          </p>

          <p className="about-reveal text-base md:text-lg leading-relaxed text-neutral-600 font-sans mb-5">
            I build web apps from the database layer up to the
            pixels people click on. React, Node, APIs, databases —
            I work across the whole stack and care about getting
            the details right at every layer.
          </p>
          <p className="about-reveal text-base md:text-lg leading-relaxed text-neutral-600 font-sans mb-12">
            I also handle the DevOps side of things so what I build
            actually stays running. If I wrote it, I want to sleep
            at night knowing it won&apos;t wake me up.
          </p>

          <a
            href="#contact"
            className="about-reveal inline-block border border-neutral-900 text-neutral-900 px-7 py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-neutral-900 hover:text-white transition-colors duration-300 font-sans"
          >
            Collaborate
          </a>
        </div>

        {/* Right — Geometric AD monogram */}
        <div ref={logoRef} className="flex items-center justify-center">
          <svg
            viewBox="0 0 300 280"
            fill="none"
            className="w-full max-w-md md:max-w-lg"
          >
            {/* Large "A" shape */}
            <polygon
              points="150,20 260,240 200,240 150,140 100,240 40,240"
              fill="#171717"
            />
            {/* Crossbar of A */}
            <polygon
              points="105,180 195,180 185,200 115,200"
              fill="white"
            />
            {/* "D" shape — right triangle block */}
            <polygon
              points="170,80 280,240 170,240"
              fill="#171717"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

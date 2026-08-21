"use client";

import { useEffect, useState } from "react";

interface SectionItem {
  id: string;
  num: string;
  label: string;
}

const sections: SectionItem[] = [
  { id: "home", num: "01", label: "Home" },
  { id: "work", num: "02", label: "Selected Work" },
  { id: "about", num: "03", label: "About" },
  { id: "skills", num: "04", label: "Skills" },
  { id: "projects", num: "05", label: "Recent Projects" },
  { id: "contact", num: "06", label: "Contact" },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string | HTMLElement, opts?: object) => void } }).__lenis;
    const target = document.getElementById(id);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Section quick navigation"
      className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredSection === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            onMouseEnter={() => setHoveredSection(sec.id)}
            onMouseLeave={() => setHoveredSection(null)}
            className="group relative flex items-center justify-end py-1.5 focus:outline-none cursor-pointer"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Tooltip Label on Hover or Active */}
            <div
              className={`absolute right-6 px-2.5 py-1 rounded-md bg-neutral-900/90 backdrop-blur-md text-white text-[11px] font-sans tracking-wide whitespace-nowrap shadow-lg flex items-center gap-1.5 transition-all duration-200 pointer-events-none ${
                isHovered
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-2 scale-95"
              }`}
            >
              <span className="font-mono text-accent text-[10px]">{sec.num}</span>
              <span>{sec.label}</span>
            </div>

            {/* Pill / Dot indicator */}
            <div className="relative flex items-center justify-center w-4 h-6">
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-1.5 h-6 bg-accent shadow-[0_0_12px_rgba(232,93,58,0.6)]"
                    : "w-1.5 h-1.5 bg-neutral-300 group-hover:bg-neutral-600 group-hover:scale-125"
                }`}
              />
            </div>
          </button>
        );
      })}
    </nav>
  );
}

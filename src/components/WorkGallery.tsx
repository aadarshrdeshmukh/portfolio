"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id: number;
  src: string | null;
  alt: string;
  bg: string;
}

const workItems: WorkItem[] = [
  { id: 1, src: null, alt: "Project 1", bg: "bg-neutral-900" },
  { id: 2, src: null, alt: "Project 2", bg: "bg-rose-400/60" },
  { id: 3, src: null, alt: "Project 3", bg: "bg-neutral-300" },
  { id: 4, src: null, alt: "Project 4", bg: "bg-neutral-700" },
  { id: 5, src: null, alt: "Project 5", bg: "bg-stone-400" },
  { id: 6, src: null, alt: "Project 6", bg: "bg-neutral-200" },
];

// Stacked offsets — each card is slightly shifted so you can see them all
// Creates a fanned-out stack effect in the center
const stackOffsets = [
  { x: -18, y: -14, rotation: -6 },
  { x: 8, y: -22, rotation: 3 },
  { x: 22, y: -6, rotation: 7 },
  { x: -12, y: 10, rotation: -4 },
  { x: 14, y: 18, rotation: 5 },
  { x: -6, y: 24, rotation: -2 },
];

export default function WorkGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cells = cellRefs.current.filter(Boolean);
      if (!gridRef.current || cells.length === 0) return;

      const gridRect = gridRef.current.getBoundingClientRect();
      const gridCenterX = gridRect.width / 2;
      const gridCenterY = gridRect.height / 2;

      // Calculate where each cell needs to go to reach center (its offset from its grid position to center)
      cells.forEach((el, i) => {
        if (!el) return;
        const cellRect = el.getBoundingClientRect();
        const cellCenterX = cellRect.left - gridRect.left + cellRect.width / 2;
        const cellCenterY = cellRect.top - gridRect.top + cellRect.height / 2;

        const toCenter = {
          x: gridCenterX - cellCenterX + stackOffsets[i].x,
          y: gridCenterY - cellCenterY + stackOffsets[i].y,
        };

        gsap.set(el, {
          x: toCenter.x,
          y: toCenter.y,
          rotation: stackOffsets[i].rotation,
          zIndex: i + 1,
        });
      });

      if (pillRef.current) {
        gsap.set(pillRef.current, { scale: 1, opacity: 1 });
      }

      // On scroll — snap to grid positions fast
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      // Small pause to let the user see the stack
      tl.to({}, { duration: 0.3 });

      // All cells snap to their positions simultaneously but staggered slightly
      cells.forEach((el, i) => {
        tl.to(
          el,
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.5,
            ease: "power3.out",
            zIndex: 1,
          },
          0.3 + i * 0.06
        );
      });

      // Pill does a subtle pulse after
      tl.to(
        pillRef.current,
        {
          scale: 1.06,
          duration: 0.15,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1,
        },
        "-=0.1"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative py-20 md:py-32">
      <div className="relative overflow-hidden">
        {/* 3x2 Grid */}
        <div ref={gridRef} className="grid grid-cols-3 grid-rows-2">
          {workItems.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                cellRefs.current[i] = el;
              }}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer will-change-transform"
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="33vw"
                />
              ) : (
                <div
                  className={`w-full h-full ${item.bg} transition-all duration-500 group-hover:scale-110 group-hover:brightness-110`}
                />
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-xs md:text-sm font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {item.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pill label — centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div
            ref={pillRef}
            className="bg-white border border-neutral-200 rounded-full px-6 py-2.5 shadow-md pointer-events-auto"
          >
            <span className="text-sm md:text-base text-neutral-700 font-medium tracking-wide font-heading">
              a glimpse of my works
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id: number;
  src?: string | null;
  images?: string[];
  phoneMockups?: string[];
  alt: string;
  bg: string;
}

const workItems: WorkItem[] = [
  { id: 1, src: "/projects/pathlab.png", alt: "PathLab — Digital Pathology Cloud", bg: "bg-neutral-900" },
  {
    id: 2,
    images: [
      "/projects/pharmacare-landing.png",
      "/projects/pharmacare-dashboard.png",
    ],
    alt: "PharmaCare — Management Platform",
    bg: "bg-[#fbfaf8]",
  },
  {
    id: 3,
    phoneMockups: [
      "/projects/coexist-feed.png",
      "/projects/coexist-radar.png",
    ],
    alt: "Co-Exist — Presence Platform",
    bg: "bg-neutral-950",
  },
  {
    id: 4,
    src: "/projects/pediatric-clinic.png",
    alt: "Pediatric Clinic & Healthcare ERP",
    bg: "bg-[#faf9f6]",
  },
  {
    id: 5,
    src: "/projects/insightx.png",
    alt: "InsightX — Real-Time Streaming Analytics",
    bg: "bg-white",
  },
  {
    id: 6,
    src: "/projects/bitblitz.png",
    alt: "BitBlitz — Real-Time Auction Platform",
    bg: "bg-black",
  },
];

const stackOffsets = [
  { x: -18, y: -14, rotation: -6 },
  { x: 8, y: -22, rotation: 3 },
  { x: 22, y: -6, rotation: 7 },
  { x: -12, y: 10, rotation: -4 },
  { x: 14, y: 18, rotation: 5 },
  { x: -6, y: 24, rotation: -2 },
];

function MultiImageCell({
  item,
  cellRef,
}: {
  item: WorkItem;
  cellRef: (el: HTMLDivElement | null) => void;
}) {
  const [activeTab, setActiveTab] = useState<"side-by-side" | "landing" | "dashboard">("side-by-side");
  const images = item.images || [];

  return (
    <div
      ref={cellRef}
      className="relative aspect-[16/10] overflow-hidden group will-change-transform bg-neutral-950 flex flex-col"
    >
      {/* Top Tab Switcher */}
      <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-auto">
        <span className="text-[11px] text-white/90 font-mono bg-black/75 backdrop-blur-md px-2 py-0.5 rounded">
          PharmaCare
        </span>
        <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-0.5 rounded-full border border-neutral-800 text-[10px] font-sans">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("side-by-side");
            }}
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              activeTab === "side-by-side"
                ? "bg-accent text-white font-medium shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Side by Side
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("landing");
            }}
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              activeTab === "landing"
                ? "bg-accent text-white font-medium shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Landing
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("dashboard");
            }}
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-accent text-white font-medium shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      <div className="relative w-full h-full flex">
        {activeTab === "side-by-side" ? (
          <div className="grid grid-cols-2 divide-x divide-neutral-800 w-full h-full">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={images[0]}
                alt="PharmaCare Landing"
                fill
                unoptimized
                className="object-cover object-top transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <span className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-[9px] text-neutral-300 font-mono px-2 py-0.5 rounded">
                Landing
              </span>
            </div>
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={images[1]}
                alt="PharmaCare Dashboard"
                fill
                unoptimized
                className="object-cover object-top transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <span className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-[9px] text-neutral-300 font-mono px-2 py-0.5 rounded">
                Dashboard
              </span>
            </div>
          </div>
        ) : activeTab === "landing" ? (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={images[0]}
              alt="PharmaCare Landing"
              fill
              unoptimized
              className="object-cover object-top transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={images[1]}
              alt="PharmaCare Dashboard"
              fill
              unoptimized
              className="object-cover object-top transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PhoneMockupCell({
  item,
  cellRef,
}: {
  item: WorkItem;
  cellRef: (el: HTMLDivElement | null) => void;
}) {
  const images = item.phoneMockups || [];

  return (
    <div
      ref={cellRef}
      className="relative aspect-[16/10] overflow-hidden group will-change-transform bg-gradient-to-br from-neutral-950 via-[#0d0d0d] to-[#161616] flex items-center justify-center p-2 md:p-4"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-[#6ee7b7]/15 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

      {/* 3D Angled Dual Phone Showcase */}
      <div className="relative flex items-center justify-center gap-2 sm:gap-4 md:gap-5 w-full h-full transform rotate-[-8deg] group-hover:rotate-[-4deg] group-hover:scale-105 transition-all duration-700 ease-out">
        {/* Left Phone (Feed) */}
        <div className="relative h-[86%] aspect-[9/19] rounded-[18px] md:rounded-[22px] border-[2.5px] border-neutral-700/80 bg-black shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden shrink-0 -translate-y-1.5 transition-transform duration-500 group-hover:-translate-y-2.5">
          {/* Top Speaker / Dynamic Island */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-6 md:w-8 h-1.5 md:h-2 bg-neutral-900 rounded-full z-20" />
          <Image
            src={images[0]}
            alt="Co-Exist Feed"
            fill
            unoptimized
            className="object-cover object-top"
            sizes="(max-width: 768px) 30vw, 15vw"
          />
        </div>

        {/* Right Phone (Radar) */}
        <div className="relative h-[86%] aspect-[9/19] rounded-[18px] md:rounded-[22px] border-[2.5px] border-neutral-700/80 bg-black shadow-[0_20px_44px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden shrink-0 translate-y-1.5 transition-transform duration-500 group-hover:translate-y-2.5">
          {/* Top Speaker / Dynamic Island */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-6 md:w-8 h-1.5 md:h-2 bg-neutral-900 rounded-full z-20" />
          <Image
            src={images[1]}
            alt="Co-Exist Radar"
            fill
            unoptimized
            className="object-cover object-top"
            sizes="(max-width: 768px) 30vw, 15vw"
          />
        </div>
      </div>

      {/* Label Badge */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-3 pointer-events-none z-30">
        <span className="text-white text-xs font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded">
          {item.alt}
        </span>
      </div>
    </div>
  );
}

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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      tl.to({}, { duration: 0.3 });

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
          {workItems.map((item, i) => {
            if (item.images) {
              return (
                <MultiImageCell
                  key={item.id}
                  item={item}
                  cellRef={(el) => {
                    cellRefs.current[i] = el;
                  }}
                />
              );
            }

            if (item.phoneMockups) {
              return (
                <PhoneMockupCell
                  key={item.id}
                  item={item}
                  cellRef={(el) => {
                    cellRefs.current[i] = el;
                  }}
                />
              );
            }

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cellRefs.current[i] = el;
                }}
                className="relative aspect-[16/10] overflow-hidden group cursor-pointer will-change-transform bg-neutral-950 flex items-center justify-center"
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div
                    className={`w-full h-full ${item.bg} transition-all duration-500 group-hover:scale-105 group-hover:brightness-110`}
                  />
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-3 pointer-events-none">
                  <span className="text-white text-xs font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded">
                    {item.alt}
                  </span>
                </div>
              </div>
            );
          })}
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

"use client";

import { useState, useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu02Icon,
  Cancel01Icon,
  GithubIcon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Past the hero section — hide on scroll down, show on scroll up
      if (currentY > heroHeight) {
        setHidden(currentY > lastScrollY.current);
        setScrolled(true);
      } else {
        setHidden(false);
        setScrolled(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-neutral-100"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          {/* Left — Hamburger / Close */}
          <button
            id="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100/50 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  menuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-75"
                }`}
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={20}
                  strokeWidth={1.5}
                  color="currentColor"
                />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  menuOpen
                    ? "opacity-0 rotate-90 scale-75"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              >
                <HugeiconsIcon
                  icon={Menu02Icon}
                  size={20}
                  strokeWidth={1.5}
                  color="currentColor"
                />
              </span>
            </div>
          </button>

          {/* Center — Name */}
          <span className="absolute left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] font-medium text-neutral-900 select-none">
            Aadarsh Deshmukh
          </span>

          {/* Right — Social Icons */}
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/aadarshrdeshmukh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-neutral-100/50 transition-colors text-neutral-700 hover:text-neutral-900"
            >
              <HugeiconsIcon
                icon={GithubIcon}
                size={19}
                strokeWidth={1.5}
                color="currentColor"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/aadarshrdeshmukh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-neutral-100/50 transition-colors text-neutral-700 hover:text-neutral-900"
            >
              <HugeiconsIcon
                icon={Linkedin01Icon}
                size={19}
                strokeWidth={1.5}
                color="currentColor"
              />
            </a>
          </div>
        </div>
      </header>

      {/* Full-screen navigation overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col items-center justify-center ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-5 md:gap-7">
          {[
            { label: "Home", href: "#home" },
            { label: "Work", href: "#work" },
            { label: "About", href: "#about" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" },
            { label: "Contact", href: "#contact" },
          ].map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`group flex items-baseline gap-3 text-3xl md:text-5xl lg:text-6xl font-light text-neutral-900 hover:text-accent transition-all duration-500 font-heading ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: menuOpen ? `${index * 60 + 150}ms` : "0ms",
              }}
            >
              <span className="text-xs md:text-sm text-neutral-400 font-mono group-hover:text-accent transition-colors">
                0{index + 1}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

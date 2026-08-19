"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  Linkedin01Icon,
  Mail01Icon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-neutral-950 text-white py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Top — Big CTA */}
        <div className="mb-16 md:mb-24">
          <p className="text-sm tracking-[0.15em] text-neutral-500 mb-4 font-sans">
            got something in mind?
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-semibold leading-tight">
            Let&apos;s work
            <br />
            <span className="text-accent italic">together.</span>
          </h2>
        </div>

        {/* Middle — Contact & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 md:mb-24 border-t border-neutral-800 pt-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-3">
              Email
            </p>
            <a
              href="mailto:aadarshdeshmukh892@gmail.com"
              className="text-base md:text-lg text-neutral-300 hover:text-accent transition-colors flex items-center gap-2"
            >
              <HugeiconsIcon icon={Mail01Icon} size={18} strokeWidth={1.5} color="currentColor" />
              aadarshdeshmukh892@gmail.com
            </a>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-3">
              Socials
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/aadarshrdeshmukh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-neutral-400 hover:text-accent transition-colors"
              >
                <HugeiconsIcon icon={GithubIcon} size={22} strokeWidth={1.5} color="currentColor" />
              </a>
              <a
                href="https://www.linkedin.com/in/aadarshrdeshmukh/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-neutral-400 hover:text-accent transition-colors"
              >
                <HugeiconsIcon icon={Linkedin01Icon} size={22} strokeWidth={1.5} color="currentColor" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-3">
              Location
            </p>
            <p className="text-base text-neutral-300">India</p>
          </div>
        </div>

        {/* Bottom — Copyright & Back to top */}
        <div className="flex items-center justify-between border-t border-neutral-800 pt-8">
          <p className="text-xs md:text-sm text-neutral-600">
            © {new Date().getFullYear()} Aadarsh Deshmukh. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs md:text-sm text-neutral-500 hover:text-accent transition-colors cursor-pointer group"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center group-hover:border-accent transition-colors">
              <HugeiconsIcon icon={ArrowUp01Icon} size={14} strokeWidth={1.5} color="currentColor" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

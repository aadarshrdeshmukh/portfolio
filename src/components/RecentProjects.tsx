"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    name: "Pharmacy Management Platform",
    description:
      "Cloud-native full-stack platform for pharmacy inventory & prescriptions with automated CI/CD and EKS orchestration.",
    tags: ["React", "Node.js", "PostgreSQL", "Docker", "Kubernetes (EKS)", "AWS", "Jenkins", "Terraform"],
    link: "https://github.com/aadarshrdeshmukh/pharmacy-platform",
  },
  {
    name: "PathLab — Digital Pathology Cloud",
    description:
      "Full-stack digital pathology laboratory portal on AWS with automated S3 backups, RBAC access control, and CloudWatch monitoring.",
    tags: ["Next.js", "Express.js", "MySQL", "AWS (EC2/S3)", "Docker", "CloudWatch", "Nginx"],
    link: "https://github.com/aadarshrdeshmukh/pathlab-digital-pathology-cloud",
  },
  {
    name: "DataVault Analytics",
    description: "High-throughput database monitoring dashboard with real-time operational metrics.",
    tags: ["Next.js", "PostgreSQL", "TailwindCSS", "FastAPI"],
    link: "https://github.com/aadarshrdeshmukh",
  },
  {
    name: "NetWatch Systems",
    description: "Distributed system observability platform with Prometheus and Grafana alerts.",
    tags: ["Python", "FastAPI", "Docker", "Prometheus", "Grafana"],
    link: "https://github.com/aadarshrdeshmukh",
  },
];

export default function RecentProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen flex flex-col justify-center py-28 md:py-40 px-6 md:px-16 lg:px-24"
    >
      <h2 className="text-xl md:text-2xl tracking-[0.1em] text-neutral-900 mb-14 md:mb-20 font-heading font-bold text-right">
        recent projects
      </h2>

      <div className="max-w-4xl w-full">
        {projects.map((project, i) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="group block border-t border-neutral-200 py-8 md:py-10 last:border-b transition-colors hover:bg-neutral-50 -mx-4 px-4 md:-mx-6 md:px-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-4xl font-heading font-semibold text-neutral-900 group-hover:text-accent transition-colors duration-300 mb-2">
                  {project.name}
                </h3>
                <p className="text-sm md:text-base text-neutral-500 font-sans mb-3">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-neutral-400 border border-neutral-200 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={18}
                  strokeWidth={1.5}
                  className="text-neutral-400 group-hover:text-white transition-colors duration-300"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

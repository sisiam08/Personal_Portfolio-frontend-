"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Skill } from "./types";

interface HeroVisualProps {
  name: string;
  designation?: string | null;
  image?: string | null;
  // skills: Skill[];
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function HeroVisual({
  name,
  designation,
  image,
  // skills,
}: HeroVisualProps) {
  const reduced = useReducedMotion();
  // const chips = skills.slice(0, 4);
  const float = (delay: number) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: {
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <svg
        viewBox="0 0 400 400"
        aria-hidden
        className="absolute inset-0 h-full w-full animate-spin-slow text-line-2"
      >
        <circle
          cx="200"
          cy="200"
          r="186"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1 8"
        />
      </svg>

      <div className="absolute inset-[12%] rounded-[2.5rem] bg-accent-soft blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-[10%] overflow-hidden rounded-[2.25rem] border border-line-2 bg-surface shadow-[var(--shadow)]"
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 80vw, 360px"
            className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
            priority
          />
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-2 to-surface">
            <span className="noise absolute inset-0 opacity-40" />
            <span className="relative font-display text-6xl font-bold tracking-tight text-ink">
              {initials(name) || "SS"}
            </span>
            {designation ? (
              <span className="relative mono-label text-accent">{designation}</span>
            ) : null}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent" />
      </motion.div>

      {/* status chip */}
      <motion.div
        {...float(0)}
        className="absolute left-0 top-6 flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1.5 backdrop-blur-md"
      >
        <span className="h-2 w-2 rounded-full bg-accent-3 animate-pulse-dot" />
        <span className="mono-label text-ink">Open to work</span>
      </motion.div>

      {/* stack chips */}
      {/* <motion.div
        {...float(0.8)}
        className="absolute -right-2 top-1/3 flex flex-col items-end gap-2"
      >
        {chips.map((s) => (
          <span
            key={s.name}
            className="flex items-center gap-2 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur-md"
          >
            {s.name}
            {s.icon ? (
              <Image
                src={s.icon}
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
            ) : null}
          </span>
        ))}
      </motion.div>

      {/* spark chip */}
      <motion.div
        {...float(1.6)}
        className="absolute -bottom-2 left-6 flex items-center gap-2 rounded-2xl border border-line bg-surface/90 px-3 py-2 backdrop-blur-md"
      >
        <Sparkles className="h-4 w-4 text-accent-2" />
        <span className="text-xs font-semibold text-ink">Built to scale</span>
      </motion.div>

      <div className="absolute -bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink shadow-[var(--shadow)]">
        <ArrowUpRight className="h-5 w-5" />
      </div>
    </div>
  );
}

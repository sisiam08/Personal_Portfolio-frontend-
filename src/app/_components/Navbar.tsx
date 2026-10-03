"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { ModeToggle } from "@/src/components/shared/ModeToggle";

const LINKS = [
  { label: "Home", href: "#top", id: "top" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Education", href: "#education", id: "education" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar({ resumeUrl }: { resumeUrl?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>

      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-3"
      >
        <div
          className={`flex w-full max-w-[1080px] items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-300 md:px-4 ${
            scrolled
              ? "border-line bg-surface/80 shadow-[var(--shadow)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-2 pl-1"
            aria-label="Shahariar Siam — home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-display text-sm font-bold text-accent-ink">
              S
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-ink sm:block">
              Siam
              <span className="text-accent">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative rounded-full px-3 py-2 text-[0.8rem] font-medium transition-colors ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.8rem] font-semibold text-canvas transition-transform hover:-translate-y-0.5 sm:inline-flex"
              >
                <Download className="h-3.5 w-3.5" />
                Resume
              </a>
            ) : null}
            <ModeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-canvas/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-1 px-8 pt-16">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className={`group flex items-center justify-between border-b border-line py-4 font-display text-2xl font-medium ${
                    active === link.id ? "text-accent" : "text-ink"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight className="h-5 w-5 text-faint transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
              ))}
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

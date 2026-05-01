"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "GitHub", href: "#", icon: "github" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Twitter", href: "#", icon: "twitter" },
    { label: "Email", href: "mailto:contact@example.com", icon: "email" },
  ];

  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
  ];

  return (
    <footer className="relative mt-20 pb-10 px-gutter overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-container-max mx-auto">
        <div className="glass-panel rounded-[2rem] p-8 md:p-12 border-white/5 relative z-10 overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="text-2xl font-bold tracking-tighter text-white">
                DevPortfolio<span className="text-primary">.</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs architectural-tracking opacity-80">
                Crafting digital experiences with precision, performance, and
                premium aesthetics. Focused on full-stack excellence.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-white font-bold architectural-tracking text-sm uppercase">
                Navigation
              </h4>
              <ul className="grid grid-cols-2 gap-4">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-sm architectural-tracking"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Section */}
            <div className="space-y-6">
              <h4 className="text-white font-bold architectural-tracking text-sm uppercase">
                Connect
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, translateY: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-white hover:border-white/20 transition-all duration-300 group"
                    title={social.label}
                  >
                    <span className="text-xs font-medium opacity-0 group-hover:opacity-100 absolute -top-8 bg-surface-container px-2 py-1 rounded-md transition-all duration-300 pointer-events-none whitespace-nowrap">
                      {social.label}
                    </span>
                    {/* Placeholder for actual icons - using labels for now as requested */}
                    <span className="text-[10px] font-bold uppercase tracking-tighter">
                      {social.label.substring(0, 2)}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-on-surface-variant text-xs architectural-tracking opacity-60">
              © {currentYear} Md. Shahariar Islam Siam. All rights reserved.
            </div>
            <div className="text-on-surface-variant text-xs architectural-tracking opacity-60 flex items-center gap-2">
              Built with <span className="text-primary">Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

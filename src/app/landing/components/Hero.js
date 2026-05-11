"use client";

import { motion } from "framer-motion";
import { FadingVideo } from "./FadingVideo";
import { BlurText } from "./BlurText";
import { ArrowUpRight, Play as PlayIcon, Clock as ClockIcon, Globe as GlobeIcon } from "lucide-react";

const fadeUp = (delay) => ({
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut", delay },
});

const NAV_LINKS = ["Home", "Providers", "Pricing", "Docs", "Dashboard"];

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: "120%", height: "120%" }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <nav className="fixed top-4 left-0 right-0 px-8 lg:px-16 z-50 flex items-center justify-between">
          <div className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center">
            <span className="font-heading italic text-white text-2xl leading-none">9R</span>
          </div>
          <div className="hidden md:flex liquid-glass rounded-full px-1.5 py-1.5 items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a key={l} href="#" className="px-3 py-2 text-sm font-medium text-white/90 font-body rounded-full">
                {l}
              </a>
            ))}
            <a
              href="/dashboard"
              className="ml-1 inline-flex items-center gap-1.5 bg-white text-black rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
            >
              Dashboard <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="w-12 h-12" aria-hidden />
        </nav>

        {/* Hero content */}
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center">
          <motion.div {...fadeUp(0.4)} className="liquid-glass rounded-full inline-flex items-center gap-2 pl-1 pr-3 py-1">
            <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold">New</span>
            <span className="text-sm text-white/90 font-body">50+ Providers, One Unified API</span>
          </motion.div>

          <h1 className="mt-6">
            <BlurText
              text="One Endpoint. All AI Providers."
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center"
            />
          </h1>
          <style>{`h1 .font-heading, h1 p { letter-spacing: -4px; }`}</style>

          <motion.p
            {...fadeUp(0.8)}
            className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight"
          >
            Route requests across OpenAI, Anthropic, Google, and 30+ providers — with one key, one API, and zero vendor lock-in.
          </motion.p>

          <motion.div {...fadeUp(1.1)} className="flex items-center gap-6 mt-6">
            <a
              href="/dashboard"
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white inline-flex items-center gap-2"
            >
              Get Started Free <ArrowUpRight className="h-5 w-5" />
            </a>
            <a href="https://github.com/decolua/9router#readme" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white inline-flex items-center gap-2 font-body">
              View Docs <PlayIcon className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div {...fadeUp(1.3)} className="flex items-stretch gap-4 mt-8">
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col items-start text-left">
              <ClockIcon className="h-7 w-7 text-white" />
              <div className="mt-6 font-heading italic text-white text-4xl leading-none" style={{ letterSpacing: "-1px" }}>
                50+
              </div>
              <div className="text-xs text-white font-body font-light mt-2">AI Providers Supported</div>
            </div>
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col items-start text-left">
              <GlobeIcon className="h-7 w-7 text-white" />
              <div className="mt-6 font-heading italic text-white text-4xl leading-none" style={{ letterSpacing: "-1px" }}>
                10B+
              </div>
              <div className="text-xs text-white font-body font-light mt-2">Requests Routed Monthly</div>
            </div>
          </motion.div>
        </div>

        {/* Partners */}
        <motion.div {...fadeUp(1.4)} className="flex flex-col items-center gap-4 pb-8 px-4">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white">
            Trusted by developers at leading AI teams globally
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {["9Router", "Vercel", "Replit", "Railway", "Render"].map((name) => (
              <span key={name} className="font-heading italic text-white text-2xl md:text-3xl tracking-tight">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

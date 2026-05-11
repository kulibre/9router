"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  MessageCircle,
  Terminal,
  Code,
  Box,
  Layers,
  Zap,
} from "lucide-react";

const TOOLS = [
  { Icon: Code, label: "GitHub" },
  { Icon: MessageCircle, label: "Discord" },
  { Icon: MessageCircle, label: "Slack" },
  { Icon: Terminal, label: "CLI" },
  { Icon: Code, label: "SDK" },
  { Icon: Box, label: "Docker" },
  { Icon: Layers, label: "REST" },
  { Icon: Zap, label: "Webhooks" },
];

const TOOLS2 = [
  { Icon: Box, label: "Docker" },
  { Icon: Layers, label: "REST" },
  { Icon: Code, label: "GitHub" },
  { Icon: MessageCircle, label: "Discord" },
  { Icon: MessageCircle, label: "Slack" },
  { Icon: Terminal, label: "CLI" },
  { Icon: Code, label: "SDK" },
  { Icon: Zap, label: "Webhooks" },
];

function SectionLabel({ children, justify = "center" }) {
  return (
    <div className={`flex items-center gap-2 ${justify === "center" ? "justify-center" : "justify-start"}`}>
      <Sparkles className="h-3 w-3 text-white/70" strokeWidth={1.5} />
      <span className="uppercase tracking-[0.22em] text-[11px] text-white/70">{children}</span>
      <Sparkles className="h-3 w-3 text-white/70" strokeWidth={1.5} />
    </div>
  );
}

function ToolTile({ Icon, label }) {
  return (
    <div className="liquid-glass h-14 w-14 md:h-16 md:w-16 rounded-xl flex flex-col items-center justify-center shrink-0 gap-1">
      <Icon className="h-5 w-5 text-white/90" strokeWidth={1.5} />
      <span className="text-[9px] text-white/60 font-body">{label}</span>
    </div>
  );
}

export function Features() {
  return (
    <section className="relative w-full bg-[#0a0a0a] text-white antialiased px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 lg:min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6 md:mb-8">
        <div className="max-w-3xl">
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] font-normal tracking-tight" style={{ lineHeight: 1.15 }}>
            Built for developers who demand reliability
          </h2>
          <p className="mt-3 text-sm md:text-[15px] text-white/60 max-w-3xl" style={{ lineHeight: 1.6 }}>
            Open-source AI routing infrastructure trusted by teams worldwide. With a commitment to reliability and performance, 9Router helps you ship faster without worrying about provider outages.
          </p>
        </div>
        <a
          href="https://github.com/decolua/9router"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 inline-flex items-center"
        >
          Star on GitHub <ArrowUpRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {/* Column 1 - Stats Background */}
        <div className="relative rounded-2xl bg-black overflow-hidden min-h-[420px] flex flex-col p-5 md:p-6">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4"
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex flex-col h-full">
            <SectionLabel>STATS</SectionLabel>
            <div className="mt-auto grid grid-cols-[auto_auto_1fr_auto] gap-x-3 gap-y-3 items-center text-[13px] text-white/85">
              {[
                ["Now", "Open Source", "MIT License"],
                ["2024", "Production Ready", "v0.4+"],
                ["10B+", "Requests Routed", "Monthly"],
              ].map(([value, label, sub]) => (
                <div key={value} className="contents">
                  <span className="text-white/70">{value}</span>
                  <Sparkles className="h-3 w-3 text-white/60" strokeWidth={1.5} />
                  <span>{label}</span>
                  <span className="text-white/70 text-right">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="grid grid-rows-[auto_1fr] gap-4 md:gap-5 min-h-[420px]">
          {/* Developer Quote */}
          <div className="relative rounded-2xl bg-[#324444] p-5 md:p-6 noise-overlay overflow-hidden">
            <div className="relative z-10">
              <SectionLabel justify="start">DEVELOPER VOICE</SectionLabel>
              <p className="mt-4 text-[13px] sm:text-[13.5px] text-white/85" style={{ lineHeight: 1.6 }}>
                "9Router eliminated our provider switching headaches. We went from managing 5 different API keys to one unified endpoint — and the failover alone has saved us from outages twice."
              </p>
              <p className="mt-4 text-[13px] text-white/85">
                <strong className="font-semibold">Sarah Chen</strong>, Senior Engineer — AI Startup
              </p>
            </div>
          </div>
          {/* 10B+ */}
          <div className="relative rounded-2xl bg-black overflow-hidden min-h-[200px] flex flex-col p-5 md:p-6">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4"
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-tight drop-shadow">
                10B+
              </div>
            </div>
            <div className="relative z-10 text-center text-white/85 text-sm">Requests routed to date</div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="grid grid-rows-[auto_1fr] gap-4 md:gap-5 min-h-[420px]">
          {/* Integrations */}
          <div className="relative rounded-2xl bg-black overflow-hidden p-5 md:p-6 flex flex-col gap-4 min-h-[260px]">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4"
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10">
              <SectionLabel>TOOLS &amp; INTEGRATIONS</SectionLabel>
            </div>
            <div className="relative z-10 mt-auto flex flex-col gap-3">
              <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div className="flex gap-3 w-max animate-marquee-left">
                  {[...TOOLS, ...TOOLS].map((t, i) => <ToolTile key={`a-${i}`} {...t} />)}
                </div>
              </div>
              <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div className="flex gap-3 w-max animate-marquee-right">
                  {[...TOOLS2, ...TOOLS2].map((t, i) => <ToolTile key={`b-${i}`} {...t} />)}
                </div>
              </div>
            </div>
          </div>
          {/* Community */}
          <div className="relative rounded-2xl bg-[#324444] p-5 md:p-6 noise-overlay overflow-hidden">
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <SectionLabel justify="start">COMMUNITY</SectionLabel>
                <div className="mt-4 space-y-1.5 text-[14px] text-white/90">
                  <div>github.com/decolua/9router</div>
                  <div>discord.gg/9router</div>
                </div>
              </div>
              <a href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer" className="liquid-glass h-9 w-9 rounded-full flex items-center justify-center shrink-0">
                <ArrowUpRight className="h-4 w-4 text-white" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

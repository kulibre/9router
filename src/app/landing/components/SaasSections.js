"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowUpRight,
  Search,
  Bell,
  LayoutGrid,
  FolderKanban,
  BarChart3,
  Key,
  Workflow,
  Users,
  MessageSquare,
  Lock,
  Plug,
  Zap,
  Plus,
  Minus,
  Check,
  TrendingUp,
  Star,
  ShieldCheck,
} from "lucide-react";
import { FadingVideo } from "./FadingVideo";

const fadeIn = {
  initial: { opacity: 0, filter: "blur(10px)", y: 20 },
  whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const DASH_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4";
const SPACE_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

function DashboardShowcase() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden py-28">
      <FadingVideo src={DASH_VIDEO} className="absolute inset-0 w-full h-full object-cover z-0 transform-gpu" />
      <div className="absolute inset-0 z-[1]" style={{ background: "rgba(0,0,0,0.55)" }} />

      <div className="relative z-10 px-6 md:px-14 lg:px-20 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeIn}>
          <div className="text-sm font-body text-white/70 mb-6">// Platform</div>
          <h2
            className="font-heading italic text-white text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.88] max-w-3xl"
            style={{ letterSpacing: "-3px" }}
          >
            The routing layer for your AI stack
          </h2>
          <p className="text-white/75 font-body text-base leading-relaxed max-w-xl mt-6">
            Route requests across 50+ providers, set cost limits, and monitor usage from a single dashboard.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a href="/dashboard" className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white inline-flex items-center gap-2 transform-gpu hover:-translate-y-0.5 transition-transform">
              Launch Dashboard <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/decolua/9router#readme" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full px-5 py-2.5 text-sm font-medium text-white/90 inline-flex items-center gap-2">
              Read Docs
            </a>
          </div>
        </motion.div>

        <motion.div
          {...fadeIn}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div
            className="liquid-glass rounded-[2rem] overflow-hidden transform-gpu"
            style={{ boxShadow: "0 20px 120px rgba(0,0,0,0.6)" }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white/30" />
                <span className="w-3 h-3 rounded-full bg-white/20" />
                <span className="w-3 h-3 rounded-full bg-white/15" />
              </div>
              <div className="flex-1 mx-4 liquid-glass rounded-full px-3 py-1.5 flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-white/60" />
                <span className="text-xs text-white/50 font-body">Search providers, models, keys…</span>
              </div>
              <Bell className="h-4 w-4 text-white/60" />
              <div className="w-7 h-7 rounded-full liquid-glass-strong" />
            </div>

            <div className="grid grid-cols-[160px_1fr] min-h-[420px]">
              <div className="border-r border-white/[0.08] p-3 space-y-1">
                {[
                  { i: LayoutGrid, l: "Overview", a: true },
                  { i: FolderKanban, l: "Providers" },
                  { i: BarChart3, l: "Usage" },
                  { i: Key, l: "API Keys" },
                  { i: Workflow, l: "Routing" },
                  { i: Users, l: "Team" },
                ].map(({ i: Ico, l, a }) => (
                  <div
                    key={l}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-body ${
                      a ? "liquid-glass text-white" : "text-white/60"
                    }`}
                  >
                    <Ico className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {l}
                  </div>
                ))}
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading italic text-white text-2xl" style={{ letterSpacing: "-1px" }}>
                    Overview
                  </h3>
                  <span className="liquid-glass rounded-full px-2.5 py-1 text-[10px] text-white/80">Live</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { l: "Providers", v: "50+" },
                    { l: "Uptime", v: "99.9%" },
                    { l: "Keys", v: "128" },
                  ].map((s) => (
                    <div key={s.l} className="liquid-glass rounded-xl p-3">
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">{s.l}</div>
                      <div className="font-heading italic text-white text-2xl mt-1" style={{ letterSpacing: "-1px" }}>
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="liquid-glass rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-white/70 font-body">Routing volume</span>
                    <span className="text-[10px] text-white/50">+24.6%</span>
                  </div>
                  <svg viewBox="0 0 200 60" className="w-full h-16">
                    <path
                      d="M0,45 L20,38 L40,42 L60,30 L80,32 L100,22 L120,26 L140,15 L160,18 L180,8 L200,12"
                      fill="none"
                      stroke="rgba(255,255,255,0.85)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0,45 L20,38 L40,42 L60,30 L80,32 L100,22 L120,26 L140,15 L160,18 L180,8 L200,12 L200,60 L0,60Z"
                      fill="rgba(255,255,255,0.06)"
                    />
                  </svg>
                </div>

                <div className="liquid-glass rounded-xl p-3 space-y-2">
                  {[
                    "Anthropic fallback triggered successfully",
                    "OpenAI spend alert updated",
                    "Google model latency dropped 18%",
                  ].map((t, i) => (
                    <div key={t} className="flex items-center gap-2 text-[11px] text-white/75 font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                      {t}
                      <span className="ml-auto text-white/40 text-[10px]">{i + 2}m</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BentoFeatures() {
  return (
    <section className="py-28 px-6 md:px-14 bg-black">
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-14">
        <div className="text-sm font-body text-white/70 mb-4">// Features</div>
        <h2
          className="font-heading italic text-white text-5xl md:text-6xl lg:text-[5rem] leading-[0.9]"
          style={{ letterSpacing: "-2px" }}
        >
          Everything needed to run AI providers at scale
        </h2>
        <p className="mt-5 text-white/70 font-body">
          Built for AI apps, internal tools, agent platforms, and teams that need resilient routing.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-5 max-w-7xl mx-auto">
        <motion.div
          {...fadeIn}
          whileHover={{ y: -6 }}
          className="liquid-glass rounded-[1.75rem] overflow-hidden p-6 md:col-span-2 row-span-2 relative transform-gpu"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-white" strokeWidth={1.5} />
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">Auto-Failover</span>
          </div>
          <h3 className="font-heading italic text-white text-4xl mt-3" style={{ letterSpacing: "-1px" }}>
            Requests recover automatically
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {["Health Checks", "Retry Rules", "Provider Pools", "Fallback Models"].map((t) => (
              <span key={t} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/85">
                {t}
              </span>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-44">
            <svg viewBox="0 0 400 160" className="w-full h-full">
              <path d="M30 130 C 100 30, 200 150, 370 40" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" strokeDasharray="3 5" />
              <path d="M30 80 C 140 100, 220 20, 370 110" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
            </svg>
            {[
              { x: "8%", y: "70%", d: 0 },
              { x: "38%", y: "30%", d: 0.6 },
              { x: "65%", y: "55%", d: 1.2 },
              { x: "90%", y: "35%", d: 1.8 },
            ].map((p, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: p.d }}
                className="absolute w-2 h-2 rounded-full bg-white"
                style={{ left: p.x, top: p.y, boxShadow: "0 0 12px rgba(255,255,255,0.8)" }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeIn} whileHover={{ y: -6 }} className="liquid-glass rounded-[1.75rem] p-6 md:col-span-2 transform-gpu">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-white" strokeWidth={1.5} />
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">Provider Monitoring</span>
          </div>
          <h3 className="font-heading italic text-white text-3xl mt-2" style={{ letterSpacing: "-1px" }}>
            See every provider live
          </h3>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex -space-x-2">
              {["O", "A", "G", "M"].map((c, i) => (
                <div
                  key={c}
                  className="w-8 h-8 rounded-full liquid-glass-strong flex items-center justify-center text-[11px] text-white font-body"
                  style={{ zIndex: 10 - i }}
                >
                  {c}
                </div>
              ))}
            </div>
            <span className="text-[11px] text-white/60 font-body flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3" strokeWidth={1.5} /> 4 providers healthy
            </span>
          </div>
        </motion.div>

        <motion.div {...fadeIn} whileHover={{ y: -6 }} className="liquid-glass rounded-[1.75rem] p-6 transform-gpu overflow-hidden">
          <Key className="h-4 w-4 text-white" strokeWidth={1.5} />
          <h3 className="font-heading italic text-white text-2xl mt-2" style={{ letterSpacing: "-1px" }}>
            Key Management
          </h3>
          <div className="grid grid-cols-3 gap-1.5 mt-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-md liquid-glass" />
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeIn} whileHover={{ y: -6 }} className="liquid-glass rounded-[1.75rem] p-6 transform-gpu">
          <TrendingUp className="h-4 w-4 text-white" strokeWidth={1.5} />
          <h3 className="font-heading italic text-white text-2xl mt-2" style={{ letterSpacing: "-1px" }}>
            Cost Analytics
          </h3>
          <div className="font-heading italic text-white text-3xl mt-3" style={{ letterSpacing: "-1px" }}>
            -38%
          </div>
          <svg viewBox="0 0 100 30" className="w-full h-10 mt-1">
            <path d="M0,25 L20,18 L40,22 L60,10 L80,12 L100,4" fill="none" stroke="white" strokeWidth="1" />
          </svg>
        </motion.div>

        <motion.div {...fadeIn} whileHover={{ y: -6 }} className="liquid-glass rounded-[1.75rem] p-6 md:col-span-2 transform-gpu">
          <Plug className="h-4 w-4 text-white" strokeWidth={1.5} />
          <h3 className="font-heading italic text-white text-3xl mt-2" style={{ letterSpacing: "-1px" }}>
            API Integrations
          </h3>
          <div className="flex flex-wrap gap-2 mt-4">
            {["OpenAI", "Anthropic", "Google", "Azure", "Zapier"].map((n) => (
              <span key={n} className="liquid-glass rounded-full px-3.5 py-1.5 text-xs text-white/90 font-body">
                {n}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeIn} whileHover={{ y: -6 }} className="liquid-glass rounded-[1.75rem] p-6 md:col-span-2 transform-gpu relative overflow-hidden">
          <Lock className="h-4 w-4 text-white" strokeWidth={1.5} />
          <h3 className="font-heading italic text-white text-3xl mt-2" style={{ letterSpacing: "-1px" }}>
            Enterprise-grade Security
          </h3>
          <p className="text-xs text-white/60 mt-2 max-w-sm">
            Encrypted API keys, team access controls, audit visibility, and deployment-ready infrastructure.
          </p>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="absolute right-6 top-6 w-14 h-14 rounded-full border border-white/30 flex items-center justify-center"
          >
            <Lock className="h-5 w-5 text-white" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", t: "Configure Keys", d: "Add provider credentials once and manage them securely from one dashboard." },
  { n: "02", t: "Select Providers", d: "Build routing pools across OpenAI, Anthropic, Google, Azure, and custom endpoints." },
  { n: "03", t: "Route Requests", d: "Send every request through one compatible endpoint for chat, streaming, and tool calls." },
  { n: "04", t: "Monitor & Optimize", d: "Track latency, errors, spend, and provider health in real time." },
  { n: "05", t: "Scale", d: "Add teams, quotas, fallback rules, and enterprise controls as usage grows." },
];

function WorkflowSection() {
  return (
    <section className="min-h-screen bg-black flex items-center py-28 px-6 md:px-14">
      <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto w-full">
        <div className="lg:sticky lg:top-32 self-start">
          <motion.div {...fadeIn}>
            <div className="text-sm font-body text-white/70 mb-6">// Workflow</div>
            <h2
              className="font-heading italic text-white text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.88]"
              style={{ letterSpacing: "-3px" }}
            >
              From provider chaos to one reliable endpoint
            </h2>
          </motion.div>
        </div>
        <div className="relative">
          <div className="absolute left-[34px] top-4 bottom-4 w-px bg-white/10" />
          <div className="space-y-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.05 }}
                className="flex gap-6 items-start"
              >
                <div className="liquid-glass-strong rounded-2xl w-[70px] h-[70px] flex items-center justify-center shrink-0">
                  <span className="font-heading italic text-white text-2xl" style={{ letterSpacing: "-1px" }}>
                    {s.n}
                  </span>
                </div>
                <div className="liquid-glass rounded-[1.5rem] p-5 flex-1">
                  <h3 className="font-heading italic text-white text-3xl" style={{ letterSpacing: "-1px" }}>
                    {s.t}
                  </h3>
                  <p className="text-sm text-white/70 font-body mt-2 leading-relaxed">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const LOGOS = ["OpenAI", "Anthropic", "Google", "Azure", "AWS", "Vercel", "Railway", "Replit", "GitHub", "Discord", "Slack", "Zapier"];
function IntegrationsMarquee() {
  const row = (cls) => (
    <div className="overflow-hidden">
      <div className={`flex gap-4 whitespace-nowrap ${cls}`} style={{ width: "200%" }}>
        {[...LOGOS, ...LOGOS].map((n, i) => (
          <div key={i} className="liquid-glass rounded-full px-6 py-3 flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-white/70" />
            <span className="font-heading italic text-white text-2xl" style={{ letterSpacing: "-1px" }}>
              {n}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <section className="py-24 overflow-hidden bg-black relative">
      <motion.h2
        {...fadeIn}
        className="text-center font-heading italic text-white text-4xl md:text-5xl lg:text-[4.5rem] leading-[0.9] max-w-3xl mx-auto px-6"
        style={{ letterSpacing: "-2px" }}
      >
        Connect your entire AI stack
      </motion.h2>
      <div className="mt-14 space-y-4">
        {row("animate-marquee-left")}
        {row("animate-marquee-right")}
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    q: "We stopped rewriting provider adapters and moved every model call behind one endpoint. It made our agent platform much easier to operate.",
    n: "Mira Halvorsen",
    r: "Head of Engineering, Northwind AI",
  },
  {
    q: "The fallback routing paid for itself the first week. When a provider had issues, traffic kept flowing without an incident.",
    n: "Lukas Reyes",
    r: "Platform Lead, Atlas Labs",
  },
  {
    q: "9Router gave us cost controls, usage visibility, and provider flexibility without slowing product teams down.",
    n: "Anya Kowalski",
    r: "Founder, Pale Blue Systems",
  },
];
function Testimonials() {
  return (
    <section className="py-32 bg-black px-6 md:px-14">
      <motion.h2
        {...fadeIn}
        className="text-center font-heading italic text-white text-5xl md:text-6xl lg:text-[5rem] leading-[0.9] max-w-3xl mx-auto"
        style={{ letterSpacing: "-2px" }}
      >
        Trusted by teams building with AI
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-7xl mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.n}
            {...fadeIn}
            transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
            animate={{ y: [0, -6, 0] }}
            className="liquid-glass rounded-[2rem] p-7 transform-gpu"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 text-white" fill="white" strokeWidth={1.5} />
              ))}
            </div>
            <p className="text-white/90 font-body text-base leading-relaxed mt-5">"{t.q}"</p>
            <div className="flex items-center gap-3 mt-7">
              <div className="w-11 h-11 rounded-full liquid-glass-strong" />
              <div>
                <div className="text-white font-body text-sm">{t.n}</div>
                <div className="text-white/55 font-body text-xs">{t.r}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    blurb: "For developers testing unified routing locally.",
    features: ["Local dashboard", "Core provider routing", "Basic usage visibility", "Community support"],
  },
  {
    name: "Pro",
    price: "$29",
    blurb: "For small teams routing production AI traffic.",
    features: ["Unlimited providers", "Fallback routing", "Cost alerts", "Team dashboard", "Priority support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For organizations operating AI at scale.",
    features: ["SSO & audit logs", "Dedicated infrastructure", "Custom provider nodes", "24/7 success manager"],
  },
];
function Pricing() {
  return (
    <section className="min-h-screen bg-black flex flex-col justify-center py-28 px-6 md:px-14">
      <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
        <div className="text-sm font-body text-white/70 mb-4">// Pricing</div>
        <h2
          className="font-heading italic text-white text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.9]"
          style={{ letterSpacing: "-2px" }}
        >
          Simple pricing for AI teams
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto w-full">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.name}
            {...fadeIn}
            transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className={`${p.featured ? "liquid-glass-strong scale-[1.04] z-10" : "liquid-glass"} rounded-[2rem] p-8 flex flex-col transform-gpu`}
          >
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">{p.name}</div>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-heading italic text-white text-6xl" style={{ letterSpacing: "-2px" }}>
                {p.price}
              </span>
              {p.price.startsWith("$") && <span className="text-white/55 text-sm font-body">/mo</span>}
            </div>
            <p className="text-sm text-white/65 font-body mt-3">{p.blurb}</p>
            <ul className="space-y-2.5 mt-6 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/85 font-body">
                  <Check className="h-4 w-4 text-white" strokeWidth={2} /> {f}
                </li>
              ))}
            </ul>
            <a
              href={p.name === "Enterprise" ? "mailto:sales@9router.ai" : "/dashboard"}
              className={`${p.featured ? "bg-white text-black" : "liquid-glass text-white"} mt-8 rounded-full px-5 py-3 text-sm font-medium inline-flex items-center justify-center gap-2 transform-gpu hover:-translate-y-0.5 transition-transform`}
            >
              {p.name === "Enterprise" ? "Contact Sales" : "Get Started"} <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Can I use my existing OpenAI-compatible SDK?", a: "Yes. 9Router is designed around compatible endpoints so teams can swap providers without rewriting every integration." },
  { q: "How are provider keys managed?", a: "Keys are configured once in the dashboard and used through one 9Router endpoint, so applications do not need to hold every provider credential." },
  { q: "Does 9Router support fallback routing?", a: "Yes. You can build provider pools and route around outages, latency spikes, or unavailable models." },
  { q: "Can I track cost by provider?", a: "Usage views show request volume, provider distribution, and cost signals so you can understand where spend is going." },
  { q: "Is this open source?", a: "Yes. 9Router is built as open-source infrastructure for teams that want control over their AI routing layer." },
  { q: "Can it run self-hosted?", a: "Yes. The app is designed to run as part of your own infrastructure, with dashboard and API routes included." },
];
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-24 bg-black px-6 md:px-14">
      <motion.h2
        {...fadeIn}
        className="text-center font-heading italic text-white text-5xl md:text-6xl lg:text-[5rem] leading-[0.9] max-w-3xl mx-auto"
        style={{ letterSpacing: "-2px" }}
      >
        Questions, answered clearly
      </motion.h2>
      <div className="max-w-3xl mx-auto mt-14 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={f.q}
              {...fadeIn}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.04 }}
              className="liquid-glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-white font-body text-base">{f.q}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-white/80">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ overflow: "hidden" }}
              >
                <p className="px-6 pb-5 text-sm text-white/70 font-body leading-relaxed">{f.a}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="min-h-[80vh] relative flex items-center justify-center text-center overflow-hidden bg-black">
      <FadingVideo src={SPACE_VIDEO} className="absolute inset-0 w-full h-full object-cover z-0 transform-gpu" />
      <div className="absolute inset-0 z-[1]" style={{ background: "rgba(0,0,0,0.55)" }} />
      {[
        { x: "10%", y: "20%", s: 280, d: 0 },
        { x: "78%", y: "60%", s: 220, d: 1.5 },
        { x: "55%", y: "15%", s: 180, d: 0.7 },
      ].map((o, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, delay: o.d, ease: "easeInOut" }}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: o.x,
            top: o.y,
            width: o.s,
            height: o.s,
            background: "rgba(255,255,255,0.18)",
            filter: "blur(70px)",
          }}
        />
      ))}
      <motion.div {...fadeIn} className="relative z-10 px-6 max-w-4xl">
        <h2
          className="font-heading italic text-white text-6xl md:text-7xl lg:text-[7rem] leading-[0.85]"
          style={{ letterSpacing: "-3px" }}
        >
          Route smarter.
          <br />
          Scale faster.
        </h2>
        <p className="text-white/75 font-body text-base md:text-lg mt-6 max-w-xl mx-auto">
          The next era of AI infrastructure starts with one reliable endpoint.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a href="/dashboard" className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white inline-flex items-center gap-2 transform-gpu hover:-translate-y-0.5 transition-transform">
            Start Free Today <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="https://github.com/decolua/9router#readme" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full px-6 py-3 text-sm font-medium text-white/90 inline-flex items-center gap-2">
            Read Docs
          </a>
        </div>
      </motion.div>
    </section>
  );
}

const FOOTER = {
  Product: ["Platform", "Providers", "Pricing", "Changelog", "Roadmap"],
  Resources: ["Docs", "API", "Guides", "Templates", "Community"],
  Company: ["About", "GitHub", "Customers", "Contact", "Security"],
  Social: ["GitHub", "Discord", "LinkedIn", "YouTube", "X"],
};
function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-6 md:px-14 pt-16 pb-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center">
            <span className="font-heading italic text-white text-2xl leading-none">9R</span>
          </div>
          <p className="text-xs text-white/55 font-body mt-4 leading-relaxed max-w-[200px]">
            The unified routing layer for modern AI infrastructure.
          </p>
        </div>
        {Object.entries(FOOTER).map(([title, items]) => (
          <div key={title}>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/55 mb-4">{title}</div>
            <ul className="space-y-2.5">
              {items.map((it) => (
                <li key={it}>
                  <a className="text-sm text-white/85 font-body hover:text-white transition-colors">{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-white/55 font-body">© 2026 9Router. All rights reserved.</div>
        <div className="flex items-center gap-2 text-xs text-white/65 font-body">
          <span className="relative flex h-2 w-2">
            <motion.span
              animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inline-flex h-full w-full rounded-full bg-white/70"
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          All systems operational
        </div>
        <div className="flex items-center gap-5 text-xs text-white/55 font-body">
          <a>Privacy</a>
          <a>Terms</a>
        </div>
      </div>
    </footer>
  );
}

export function SaasSections() {
  return (
    <>
      <DashboardShowcase />
      <BentoFeatures />
      <WorkflowSection />
      <IntegrationsMarquee />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}

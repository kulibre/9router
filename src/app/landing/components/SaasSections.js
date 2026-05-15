"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Check,
  Star,
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
    </section>
  );
}

function BentoFeatures() {
  return <section className="py-28 px-6 md:px-14 bg-black" />;
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

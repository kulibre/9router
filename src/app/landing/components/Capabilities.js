"use client";

import { FadingVideo } from "./FadingVideo";
import { Globe, Zap, DollarSign } from "lucide-react";

const CARDS = [
  {
    icon: Globe,
    tags: ["30+ Providers", "Auto-Failover", "Latency Routing", "Smart Balancer"],
    title: "Smart Routing",
    body: "Automatically route requests to the best provider based on latency, cost, and availability — with zero configuration.",
  },
  {
    icon: Zap,
    tags: ["Single Endpoint", "One API Key", "SDK Support", "REST & SSE"],
    title: "Unified API",
    body: "Call OpenAI, Anthropic, Google, and more through a single, consistent interface. Swap providers without touching your code.",
  },
  {
    icon: DollarSign,
    tags: ["Spend Limits", "Cost Analytics", "Budget Alerts", "ROI Tracking"],
    title: "Cost Optimization",
    body: "Set per-provider spend limits, get real-time cost analytics, and receive alerts before budgets are exceeded.",
  },
];

export function Capabilities() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen">
        <div className="mb-auto">
          <div className="text-sm font-body text-white/80 mb-6">// Capabilities</div>
          <h2
            className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9]"
            style={{ letterSpacing: "-3px" }}
          >
            Routing
            <br />
            elevated
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {CARDS.map(({ icon: Icon, tags, title, body }) => (
            <div key={title} className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div className="liquid-glass w-11 h-11 rounded-[0.75rem] flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1" />
              <div className="mt-6">
                <h3
                  className="font-heading italic text-white text-3xl md:text-4xl leading-none"
                  style={{ letterSpacing: "-1px" }}
                >
                  {title}
                </h3>
                <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    icon: "link",
    title: "Unified Endpoint",
    desc: "Access all providers via a single standard API URL.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: "bolt",
    title: "Easy Setup",
    desc: "Get up and running in minutes with npx command.",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: "shield_with_heart",
    title: "Model Fallback",
    desc: "Automatically switch providers on failure or high latency.",
    color: "bg-rose-50 text-rose-600"
  },
  {
    icon: "monitoring",
    title: "Usage Tracking",
    desc: "Detailed analytics and cost monitoring across all models.",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: "key",
    title: "OAuth & API Keys",
    desc: "Securely manage credentials in one vault.",
    color: "bg-amber-50 text-amber-600"
  },
  {
    icon: "cloud_sync",
    title: "Cloud Sync",
    desc: "Sync your configurations across devices instantly.",
    color: "bg-sky-50 text-sky-600"
  },
  {
    icon: "terminal",
    title: "CLI Support",
    desc: "Works with Claude Code, Codex, Cline, and more.",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    icon: "dashboard",
    title: "Dashboard",
    desc: "Visual dashboard for real-time traffic analysis.",
    color: "bg-fuchsia-50 text-fuchsia-600"
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-[#f97815]/20 hover:shadow-lg transition-all duration-300"
    >
      <motion.div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.color}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
      </motion.div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#f97815] transition-colors">
        {feature.title}
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {feature.desc}
      </p>
    </motion.div>
  );
}

export default function FeaturesMinimal() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section className="py-24 px-6 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your AI infrastructure in one place.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
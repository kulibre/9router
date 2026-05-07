"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Install 9Router",
    description: "Quick setup with a single command. No complex configuration needed.",
    code: "npx 9router",
    icon: "download",
    color: "text-blue-600"
  },
  {
    number: "02",
    title: "Configure Providers",
    description: "Add your API keys through the intuitive web dashboard.",
    code: "// Add providers via UI\n// or config file",
    icon: "settings",
    color: "text-purple-600"
  },
  {
    number: "03",
    title: "Start Building",
    description: "Use the unified endpoint in your applications.",
    code: "const response = await fetch(\n  'http://localhost:9000/v1/chat'\n);",
    icon: "rocket_launch",
    color: "text-orange-600"
  }
];

function StepCard({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <div className="p-8 rounded-2xl border border-gray-100 bg-white hover:border-[#f97815]/20 hover:shadow-lg transition-all duration-300">
        {/* Step Number Badge */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className={`w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center ${step.color}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="material-symbols-outlined text-3xl">
              {step.icon}
            </span>
          </motion.div>
          <div className="text-4xl font-bold text-gray-200">
            {step.number}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {step.description}
        </p>

        {/* Code Block */}
        <div className="relative p-4 rounded-xl bg-gray-50 border border-gray-100 font-mono text-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
              <div className="w-3 h-3 rounded-full bg-green-400/50" />
            </div>
            <span className="text-xs text-gray-500">terminal</span>
          </div>
          <pre className="text-[#f97815] whitespace-pre-wrap">
            {step.code}
          </pre>
        </div>
      </div>

      {/* Connection Arrow */}
      {index < STEPS.length - 1 && (
        <motion.div
          className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gray-200 -translate-y-1/2"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-gray-200" />
        </motion.div>
      )}
    </motion.div>
  );
}

export default function HowItWorksMinimal() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section className="py-24 px-6 bg-white" id="how-it-works">
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
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps. No complex setup required.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {STEPS.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {[
            { icon: "speed", title: "Fast", desc: "Sub-10ms routing latency" },
            { icon: "security", title: "Secure", desc: "End-to-end encryption" },
            { icon: "savings", title: "Cost-Effective", desc: "Optimize spending" }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="p-6 rounded-xl bg-gray-50 border border-gray-100 text-center"
              whileHover={{ scale: 1.02, borderColor: '#f97815' }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="material-symbols-outlined text-[#f97815] text-4xl mb-3 block">
                {item.icon}
              </span>
              <h4 className="text-gray-900 font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

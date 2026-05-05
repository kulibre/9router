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
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "02",
    title: "Configure Providers",
    description: "Add your API keys through the intuitive web dashboard.",
    code: "// Add providers via UI\n// or config file",
    icon: "settings",
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    title: "Start Building",
    description: "Use the unified endpoint in your applications. Switch providers seamlessly.",
    code: "const response = await fetch(\n  'http://localhost:9000/v1/chat'\n);",
    icon: "rocket_launch",
    color: "from-orange-500 to-amber-500"
  }
];

function StepCard({ step, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <motion.div
        className="relative p-8 rounded-3xl bg-[#23180f]/80 backdrop-blur-sm border border-[#3a2f27] overflow-hidden group"
        whileHover={{ scale: 1.02, borderColor: '#f97815' }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

        {/* Step Number - Large Background */}
        <motion.div
          className="absolute -top-8 -right-8 text-[180px] font-black text-[#f97815]/5 leading-none select-none"
          style={{ transform: 'translateZ(-50px)' }}
        >
          {step.number}
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon & Number */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="material-symbols-outlined text-white text-3xl">
                {step.icon}
              </span>
            </motion.div>
            <div className="text-5xl font-black text-[#f97815]">
              {step.number}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#f97815] transition-colors">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-6 leading-relaxed">
            {step.description}
          </p>

          {/* Code Block */}
          <motion.div
            className="relative p-4 rounded-xl bg-[#181411] border border-[#3a2f27] font-mono text-sm overflow-hidden"
            whileHover={{ boxShadow: '0 0 20px rgba(249, 120, 21, 0.2)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-gray-600">terminal</span>
            </div>
            <pre className="text-[#f97815] whitespace-pre-wrap">
              {step.code}
            </pre>
            
            {/* Copy Button */}
            <motion.button
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#23180f] border border-[#3a2f27] opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1, borderColor: '#f97815' }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="material-symbols-outlined text-gray-400 text-sm">
                content_copy
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Corner Decoration */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#f97815]/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      {/* Connection Line */}
      {index < STEPS.length - 1 && (
        <motion.div
          className="hidden lg:block absolute top-1/2 left-full w-16 h-[2px] bg-gradient-to-r from-[#f97815] to-transparent -translate-y-1/2 z-0"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-3 h-3 rounded-full bg-[#f97815] -translate-y-1/2"
            animate={{
              x: ['0%', '100%'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

export default function HowItWorks3D() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden" id="how-it-works">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black mb-6"
            style={{
              background: 'linear-gradient(to right, #ffffff, #f97815)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Get started in three simple steps. No complex setup, no vendor lock-in.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          {STEPS.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#f97815] to-[#ff8c3a] text-[#181411] font-bold text-lg shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(249, 120, 21, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined">play_circle</span>
              Watch Demo Video
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

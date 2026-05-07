"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeroMinimal() {
  const router = useRouter();

  return (
    <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center">
      {/* Subtle animated gradient orb */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249, 120, 21, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
        >
          <motion.span
            className="flex h-2 w-2 rounded-full bg-[#f97815]"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          v1.0 is now live
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-gray-900">
            One Endpoint for
            <br />
            <span className="text-[#f97815]">All AI Providers</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          AI endpoint proxy with web dashboard. Works seamlessly with Claude Code, OpenAI Codex, Cline, and other CLI tools.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => router.push("/dashboard")}
            className="px-8 py-4 rounded-lg bg-[#f97815] text-white text-lg font-semibold shadow-sm flex items-center gap-2"
            whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(249, 120, 21, 0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-symbols-outlined">rocket_launch</span>
            Get Started
          </motion.button>

          <motion.a
            href="https://github.com/decolua/9router"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg border border-gray-200 bg-white text-gray-700 text-lg font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.02, borderColor: '#f97815' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-symbols-outlined">code</span>
            View on GitHub
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { label: "AI Providers", value: "15+", icon: "hub" },
            { label: "Active Users", value: "2.5K+", icon: "group" },
            { label: "Requests/Day", value: "1M+", icon: "trending_up" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[#f97815] text-3xl">{stat.icon}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
      </motion.div>
    </section>
  );
}

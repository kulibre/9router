"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Hero3D() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring physics
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), springConfig);

  return (
    <section 
      ref={containerRef}
      className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated 3D Grid Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(249, 120, 21, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(249, 120, 21, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'rotateX(60deg) translateZ(-200px)',
            transformOrigin: 'center center',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Floating 3D Orbs */}
      <motion.div
        className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249, 120, 21, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="absolute bottom-20 left-1/2 w-[380px] h-[380px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          y: [0, -35, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-8"
        style={{ y, opacity, scale }}
      >
        {/* Version Badge with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotateX: 5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#3a2f27] bg-[#23180f]/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-[#f97815] shadow-lg"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.span 
            className="flex h-2 w-2 rounded-full bg-[#f97815]"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          v1.0 is now live
        </motion.div>

        {/* Main Heading with 3D Text Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight">
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.02, rotateX: 2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              One Endpoint for
            </motion.span>
            <br/>
            <motion.span 
              className="inline-block text-[#f97815]"
              style={{
                textShadow: '0 0 40px rgba(249, 120, 21, 0.5), 0 0 80px rgba(249, 120, 21, 0.3)',
                transformStyle: "preserve-3d"
              }}
              animate={{
                textShadow: [
                  '0 0 40px rgba(249, 120, 21, 0.5), 0 0 80px rgba(249, 120, 21, 0.3)',
                  '0 0 60px rgba(249, 120, 21, 0.7), 0 0 100px rgba(249, 120, 21, 0.4)',
                  '0 0 40px rgba(249, 120, 21, 0.5), 0 0 80px rgba(249, 120, 21, 0.3)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotateY: 2 }}
            >
              All AI Providers
            </motion.span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          AI endpoint proxy with web dashboard - A JavaScript port of CLIProxyAPI. 
          Works seamlessly with Claude Code, OpenAI Codex, Cline, RooCode, and other CLI tools.
        </motion.p>

        {/* CTA Buttons with 3D Hover */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.button
            onClick={() => router.push("/dashboard")}
            className="relative h-14 px-10 rounded-xl bg-[#f97815] text-[#181411] text-lg font-bold overflow-hidden group"
            whileHover={{ scale: 1.05, rotateX: 5 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              transformStyle: "preserve-3d",
              boxShadow: '0 0 30px rgba(249, 120, 21, 0.5), 0 10px 25px rgba(0, 0, 0, 0.3)'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#f97815] via-[#ff8c3a] to-[#f97815]"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <span className="material-symbols-outlined">rocket_launch</span>
              Get Started
            </span>
          </motion.button>

          <motion.a
            href="https://github.com/decolua/9router"
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-10 rounded-xl border-2 border-[#3a2f27] bg-[#23180f]/80 backdrop-blur-sm text-white text-lg font-bold flex items-center gap-2"
            whileHover={{ 
              scale: 1.05, 
              rotateX: 5,
              borderColor: '#f97815',
              boxShadow: '0 0 20px rgba(249, 120, 21, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="material-symbols-outlined">code</span>
            View on GitHub
          </motion.a>
        </motion.div>

        {/* Floating Stats Cards */}
        <motion.div
          className="grid grid-cols-3 gap-6 mt-12 w-full max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[
            { label: "AI Providers", value: "15+", icon: "hub" },
            { label: "Active Users", value: "2.5K+", icon: "group" },
            { label: "Requests/Day", value: "1M+", icon: "trending_up" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative p-6 rounded-2xl bg-[#23180f]/60 backdrop-blur-md border border-[#3a2f27]"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                borderColor: '#f97815',
                boxShadow: '0 10px 30px rgba(249, 120, 21, 0.2)'
              }}
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <motion.div
                className="text-[#f97815] mb-2"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
              </motion.div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

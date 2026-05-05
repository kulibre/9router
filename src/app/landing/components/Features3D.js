"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const FEATURES = [
  { 
    icon: "link", 
    title: "Unified Endpoint", 
    desc: "Access all providers via a single standard API URL.", 
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/30"
  },
  { 
    icon: "bolt", 
    title: "Easy Setup", 
    desc: "Get up and running in minutes with npx command.", 
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/30"
  },
  { 
    icon: "shield_with_heart", 
    title: "Model Fallback", 
    desc: "Automatically switch providers on failure or high latency.", 
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-400",
    borderColor: "border-rose-500/30"
  },
  { 
    icon: "monitoring", 
    title: "Usage Tracking", 
    desc: "Detailed analytics and cost monitoring across all models.", 
    gradient: "from-purple-500/20 to-fuchsia-500/20",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/30"
  },
  { 
    icon: "key", 
    title: "OAuth & API Keys", 
    desc: "Securely manage credentials in one vault.", 
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/30"
  },
  { 
    icon: "cloud_sync", 
    title: "Cloud Sync", 
    desc: "Sync your configurations across devices instantly.", 
    gradient: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-400",
    borderColor: "border-sky-500/30"
  },
  { 
    icon: "terminal", 
    title: "CLI Support", 
    desc: "Works with Claude Code, Codex, Cline, Cursor, and more.", 
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/30"
  },
  { 
    icon: "dashboard", 
    title: "Dashboard", 
    desc: "Visual dashboard for real-time traffic analysis.", 
    gradient: "from-fuchsia-500/20 to-purple-500/20",
    iconColor: "text-fuchsia-400",
    borderColor: "border-fuchsia-500/30"
  },
];

function FeatureCard({ feature, index }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="relative group"
    >
      <motion.div
        className={`relative p-8 rounded-2xl bg-[#23180f]/80 backdrop-blur-sm border ${feature.borderColor} overflow-hidden`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />

        {/* Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
          <motion.div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 ${feature.iconColor}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
          </motion.div>
          
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#f97815] transition-colors">
            {feature.title}
          </h3>
          
          <p className="text-gray-400 leading-relaxed">
            {feature.desc}
          </p>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#f97815]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.div>
  );
}

export default function Features3D() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden" id="features">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 120, 21, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
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
            Powerful Features
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Everything you need to manage your AI infrastructure in one place, built for scale.
          </motion.p>
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

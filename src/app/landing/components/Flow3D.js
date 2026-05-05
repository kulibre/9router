"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Flow3D() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { 
      id: 1, 
      label: "Your App", 
      icon: "code",
      color: "from-blue-500 to-cyan-500",
      position: { x: 0, y: 0 }
    },
    { 
      id: 2, 
      label: "9Router", 
      icon: "hub",
      color: "from-orange-500 to-amber-500",
      position: { x: 300, y: 0 }
    },
    { 
      id: 3, 
      label: "AI Providers", 
      icon: "cloud",
      color: "from-purple-500 to-pink-500",
      position: { x: 600, y: 0 }
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto py-20">
      {/* 3D Container */}
      <div className="relative" style={{ perspective: "1500px" }}>
        <motion.div
          className="relative flex items-center justify-center gap-8 md:gap-16"
          initial={{ rotateY: -10 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Nodes */}
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="relative"
              initial={{ opacity: 0, z: -100 }}
              animate={{ opacity: 1, z: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Node Card */}
              <motion.div
                className={`relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br ${node.color} p-[2px] shadow-2xl`}
                animate={{
                  scale: activeNode === index ? 1.1 : 1,
                  rotateY: activeNode === index ? [0, 5, -5, 0] : 0,
                  boxShadow: activeNode === index 
                    ? '0 20px 60px rgba(249, 120, 21, 0.4)' 
                    : '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-full h-full rounded-2xl bg-[#181411] flex flex-col items-center justify-center gap-3 backdrop-blur-xl">
                  <motion.div
                    animate={{
                      scale: activeNode === index ? [1, 1.2, 1] : 1,
                      rotate: activeNode === index ? [0, 360] : 0
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className={`material-symbols-outlined text-4xl md:text-5xl bg-gradient-to-br ${node.color} bg-clip-text text-transparent`}>
                      {node.icon}
                    </span>
                  </motion.div>
                  <span className="text-white font-bold text-sm md:text-base text-center px-2">
                    {node.label}
                  </span>
                </div>
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${node.color} blur-xl -z-10`}
                animate={{
                  opacity: activeNode === index ? 0.6 : 0.2,
                  scale: activeNode === index ? 1.2 : 1
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Connection Line to Next Node */}
              {index < nodes.length - 1 && (
                <div className="absolute top-1/2 left-full w-8 md:w-16 h-[2px] -translate-y-1/2">
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-[#f97815] to-transparent relative overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                  >
                    {/* Animated Particle */}
                    <motion.div
                      className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#f97815] shadow-[0_0_10px_rgba(249,120,21,0.8)]"
                      animate={{
                        x: ['0%', '100%'],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.3
                      }}
                    />
                  </motion.div>
                  
                  {/* Arrow */}
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[#f97815]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.8 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Labels */}
        <motion.div
          className="absolute -bottom-16 left-0 right-0 flex justify-between px-4 md:px-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex-1">
            <p className="text-xs md:text-sm text-gray-500">Standard API</p>
          </div>
          <div className="flex-1">
            <p className="text-xs md:text-sm text-[#f97815] font-semibold">Smart Routing</p>
          </div>
          <div className="flex-1">
            <p className="text-xs md:text-sm text-gray-500">15+ Providers</p>
          </div>
        </motion.div>
      </div>

      {/* Info Cards Below */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        {[
          { icon: "speed", title: "Fast", desc: "Sub-10ms routing latency" },
          { icon: "security", title: "Secure", desc: "End-to-end encryption" },
          { icon: "savings", title: "Cost-Effective", desc: "Optimize spending across providers" }
        ].map((item, index) => (
          <motion.div
            key={item.title}
            className="p-6 rounded-xl bg-[#23180f]/60 backdrop-blur-sm border border-[#3a2f27]"
            whileHover={{ 
              scale: 1.05, 
              borderColor: '#f97815',
              boxShadow: '0 10px 30px rgba(249, 120, 21, 0.2)'
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="material-symbols-outlined text-[#f97815] text-3xl mb-3 block">
              {item.icon}
            </span>
            <h4 className="text-white font-bold mb-2">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

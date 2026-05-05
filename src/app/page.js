"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navigation3D from "./landing/components/Navigation3D";
import Hero3D from "./landing/components/Hero3D";
import Flow3D from "./landing/components/Flow3D";
import HowItWorks3D from "./landing/components/HowItWorks3D";
import Features3D from "./landing/components/Features3D";
import Footer from "./landing/components/Footer";

export default function HomePage() {
  const router = useRouter();
  
  return (
    <div className="relative text-white font-sans overflow-x-hidden antialiased selection:bg-[#f97815] selection:text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#181411]">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(to right, #f97815 1px, transparent 1px), linear-gradient(to bottom, #f97815 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 120, 21, 0.12) 0%, transparent 70%)',
            filter: 'blur(130px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
            filter: 'blur(130px)',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-1/2 w-[650px] h-[650px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
            filter: 'blur(130px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Vignette effect */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(24, 20, 17, 0.4) 100%)'
        }}></div>
      </div>

      <div className="relative z-10">
        <Navigation3D />
        
        <main>
          {/* Hero with Flow Animation */}
          <Hero3D />
          
          {/* Flow Diagram */}
          <section className="py-20 px-6">
            <Flow3D />
          </section>
          
          {/* How It Works */}
          <HowItWorks3D />
          
          {/* Features */}
          <Features3D />
          
          {/* CTA Section */}
          <section className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#f97815]/5 to-transparent pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                  Ready to Simplify Your AI Infrastructure?
                </motion.h2>
                
                <motion.p 
                  className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Join developers who are streamlining their AI integrations with 9Router. Open source and free to start.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button 
                    onClick={() => router.push("/dashboard")}
                    className="w-full sm:w-auto h-14 px-10 rounded-xl bg-gradient-to-r from-[#f97815] to-[#ff8c3a] text-[#181411] text-lg font-bold flex items-center justify-center gap-2"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 40px rgba(249, 120, 21, 0.6)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="material-symbols-outlined">rocket_launch</span>
                    Start Free
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => window.open("https://github.com/decolua/9router#readme", "_blank")}
                    className="w-full sm:w-auto h-14 px-10 rounded-xl border-2 border-[#3a2f27] bg-[#23180f]/80 backdrop-blur-sm text-white text-lg font-bold flex items-center justify-center gap-2"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: '#f97815',
                      boxShadow: '0 0 20px rgba(249, 120, 21, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="material-symbols-outlined">description</span>
                    Read Documentation
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

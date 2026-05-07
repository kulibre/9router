"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navigation from "./landing/components/NavigationMinimal";
import Hero from "./landing/components/HeroMinimal";
import Features from "./landing/components/FeaturesMinimal";
import HowItWorks from "./landing/components/HowItWorksMinimal";
import Footer from "./landing/components/FooterMinimal";

export default function HomePage() {
  return (
    <div className="relative bg-white text-gray-900 font-sans overflow-x-hidden antialiased">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f97815 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10">
        <Navigation />

        <main>
          <Hero />
          <Features />
          <HowItWorks />

          {/* CTA Section */}
          <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Ready to get started?
                </h2>

                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                  Join developers simplifying their AI infrastructure with 9Router.
                </p>

                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={() => window.location.href = "/dashboard"}
                    className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#f97815] text-white font-semibold flex items-center justify-center gap-2 shadow-sm"
                    whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(249, 120, 21, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="material-symbols-outlined text-xl">rocket_launch</span>
                    Start Free
                  </motion.button>

                  <motion.a
                    href="https://github.com/decolua/9router#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-lg border border-gray-200 text-gray-700 font-semibold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, borderColor: '#f97815' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="material-symbols-outlined text-xl">description</span>
                    Documentation
                  </motion.a>
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

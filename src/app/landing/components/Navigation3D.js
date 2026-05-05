"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navigation3D() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(24, 20, 17, 0)", "rgba(24, 20, 17, 0.8)"]
  );

  const navBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(20px)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Docs", href: "https://github.com/decolua/9router#readme", external: true },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{
        backgroundColor: navBackground,
        backdropFilter: navBlur,
        WebkitBackdropFilter: navBlur,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#f97815] to-[#ff8c3a] flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(249, 120, 21, 0.3)',
                  '0 0 30px rgba(249, 120, 21, 0.5)',
                  '0 0 20px rgba(249, 120, 21, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white font-black text-xl">9R</span>
            </motion.div>
            <span className="text-white font-bold text-xl">9Router</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-gray-300 hover:text-white font-medium transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f97815]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="https://github.com/decolua/9router"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg border border-[#3a2f27] text-white font-medium hover:bg-[#23180f] transition-colors"
              whileHover={{ scale: 1.05, borderColor: '#f97815' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">code</span>
                GitHub
              </span>
            </motion.a>
            <motion.button
              onClick={() => router.push("/dashboard")}
              className="px-5 py-2 rounded-lg bg-[#f97815] text-[#181411] font-bold hover:bg-[#e0650a] transition-colors"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 20px rgba(249, 120, 21, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 pb-2 space-y-3">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-[#23180f] rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
            <div className="flex flex-col gap-2 px-4 pt-2">
              <motion.a
                href="https://github.com/decolua/9router"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-2 rounded-lg border border-[#3a2f27] text-white font-medium text-center"
                whileTap={{ scale: 0.95 }}
              >
                GitHub
              </motion.a>
              <motion.button
                onClick={() => router.push("/dashboard")}
                className="w-full px-5 py-2 rounded-lg bg-[#f97815] text-[#181411] font-bold"
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f97815] origin-left"
        style={{
          scaleX: useTransform(scrollY, [0, 2000], [0, 1])
        }}
      />
    </motion.nav>
  );
}

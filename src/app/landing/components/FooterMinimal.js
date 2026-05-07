"use client";
import { motion } from "framer-motion";

export default function FooterMinimal() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#f97815] flex items-center justify-center">
                <span className="text-white font-bold text-sm">9R</span>
              </div>
              <h3 className="text-gray-900 text-lg font-semibold">9Router</h3>
            </div>
            <p className="text-gray-600 text-sm max-w-xs mb-6">
              The unified endpoint for AI generation. Connect, route, and manage your AI providers with ease.
            </p>
            <div className="flex gap-4">
              <motion.a
                className="text-gray-400 hover:text-[#f97815] transition-colors"
                href="https://github.com/decolua/9router"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="material-symbols-outlined">code</span>
              </motion.a>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-gray-900 mb-1">Product</h4>
            <a className="text-gray-600 hover:text-[#f97815] text-sm transition-colors" href="#features">Features</a>
            <a className="text-gray-600 hover:text-[#f97815] text-sm transition-colors" href="/dashboard">Dashboard</a>
            <a className="text-gray-600 hover:text-[#f97815] text-sm transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">Changelog</a>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-gray-900 mb-1">Resources</h4>
            <a className="text-gray-600 hover:text-[#f97815] text-sm transition-colors" href="https://github.com/decolua/9router#readme" target="_blank" rel="noopener noreferrer">Documentation</a>
            <a className="text-gray-600 hover:text-[#f97815] text-sm transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-gray-600 hover:text-[#f97815] text-sm transition-colors" href="https://www.npmjs.com/package/9router" target="_blank" rel="noopener noreferrer">NPM</a>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-gray-900 mb-1">Legal</h4>
            <a className="text-gray-600 hover:text-[#f97815] text-sm transition-colors" href="https://github.com/decolua/9router/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 9Router. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-gray-500 hover:text-[#f97815] text-sm transition-colors" href="https://github.com/decolua/9router" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-gray-500 hover:text-[#f97815] text-sm transition-colors" href="https://www.npmjs.com/package/9router" target="_blank" rel="noopener noreferrer">NPM</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

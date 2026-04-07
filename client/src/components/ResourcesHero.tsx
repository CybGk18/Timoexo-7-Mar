import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Book,
  FileText,
  Lightbulb,
  TrendingUp,
  Zap,
} from "lucide-react";

interface ResourcesHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export default function ResourcesHero({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
}: ResourcesHeroProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-white via-[#e6f3ff] to-[#cfe8ff] overflow-hidden">
      {/* Smooth business-style gradient background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_top,_#cce6ff80,_transparent_60%)] blur-3xl opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_bottom_right,_#b3daff60,_transparent_70%)] blur-3xl opacity-60"></div>
      </div>

      {/* Cursor subtle glow */}
      <motion.div
        className="pointer-events-none fixed w-24 h-24 rounded-full bg-gradient-to-r from-[#00bcd4] to-[#0055ff] blur-3xl opacity-20"
        animate={{
          x: cursorPos.x - 48,
          y: cursorPos.y - 48,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 py-20 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-extrabold leading-tight text-[#0a0a1a]">
            <span className="block text-5xl md:text-6xl mb-2">
              Resources That
            </span>
            <span className="block text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] to-[#00bcd4]">
              Empower Global Trade
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
            Explore expert insights, logistics case studies, and international
            trade resources — designed to help your business thrive in the
            global import & export industry.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-[#0055ff] transition-colors" />
            <input
              type="text"
              placeholder="Search logistics guides, trade insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-gray-200 rounded-2xl text-[#0a0a1a] placeholder-gray-400 shadow-sm focus:outline-none focus:border-[#00bcd4] focus:ring-2 focus:ring-[#00bcd4]/30 transition-all"
            />
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[
            { name: "All", icon: Book },
            { name: "Case Study", icon: FileText },
            { name: "Blog", icon: Lightbulb },
            { name: "ePaper", icon: FileText },
          ].map((filter, idx) => {
            const Icon = filter.icon;
            const isActive = selectedType === filter.name;
            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={idx}
                onClick={() => setSelectedType(filter.name)}
                className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${isActive
                    ? "bg-gradient-to-r from-[#00bcd4] to-[#0055ff] text-white shadow-md shadow-[#00bcd4]/30 scale-105"
                    : "bg-white text-gray-700 hover:text-[#0055ff] border border-gray-200 hover:border-[#00bcd4]/50"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {filter.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Filtered Content */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {selectedType === "All" && <div>All resources are displayed here.</div>}
          {selectedType === "Case Study" && <div>Case studies are displayed here.</div>}
          {selectedType === "Blog" && <div>Blogs are displayed here.</div>}
          {selectedType === "ePaper" && <div>ePapers are displayed here.</div>}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 pt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {[
            { icon: TrendingUp, text: "Export partners worldwide", value: "50+" },
            { icon: Zap, text: "Years of trade excellence", value: "15+" },
            { icon: Book, text: "Resources & reports", value: "200+" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={idx}
                className="flex items-center gap-3 text-gray-700 group cursor-pointer bg-white/60 backdrop-blur-md rounded-xl px-4 py-3 shadow-sm border border-[#cce5ff]/40"
              >
                <div className="p-3 bg-[#eef6ff] rounded-lg border border-[#cce5ff] group-hover:border-[#00bcd4] transition-all">
                  <Icon className="w-5 h-5 text-[#0055ff]" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-[#0a0a1a]">
                    {stat.value}
                  </div>
                  <div className="text-sm">{stat.text}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

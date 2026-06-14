import { useState, useEffect } from "react";
import { BookOpen, TableProperties, Sparkles, UserCheck, Heart, GraduationCap, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import InstructorCorner from "./components/InstructorCorner";
import ChecklistTracker from "./components/ChecklistTracker";
import NotebookDirectory from "./components/NotebookDirectory";
import DistributionMatrix from "./components/DistributionMatrix";
import CreatorGuide from "./components/CreatorGuide";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("checklist");
  const [theme, setTheme] = useState<"light" | "dark" | "">("");

  useEffect(() => {
    // Initial load: prefer system preference or saved theme
    const stored = localStorage.getItem("biol1408::theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
    } else {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (!theme) return;
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.backgroundColor = "#f9fafb";
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.backgroundColor = "#0d0d0d";
    }
    localStorage.setItem("biol1408::theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-[#cbff00]/30 selection:text-white font-sans antialiased pb-16">
      {/* Top ambient creative decoration glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#cbff00]/[0.015] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Custom Header with Editorial Spacious Layout */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-1.5 select-none">
              <span className="bg-white text-black text-[10px] font-bold px-2.5 py-1 uppercase font-mono tracking-widest">
                BIOL 1408
              </span>
              <span className="bg-[#cbff00] text-black text-[10px] font-bold px-2.5 py-1 uppercase font-mono tracking-widest">
                Summer 6W1
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase text-white animate-fade-in">
              Notebook LM Assignments
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Curated multimedia dashboard mapping biological learning outcomes with Google's collaborative notebooks, podcasts, and study tools.
            </p>
          </div>

          {/* Theme switcher control in theme matches */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2.5 bg-[#121212] hover:bg-black border border-white/10 hover:border-[#cbff00]/30 text-xs font-bold uppercase tracking-widest text-[#cbff00] hover:text-[#cbff00] flex items-center gap-2 transition duration-150 focus:outline-none shrink-0 self-start md:self-end cursor-pointer"
            id="theme-toggler"
            title="Toggle color mode"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-4 h-4 stroke-[2.5]" />
                <span>Go Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 stroke-[2.5]" />
                <span>Go Light</span>
              </>
            )}
          </button>
        </header>

        {/* Premium Dark Nav Bar resembling modern editorial styling */}
        <nav className="flex flex-wrap gap-1 bg-[#121212] p-1 border border-white/10 max-w-fit" aria-label="Dashboard Sections">
          <button
            onClick={() => setActiveTab("checklist")}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition duration-150 flex items-center gap-2 focus:outline-none ${
              activeTab === "checklist"
                ? "bg-[#cbff00] text-black font-black"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <UserCheck className="w-4 h-4 shrink-0" />
            Checklist Tracker
          </button>

          <button
            onClick={() => setActiveTab("directory")}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition duration-150 flex items-center gap-2 focus:outline-none ${
              activeTab === "directory"
                ? "bg-[#cbff00] text-black font-black"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            Cohort Notebooks
          </button>

          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition duration-150 flex items-center gap-2 focus:outline-none ${
              activeTab === "matrix"
                ? "bg-[#cbff00] text-black font-black"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <TableProperties className="w-4 h-4 shrink-0" />
            Roster Distribution
          </button>

          <button
            onClick={() => setActiveTab("guide")}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition duration-150 flex items-center gap-2 focus:outline-none ${
              activeTab === "guide"
                ? "bg-[#cbff00] text-black font-black"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            Creator Blueprint
          </button>
        </nav>

        {/* Tab Content Panels */}
        <main className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === "checklist" && <ChecklistTracker />}
              {activeTab === "directory" && <NotebookDirectory />}
              {activeTab === "matrix" && <DistributionMatrix />}
              {activeTab === "guide" && <CreatorGuide />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 pt-4" />

        {/* Dynamic Instructor Showcase bottom module */}
        <InstructorCorner />

        {/* Class footer */}
        <footer className="text-center pt-8 text-xs text-zinc-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <p>© 2026 BIOL 1408 Summer. All study logs persist offline on this browser container.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-zinc-650 fill-zinc-650" /> by Dr. Víctor García Martínez
          </p>
        </footer>
      </div>
    </div>
  );
}

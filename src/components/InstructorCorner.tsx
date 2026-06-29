import { INSTRUCTOR_NAME, INSTRUCTOR_TITLE, INSTRUCTOR_BIO } from "../data/instructor";
import { Award, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function InstructorCorner() {
  const [instructorImg, setInstructorImg] = useState<string>("/dr-victor-garcia.png?v=2");
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-[#121212] border border-white/10 p-6 sm:p-8 rounded-none"
      id="instructor"
    >
      {/* Background abstract overlay decorative glow */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-[#cbff00]/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
        {/* Instructor Portrait Avatar */}
        <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 border-2 border-white/10 rounded-full overflow-hidden bg-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <img
            src={instructorImg}
            onError={() => {
              if (instructorImg.startsWith("/dr-victor-garcia.png")) {
                setInstructorImg("/VHGM pic foto.PNG?v=2");
              } else if (instructorImg.startsWith("/VHGM pic foto.PNG")) {
                setInstructorImg("/dr-victor-garcia.jpg?v=2");
              }
            }}
            alt={INSTRUCTOR_NAME}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Instructor Description and info */}
        <div className="text-left space-y-4 flex-1 w-full">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight leading-none pt-1">
              {INSTRUCTOR_NAME}
            </h2>
            <p className="text-zinc-400 font-mono uppercase tracking-wider text-xs">
              {INSTRUCTOR_TITLE}
            </p>
          </div>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl font-light">
            {INSTRUCTOR_BIO}
          </p>

          {/* Quick Metrics / Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-[#161616] border border-white/5 flex items-center gap-2.5 rounded-none hover:border-white/10 transition">
              <Award className="w-4 h-4 text-[#cbff00] shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">BIOL 1408</span>
                <span className="text-xs text-zinc-300 font-medium font-mono">Summer 6W1</span>
              </div>
            </div>

            <div className="p-3 bg-[#161616] border border-white/5 flex items-center gap-2.5 rounded-none hover:border-white/10 transition">
              <ShieldCheck className="w-4 h-4 text-[#cbff00] shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Exam Units</span>
                <span className="text-xs text-zinc-300 font-medium font-mono">4 Core Units</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 bg-[#161616] border border-white/5 flex items-center gap-2.5 justify-center sm:justify-start rounded-none hover:border-white/10 transition">
              <HelpCircle className="w-4 h-4 text-[#cbff00] shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Total Cohort</span>
                <span className="text-xs text-zinc-300 font-medium font-mono">27 Active Stud.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

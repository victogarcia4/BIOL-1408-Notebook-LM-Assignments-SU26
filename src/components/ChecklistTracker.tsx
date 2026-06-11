import { useState, useEffect } from "react";
import { RAW_ASSIGNMENTS, getNotebookForObjective } from "../data/students";
import { Assignment } from "../types";
import { CheckCircle, Eye, Copy, ArrowRight, UserCheck, Calendar, Sparkles, BookOpen, Trash2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const STEPS = [
  { key: "idea", label: "Understand & Outline Objective" },
  { key: "lo", label: "Master Core Bio 1408 LO Content" },
  { key: "notebook", label: "Create and Rename Notebook LM" },
  { key: "sources", label: "Upload BIOL Text + 2-3 YouTube Feeds" },
  { key: "tools", label: "Generate Study Assets via Prompt" },
  { key: "submit", label: "Share Link & Upload to Dropbox" }
];

export default function ChecklistTracker() {
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  const students = Array.from(new Set(RAW_ASSIGNMENTS.map((item) => item.student))).sort();

  // Load progress for selected student from local storage
  useEffect(() => {
    if (selectedStudent) {
      const storageKey = `biol1408::v2::${selectedStudent.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          setProgress(JSON.parse(saved));
        } else {
          setProgress({});
        }
      } catch (err) {
        console.error("Error loading progress", err);
        setProgress({});
      }
    } else {
      setProgress({});
    }
  }, [selectedStudent]);

  // Save progress changes
  const handleToggle = (unit: number, stepKey: string) => {
    if (!selectedStudent) return;
    const itemKey = `unit-${unit}-${stepKey}`;
    const newProgress = { ...progress, [itemKey]: !progress[itemKey] };
    setProgress(newProgress);

    const storageKey = `biol1408::v2::${selectedStudent.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    try {
      localStorage.setItem(storageKey, JSON.stringify(newProgress));
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  const handleResetProgress = () => {
    if (!selectedStudent) return;
    if (window.confirm(`Are you sure you want to reset all progress for ${selectedStudent}?`)) {
      setProgress({});
      const storageKey = `biol1408::v2::${selectedStudent.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      localStorage.removeItem(storageKey);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const studentAssignments = RAW_ASSIGNMENTS.filter((item) => item.student === selectedStudent);

  // Calculate stats
  const totalSteps = studentAssignments.length * STEPS.length;
  const completedSteps = studentAssignments.reduce((acc, current) => {
    let count = 0;
    STEPS.forEach((step) => {
      if (progress[`unit-${current.unit}-${step.key}`]) {
        count++;
      }
    });
    return acc + count;
  }, 0);

  const overallPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Selector Section with Modern Card Design */}
      <div className="rounded-none bg-[#121212] border border-white/10 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#cbff00]/[0.015] rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2 uppercase">
              <UserCheck className="text-[#cbff00] w-6 h-6" /> Identify Your Profile
            </h2>
            <p className="text-zinc-400 text-sm font-light">
              Select your name from the biology cohort roster to retrieve your exam requirements.
            </p>
          </div>

          <div className="w-full md:w-64 max-w-sm shrink-0">
            <label htmlFor="student-dropdown" className="sr-only">Choose Student</label>
            <select
              id="student-dropdown"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-4 py-3 rounded-none bg-black border border-white/15 text-white font-bold focus:border-[#cbff00] focus:outline-none transition group-hover:bg-zinc-950 font-sans cursor-pointer"
            >
              <option value="">-- Choose Your Name --</option>
              {students.map((student) => (
                <option key={student} value={student}>
                  {student}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center">
                {/* SVG Circular Progress Loader */}
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#1d1d1f"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#cbff00"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 * (1 - overallPercent / 100)}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <span className="absolute text-sm font-black tracking-tight text-white font-mono">
                  {overallPercent}%
                </span>
              </div>
              <div className="text-left">
                <h3 className="text-[#cbff00] font-black text-lg uppercase tracking-tight">{selectedStudent}</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  {completedSteps} / {totalSteps} milestones achieved
                </p>
              </div>
            </div>

            <button
              onClick={handleResetProgress}
              className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/60 rounded-none bg-red-500/5 transition flex items-center gap-1.5 focus:outline-none"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset Study Logs
            </button>
          </motion.div>
        )}
      </div>

      {/* Main Study Checklist Area */}
      <AnimatePresence mode="wait">
        {!selectedStudent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 bg-[#121212]/50 border border-white/10 rounded-none"
          >
            <BookOpen className="w-12 h-12 text-zinc-650 mx-auto mb-4 stroke-1" />
            <h3 className="text-zinc-300 font-bold uppercase tracking-widest text-sm">No Profile Active</h3>
            <p className="text-zinc-500 text-xs max-w-sm mx-auto mt-2 font-mono uppercase tracking-wider">
              Select your student profile above to retrieve your assignments schedule.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {studentAssignments.map((assignment) => {
              const pairedNotebook = getNotebookForObjective(assignment.objective);
              const customPrompt = `Using the selected sources, generate a(n) [presentation, flashcards, video, audio, infographic] of this specific learning outcome: ${assignment.objective}`;
              
              // Count completed steps inside this Unit card
              let unitCompleted = 0;
              STEPS.forEach((step) => {
                if (progress[`unit-${assignment.unit}-${step.key}`]) {
                  unitCompleted++;
                }
              });
              const unitPercent = Math.round((unitCompleted / STEPS.length) * 100);

              return (
                <motion.div
                  key={assignment.unit}
                  layoutId={`card-${assignment.unit}`}
                  className="rounded-none bg-[#121212] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition relative duration-300"
                >
                  <div className="space-y-4">
                    {/* Badge row */}
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 bg-white text-black text-[10px] font-mono font-black tracking-widest uppercase rounded-none">
                        UNIT {assignment.unit} · {assignment.exam}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5 bg-black/40 border border-white/5 px-2.5 py-1 rounded-none uppercase">
                        <Calendar className="w-3.5 h-3.5 text-[#cbff00]" />
                        {assignment.dueDate}
                      </span>
                    </div>

                    {/* Master LO content */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#cbff00] block font-mono">
                        Outcome {assignment.unit}.x · Chapter {assignment.chapter}
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight mt-1 leading-snug">
                        {assignment.objective}
                      </h4>
                    </div>

                    {/* Direct Notebook launch banner if pre-built */}
                    {pairedNotebook && (
                      <div className="p-4 bg-[#cbff00]/5 border border-[#cbff00]/25 rounded-none flex items-center justify-between gap-3">
                        <div className="text-left">
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#cbff00] font-bold font-mono tracking-widest uppercase">
                            <Sparkles className="w-3 h-3 text-[#cbff00] animate-pulse" /> Live Notebook Active
                          </span>
                          <span className="block text-xs text-zinc-300 mt-0.5 leading-tight">
                            Interactive digital notebook linked for this learning outcome!
                          </span>
                        </div>
                        <a
                          href={pairedNotebook.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-2 bg-[#cbff00] hover:bg-[#b2e000] text-black text-xs font-black uppercase tracking-wider rounded-none transition flex items-center gap-1 shrink-0"
                        >
                          Launch LM
                          <ArrowRight className="w-3.5 h-3.5 stroke-2" />
                        </a>
                      </div>
                    )}

                    {/* Quick template prompt generator */}
                    <div className="rounded-none bg-black border border-white/5 p-4 text-left space-y-2 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                          NotebookLM Study Prompt
                        </span>
                        <button
                          onClick={() => copyToClipboard(customPrompt, `p-${assignment.unit}`)}
                          className="text-[10px] font-bold text-[#cbff00] hover:text-white uppercase tracking-wider font-mono flex items-center gap-1 transition focus:outline-none"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copiedText === `p-${assignment.unit}` ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <p className="text-xs text-zinc-350 italic font-mono leading-relaxed bg-[#121212] p-2.5 rounded-none border border-white/5">
                        "{customPrompt}"
                      </p>
                    </div>

                    {/* Checklist Steps */}
                    <div className="pt-2 space-y-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase block">
                        Milestones Progress ({unitPercent}% Complete)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                        {STEPS.map((step) => {
                          const isDone = progress[`unit-${assignment.unit}-${step.key}`];
                          return (
                            <button
                              key={step.key}
                              onClick={() => handleToggle(assignment.unit, step.key)}
                              className={`flex items-start text-left gap-2.5 p-2.5 rounded-none border transition duration-200 outline-none select-none text-xs cursor-pointer ${
                                isDone
                                  ? "bg-[#cbff00]/10 border-[#cbff00]/40 text-[#cbff00]"
                                  : "bg-black/50 border-white/5 hover:border-white/15 text-zinc-400 hover:text-zinc-200"
                              }`}
                            >
                              <div className="shrink-0 mt-0.5">
                                <CheckCircle
                                  className={`w-4 h-4 transition ${
                                    isDone ? "text-[#cbff00] fill-[#cbff00]/20" : "text-zinc-700"
                                  }`}
                                />
                              </div>
                              <span className="leading-tight font-medium font-sans">{step.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* bottom milestone indicator */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-wider">
                      Assignment Status
                    </span>
                    <span
                      className={`text-[9.5px] font-bold uppercase tracking-widest px-3 py-1 rounded-none ${
                        unitPercent === 100
                          ? "bg-[#cbff00]/20 text-[#cbff00] border border-[#cbff00]/30"
                          : unitPercent > 0
                          ? "bg-white/10 text-white border border-white/20"
                          : "bg-black text-zinc-500 border border-white/5"
                      }`}
                    >
                      {unitPercent === 100 ? "Ready to Share" : unitPercent > 0 ? "In Progress" : "Pending Action"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

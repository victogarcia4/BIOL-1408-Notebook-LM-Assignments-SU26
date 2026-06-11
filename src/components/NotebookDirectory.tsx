import { useState } from "react";
import { BUILT_NOTEBOOKS, RAW_ASSIGNMENTS } from "../data/students";
import { NotebookLM } from "../types";
import { ExternalLink, Star, Compass, Music, RefreshCw, Trophy, BookOpen, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function NotebookDirectory() {
  const [notebooks, setNotebooks] = useState<NotebookLM[]>(BUILT_NOTEBOOKS);
  const [selectedUnit, setSelectedUnit] = useState<number | "all">("all");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncStatus("Retrieving live document...");
    try {
      const response = await fetch("/api/sync-notebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error(`Sync failed with status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success && result.notebooks) {
        setNotebooks(result.notebooks);
        setSyncStatus(`Sync Success: Loaded ${result.notebooks.length} notebooks.`);
        // Reset status message after a few seconds
        setTimeout(() => setSyncStatus(null), 5000);
      } else {
        setSyncStatus(`Sync Error: ${result.error || "Could not parse Doc"}`);
      }
    } catch (err: any) {
      console.error("Fetch sync failed:", err);
      setSyncStatus(`Connection Failed: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredNotebooks = selectedUnit === "all" 
    ? notebooks 
    : notebooks.filter((nb) => nb.unit === selectedUnit);

  // Helper to resolve corresponding Chapter for an objective in the raw data
  const getChapterForObjective = (objective: string): number => {
    const normObj = objective.toLowerCase().trim().replace(/\.$/, "");
    const match = RAW_ASSIGNMENTS.find(a => a.objective.toLowerCase().trim().replace(/\.$/, "") === normObj);
    return match ? match.chapter : 1;
  };

  return (
    <div className="space-y-6">
      {/* Overview stats header banner in Editorial style */}
      <div className="rounded-none bg-[#121212] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        {/* glowing graphics */}
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-[#cbff00]/[0.015] rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 text-left relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#cbff00]/5 border border-[#cbff00]/20 text-[10px] font-mono font-bold uppercase tracking-widest text-[#cbff00] rounded-none">
            <Compass className="w-3.5 h-3.5" /> Curated Repository
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            Compiled Cohort Notebooks
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            These interactive NotebookLMs contain generated study aids, audio podcasts, and AI-powered assessments mapped closely with BIOL 1408 textbook materials.
          </p>
        </div>

        {/* Dynamic highlights & Live Action Sync Button */}
        <div className="flex flex-col gap-3 shrink-0 relative z-10 w-full md:w-auto font-mono">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-none bg-black border border-white/5 text-left">
              <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Live Notebooks</span>
              <span className="text-xl sm:text-2xl font-black text-[#cbff00] mt-0.5 block">{notebooks.length} Active</span>
            </div>
            <div className="p-4 rounded-none bg-black border border-white/5 text-left">
              <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Co-Authors</span>
              <span className="text-xl sm:text-2xl font-black text-white mt-0.5 block">
                {Array.from(new Set(notebooks.flatMap(n => n.authors))).filter(a => a !== "Independent Study").length} Students
              </span>
            </div>
          </div>

          <button
            onClick={handleSync}
            disabled={isSyncing}
            className={`w-full px-4 py-3 bg-white hover:bg-[#cbff00] disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-black text-xs uppercase tracking-wider rounded-none transition flex items-center justify-center gap-2 border border-white/10 cursor-pointer disabled:cursor-not-allowed`}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin text-zinc-500" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync from Google Doc"}
          </button>
          
          {syncStatus && (
            <div className="text-[10px] font-bold text-[#cbff00] text-center uppercase tracking-widest animate-pulse max-w-[240px] truncate self-center">
              {syncStatus}
            </div>
          )}
        </div>
      </div>

      {/* Filter capsules */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold mr-2">Filter Category:</span>
        <button
          onClick={() => setSelectedUnit("all")}
          className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest rounded-none transition duration-150 focus:outline-none cursor-pointer ${
            selectedUnit === "all"
              ? "bg-[#cbff00] text-black font-black"
              : "bg-black hover:bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
          }`}
        >
          All Units ({notebooks.length})
        </button>
        {[1, 2, 3, 4].map((unitNum) => {
          const count = notebooks.filter(n => n.unit === unitNum).length;
          return (
            <button
              key={unitNum}
              onClick={() => setSelectedUnit(unitNum)}
              className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest rounded-none transition duration-150 focus:outline-none cursor-pointer ${
                selectedUnit === unitNum
                  ? "bg-[#cbff00] text-black font-black"
                  : "bg-black hover:bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              Unit {unitNum} ({count})
            </button>
          );
        })}
      </div>

      {/* Notebook directory grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredNotebooks.map((nb, idx) => {
            const ch = getChapterForObjective(nb.objective);
            return (
              <motion.article
                key={nb.objective}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-none bg-[#121212] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 hover:bg-[#121212]/95 transition duration-300 overflow-hidden self-stretch"
              >
                <div className="space-y-4">
                  {/* Labels and chapters */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest font-mono p-1 px-2.5 bg-black border border-white/5 rounded-none text-white">
                      Unit {nb.unit}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest font-mono p-1 px-2.5 bg-[#cbff00]/10 text-[#cbff00] rounded-none">
                      Chapter {ch}
                    </span>
                  </div>

                  {/* Objective heading */}
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#cbff00] transition duration-300">
                    {nb.objective}
                  </h3>

                  {/* Interactive study features inside NotebookLM */}
                  <div className="rounded-none border border-white/5 bg-black/60 p-3.5 space-y-2 text-left">
                    <span className="text-[9px] uppercase font-bold tracking-widest font-mono text-zinc-500 block leading-none">
                      Included Study Materials
                    </span>
                    <div className="flex flex-col gap-1.5 pt-1">
                      <div className="flex items-center gap-2 text-xs text-zinc-300 font-light">
                        <Music className="w-3.5 h-3.5 text-[#cbff00] shrink-0" />
                        <span>AI Audio Overview (Double podcast host)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-300 font-light">
                        <Star className="w-3.5 h-3.5 text-[#cbff00] shrink-0" />
                        <span>Interactive flashcard cards sets</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-300 font-light">
                        <Layers className="w-3.5 h-3.5 text-[#cbff00] shrink-0" />
                        <span>Textbook chapters & annotated slides</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card footer holding authors and the direct click launcher */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  {/* Student author credit */}
                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 block font-mono">
                      Student Pioneer Author
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {nb.authors.map((author) => (
                        <span 
                          key={author} 
                          className="px-2.5 py-0.5 rounded-none bg-black text-xs font-semibold text-zinc-350 border border-white/5 group-hover:border-white/15 transition"
                        >
                          {author}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Launch button */}
                  <a
                    href={nb.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-[#cbff00] text-black font-black text-xs uppercase tracking-wider rounded-none transition flex items-center justify-center gap-1.5 focus:outline-none shrink-0"
                  >
                    Open Notebook
                    <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

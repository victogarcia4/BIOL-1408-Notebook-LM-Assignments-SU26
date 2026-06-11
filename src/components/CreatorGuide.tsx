import { Sparkles, FileText, Youtube, Compass, ArrowRight, CheckCircle2, ChevronRight, Copy } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function CreatorGuide() {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const samplePrompt = "Using the selected sources, generate a(n) [presentation, flashcards, video, audio, infographic] of this specific learning outcome: [---paste your assigned LO objective content here---]";

  const copyPromptText = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Introduction Greeting */}
      <div className="rounded-none bg-[#121212] border border-white/10 p-6 sm:p-8 relative overflow-hidden text-left">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#cbff00]/[0.015] rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-widest text-[#cbff00] rounded-none">
            <Sparkles className="w-3 h-3 animate-pulse" /> Instructional Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
            NotebookLM Creator Guide
          </h2>
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            NotebookLM is Google's collaborative AI assistant designed to synthesize notes, textbooks, and lectures. Follow these dynamic steps to build premium multimedia tools tailored to your assigned learning outcomes.
          </p>
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Step 1 */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-6 bg-[#121212] rounded-none border border-white/10 space-y-4"
        >
          <div className="w-10 h-10 rounded-none bg-black border border-white/10 flex items-center justify-center font-mono font-bold text-[#cbff00]">
            01
          </div>
          <div className="space-y-1.5">
            <h3 className="text-white font-extrabold uppercase tracking-tight text-base flex items-center gap-1">
              Find Assigned Objective
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Consult the <strong>Full LO Distribution Matrix</strong> or use the <strong>Checklist Tracker</strong> to locate your exact assigned Learning Outcome for the corresponding Exam Unit.
            </p>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-6 bg-[#121212] rounded-none border border-white/10 space-y-4"
        >
          <div className="w-10 h-10 rounded-none bg-black border border-white/10 flex items-center justify-center font-mono font-bold text-[#cbff00]">
            02
          </div>
          <div className="space-y-1.5">
            <h3 className="text-white font-extrabold uppercase tracking-tight text-base flex items-center gap-1">
              Assemble Sources
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Create a new notebook at <a href="https://notebooklm.google.com" target="_blank" rel="noreferrer" className="text-[#cbff00] underline hover:text-white transition-colors">notebooklm.google.com</a>. Add your course materials, textbook excerpts, and 2-3 public BIOL teaching YouTube resources.
            </p>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-6 bg-[#121212] rounded-none border border-white/10 space-y-4"
        >
          <div className="w-10 h-10 rounded-none bg-black border border-white/10 flex items-center justify-center font-mono font-bold text-[#cbff00]">
            03
          </div>
          <div className="space-y-1.5">
            <h3 className="text-white font-extrabold uppercase tracking-tight text-base flex items-center gap-1">
              Submit Dropbox Link
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Verify your generated output, generate flashcards/audio files, copy the public link option, and share it safely inside the class Dropbox before the Unit exam due date!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Copyable custom systemic prompt card */}
      <div className="rounded-none bg-black border border-white/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#cbff00] font-mono">
            Structured prompt template
          </span>
          <h3 className="text-white font-extrabold uppercase tracking-tight text-base">
            Curator AI Prompt Configuration
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            Copy and paste this structured prompt into the NotebookLM chat window to direct the AI model to build custom audio briefings, flashcard decks, and infographics tailored to your specific lesson task.
          </p>
        </div>

        <button
          onClick={copyPromptText}
          className="w-full md:w-auto px-4 py-2.5 bg-[#cbff00] hover:bg-[#b2e000] text-black font-black text-xs uppercase tracking-wider rounded-none transition flex items-center justify-center gap-1.5 shrink-0 focus:outline-none cursor-pointer"
        >
          <Copy className="w-4 h-4 text-black" />
          {copiedPrompt ? "Copied To Clipboard!" : "Copy Creator Prompt"}
        </button>
      </div>

      {/* Blueprint visualization area */}
      <div className="rounded-none bg-[#121212] border border-white/10 p-6 sm:p-8 text-left space-y-6">
        <div>
          <h3 className="text-white font-extrabold uppercase tracking-tight text-lg">Instructional Step-by-Step Blueprint</h3>
          <p className="text-zinc-400 text-xs font-mono font-medium mt-0.5 uppercase tracking-wide">
            A comprehensive checklist for crafting high-fidelity educational outputs.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="shrink-0 mt-0.5 text-[#cbff00] font-mono text-xs font-bold bg-black border border-white/10 w-6 h-6 rounded-none flex items-center justify-center shadow-sm">
              <span className="m-auto">A</span>
            </div>
            <div className="text-left space-y-0.5">
              <h4 className="text-zinc-200 text-sm font-semibold">Rename with exact Learning Outcome name</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Matches the NotebookLM container name exactly to the LO card string. For example, use: <code className="text-zinc-350 font-mono text-[11px] bg-black px-1.5 py-0.5 rounded-none border border-white/5">Explain why water is an excellent solvent.</code>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 mt-0.5 text-[#cbff00] font-mono text-xs font-bold bg-black border border-white/10 w-6 h-6 rounded-none flex items-center justify-center shadow-sm">
              <span className="m-auto">B</span>
            </div>
            <div className="text-left space-y-0.5">
              <h4 className="text-zinc-200 text-sm font-semibold">Integrate 2-3 Youtube videos</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Connect YouTube lectures from trusted channels (such as Khan Academy, Bozeman Science, Amoeba Sisters, or Crash Course) to reinforce core textbook concepts with animations.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 mt-0.5 text-[#cbff00] font-mono text-xs font-bold bg-black border border-white/10 w-6 h-6 rounded-none flex items-center justify-center shadow-sm">
              <span className="m-auto">C</span>
            </div>
            <div className="text-left space-y-0.5">
              <h4 className="text-zinc-200 text-sm font-semibold">Toggle AI generation option to "Focused"</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Adjust NotebookLM's guide selector to generate the focused, tighter version when drafting outlines or podcasts to keep information dense and digestible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

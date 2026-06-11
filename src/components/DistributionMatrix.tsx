import { useState, useMemo } from "react";
import { RAW_ASSIGNMENTS, getNotebookForObjective } from "../data/students";
import { Assignment } from "../types";
import { Search, Filter, BookOpen, ExternalLink, Sparkles, User, ChevronDown, Check } from "lucide-react";
import { motion } from "motion/react";

type SortField = "student" | "unit" | "chapter" | "dueDate";
type SortDirection = "asc" | "desc";

export default function DistributionMatrix() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUnit, setFilteredUnit] = useState<string>("all");
  const [isNotebookOnly, setIsNotebookOnly] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortField>("student");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const normalizedSearch = searchTerm.toLowerCase().trim();

  // Filter and sort raw dataset
  const processedAssignments = useMemo(() => {
    let result = [...RAW_ASSIGNMENTS];

    // Search filter
    if (normalizedSearch) {
      result = result.filter(
        (item) =>
          item.student.toLowerCase().includes(normalizedSearch) ||
          item.objective.toLowerCase().includes(normalizedSearch)
      );
    }

    // Unit filter
    if (filteredUnit !== "all") {
      result = result.filter((item) => item.unit === Number(filteredUnit));
    }

    // Active Notebooks checkbox filter
    if (isNotebookOnly) {
      result = result.filter((item) => Boolean(getNotebookForObjective(item.objective)));
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
      }
      if (typeof bVal === "string") {
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [normalizedSearch, filteredUnit, isNotebookOnly, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Panel */}
      <div className="rounded-none bg-[#121212] border border-white/10 p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input block */}
        <div className="relative w-full md:w-80 group shrink-0">
          <input
            type="text"
            placeholder="Search student or objective..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-none bg-black border border-white/15 font-bold text-white placeholder-zinc-500 focus:border-[#cbff00] focus:outline-none transition font-sans text-sm"
          />
          <Search className="absolute left-4 top-3 w-4 h-4 text-zinc-500 group-hover:text-zinc-400 transition" />
        </div>

        {/* Filters Controls block */}
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#cbff00] font-mono font-bold uppercase tracking-wider shrink-0">
              Exam Target:
            </span>
            <select
              value={filteredUnit}
              onChange={(e) => setFilteredUnit(e.target.value)}
              className="px-3 py-2 rounded-none bg-black border border-white/15 text-zinc-200 text-xs font-bold focus:border-[#cbff00] focus:outline-none transition group-hover:bg-zinc-950 font-sans cursor-pointer"
            >
              <option value="all">All Exams</option>
              <option value="1">Exam 1 (Unit 1)</option>
              <option value="2">Exam 2 (Unit 2)</option>
              <option value="3">Exam 3 (Unit 3)</option>
              <option value="4">Exam 4 (Unit 4)</option>
            </select>
          </div>

          <label className="inline-flex items-center gap-2 cursor-pointer select-none border border-white/10 bg-black hover:bg-zinc-900 px-3 py-2 rounded-none transition">
            <input
              type="checkbox"
              checked={isNotebookOnly}
              onChange={(e) => setIsNotebookOnly(e.target.checked)}
              className="rounded-none bg-black border-white/20 text-[#cbff00] focus:ring-0 focus:ring-opacity-0 accent-[#cbff00] w-4 h-4 cursor-pointer"
            />
            <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-[#cbff00]" />
              Live Notebooks Only
            </span>
          </label>
        </div>
      </div>

      {/* Dynamic Matrix statistics banner */}
      <div className="flex justify-between items-center px-2">
        <span className="text-xs text-zinc-400 font-mono font-medium">
          Found <span className="text-[#cbff00] font-bold">{processedAssignments.length}</span> assigned objectives of <span className="text-zinc-500">{RAW_ASSIGNMENTS.length} total</span>
        </span>
        <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase hidden sm:inline">
          Roster distribution updated 2026
        </span>
      </div>

      {/* Big Responsive Grid Scroll Matrix */}
      <div className="rounded-none border border-white/10 bg-[#121212] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-black text-zinc-450 font-mono text-[9px] uppercase font-bold tracking-widest select-none">
                <th className="py-4 px-6 cursor-pointer hover:text-white transition" onClick={() => handleSort("student")}>
                  <span className="flex items-center gap-1.5">
                    Student Name {sortField === "student" && (sortDirection === "asc" ? "↑" : "↓")}
                  </span>
                </th>
                <th className="py-4 px-3 cursor-pointer hover:text-white transition w-28" onClick={() => handleSort("unit")}>
                  <span className="flex items-center gap-1.5">
                    Unit {sortField === "unit" && (sortDirection === "asc" ? "↑" : "↓")}
                  </span>
                </th>
                <th className="py-4 px-3 cursor-pointer hover:text-white transition w-32" onClick={() => handleSort("chapter")}>
                  <span className="flex items-center gap-1.5">
                    Chapter {sortField === "chapter" && (sortDirection === "asc" ? "↑" : "↓")}
                  </span>
                </th>
                <th className="py-4 px-4 cursor-pointer hover:text-white transition w-36" onClick={() => handleSort("dueDate")}>
                  <span className="flex items-center gap-1.5">
                    Due Date {sortField === "dueDate" && (sortDirection === "asc" ? "↑" : "↓")}
                  </span>
                </th>
                <th className="py-4 px-6">Assigned Objective Learning Outcome</th>
                <th className="py-4 px-6 text-center w-40">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {processedAssignments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500 font-light font-mono text-xs uppercase">
                    No learning outcomes found matching your criteria.
                  </td>
                </tr>
              ) : (
                processedAssignments.map((row) => {
                  const pairedNotebook = getNotebookForObjective(row.objective);
                  return (
                    <tr
                      key={`${row.student}-${row.unit}`}
                      className={`hover:bg-white/[0.02] transition duration-150 ${
                        pairedNotebook ? "bg-[#cbff00]/[0.015]" : ""
                      }`}
                    >
                      {/* Student name */}
                      <td className="py-4 px-6 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-none bg-black border border-white/10 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                              {row.student.charAt(0)}
                            </span>
                          </div>
                          <span>{row.student}</span>
                        </div>
                      </td>

                      {/* Unit badge */}
                      <td className="py-4 px-3">
                        <span className="px-2 py-0.5 bg-black border border-white/5 text-[#cbff00] font-mono text-[11px] font-bold rounded-none">
                          Unit {row.unit}
                        </span>
                      </td>

                      {/* Chapter badge */}
                      <td className="py-4 px-3">
                        <span className="px-2 py-0.5 bg-black border border-white/5 text-zinc-300 font-mono text-[11px] rounded-none">
                          Ch {row.chapter}
                        </span>
                      </td>

                      {/* Due date */}
                      <td className="py-4 px-4 text-zinc-400 font-mono text-xs">
                        {row.dueDate}
                      </td>

                      {/* Learning objective */}
                      <td className="py-4 px-6 text-zinc-250 text-xs font-light leading-relaxed max-w-sm">
                        {row.objective}
                      </td>

                      {/* Notebook Link or Status Badge */}
                      <td className="py-4 px-6 text-center">
                        {pairedNotebook ? (
                          <div className="inline-flex items-center justify-center">
                            <a
                              href={pairedNotebook.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 text-[10px] font-bold text-[#cbff00] hover:text-black bg-[#cbff00]/5 border border-[#cbff00]/25 hover:bg-[#cbff00] hover:border-[#cbff00] rounded-none transition flex items-center gap-1 uppercase tracking-widest"
                            >
                              <Sparkles className="w-3 h-3 stroke-[2]" />
                              Notebook
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            </a>
                          </div>
                        ) : (
                          <span className="text-[9px] font-mono font-bold uppercase text-zinc-500 px-2.5 py-1 rounded-none bg-black/40 border border-white/5 inline-block tracking-wider">
                            Assigned
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

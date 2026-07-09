import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { RAW_ASSIGNMENTS } from "./src/data/students";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // API Route to fetch active notebooks dynamically
  app.get("/api/notebooks", (req, res) => {
    try {
      const filePath = path.join(process.cwd(), "src", "data", "notebooks.json");
      if (fs.existsSync(filePath)) {
        const text = fs.readFileSync(filePath, "utf-8");
        return res.json(JSON.parse(text));
      }
      res.json([]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API Route to sync notebooks from Google Docs URL
  app.post("/api/sync-notebooks", async (req, res) => {
    try {
      console.log("Initiating sync with Google Doc template...");
      const targetUrl = 'https://docs.google.com/document/d/19AK_jiwa2sKP6SNqZy2fgrJFcSNz8TNWkHVXW6358J0/export?format=txt';
      
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`Google Docs fetch failed with status: ${response.status} ${response.statusText}`);
      }
      
      const text = await response.text();
      console.log(`Fetched Google Doc text. Parsing...`);
      
      const parsedNotebooks: any[] = [];
      const unitSections = text.split(/Unit\s*(?:#)?\s*(\d+):?/i);

      for (let i = 1; i < unitSections.length; i += 2) {
        const unitNum = parseInt(unitSections[i]);
        const unitContent = unitSections[i + 1] || "";
        
        // Split content by looking ahead for a numbered list item (e.g., "1. Describe...")
        const parts = unitContent.split(/(?=\b\d+\.\s+)/);
        for (let part of parts) {
          part = part.trim();
          if (!part) continue;
          
          const numMatch = part.match(/^(\d+)\.\s+/);
          if (!numMatch) continue;
          
          const urlMatch = part.match(/(https?:\/\/\S+)/);
          if (urlMatch) {
            const url = urlMatch[1].trim();
            
            // Special rule: Remove the duplicate natural sciences notebook from Unit 3 (belongs only to Unit 1)
            if (unitNum === 3 && url.includes("ea1f8d98")) {
              console.log("Skipping duplicate natural sciences notebook from Unit 3");
              continue;
            }

            // Standard syllabus notebooks are exclusively NotebookLM links. Filter out games/artifacts listed in the syllabus under Unit 4.
            if (!url.includes("notebooklm.google.com")) {
              console.log(`Skipping non-NotebookLM link from standard parsing: ${url}`);
              continue;
            }

            const objPart = part.substring(0, part.indexOf(urlMatch[1]));
            const objective = objPart.replace(/^\d+\.\s*/, "").trim().replace(/[\s\.\?,\!]+$/, "");
            
            parsedNotebooks.push({
              objective,
              url,
              unit: unitNum,
              authors: []
            });
          }
        }
      }

      // Define Extra Credit Games precisely with their correct URLs and authors as requested
      const extraCreditGames = [
        {
          objective: "Chemical MatchMaker",
          url: "https://ai.studio/apps/9a7a8ba0-b730-4dd0-90ce-8f03496b5d5b",
          unit: 5,
          authors: ["Aya Anodjo"]
        },
        {
          objective: "Metabolic Accounting",
          url: "https://effulgent-daifuku-414318.netlify.app/",
          unit: 5,
          authors: ["Alia Zahir"]
        },
        {
          objective: "Unlock Levels of Life",
          url: "https://view.genially.com/6a428676fc25b8043ef84f29",
          unit: 5,
          authors: ["Jennifer Sanchez"]
        },
        {
          objective: "Adaptive Population Simulator",
          url: "/adaptive-population-simulator.html",
          unit: 5,
          authors: ["Allysa Angelo"]
        },
        {
          objective: "Photon Pimball",
          url: "https://claude.ai/public/artifacts/61bf3369-207e-43bb-b1b7-491cc147e841",
          unit: 5,
          authors: ["Sharissa Richard"]
        }
      ];
      parsedNotebooks.push(...extraCreditGames);

      // Add manually injected notebooks that are not yet in the Google Doc template
      const manualNotebooks = [
        {
          objective: "Describe prokaryotic gene regulation at the transcriptional level.",
          url: "https://notebooklm.google.com/notebook/228d7264-4c23-45cd-a897-dec23f52fb42",
          unit: 4,
          authors: []
        }
      ];
      parsedNotebooks.push(...manualNotebooks);

      console.log(`Parsed ${parsedNotebooks.length} notebooks. Resolving authors...`);

      // Match with syllabus/student assignments
      for (const nb of parsedNotebooks) {
        if (nb.unit === 5) {
          continue; // Keep authors as defined above
        }
        const nbNorm = nb.objective.toLowerCase().trim().replace(/[\s\.\?,\!]+/g, " ");
        
        const matches = RAW_ASSIGNMENTS.filter(asg => {
          const asgNorm = asg.objective.toLowerCase().trim().replace(/[\s\.\?,\!]+/g, " ");
          return asgNorm === nbNorm || asgNorm.includes(nbNorm) || nbNorm.includes(asgNorm);
        });

        if (matches.length > 0) {
          nb.authors = Array.from(new Set(matches.map(m => m.student)));
          const exactMatch = matches.find(m => m.objective.toLowerCase().trim().replace(/[\s\.\?,\!]+/g, " ") === nbNorm);
          if (exactMatch) {
            nb.objective = exactMatch.objective;
          } else {
            nb.objective = matches[0].objective;
          }
        } else {
          nb.authors = ["Independent Study"];
        }
      }

      // Helper to match chapter for sorting
      const getChapterForObjective = (objective: string): number => {
        const normObj = objective.toLowerCase().trim().replace(/[\s\.\?,\!]+/g, " ").replace(/\.$/, "");
        const match = RAW_ASSIGNMENTS.find(a => {
          const aNorm = a.objective.toLowerCase().trim().replace(/[\s\.\?,\!]+/g, " ").replace(/\.$/, "");
          return aNorm === normObj || aNorm.includes(normObj) || normObj.includes(aNorm);
        });
        return match ? match.chapter : 999;
      };

      // Sort notebooks: 1) Unit ascending, 2) Chapter ascending, 3) Objective text ascending
      parsedNotebooks.sort((a, b) => {
        if (a.unit !== b.unit) {
          return a.unit - b.unit;
        }
        const chA = getChapterForObjective(a.objective);
        const chB = getChapterForObjective(b.objective);
        if (chA !== chB) {
          return chA - chB;
        }
        return a.objective.localeCompare(b.objective);
      });

      console.log(`Persisting refreshed notebooks into src/data/notebooks.json...`);
      const outPath = path.join(process.cwd(), "src", "data", "notebooks.json");
      fs.writeFileSync(outPath, JSON.stringify(parsedNotebooks, null, 2), "utf-8");

      // Also persist to build path if running in server container mode
      const distOutPath = path.join(process.cwd(), "dist", "src", "data");
      if (fs.existsSync(distOutPath)) {
        fs.writeFileSync(path.join(distOutPath, "notebooks.json"), JSON.stringify(parsedNotebooks, null, 2), "utf-8");
      }

      res.json({
        success: true,
        count: parsedNotebooks.length,
        notebooks: parsedNotebooks
      });
    } catch (error: any) {
      console.error("Failed to sync notebooks:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Serve static assets or mount Vite dev handler
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in development mode with Vite HMR integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in production mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();

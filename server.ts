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
      
      const lines = text.split("\n");
      const parsedNotebooks: any[] = [];
      let currentUnit = 1;
      let pendingObjective = "";

      for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Extract Unit context
        const unitMatch = line.match(/Unit\s*(?:#)?\s*(\d+)/i);
        if (unitMatch) {
          currentUnit = parseInt(unitMatch[1]);
          pendingObjective = "";
          continue;
        }

        // Extract numbered objective list items (e.g. "1. Describe nucleic acid structure...")
        const objMatch = line.match(/^\d+\.\s*(.*)/);
        if (objMatch) {
          const content = objMatch[1].trim();
          if (content.length > 2) {
            pendingObjective = content;
          }
          continue;
        }

        // Extract Notebook URLs (always starting with http or https)
        if (line.startsWith("http://") || line.startsWith("https://")) {
          if (pendingObjective) {
            parsedNotebooks.push({
              objective: pendingObjective,
              url: line,
              unit: currentUnit,
              authors: []
            });
            pendingObjective = "";
          }
        }
      }

      console.log(`Parsed ${parsedNotebooks.length} notebooks. Resolving authors...`);

      // Match with syllabus/student assignments
      for (const nb of parsedNotebooks) {
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

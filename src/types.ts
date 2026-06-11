export interface Assignment {
  student: string;
  unit: number;
  exam: string;
  dueDate: string;
  chapter: number;
  objective: string;
  notebookUrl?: string; // Optional URL if this objective has a notebook created for it
}

export interface NotebookLM {
  objective: string;
  url: string;
  unit: number;
  authors: string[];
}

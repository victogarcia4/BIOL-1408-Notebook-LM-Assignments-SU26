import { Assignment, NotebookLM } from "../types";

import builtNotebooksJson from "./notebooks.json";

export const BUILT_NOTEBOOKS: NotebookLM[] = builtNotebooksJson as NotebookLM[];

export const RAW_ASSIGNMENTS: Assignment[] = [
  {
    student: "Terrane Goosby",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 2,
    objective: "Explain why carbon is important for life."
  },
  {
    student: "Terrane Goosby",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Describe how cancer is caused by uncontrolled cell growth."
  },
  {
    student: "Terrane Goosby",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 9,
    objective: "Describe three life-cycle types among sexually reproducing multicellular organisms."
  },
  {
    student: "Terrane Goosby",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Explain how gene-expression changes can disrupt the cell cycle."
  },
  {
    student: "Laura Williams",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 2,
    objective: "Explain why water is an excellent solvent."
  },
  {
    student: "Laura Williams",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 6,
    objective: "Describe how feedback inhibition affects production of an intermediate or product."
  },
  {
    student: "Laura Williams",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 9,
    objective: "Describe the cellular events that occur during meiosis."
  },
  {
    student: "Laura Williams",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Explain post-translational control of gene expression."
  },
  {
    student: "Dev Prieto",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Differentiate between saturated and unsaturated fatty acids."
  },
  {
    student: "Dev Prieto",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 7,
    objective: "Identify the substrates and products of photosynthesis."
  },
  {
    student: "Dev Prieto",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 12,
    objective: "Discuss similarities and differences in DNA replication between eukaryotes and prokaryotes."
  },
  {
    student: "Dev Prieto",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Explain how chromatin remodeling controls transcriptional access."
  },
  {
    student: "Allyssa Angelo",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 4,
    objective: "Describe the role of cells in organisms."
  },
  {
    student: "Allyssa Angelo",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Describe how tumor suppressors function."
  },
  {
    student: "Allyssa Angelo",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 9,
    objective: "Describe chromosome behavior during meiosis and differences between the first and second meiotic divisions."
  },
  {
    student: "Allyssa Angelo",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Describe how changes to gene expression can cause cancer."
  },
  {
    student: "Maqueila Garcia",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 4,
    objective: "State the role of the plasma membrane."
  },
  {
    student: "Maqueila Garcia",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 5,
    objective: "Describe endocytosis, including phagocytosis, pinocytosis, and receptor-mediated endocytosis."
  },
  {
    student: "Maqueila Garcia",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 12,
    objective: "Explain the Sanger method of DNA sequencing."
  },
  {
    student: "Maqueila Garcia",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Describe the importance of RNA stability in gene regulation."
  },
  {
    student: "Mikayla Vance",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Discuss the role of carbohydrates in cells and extracellular materials."
  },
  {
    student: "Mikayla Vance",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 6,
    objective: "Explain why metabolic pathways are not closed systems."
  },
  {
    student: "Mikayla Vance",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 9,
    objective: "Identify variation among offspring as an evolutionary advantage of sexual reproduction."
  },
  {
    student: "Mikayla Vance",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 14,
    objective: "Connect nutrition concepts to energy production and health."
  },
  {
    student: "Alia Zahir",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "List common monosaccharides, disaccharides, and polysaccharides."
  },
  {
    student: "Alia Zahir",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Distinguish between chromosomes, genes, and traits."
  },
  {
    student: "Alia Zahir",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 11,
    objective: "Compare disorders caused by aneuploidy."
  },
  {
    student: "Alia Zahir",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Understand the process of translation and its key factors."
  },
  {
    student: "Keundria Harbin",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 4,
    objective: "Describe the structure of eukaryotic cells."
  },
  {
    student: "Keundria Harbin",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Describe the three stages of interphase."
  },
  {
    student: "Keundria Harbin",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 10,
    objective: "Describe the scientific reasons for Mendel’s experimental success."
  },
  {
    student: "Keundria Harbin",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Describe prokaryotic gene regulation at the transcriptional level."
  },
  {
    student: "Sharissa Richard",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Describe nucleic acid structure and define the two types of nucleic acids."
  },
  {
    student: "Sharissa Richard",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 6,
    objective: "Describe how electrons move through the electron transport chain and how their energy levels change."
  },
  {
    student: "Sharissa Richard",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 11,
    objective: "Describe genetic linkage."
  },
  {
    student: "Sharissa Richard",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 14,
    objective: "Describe how digestive regulation supports homeostasis."
  },
  {
    student: "Jennifer Sanchez Ortega",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 1,
    objective: "Describe the goals of basic science and applied science."
  },
  {
    student: "Jennifer Sanchez Ortega",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 6,
    objective: "Describe the overall molecular result of glycolysis."
  },
  {
    student: "Jennifer Sanchez Ortega",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 11,
    objective: "Discuss Sutton’s Chromosomal Theory of Inheritance."
  },
  {
    student: "Jennifer Sanchez Ortega",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Describe how DNA access is controlled by histone modification."
  },
  {
    student: "Dubon Tabora Dubon Tabora",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Describe the functions proteins perform in cells and tissues."
  },
  {
    student: "Dubon Tabora Dubon Tabora",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 6,
    objective: "Describe fermentation in animal cells and the conditions that initiate it."
  },
  {
    student: "Dubon Tabora Dubon Tabora",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 9,
    objective: "Explain that meiosis and sexual reproduction are highly evolved traits."
  },
  {
    student: "Dubon Tabora Dubon Tabora",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Describe how the initiation complex controls translation."
  },
  {
    student: "Alexa Hernandez",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Define the basic structure of a steroid and some steroid functions."
  },
  {
    student: "Alexa Hernandez",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Understand internal and external cell cycle controls."
  },
  {
    student: "Alexa Hernandez",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 10,
    objective: "Explain relationships between genotypes and phenotypes in dominant and recessive gene systems."
  },
  {
    student: "Alexa Hernandez",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Describe how DNA methylation is related to epigenetic gene changes."
  },
  {
    student: "Jai'lah Rolland",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 1,
    objective: "Describe the levels of organization among living things."
  },
  {
    student: "Jai'lah Rolland",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 6,
    objective: "Explain how a proton gradient is established and maintained by the electron transport chain."
  },
  {
    student: "Jai'lah Rolland",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 10,
    objective: "Develop a Punnett square for monohybrid genotype and phenotype proportions."
  },
  {
    student: "Jai'lah Rolland",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Understand RNA splicing and its role in regulating gene expression."
  },
  {
    student: "Juan Manzano",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Understand macromolecule synthesis."
  },
  {
    student: "Juan Manzano",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Describe positive and negative molecules that regulate the cell cycle."
  },
  {
    student: "Juan Manzano",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 10,
    objective: "Explain effects of linkage and recombination on gamete genotypes."
  },
  {
    student: "Juan Manzano",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Describe steps involved in prokaryotic gene regulation."
  },
  {
    student: "Aya Anodjo Epse Kone",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Describe phospholipids and their role in cells."
  },
  {
    student: "Aya Anodjo Epse Kone",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Explain the three internal control checkpoints."
  },
  {
    student: "Aya Anodjo Epse Kone",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 11,
    objective: "Calculate distances between three genes on a chromosome using a three-point test cross."
  },
  {
    student: "Aya Anodjo Epse Kone",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Discuss why every cell does not express all genes all the time."
  },
  {
    student: "Valeria Montano Olvera",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Explain dehydration or condensation and hydrolysis reactions."
  },
  {
    student: "Valeria Montano Olvera",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Explain how cytoplasmic content is divided during cytokinesis."
  },
  {
    student: "Valeria Montano Olvera",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 12,
    objective: "Explain transformation of DNA."
  },
  {
    student: "Valeria Montano Olvera",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Describe how DNA access is controlled by histone modification."
  },
  {
    student: "Haley Fortune",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 4,
    objective: "Compare and contrast prokaryotic and eukaryotic cells."
  },
  {
    student: "Haley Fortune",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 6,
    objective: "Identify the mechanism controlling electron transport rate."
  },
  {
    student: "Haley Fortune",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 9,
    objective: "Explain differences between meiosis and mitosis."
  },
  {
    student: "Haley Fortune",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Understand RNA splicing and its role in regulating gene expression."
  },
  {
    student: "Nadia Chavarria",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 2,
    objective: "Describe the properties of water that are critical to maintaining life."
  },
  {
    student: "Nadia Chavarria",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 6,
    objective: "Discuss the difference between anaerobic cellular respiration and fermentation."
  },
  {
    student: "Nadia Chavarria",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 10,
    objective: "Use the forked-line method and probability rules for multiple-gene crosses."
  },
  {
    student: "Nadia Chavarria",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Describe how changes to gene expression can cause cancer."
  },
  {
    student: "Carlos Martinez",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Explain the four levels of protein organization."
  },
  {
    student: "Carlos Martinez",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 7,
    objective: "Explain how plants absorb energy from sunlight."
  },
  {
    student: "Carlos Martinez",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 10,
    objective: "Apply sum and product rules to calculate probabilities."
  },
  {
    student: "Carlos Martinez",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Explain how enhancers and repressors regulate gene expression."
  },
  {
    student: "Alejandra Crispin",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 1,
    objective: "Identify the shared characteristics of the natural sciences."
  },
  {
    student: "Alejandra Crispin",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 5,
    objective: "Describe phospholipid, protein, and carbohydrate functions in membranes."
  },
  {
    student: "Alejandra Crispin",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 9,
    objective: "Explain mechanisms in meiosis that produce genetic variation among haploid gametes."
  },
  {
    student: "Alejandra Crispin",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 14,
    objective: "Explain broad concepts involving digestive systems and nutrition."
  },
  {
    student: "Jay Resendez",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 1,
    objective: "List examples of different subdisciplines in biology."
  },
  {
    student: "Jay Resendez",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Describe binary fission in prokaryotes."
  },
  {
    student: "Jay Resendez",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 10,
    objective: "Explain Mendel’s laws of segregation and independent assortment."
  },
  {
    student: "Jay Resendez",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 14,
    objective: "Connect nutrition concepts to energy production and health."
  },
  {
    student: "Mason Stallons",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Explain DNA structure and role."
  },
  {
    student: "Mason Stallons",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 5,
    objective: "Discuss membrane fluidity."
  },
  {
    student: "Mason Stallons",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 12,
    objective: "Describe the Meselson and Stahl experiments."
  },
  {
    student: "Mason Stallons",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Discuss the role of transcription factors in gene regulation."
  },
  {
    student: "Mary Jane Kononen",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Describe the four major types of lipids."
  },
  {
    student: "Mary Jane Kononen",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Define the quiescent G0 phase."
  },
  {
    student: "Mary Jane Kononen",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 10,
    objective: "Identify non-Mendelian inheritance patterns."
  },
  {
    student: "Mary Jane Kononen",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Discuss eukaryotic gene regulation at epigenetic, transcriptional, post-transcriptional, translational, and post-translational levels."
  },
  {
    student: "Karen Arreguin",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 2,
    objective: "Explain how naturally occurring elements combine to create molecules, cells, tissues, organ systems, and organisms."
  },
  {
    student: "Karen Arreguin",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 5,
    objective: "Compare internal receptors with cell-surface receptors."
  },
  {
    student: "Karen Arreguin",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 12,
    objective: "State and explain Chargaff’s rules."
  },
  {
    student: "Karen Arreguin",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Discuss eukaryotic gene regulation at epigenetic, transcriptional, post-transcriptional, translational, and post-translational levels."
  },
  {
    student: "Troi Bailey",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 2,
    objective: "Describe the role of functional groups in biological molecules."
  },
  {
    student: "Troi Bailey",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 8,
    objective: "Describe the mechanisms of chromosome compaction."
  },
  {
    student: "Troi Bailey",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 12,
    objective: "Discuss similarities and differences between eukaryotic and prokaryotic DNA."
  },
  {
    student: "Troi Bailey",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 14,
    objective: "Explain broad concepts involving digestive systems and nutrition."
  },
  {
    student: "Walter Castillo",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Explain carbohydrate classifications."
  },
  {
    student: "Walter Castillo",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 7,
    objective: "Describe the Calvin cycle."
  },
  {
    student: "Walter Castillo",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 11,
    objective: "Explain homologous recombination or crossing over."
  },
  {
    student: "Walter Castillo",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Discuss how understanding gene-expression regulation can lead to better drug design."
  },
  {
    student: "Warren Haudek",
    unit: 1,
    exam: "Exam 1",
    dueDate: "June 16, 2026",
    chapter: 3,
    objective: "Explain RNA structure and roles."
  },
  {
    student: "Warren Haudek",
    unit: 2,
    exam: "Exam 2",
    dueDate: "June 24, 2026",
    chapter: 5,
    objective: "Recognize the relationship between a ligand’s structure and its mechanism of action."
  },
  {
    student: "Warren Haudek",
    unit: 3,
    exam: "Exam 3",
    dueDate: "July 2, 2026",
    chapter: 10,
    objective: "Explain phenotypic outcomes of epistatic effects between genes."
  },
  {
    student: "Warren Haudek",
    unit: 4,
    exam: "Exam 4",
    dueDate: "July 8, 2026",
    chapter: 13,
    objective: "Explain the roles of activators, inducers, and repressors in gene regulation."
  }
];

// Helper to check if an assignment has a built notebook
export function getNotebookForObjective(objectiveText: string): NotebookLM | undefined {
  const normalizedText = objectiveText.toLowerCase().trim().replace(/\.$/, "");
  return BUILT_NOTEBOOKS.find(nb => {
    const normNb = nb.objective.toLowerCase().trim().replace(/\.$/, "");
    return normNb === normalizedText;
  });
}

// All curriculum data parsed from the four DOCX regulations
// L = Lecture, T = Tutorial, P = Practical, SL = Self Learning, C = Credits
// `ai` flag highlights AI/ML-track courses

export type Course = {
  code?: string;
  title: string;
  replacedTitle?: string;
  L?: number | string;
  T?: number | string;
  P?: number | string;
  SL?: number | string;
  C: number | string;
  category?: string;
  ai?: boolean;
  highlight?: string; // for AI-Adoption notes (e.g. "Generative AI & LLMs")
};

export type Semester = {
  id: string;          // url slug
  label: string;       // "I Year — I Semester"
  short: string;       // "I-I"
  totalCredits: number | string;
  notes?: string;
  courses: Course[];
};

export type Regulation = {
  id: string;
  code: string;        // "R22-C22"
  title: string;
  description: string;
  accent: 'cyan' | 'amber' | 'violet' | 'mint';
  semesters: Semester[];
};

const aiKeywords = [
  'Artificial Intelligence', 'Machine Learning', 'Deep Learning',
  'Neural Network', 'NLP', 'Natural Language', 'Computer Vision', 'Reinforcement Learning',
  'Generative AI', 'Agentic', 'LLM', 'MLOps', 'Big Data', 'Data Engineering',
  'Data Visualization', 'Data Science', 'Optimization Techniques',
  'Linear Algebra for ML', 'Search Methods', 'Cloud Computing for AI',
  'AI Governance', 'Multi-Agentic', 'Agentic AI Tools', 'AI Tools',
  'Prompt Engineering', 'Text Mining', 'Knowledge Representation',
];
// Use word-boundary matching for short tokens like "AI" / "ML" to avoid false positives
const aiTokenRegex = /\b(AI|ML)\b/i;
const isAI = (t: string) =>
  aiTokenRegex.test(t) ||
  aiKeywords.some(k => t.toLowerCase().includes(k.toLowerCase()));

const tag = (c: Omit<Course, 'ai'>): Course => ({ ...c, ai: isAI(c.title) });

// ────────────────────────────────────────────────────────────────────────────
// R25-C26 (latest, full 4-year program with R25 regulation)
// ────────────────────────────────────────────────────────────────────────────
const R25_C26_PRE: Semester = {
  id: 'pre', label: 'I Year — Pre-Semester (Induction Program)', short: 'Pre', totalCredits: 4,
  courses: [
    tag({ title: 'Orientation Program (Induction Program)', L:0, T:2, P:0, SL:0, C:1, category: 'Binary Graded' }),
    tag({ title: 'Mathematics', L:0, T:2, P:0, SL:0, C:1, category: 'Basic Sciences' }),
    tag({ title: 'English Communication', L:0, T:2, P:0, SL:0, C:1, category: 'Humanities' }),
    tag({ title: 'Humanities Course', L:0, T:2, P:0, SL:0, C:1, category: 'Humanities' }),
  ],
};

const R25_C25_PRE: Semester = {
  id: 'pre', label: 'I Year — Pre-Semester', short: 'Pre', totalCredits: 3,
  courses: [
    tag({ code: '25SA101', title: 'Orientation Program (Induction Program)', L:0, T:2, P:0, SL:0, C: 1, category: 'Binary Graded' }),
    tag({ title: 'Binary Graded Course – 1', C: 1, category: 'Binary Graded' }),
    tag({ title: 'Binary Graded Course – 2', C: 1, category: 'Binary Graded' }),
  ],
};

const R25_C26_I_I: Semester = {
  id: '1-1', label: 'I Year — I Semester', short: 'I-I', totalCredits: 24,
  courses: [
    tag({ title: 'Linear Algebra', L:3,T:2,P:0,SL:3,C:4, category: 'Basic Sciences' }),
    tag({ title: 'Engineering Chemistry', L:3,T:0,P:2,SL:3,C:4, category: 'Basic Sciences' }),
    tag({ title: 'Programming in C', L:2,T:0,P:4,SL:2,C:4, category: 'Basic Engineering' }),
    tag({ title: 'Basic of Electrical & Electronics Engineering', L:2,T:0,P:2,SL:2,C:3, category: 'Basic Engineering' }),
    { ...tag({ title: 'Agentic Tools', L:0,T:2,P:2,SL:0,C:2, category: 'Basic Engineering' }), ai: true, highlight: 'Agentic AI Tools' },
    tag({ title: 'Management Studies', L:2,T:2,P:0,SL:2,C:3, category: 'Humanities' }),
    tag({ title: 'English Proficiency & Communication Skills (PET)', L:0,T:0,P:2,SL:0,C:1, category: 'Humanities' }),
    tag({ title: 'Binary Graded Course – 1', L:0,T:0,P:2,SL:0,C:1, category: 'Binary Graded' }),
    tag({ title: 'Binary Graded Course – 2', L:0,T:0,P:2,SL:0,C:1, category: 'Binary Graded' }),
    tag({ title: 'Binary Graded Course – 3', L:0,T:0,P:2,SL:0,C:1, category: 'Binary Graded' }),
  ],
};

const R25_C26_I_II: Semester = {
  id: '1-2', label: 'I Year — II Semester', short: 'I-II', totalCredits: 24,
  courses: [
    tag({ title: 'Calculus and Ordinary Differential Equations', L:3,T:2,P:0,SL:3,C:4, category: 'Basic Sciences' }),
    tag({ title: 'Engineering Physics', L:3,T:0,P:2,SL:3,C:4, category: 'Basic Sciences' }),
    tag({ title: 'Engineering Drawing', L:2,T:0,P:2,SL:2,C:3, category: 'Basic Engineering' }),
    { ...tag({ title: 'Python Programming Essentials', L:1,T:2,P:2,SL:1,C:3, category: 'Basic Engineering' }), ai: true },
    tag({ title: 'Technical English Communication', L:1,T:0,P:2,SL:1,C:2, category: 'Humanities' }),
    tag({ title: 'Environmental Studies', L:2,T:2,P:0,SL:2,C:3, category: 'Basic Sciences' }),
    tag({ title: 'Cyber Security', L:0,T:1,P:1,SL:0,C:1, category: 'Basic Engineering' }),
    tag({ title: 'Binary Graded Course – 1', L:0,T:0,P:2,SL:0,C:1, category: 'Binary Graded' }),
    tag({ title: 'Binary Graded Course – 2', L:0,T:0,P:2,SL:0,C:1, category: 'Binary Graded' }),
    tag({ title: 'Binary Graded Course – 3', L:0,T:0,P:2,SL:0,C:1, category: 'Binary Graded' }),
    tag({ title: 'Binary Graded Course – 4', L:0,T:0,P:2,SL:0,C:1, category: 'Binary Graded' }),
  ],
};

const R25_C25_I_II: Semester = {
  id: '1-2', label: 'I Year — II Semester', short: 'I-II', totalCredits: 24,
  courses: [
    tag({ title: 'Mathematics – II', L:3,T:1,P:0,C:4, category: 'Basic Sciences' }),
    tag({ title: 'Physics / Chemistry', L:3,T:0,P:2,C:4, category: 'Basic Sciences' }),
    { ...tag({ title: 'Python Programming', L:2,T:0,P:2,C:3, category: 'Basic Engineering' }), ai: true },
    tag({ title: 'Basic Electrical & Electronics / Engineering Graphics', L:2,T:0,P:2,C:3, category: 'Basic Engineering' }),
    tag({ title: 'Technical English Communication', L:1,T:0,P:2,C:2, category: 'Humanities' }),
    tag({ title: 'Environmental / Management Studies', L:3,T:0,P:0,C:3, category: 'Humanities' }),
    tag({ title: 'Cyber Security', L:1,T:0,P:0,C:1, category: 'Basic Engineering' }),
    tag({ title: 'Binary Graded Courses (4)', C:4, category: 'Binary Graded' }),
  ],
};

const R25_C26_II_I: Semester = {
  id: '2-1', label: 'II Year — I Semester', short: 'II-I', totalCredits: 24,
  courses: [
    tag({ title: 'Statistical Foundations for Machine Learning', L:2,T:0,P:2,SL:2,C:3, category: 'Basic Sciences' }),
    tag({ title: 'Optimization Techniques for Artificial Intelligence', L:2,T:0,P:2,SL:2,C:3, category: 'Basic Sciences' }),
    tag({ title: 'Data Engineering Foundations', L:0,T:2,P:2,SL:0,C:2, category: 'Professional Core-1' }),
    tag({ title: 'Data Structures', L:2,T:2,P:2,SL:2,C:4, category: 'Basic Engineering' }),
    tag({ title: 'Design Thinking and Engineering Orientation', L:0,T:2,P:0,SL:0,C:1, category: 'Basic Engineering' }),
    tag({ title: 'AI Search Methods for Problem Solving', L:2,T:0,P:2,SL:2,C:3, category: 'Professional Core-2' }),
    tag({ title: 'Database Management Systems', L:2,T:2,P:2,SL:2,C:4, category: 'Professional Core-3' }),
    tag({ title: 'Object Oriented Programming', L:3,T:0,P:2,SL:2,C:4, category: 'Professional Core-4' }),
  ],
};

const R25_C25_II_I: Semester = {
  id: '2-1', label: 'II Year — I Semester', short: 'II-I', totalCredits: 24,
  courses: [
    tag({ title: 'Statistical Foundations for Machine Learning', L:3,T:0,P:2,SL:2,C:4, category: 'Basic Sciences' }),
    tag({ title: 'Optimization Techniques for Artificial Intelligence', L:2,T:0,P:2,SL:2,C:3, category: 'Basic Sciences' }),
    tag({ title: 'Data Engineering Foundations', L:0,T:2,P:2,SL:0,C:2, category: 'Professional Core-1' }),
    tag({ title: 'Data Structures', L:2,T:2,P:2,SL:2,C:4, category: 'Basic Engineering' }),
    { ...tag({ title: 'Industry Interface – I²C', replacedTitle: 'Design Thinking and Engineering Orientation', L:0,T:2,P:0,SL:0,C:1, category: 'Basic Engineering', highlight: 'Agentic AI Tools' }), ai: true },
    tag({ title: 'AI Search Methods for Problem Solving', L:2,T:0,P:2,SL:2,C:3, category: 'Professional Core-2' }),
    tag({ title: 'Database Management Systems', L:2,T:2,P:2,SL:2,C:4, category: 'Professional Core-3' }),
    tag({ title: 'Object Oriented Programming', L:3,T:0,P:2,SL:2,C:4, category: 'Professional Core-6' }),
  ],
};

const R25_C26_II_II: Semester = {
  id: '2-2', label: 'II Year — II Semester', short: 'II-II', totalCredits: 23,
  courses: [
    tag({ title: 'Linear Algebra for ML (Dept. Specific – Maths)', L:3,T:0,P:2,SL:2,C:4, category: 'Basic Sciences' }),
    tag({ title: 'Data Visualization (Industry Interface – I²C)', L:0,T:2,P:0,SL:0,C:1, category: 'Department Elective-I' }),
    tag({ title: 'Open Elective (NPTEL)', L:3,T:0,P:0,SL:3,C:3, category: 'Open Elective-I' }),
    tag({ title: 'Algorithm Design and Analysis', L:2,T:2,P:2,SL:2,C:4, category: 'Professional Core-5' }),
    tag({ title: 'Machine Learning', L:3,T:0,P:2,SL:3,C:4, category: 'Professional Core-6' }),
    tag({ title: 'Full Stack Development', L:2,T:0,P:4,SL:2,C:4, category: 'Professional Core-7' }),
    tag({ title: 'Digital Logic & Computer Organization', L:2,T:2,P:2,SL:2,C:4, category: 'Professional Core-8' }),
    tag({ title: 'Mini Project', C:1, category: 'Project' }),
  ],
};

const R25_C25_II_II: Semester = {
  id: '2-2', label: 'II Year — II Semester', short: 'II-II', totalCredits: 23,
  courses: [
    tag({ title: 'Linear Algebra for ML (Dept. Specific – Maths)', L:2,T:0,P:2,SL:2,C:3, category: 'Basic Sciences' }),
    tag({ title: 'Design Thinking and Engineering Orientation', replacedTitle: 'Industry Interface – I²C', L:0,T:2,P:0,SL:0,C:1, category: 'Department Elective-I' }),
    tag({ title: 'Open Elective (NPTEL)', L:3,T:0,P:0,SL:3,C:3, category: 'Open Elective-I' }),
    tag({ title: 'Algorithm Design and Analysis', L:2,T:2,P:2,SL:2,C:4, category: 'Professional Core-4' }),
    tag({ title: 'Machine Learning', L:3,T:0,P:2,SL:3,C:4, category: 'Professional Core-5' }),
    tag({ title: 'Operating Systems', L:2,T:0,P:2,SL:2,C:3, category: 'Professional Core' }),
    tag({ title: 'Digital Logic & Computer Organization', L:2,T:2,P:2,SL:2,C:4, category: 'Professional Core-7' }),
    tag({ title: 'Mini Project', C:1, category: 'Project' }),
  ],
};

const R25_C26_III_I: Semester = {
  id: '3-1', label: 'III Year — I Semester', short: 'III-I', totalCredits: 21,
  courses: [
    tag({ title: 'Soft Skills Laboratory', L:0,T:0,P:2,C:1, category: 'Humanities' }),
    tag({ title: 'Quantitative Aptitude and Logical Reasoning', L:0,T:2,P:0,C:1, category: 'Humanities' }),
    tag({ title: 'Machine Learning Operations (MLOps)', L:2,T:0,P:2,SL:3,C:3, category: 'Department Elective-2' }),
    tag({ title: 'Operating Systems', L:2,T:0,P:2,SL:2,C:3, category: 'Professional Core-9' }),
    tag({ title: 'Deep Learning', L:3,T:0,P:2,SL:3,C:4, category: 'Professional Core-10' }),
    tag({ title: 'Computer Vision', L:3,T:0,P:2,SL:2,C:4, category: 'Professional Core-11' }),
    tag({ title: 'Computer Networks', L:3,T:0,P:2,SL:3,C:4, category: 'Professional Core-12' }),
  ],
};

const R25_C26_III_II: Semester = {
  id: '3-2', label: 'III Year — II Semester', short: 'III-II', totalCredits: 20,
  courses: [
    tag({ title: 'Professional Communication Skills', L:0,T:0,P:2,C:1, category: 'Humanities' }),
    tag({ title: 'Cloud Computing', L:3,T:0,P:2,SL:3,C:4, category: 'Department Elective-3' }),
    tag({ title: 'Cloud Computing for AI', L:3,T:0,P:2,SL:3,C:4, category: 'Department Elective-4' }),
    tag({ title: 'NPTEL / Open Elective', L:3,T:0,P:0,SL:3,C:3, category: 'Open Elective-2' }),
    tag({ title: 'Natural Language Processing', L:2,T:0,P:2,SL:2,C:4, category: 'Professional Core-13' }),
    tag({ title: 'Big Data Analytics', L:2,T:0,P:2,SL:2,C:3, category: 'Professional Core-14' }),
    tag({ title: 'Project', C:1, category: 'Project' }),
  ],
};

const R25_C26_IV_I: Semester = {
  id: '4-1', label: 'IV Year — I Semester', short: 'IV-I', totalCredits: 17,
  courses: [
    tag({ title: 'Professional Ethics, AI Governance & Risk Assessment', L:1,T:2,P:0,SL:1,C:2, category: 'Humanities' }),
    tag({ title: 'Big Data Analytics', L:3,T:0,P:2,SL:3,C:4, category: 'Department Elective-5' }),
    tag({ title: 'IoT', L:3,T:0,P:2,SL:3,C:4, category: 'Department Elective-6' }),
    tag({ title: 'Work-in-Lieu (Research papers / Patents / Global certifications)', L:0,T:2,P:12,C:4, category: 'Department Elective-7' }),
    tag({ title: 'Open Elective', L:3,T:0,P:0,SL:3,C:3, category: 'Open Elective-3' }),
  ],
};

const R25_C26_IV_II: Semester = {
  id: '4-2', label: 'IV Year — II Semester', short: 'IV-II', totalCredits: 12,
  courses: [
    tag({ title: 'Project / Internship (Capstone)', L:0,T:2,P:22,C:12, category: 'Project / Internship' }),
  ],
};

const r25Semesters: Semester[] = [
  R25_C26_PRE, R25_C26_I_I, R25_C26_I_II,
  R25_C26_II_I, R25_C26_II_II,
  R25_C26_III_I, R25_C26_III_II,
  R25_C26_IV_I, R25_C26_IV_II,
];

const r25C25Semesters: Semester[] = [
  R25_C25_PRE, R25_C26_I_I, R25_C25_I_II,
  R25_C25_II_I, R25_C25_II_II,
  R25_C26_III_I, R25_C26_III_II,
  R25_C26_IV_I, R25_C26_IV_II,
];

// ────────────────────────────────────────────────────────────────────────────
// R22-C24 — Original + AI Adoption (only III & IV year defined in source)
// ────────────────────────────────────────────────────────────────────────────
const R22_C24_III_I: Semester = {
  id: '3-1', label: 'III Year — I Semester', short: 'III-I', totalCredits: 21,
  courses: [
    tag({ code: '24EN301', title: 'Professional Communication Skills', L:0,T:0,P:2,C:1, category: 'Humanities' }),
    tag({ code: '22AM301', title: 'Deep Learning', L:3,T:0,P:2,C:4, category: 'Professional Core' }),
    tag({ code: '22CS303', title: 'Web Technologies', L:2,T:0,P:4,C:4, category: 'Professional Core' }),
    tag({ code: '22TP301', title: 'Soft Skills Laboratory', L:0,T:0,P:2,C:1, category: 'Humanities' }),
    tag({ code: '24AM809', title: 'Industry Interface Course (Agentic AI Tools)', L:1,T:0,P:0,C:1, category: 'Department Elective', highlight: 'AI Adoption: Agentic AI Tools' }),
    tag({ title: 'Department Elective – 1 (Computer Vision)', L:3,T:0,P:2,C:4, category: 'Department Elective' }),
    tag({ title: 'Department Elective – 2 (MLOps)', L:2,T:0,P:2,C:3, category: 'Department Elective' }),
    tag({ title: 'Open Elective – 2 (NPTEL)', L:3,T:0,P:0,C:3, category: 'Open Elective' }),
  ],
};
const R22_C24_III_II: Semester = {
  id: '3-2', label: 'III Year — II Semester', short: 'III-II', totalCredits: 21,
  courses: [
    tag({ code: '24TP301', title: 'Quantitative Aptitude & Logical Reasoning', L:1,T:2,P:0,C:2, category: 'Humanities' }),
    tag({ code: '24AM301', title: 'Natural Language Processing', L:3,T:0,P:2,C:4, category: 'Professional Core' }),
    tag({ code: '22CY204', title: 'Computer Networks', L:3,T:0,P:2,C:4, category: 'Professional Core' }),
    tag({ code: '22CY206', title: 'Operating Systems', L:2,T:0,P:2,C:3, category: 'Professional Core' }),
    tag({ code: '24AM302', title: 'Inter Departmental Project', L:0,T:0,P:2,C:1, category: 'Project' }),
    tag({ title: 'Department Elective – 3', L:3,T:0,P:2,C:4, category: 'Department Elective' }),
    tag({ title: 'Open Elective – 3', L:3,T:0,P:0,C:3, category: 'Open Elective' }),
  ],
};
const R22_C24_IV_I: Semester = {
  id: '4-1', label: 'IV Year — I Semester', short: 'IV-I', totalCredits: 21,
  courses: [
    tag({ code: '22CS401', title: 'Cryptography and Network Security', L:3,T:0,P:2,C:4, category: 'Professional Core' }),
    tag({ code: '22AM305', title: 'Reinforcement Learning', L:2,T:0,P:2,C:3, category: 'Professional Core' }),
    tag({ code: '24AM401', title: 'Computing Ethics', L:2,T:0,P:0,C:2, category: 'Humanities' }),
    tag({ title: 'Department Elective – 4 (Generative AI & LLMs)', L:3,T:0,P:2,C:4, category: 'Department Elective', highlight: 'AI Adoption: Generative AI & LLMs' }),
    tag({ title: 'Department Elective – 5', L:3,T:0,P:2,C:4, category: 'Department Elective' }),
    tag({ title: 'Department Elective – 6', L:3,T:0,P:2,C:4, category: 'Department Elective' }),
  ],
};
const R22_C24_IV_II: Semester = {
  id: '4-2', label: 'IV Year — II Semester', short: 'IV-II', totalCredits: 12,
  courses: [
    tag({ code: '22AM403/22AM404', title: 'Internship / Project Work', L:0,T:2,P:22,C:12, category: 'Project' }),
  ],
};

// ────────────────────────────────────────────────────────────────────────────
// R22-C22 — Original + AI Adoption (only IV year defined in source)
// ────────────────────────────────────────────────────────────────────────────
const R22_C22_IV_I: Semester = {
  id: '4-1', label: 'IV Year — I Semester', short: 'IV-I', totalCredits: 19,
  courses: [
    tag({ code: '22AM401', title: 'Knowledge Representation and Reasoning', L:2,T:2,P:0,C:3, category: 'Professional Core' }),
    tag({ code: '22AM402', title: 'Text Mining', L:3,T:0,P:2,C:4, category: 'Professional Core' }),
    tag({ code: '22CS402', title: 'Big Data Analytics', L:3,T:0,P:2,C:4, category: 'Professional Core' }),
    tag({ code: '22AM810', title: 'Internet of Things', L:3,T:0,P:2,C:4, category: 'Department Elective' }),
    tag({ code: '22NP301', title: 'Department Elective – 4 (Generative AI & LLMs)', L:3,T:0,P:2,C:4, category: 'Department Elective', highlight: 'AI Adoption: Generative AI & LLMs' }),
  ],
};
const R22_C22_IV_II: Semester = {
  id: '4-2', label: 'IV Year — II Semester', short: 'IV-II', totalCredits: 12,
  courses: [
    tag({ code: '22AM403', title: 'Internship / Project Work', L:0,T:2,P:22,C:12, category: 'Project' }),
  ],
};

// ────────────────────────────────────────────────────────────────────────────
export const REGULATIONS: Regulation[] = [
  {
    id: 'r22-c22',
    code: 'R22-C22',
    title: 'R22 – C22 (AI Adoption)',
    description: 'IV-Year revision adding Generative AI & LLMs.',
    accent: 'cyan',
    semesters: [R22_C22_IV_I, R22_C22_IV_II],
  },
  {
    id: 'r22-c24',
    code: 'R22-C24',
    title: 'R22 – C24 (AI Adoption)',
    description: 'III & IV-Year revision integrating Agentic AI Tools and Generative AI elective.',
    accent: 'amber',
    semesters: [R22_C24_III_I, R22_C24_III_II, R22_C24_IV_I, R22_C24_IV_II],
  },
  {
    id: 'r25-c25',
    code: 'R25-C25',
    title: 'R25 – C25 Course Structure',
    description: 'Full 4-year R25 regulation with Agentic AI Tools from pre-semester onward.',
    accent: 'violet',
    semesters: r25C25Semesters,
  },
  {
    id: 'r25-c26',
    code: 'R25-C26',
    title: 'R25 – C26 Course Structure',
    description: 'Latest revision: AI Systems Engineer competency ladder across all 8 semesters.',
    accent: 'mint',
    semesters: r25Semesters,
  },
];

export const findRegulation = (id: string) => REGULATIONS.find(r => r.id === id);
export const findSemester = (regId: string, semId: string) =>
  findRegulation(regId)?.semesters.find(s => s.id === semId);

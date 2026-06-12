export type ExperienceSection = {
  heading: string;
  body: string;
};

export type ExperiencePhoto = {
  // Path under /public when provided (e.g., '/experience/exp-1/cover.jpg').
  // When omitted, the detail page renders a captioned placeholder tile.
  src?: string;
  alt: string;
  caption?: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  dates: string;
  location?: string;
  // Path under /public with a leading slash, e.g. '/logos/MITRElogo.png'.
  // When set, the company logo replaces the empty placeholder square in the
  // experience list. Falls back to the placeholder when omitted.
  logo?: string;
  bullets: string[];
  // Detail-page content — used by app/experience/[id]/page.tsx.
  summary?: string;
  sections?: ExperienceSection[];
  photos?: ExperiencePhoto[];
};

// `id` is used as the URL slug for the per-experience detail page at
// /experience/<id>/.
export const experience: Experience[] = [
  {
    id: 'mitre',
    role: 'Computer Engineering and Computer Science Co-op',
    company: 'MITRE',
    dates: 'Jan 2025 - Jun 2025',
    location: 'Bedford, MA',
    logo: '/logos/MITRElogo.png',
    bullets: [
      'Served as primary software engineer for a Python-based whale detection model, synthesizing complex climate, aerial survey, and behavioral datasets (NetCDF, JSON, GRIB).',
      'Directed technical outreach with SMEs in oceanography, data science, and marine biology to procure validated data and refine model architecture, translating research papers into a reliable model.',
      'Leveraged High-Performance Computing (HPC) to execute large-scale bootstrapping and sensitivity analysis, quantifying the impact of every environmental covariate on the model.',    ],
    summary:
      'At MITRE I worked in the underwater department. My primary project was for NOAA (the National Oceanic and Atmospheric Administration); they needed to identify what conservation efforts for North Atlantic Right Whales to invest in. I worked on the Aeiral subteam (tactic where whales are counted in the ocean from an aircraft) in a SCRUM workflow, where I simulated the efficiency of aerial surveys.',
    sections: [
      {
        heading: 'What I worked on',
        body:
          'I developed a Python whale detection model. The model takes heterogeneous oceanographic/weather datasets and past aerial survey/behavioral records. The script generated a map of the east coast, with detected and non-detected whales flagged under varying environmental conditions. To make the results trustworthy I ran large-scale bootstrapping and sensitivity analyses to ultimately go on HPC clusters, isolating the contribution of every covariate.',
      },
      {
        heading: 'What I learned',
        body: 'The most valuable lesson was how to talk to and learn from domain experts - oceanographers, data scientists, marine biologists - and translate their findings, datasets, and expertise into the model I am developing. This project had about 20-30 people involved, with my subteam being about 3-5 people. I also learned how to give bi-weekly SCRUM stand-ups to the leaders and bi-weekly more complete updates at the whole team meetings.',
      },
    ],
    photos: [
      { alt: 'MITRE Bedford campus', caption: 'MITRE at Bedford, MA.', src: '/experience/MITREbedford.jpg' },
    ],
  },
  {
    id: 'asmpt',
    role: 'Software Engineering Co-op',
    company: 'ASMPT SEMI',
    dates: 'Jan 2024 – Jun 2024',
    location: 'Billerica, MA',
    logo: '/logos/ASMPTSEMIogo.png',
    bullets: [
      'Architected a hardware-in-the-loop (HIL) diagnostic module for the Stratus P300 Wafer Plating machine to eliminate false alarms, validating chemical-composition sensor behavior against live machine hardware in real time.',
      'Re-engineered alarm logic to provide real-time feedback on chemical reservoir discrepancies, directly addressing client-reported issues.',
      'Modernized the simulator’s graphical interface from WinForms to the Windows Presentation Foundation (WPF) framework.',
    ],
    summary:
      'At ASMPT SEMI I worked on the simulation and diagnostic tooling behind the Stratus P300 Wafer Plating system — a semiconductor production machine where a false alarm is expensive and a missed alarm is worse. The goal of my co-op was to make the alarm pipeline trustworthy.',
    sections: [
      {
        heading: 'What I worked on',
        body:
          'I built a hardware-in-the-loop diagnostic module that compared the live machine’s chemical-composition sensor stream against modeled expectations in real time, surfacing only the discrepancies that mattered. I also rewrote the alarm logic so operators received meaningful, actionable feedback about chemical reservoir state instead of the noisy alerts the field had been reporting. In parallel I migrated the legacy WinForms simulator UI to WPF so the tool could keep evolving.',
      },
      {
        heading: 'What I learned',
        body:
          'This was my first exposure to industrial-grade hardware-in-the-loop testing, and it gave me a strong appreciation for how thin the line is between a useful diagnostic and a noisy one. I also learned how much UI matters even for internal tools — the WPF rewrite measurably improved how operators interacted with the simulator.',
      },
    ],
    photos: [
      { alt: 'Stratus P300 wafer plating machine', caption: 'Stratus P300 — the target hardware.' },
      { alt: 'WPF diagnostic interface', caption: 'Modernized WPF simulator interface.' },
    ],
  },
  {
    id: 'khoury-ta',
    role: 'Teaching Assistant — Fundamentals of Computer Science',
    company: 'Northeastern Khoury College',
    dates: 'Apr 2023 – Dec 2023',
    logo: '/logos/Khourylogo.jpg',
    location: 'Boston, MA',
    bullets: [
      'Led, taught, and graded labs of 30+ students in Kotlin (self-taught for the role) and DrRacket.',
      'Held office hours and one-on-one debugging sessions to help students build a first mental model of recursion, higher-order functions, and data design.',
    ],
    summary:
      'I TA’d Fundamentals of Computer Science, Northeastern’s introductory programming course, across two semesters and two languages (DrRacket and Kotlin). The experience pushed me to learn Kotlin from scratch on a tight runway and to teach concepts I’d only just internalized myself.',
    sections: [
      {
        heading: 'What I worked on',
        body:
          'I ran weekly labs of 30+ students, walked through problem sets, graded assignments, and held office hours. A meaningful chunk of the role was building intuition for recursion, higher-order functions, and the design recipe — concepts that look simple on paper but take real practice to internalize.',
      },
      {
        heading: 'What I learned',
        body:
          'Teaching forced me to articulate ideas precisely. If a student couldn’t follow my explanation, my own model wasn’t tight enough yet. I also picked up Kotlin on a tight schedule, which made me more comfortable with the idea of being thrown into an unfamiliar stack and shipping anyway.',
      },
    ],
    photos: [
      { alt: 'Classroom at Northeastern Khoury College', caption: 'Khoury College — Boston, MA.' },
    ],
  },
];

export function getExperienceById(id: string): Experience | undefined {
  return experience.find((e) => e.id === id);
}

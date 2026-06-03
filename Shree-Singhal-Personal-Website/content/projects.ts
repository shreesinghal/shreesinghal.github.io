// A single block in a section body. Strings render as a paragraph; objects
// with a `math` field render as a centered block formula (LaTeX via KaTeX).
export type ProjectBodyBlock =
  | string
  | { math: string }
  | { pdf: string; caption?: string };

export type ProjectSection = {
  heading: string;
  // Single string for a one-paragraph body, or an array of blocks — each entry
  // renders as either a paragraph (string) or a block math formula ({ math }).
  body: string | ProjectBodyBlock[];
  // Optional figure rendered beside the body. When set, the detail page lays
  // out the section as image (left) + heading/body (right) on md+ screens.
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
};

export type ProjectPhoto = {
  // Path under /public when provided (e.g., 'projects/renu/cover.jpg').
  // When omitted, the detail page renders a captioned placeholder tile.
  src?: string;
  alt: string;
  caption?: string;
};

export type Project = {
  // Stable slug — used as the URL segment for the detail page at /projects/<id>/.
  id: string;
  title: string;
  overview?: string;
  tags: string[];
  // External links — omit (or leave undefined) to hide the corresponding link on
  // the project card and detail page.
  codeUrl?: string;
  liveUrl?: string;
  // Optional override for the second link's label (e.g. 'Paper', 'Spotlight Article').
  // Defaults to 'Live' when omitted.
  liveLabel?: string;
  // Path under /public with a leading slash, e.g. '/projects/renu.jpg'.
  // The leading slash matters: detail pages live at /projects/<id>/, and a
  // bare 'projects/renu.jpg' would resolve relative to that URL and 404.
  // If omitted (or the file is missing), ProjectCard falls back to a
  // captioned placeholder tile.
  image?: string;
  imageAlt?: string;
  // Detail-page content — rendered by app/projects/[id]/page.tsx.
  summary?: string;
  sections?: ProjectSection[];
  photos?: ProjectPhoto[];
  // Path under /public with a leading slash, e.g. '/projects/paper.pdf'.
  // When set, the detail page renders an embedded PDF viewer and the
  // project card shows a "Paper" link alongside Code / Live.
  paperPdf?: string;
  // Optional override for the paper link label (defaults to 'Paper').
  paperLabel?: string;
  // Slideshow rendered at the bottom of the detail page. Each entry needs a
  // src (under /public); alt is required for accessibility; caption is shown
  // below the image when present.
  slideshow?: { src: string; alt: string; caption?: string }[];
  // Optional heading for the slideshow section (defaults to 'Gallery').
  slideshowHeading?: string;
};

export const projects: Project[] = [
  {
    id: 'renu',
    title: 'ReNU - Collegiate Wind Turbine Software + Electrical Lead',
    overview: 'Led a 6-person team, designing the full power and control stack: 3-phase full-wave rectifier, MPPT load control, and a closed-loop PID pitch control system driven by tachometer feedback. Regulated rotor speed across 5–15 mph wind. Placed 4th of 32 teams at the DOE Collegiate Wind Turbine Competition 2026.',
    tags: ['Embedded', 'PID Control', 'MPPT', 'Power Electronics', 'Team Lead'],
    image: '/projects/renu.jpg',
    imageAlt: 'ReNU wind turbine at competition.',
    codeUrl: 'https://github.com/shreesinghal/windmill-control-systems',
    summary:
      'ReNU is Northeastern’s Sustainable Energy Club. In 2026, it competed in the U.S. Department of Energy Collegiate Wind Turbine Competition. As Software + Electrical Lead I designed the full power and control stack including rectification, MPPT load control, and closed-loop pitch control. I led a 6-person electrical/software team, and the product placed 4th-place at the Colegiate Wind Competition 2026. I made all schematics and diagrams on this website.',
    sections: [
      {
        heading: 'Electrical Top-Down',
        body: [
          'The power stack moves the generator output through a 3-phase full-wave rectifier and into an MPPT-controlled resistive load that continuously seeks the turbine’s max-power point. Voltage, current, and tachometer-pulse sensing feed back to the MCU, which arbitrates between load tuning and pitch actuation.',
          'For a more detailed breakdown of the parts, go to the Parts Overview section below.'
        ],
        image: '/projects/ReNU-Electrical-Overview-Diagram.jpg',
        imageAlt: 'ReNU turbine electrical system overview diagram.',
        imageCaption: 'Electrical System Overview Flowchart (made on Microsoft PPT)',
      },
      {
        heading: 'Software Top-Down',
        body: [
          'Two cooperating control loops run on the MCU: an MPPT loop that follows the turbine’s power curve by adjusting the resistive load, and a PID pitch controller driven by tachometer feedback that holds rotor speed steady across the 5–15 mph operating window. Both loops share the same sensor pipeline and arbitration logic.'
        ],
        image: '/projects/ReNU-Software-Overview-Diagram.svg',
        imageAlt: 'ReNU turbine firmware control-flow diagram.',
        imageCaption: 'Firmware Software System Overview Flowchart (made on Miro)',
      },
      {
        heading: 'Parts Overview',
        body: [
          'The top right shows the 3-phase full wave rectifier that turns the generator AC output into DC. This is fed to the turbine side 6V and 12V buck-boosts shown on the left half to power the onboard sensors and motors (the linear actuator, windspeed sensor, and solenoid). The originial rectified DC rail is then fed into a programmable variable buck boost (on the bottom right) on the load side. ',
          'These are the primary components of the electrical system, apart from smaller voltage and current sensors and an ESP32 microcontroller that controls the entire system. Refer to the previous Electrical Top-Down section for details on placement of the components in the overall system.'
        ],
        image: '/projects/electrical-snapshots.jpg',
        imageAlt: 'Electrical and Software Snapshots.',
        imageCaption: 'Electrical and Software Snapshots (made on Microsoft PPT)',
      },
      {
        heading: 'More on Power Control System',
        body: [
          'As shown below, on the input end of the buck-boost is the rectified DC rail and on the output end is a 100W rated resistor. Even though there is a fixed resistance at the output end of the buck-boost, by altering the duty cycle of the switching transistor of the buck-boost through software, and thereby altering its output voltage, we can alter the effective load impedance presented to the generator. This allows us to control the power generated to either the maximum power point or a controlled operating point.',
          'By altering the buck-boost output voltage across the fixed resistor, we change the output current (I_out = V_out / R_load), which changes the output power (P_out = V_out^2 / R_load). Since power must be conserved through the converter (P_in ≈ P_out), changing P_out forces a corresponding change in input current drawn from the rectified DC rail. Since power is conserved, the effective load resistance can be calculated as:',
          { math: ' P_{in} \\cdot \\eta = P_{out}, P_{out} = \\frac{V_{out}^2}{R_{load}},         P_{in} = V_{in} \\cdot I_{in},         R_{\\text{eff}} = \\frac{V_{in}}{I_{in}}' },
          { math: 'R_{\\text{eff}} = \\frac{V_{in}^{2} \\cdot \\eta}{V_{out}^{2} / R_{load}}'},
          'Maximum Power Point Tracking (MPPT) Mode:',
          'Since the generator has internal impedance, its output power vs. load curve has a peak, known as the maximum power point, at a specific R_eff. By sweeping V_out and measuring rectified V_in and I_in, you find the V_out setpoint that maximizes generator power output. In this way, the buck-boost maximizes the power extracted from the wind. The software details are in the Software Top-Down section above.',
          'Maintain Constant Power Mode:',
          'Since the generator has internal impedance, its output power vs. load curve has a peak, known as the maximum power point, at a specific R_eff. By sweeping V_out and measuring rectified V_in and I_in, you find the V_out setpoint that maximizes generator power output. In this way, the buck-boost maximizes the power extracted from the wind.'
        ]
      },
      {
        image: '/projects/LoadSystem.jpg',
        imageCaption: 'Load System Diagram (made on Microsoft PPT)',
        heading: "",
        body: ""
      },      
      {
        heading: 'KiCAD Schematic',
        body: [
          {
            pdf: '/projects/ReNUControlsSystemLayoutPrintout.pdf',
            caption: 'Full Control/Power System Schematic (made on KiCAD)',
          },
        ],
      },
      {
        heading: 'What I learned being ReNU\'s Software/Electrical Technical Lead',
        body: [
          'For this project, I collaborated with electrical, computer, and software engineers to design and implement the control and power systems for the wind turbine. Having a background in both electrical and software engineering allowed me to bridge the gap between the two domains and allowed me to devise the system architecture. Additionally, I learned a lot on leading a team. Once the top-down schematics were loosly completed, I assigned tasks to team members based on their expertise. For example, many EECE engineers were put on the load design and component research, CE majors were assigned to interface the microcontroller with the TPS55288 module and windspeed sensor, and CS majors were assigned to develop the control algorithms such as MPPT and PID.',
          'Additionally, I worked across teams, communicating heavily with the Mechanical Engineers, Physics Majors, and Data Scientists. For example, the E-Stop required opinions from both electrical and mechanical perspectives, the sensor and motor placement was crucial to both the structural team and software team, and choosing which generator to use required physics knowledge and electrical engineering expertise that many multi-disceplinary teams contributed to.',
          'One difficult aspect was ensuring proper integration of all subsystems. Often, the development timelines did not align, requiring teams to simulate and test their components in isolation before integrating them. Tools like LTSpice were crucial in simulating the behavior of the system under various conditions, even if we could not replicate the exact same environment yet.',
          'Tuning a PID loop in front of a wind tunnel is very different from simulating one. The biggest lessons were about disturbance rejection, sensor noise, and how much of a control system\'s reliability comes from clean wiring, debounced signals, and conservative gains',
        ]
      },
    ],
    photos: [],
    slideshowHeading: 'Competition Photos',
    slideshow: [
      { src: '/projects/CompPics/CompVid1.mp4', alt: 'Highlight video from the DOE Collegiate Wind Competition.' },
      { src: '/projects/CompPics/CompPic1.jpg', alt: 'ReNU at the DOE Collegiate Wind Competition (1).' },
      { src: '/projects/CompPics/CompPic5.jpg', alt: 'ReNU at the DOE Collegiate Wind Competition (5).' },
      { src: '/projects/CompPics/CompPic2.jpg', alt: 'ReNU at the DOE Collegiate Wind Competition (2).' },
      { src: '/projects/CompPics/CompPic3.jpg', alt: 'ReNU at the DOE Collegiate Wind Competition (3).' },
      { src: '/projects/CompPics/CompPic4.jpg', alt: 'ReNU at the DOE Collegiate Wind Competition (4).' },
      { src: '/projects/CompPics/CompPic6.jpg', alt: 'ReNU at the DOE Collegiate Wind Competition (6).' },
      { src: '/projects/CompPics/CompPic7.jpg', alt: 'ReNU at the DOE Collegiate Wind Competition (7).' },
      { src: '/projects/CompPics/CompPic8.jpg', alt: 'ReNU at the DOE Collegiate Wind Competition (8).' },
    ],
  },
  {
    id: 'backscatter',
    title: 'Ambient Backscatter Wireless Communication',
    overview:
      'PEAK Award-funded independent research on a backscatter system that modulates ambient Wi-Fi signals for passive data transmission. Designed RF filtration, a custom encoding/decoding protocol, and a custom antenna. Mentored by Dr. Stefano Basagni and featured in the NU COE Spotlight.',
    tags: ['RF', 'Wireless', 'Antenna Design', 'Research'],
    image: '/projects/backscatter.jpg',
    imageAlt: 'Ambient backscatter prototype board and antenna.',
    paperPdf:
      '/projects/AmbientSense_Backscatter_Paper.pdf',
    paperLabel: 'Paper',
    summary:
      'Independent research, funded by the Northeastern PEAK Award and mentored by Dr. Stefano Basagni, exploring whether ambient Wi-Fi signals can be re-modulated to transmit data without an active radio. The work was featured in the Northeastern College of Engineering Spotlight.',
    sections: [
      {
        heading: 'Paper Contents',
        body:
          [
            'Pages 1-4: Introduce and Explain Ambient Backscatter and Previous Papers on the Matter',
            'Pages 5-6: Limitations of Current Large-Scale Air-Quality Monitoring Systems',
            'Pages 6-9: Experiement Design, Results, and Discussion of AmbientSense'
          ]
      },
    ],
    photos: [],
  },
  {
    id: 'drone-laser',
    title: 'Drone Tracking In-Air Laser Charging Capstone',
    overview:
      'Three-layer computer vision pipeline combining GroundingDINO bounding boxes, segmentation masks, and CoTracker3 point tracking to keep focus on an onboard photodiode target. Drives a closed-loop PID turret actuation system that aligns laser placement with live tracking coordinates.',
    tags: ['Computer Vision', 'GroundingDINO', 'CoTracker3', 'PID', 'Capstone'],
    image: '/projects/drone-laser.jpg',
    imageAlt: 'Drone tracking + laser turret capstone rig.',
    codeUrl: 'https://github.com/RyderPaulson/PANDAS-Drone-Tracking',
    summary:
      'A vision-guided turret that tracks a drone in flight and keeps a laser pointed at an onboard photodiode for wireless power transfer. The system fuses three CV models with a closed-loop PID actuator to maintain alignment in real time.',
    sections: [
      {
        heading: 'What I worked on',
        body:
          'I built a three-layer CV pipeline: GroundingDINO produces bounding boxes from natural-language prompts, a segmentation pass refines the drone silhouette, and CoTracker3 maintains stable point-level tracking on the photodiode itself. The tracking coordinates feed a PID controller driving two-axis turret actuation, so the laser stays on-target even as the drone moves.',
      },
      {
        heading: 'What I learned',
        body:
          'Real-time CV is a latency problem first and a model-quality problem second. Most of the engineering effort went into shrinking the pipeline so the turret loop ran fast enough to be useful, and into deciding which layer of the stack should be the authoritative source of position at each moment.',
      },
    ],
    photos: [],
  },
  {
    id: 'mitosis',
    title: 'Project Mitosis — 3D-Printed Delta 3D Printer',
    overview:
      'NURobotics project building a delta 3D printer from scratch. Designed and software-tested a CadLab PCB that interfaces an STM32 with stepper motor drivers, and wrote C++ firmware that synchronizes three steppers to execute parallel kinematic motion.',
    tags: ['STM32', 'C++ Firmware', 'PCB Design', 'Robotics'],
    image: '/projects/mitosis.jpg',
    imageAlt: 'Project Mitosis delta 3D printer build.',
    summary:
      'A from-scratch delta 3D printer built with Northeastern’s robotics club. I owned the electronics and firmware — a CadLab-designed PCB driving three stepper motors, and the C++ firmware that turns coordinates into synchronized parallel-kinematic motion.',
    sections: [
      {
        heading: 'What I worked on',
        body:
          'I designed and software-validated the PCB that interfaces an STM32 with the stepper drivers, then wrote the firmware that solves the delta inverse kinematics and synchronizes the three steppers so the effector follows a clean Cartesian path. Calibration and homing routines were part of the firmware as well.',
      },
      {
        heading: 'What I learned',
        body:
          'Parallel kinematics are unforgiving — a small error in one arm shows up as a tilted, distorted print. Getting it right was a useful lesson in how much firmware-level precision (timing, step counting, acceleration profiles) matters when the mechanics can’t cover for you.',
      },
    ],
    photos: [],
  },
  {
    id: 'market-making',
    title: 'DQN vs Q-Learning Market Making Agent',
    overview:
      'Designed and trained two RL agents (tabular Q-Learning and Double DQN) to act as market makers in a custom trading environment. Engineered a reward function balancing profit against inventory risk over a 25-action bid/ask offset space. DQN delivered ~4× higher profit (680.71 vs 169.77) at ~20× the compute cost, quantifying the tabular-vs-deep-RL tradeoff.',
    tags: ['Reinforcement Learning', 'DQN', 'Python', 'Quant'],
    image: '/projects/market-making.jpg',
    imageAlt: 'DQN vs tabular Q-learning training curves.',
    codeUrl: 'https://github.com/shreesinghal/AI-Market-Maker-Reinforcement-Learning',
    summary:
      'A head-to-head comparison of tabular Q-Learning and Double DQN as market-making agents inside a custom trading environment. The goal was to measure — concretely — what the move from tabular RL to deep RL actually buys you, and at what compute cost.',
    sections: [
      {
        heading: 'What I worked on',
        body:
          'I built the trading environment from scratch — state space (inventory, volatility, time remaining), a 25-action bid/ask offset space, and a reward function that traded raw profit against inventory risk. Then I trained both agents on identical episodes and instrumented the training loop to capture profit, inventory excursions, and wall-clock cost.',
      },
      {
        heading: 'Results',
        body:
          'Double DQN delivered roughly 4× the profit of the tabular agent (680.71 vs 169.77 in the evaluation regime) but cost about 20× more compute to train. The interesting finding wasn’t that DQN wins — it was the shape of the tradeoff, and how much of the tabular agent’s gap came from poor coverage of the inventory dimension.',
      },
    ],
    photos: [],
  },
  {
    id: 'hpc-fft',
    title: 'Literature Review: Progression of the Use of High-Performance Computing for Fast Fourier Transforms from 2005-2025',
    overview:
      'Surveyed and synthesized 12 research papers spanning 2005–2025 to trace ' +
      'how Fast Fourier Transform implementations have evolved alongside HPC hardware.',
    tags: ['HPC', 'FFT', 'Literature Review', 'Research'],
    image: '/projects/HPC-FFT.jpg',
    imageAlt: 'Literature review on high-performance computing for FFTs.',
    summary: 
      'This paper covers two decades of FFT optimization across HPC hardware, including CPU cache ' +
      'autotuning, GPU shared-memory optimization, distributed multi-node scaling, Tensor ' +
      'Core reformulations, and mixed-precision communication compression. Key findings ' +
      'include that GPU acceleration shifts the FFT bottleneck from an arithmetic/computational issue ' +
      'to interconnect latency being dominant cost (97% of runtime on Summit). Additionally, ' +
      'slab decomposition was revived as the correct choice for dense GPU systems after a ' +
      'decade of pencil-decomposition dominance, and that numerical precision has evolved ' +
      'from a single compile-time setting to independently tunable parameters at the ' +
      'compute, communication, and accumulation layers.',
    paperPdf:
      '/projects/Literature_Review_on_FFT_in_HPC.pdf',
    paperLabel: 'Paper',
    sections: []

  },
  {
    id: 'embedded-systems',
    title: 'Embedded Design — FUSE FS & RISC-V Datapath',
    overview:
      'Two systems-level projects: a Unix-style FUSE file system in C++ with block-storage architecture, nested directories, bitmap resource tracking, and file I/O syscall handling; and a full CPU datapath implemented in SystemVerilog/Verilog using both RISC-V and MIPS instruction sets.',
    tags: ['C++', 'SystemVerilog', 'RISC-V', 'MIPS', 'Operating Systems'],
    image: '/projects/riscv.jpg',
    imageAlt: 'RISC-V datapath waveform / FUSE filesystem layout.',
    summary:
      'Two systems-level projects from my embedded design coursework: a Unix-style FUSE file system in C++ and a complete CPU datapath in SystemVerilog supporting both RISC-V and MIPS instruction sets.',
    sections: [
      {
        heading: 'FUSE file system',
        body:
          'A user-space file system written in C++ with a block-storage backend, nested directories, bitmap-tracked resource allocation, and handlers for the standard file I/O syscalls (open, read, write, mkdir, unlink, etc.). The goal was to internalize how a real FS lays out blocks and metadata, not just how to call into one.',
      },
      {
        heading: 'RISC-V / MIPS datapath',
        body:
          'A full single-cycle CPU datapath in SystemVerilog/Verilog — register file, ALU, control unit, memory interface — capable of executing both the RISC-V and MIPS instruction sets. Each ISA forced different control-signal decisions and made the contrast between the two architectures concrete in a way reading a textbook does not.',
      },
    ],
    photos: [],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

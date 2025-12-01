import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Server,
  Database,
  Code2,
  Terminal,
  Cpu,
  ExternalLink,
  Download,
  Moon,
  Sun
} from 'lucide-react';
import resume from './resume.pdf';

// --- Theme Context Setup ---
const ThemeContext = React.createContext();

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  // Initialize state from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    // Default to dark mode
    return 'dark';
  });

  // Effect to apply the theme class to the document body and save preference
  useEffect(() => {
    const root = window.document.documentElement;

    // FIX 1: Only toggle the standard 'dark' class. When 'dark' is absent,
    // the default (unprefixed) classes will render (which we set to be light mode).
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  // FIX: Wrapped toggleTheme in useCallback for stability.
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Theme Toggler Component ---
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-3 rounded-full fixed top-6 right-6 z-50 transition-colors duration-300 bg-white text-blue-600 hover:bg-gray-100 shadow-lg shadow-gray-300/50 dark:bg-slate-800 dark:text-cyan-400 dark:hover:bg-slate-700 dark:shadow-lg dark:shadow-black/50"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
};

// --- DATA FROM RESUME ---
const data = {
  profile: {
    name: "Solomon Prabu D",
    title: "Software Engineer",
    tagline: "Building scalable cloud-native applications & ERP solutions.",
    contact: {
      email: "solomonprabu002@gmail.com",
      linkedin: "linkedin.com/in/solomon-prabu",
      github: "github.com/solomonprabu",
      leetcode: "leetcode.com/u/solomon_prabu/"
    }
  },
  skills: [
    { category: "Backend & ERP", items: ["Python", "Odoo ERP", "Node.js", "PostgreSQL"], icon: <Database size={20} /> },
    { category: "DevOps & Cloud", items: ["Docker", "Kubernetes", "Azure", "GCP", "CI/CD"], icon: <Server size={20} /> },
    { category: "Frontend", items: ["JavaScript", "React.js", "HTML/CSS", "Power Apps"], icon: <Code2 size={20} /> },
    { category: "Tools", items: ["GitLab", "Jira", "Selenium", "Linux"], icon: <Terminal size={20} /> }
  ],
  experience: [
    {
      id: 1,
      role: "System Engineer",
      company: "Zriya Solutions AB",
      location: "Sweden",
      period: "Sep 2023 - Jun 2025",
      description: "Managing client relationships and technical delivery. Streamlined vehicle booking for Zeekrtech Europe using Power Automate, reducing manual work by 80%.",
      tags: ["Python", "Power Automate", "Azure"]
    },
    {
      id: 2,
      role: "Technical Consultant (Odoo)",
      company: "OODU Implementers",
      location: "India",
      period: "Jun 2022 - Aug 2023",
      description: "Designed tailored Odoo ERP solutions with third-party integrations. Minimized approval delays by 20% through robust workflow design.",
      tags: ["Odoo", "PostgreSQL", "Python"]
    }
  ],
  projects: [
    {
      title: "Fleet Management ERP",
      desc: "Developed bespoke ERP modules for Fleet Management and deployed as containerized apps. Saved 6hrs weekly on deployments.",
      tech: ["Odoo", "Docker", "Kubernetes"],
      type: "Enterprise"
    },
    {
      title: "Workshop Time-Tracking",
      desc: "Created a feature for Zeekrtech improving manpower visibility, increasing overall productivity by 30%.",
      tech: ["Python", "Data Analysis"],
      type: "Automation"
    },
    {
      title: "IoT Water Level Notifier",
      desc: "Real-time water level detection system using Ultrasonic sensors, NodeMCU, and SMS alerts via IFTTT.",
      tech: ["C++", "IoT", "Embedded"],
      type: "Hardware"
    }
  ]
};

// --- ANIMATION VARIANTS ---
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// --- Helper Components ---
function SocialBtn({ icon, href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-lg transition-all duration-300 bg-gray-100 border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-500 hover:bg-white dark:bg-slate-900 dark:border dark:border-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:border-cyan-500 dark:hover:bg-slate-800"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

// --- Main Portfolio Component ---
function PortfolioContent() {
  const { theme } = useTheme();

  return (
    // FIX 2: Removed 'light:' prefixes. Default classes now represent the light theme.
    <div className="min-h-screen font-sans bg-white text-gray-800 selection:bg-blue-500/30 dark:bg-slate-950 dark:text-slate-300 dark:selection:bg-cyan-500/30"
    >
      <ThemeToggle />

      {/* 1. HERO SECTION */}
      <header className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Background Gradient Mesh - Changes color with theme */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] -z-10 transition-colors duration-500 ${theme === 'dark' ? 'bg-cyan-500/10' : 'bg-blue-500/5'
          }`} />

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`inline-block mb-4 px-3 py-1 rounded-full text-sm font-mono transition-colors duration-300 border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400`}
          >
            Open to Work: DevOps & Backend
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white"
          >
            Hi, I'm <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-blue-500' : 'from-blue-600 to-indigo-700'
              }`}>
              {data.profile.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-gray-600 dark:text-slate-400"
          >
            {data.profile.tagline} Specializing in <span className="font-medium">Odoo, Python,</span> and <span className="font-medium">Cloud Infrastructure</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <SocialBtn icon={<Github size={20} />} href={`https://${data.profile.contact.github}`} label="GitHub" />
            <SocialBtn icon={<Linkedin size={20} />} href={`https://${data.profile.contact.linkedin}`} label="LinkedIn" />
            <SocialBtn icon={<Mail size={20} />} href={`mailto:${data.profile.contact.email}`} label="Email" />
            <a
              href={resume}
              download="Solomon_Prabu_Resume.pdf"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all shadow-lg bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 dark:bg-cyan-600 dark:hover:bg-cyan-500 dark:text-white dark:shadow-cyan-500/20`}
            >
              <Download size={18} /> Download CV
            </a>
          </motion.div>
        </div>
      </header>

      {/* 2. SKILLS GRID (Bento Layout) */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-gray-300 flex-1 dark:bg-slate-800" />
          <h2 className="text-2xl font-bold dark:text-white text-gray-900">Technical Arsenal</h2>
          <div className="h-px bg-gray-300 flex-1 dark:bg-slate-800" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.skills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="p-6 rounded-2xl transition-colors duration-300 group bg-gray-50 border border-gray-200 hover:border-blue-500/50 dark:bg-slate-900/50 dark:border dark:border-slate-800 dark:hover:border-cyan-500/50"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 group-hover:scale-110 
                // Theme Toggle Styles
                ${theme === 'dark' ? 'dark:bg-slate-800 dark:text-cyan-400' : 'bg-blue-50 text-blue-600'}`}>
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3 dark:text-white text-gray-900">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.items.map((tech, tIdx) => (
                  <li key={tIdx} className="text-sm flex items-center gap-2 text-gray-600 dark:text-slate-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-cyan-500/50' : 'bg-blue-500/50'}`} />
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. EXPERIENCE TIMELINE */}
      <section className="py-20 bg-gray-100 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-gray-900 dark:text-white">
            <Cpu className="text-blue-600 dark:text-cyan-500" /> Professional Experience
          </h2>

          <div className="relative space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-8 top-4 bottom-4 w-px bg-gray-300 dark:bg-slate-800" />

            {data.experience.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-16 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-2 md:left-6 top-1 w-4 h-4 rounded-full border-2 z-10 
                  ${theme === 'dark' ? 'dark:bg-slate-950 dark:border-cyan-500' : 'bg-white border-blue-600'}`} />

                <div className={`rounded-xl p-6 transition-colors duration-300 bg-white border border-gray-200 hover:border-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700`}>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.role}</h3>
                      <p className="font-medium text-blue-600 dark:text-cyan-400">{job.company}</p>
                    </div>
                    <span className={`text-sm font-mono px-3 py-1 rounded-full border self-start md:self-auto text-gray-500 bg-gray-100 border-gray-300 dark:text-slate-500 dark:bg-slate-950 dark:border-slate-800`}
                    >
                      {job.period}
                    </span>
                  </div>
                  <p className="mb-4 leading-relaxed text-gray-700 dark:text-slate-400">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={`text-xs px-2 py-1 rounded border bg-gray-200 text-gray-700 border-gray-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS (Grid Alignment) */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-gray-900 dark:text-white">
          <Code2 className="text-blue-600 dark:text-cyan-500" /> Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="rounded-xl p-6 flex flex-col h-full transition-all duration-300 bg-gray-50 border border-gray-200 hover:shadow-xl hover:shadow-blue-200/50 dark:bg-slate-900 dark:border dark:border-slate-800 dark:hover:shadow-xl dark:hover:shadow-cyan-900/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg transition-colors duration-300 
                  ${theme === 'dark' ? 'dark:bg-slate-800 dark:text-cyan-400' : 'bg-blue-50 text-blue-600'}`}>
                  <Terminal size={20} />
                </div>
                <ExternalLink size={16} className="cursor-pointer text-gray-400 hover:text-blue-600 dark:text-slate-600 dark:hover:text-white" />
              </div>

              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{proj.title}</h3>
              <p className="text-sm mb-6 flex-grow leading-relaxed text-gray-700 dark:text-slate-400">
                {proj.desc}
              </p>

              <div className="pt-4 border-t border-gray-200 dark:border-slate-800 flex flex-wrap gap-2">
                {proj.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-blue-500 dark:text-cyan-300">#{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="text-gray-600 dark:text-slate-500">
            © 2025 Solomon Prabu D. Built with React & Tailwind.
          </div>
          <div className="flex items-center gap-6 text-gray-600 dark:text-slate-500">
            <div className="flex items-center gap-2">
              {/* Phone and Location were removed from footer for conciseness but can be added back */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Default Export wrapped in the ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}
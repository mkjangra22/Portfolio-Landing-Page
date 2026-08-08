import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { X, ArrowRight, Layers, Layout, Compass, Shield } from "lucide-react";

const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "AutoMark",
    category: "Smart Attendance System",
    image: "Automark_project.png",
    aspectRatio: "aspect-[16/10]",
    colSpan: "md:col-span-6",
    description: "Attendance management system that uses face recognition to automatically detect and mark student attendance with real-time monitoring, secure data handling, and reduced manual effort.",
    role: "ML Engineer and Developer",
    tech: "Python • OpenCV • Firebase • React.js",
    client: "Attendance Automation Prototype (Internal)",
  },
  {
    id: "proj-2",
    title: "UniHub",
    category: "AI-Powered Campus Assistant",
    image: "UniHub_project.png",
    aspectRatio: "aspect-[16/10]",
    colSpan: "md:col-span-6",
    description: "All-in-one campus platform for students to manage attendance, lecture schedules, assignments, results, eventts, marketplace, and student community interactions with smart assistant support and real-time updates.",
    role: "AI and Developer",
    tech: "LLM APIs • React.js • Firebase",
    client: "University Campus Management (Prototype)",
  },
  {
    id: "proj-3",
    title: "Cricket Analyzer",
    category: "Dashboard & Analytics",
    image: "cricketanalyzer.png",
    aspectRatio: "aspect-[16/10]",
    colSpan: "md:col-span-6",
    description: "A cricket data analysis and visualization system to analyze player and match statistics.",
    role: "Data Analyst / Visualization Developer",
    tech: "Python • Pandas • Numpy • Matplotlib",
    client: "Sports Analytics (Personal Project)",
  },
  {
    id: "proj-4",
    title: "Web Development Projects",
    category: "",
    image: "webpage.png",
    aspectRatio: "aspect-[16/10]",
    colSpan: "md:col-span-6",
    description: "Created responsive portfolio, E-commerce and  webpages with auth system, payment gateway, API key integration.",
    role: "Frontend Developer",
    tech: "HTML/CSS • React.js • Auth • Payment Gateway • APIs",
    client: "Multiple Client Websites (Portfolio/Products)",
  },
];


export default function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="bg-bg py-20 md:py-28 font-sans">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header with Framer Motion scroll animation */}
        <motion.div
          id="work-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-stroke" />
              <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] font-medium">
                My Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary">
              Featured <span className="font-display italic">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-muted mt-3 text-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>


        </motion.div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6" id="work-grid">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              id={`work-card-${project.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className={`group flex flex-col justify-between overflow-hidden bg-surface border border-stroke rounded-3xl cursor-pointer relative ${project.colSpan} ${project.aspectRatio}`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Halftone Overlay */}
              <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-20 pointer-events-none" />

              {/* Gradient Darkening Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              {/* Hover backdrop blur reveal */}
              <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 backdrop-blur-[4px] transition-all duration-500 flex items-center justify-center p-4">
                {/* Custom white hover pill with animated gradient border */}
                <div
                  id={`work-hover-pill-${project.id}`}
                  className="relative px-5 py-2.5 rounded-full overflow-hidden scale-90 group-hover:scale-100 transition-transform duration-500 shadow-xl"
                >
                  {/* Animated border on hover */}
                  <span className="absolute inset-0 accent-gradient animate-gradient-shift rounded-full" />
                  <span className="absolute inset-[1.5px] bg-[#FFFFFF] rounded-full" />
                  <span className="relative z-10 text-[11px] font-semibold text-[#0a0a0a] tracking-wider uppercase flex items-center gap-1">
                    View — <span className="font-display italic font-bold normal-case text-[13px]">{project.title}</span>
                  </span>
                </div>
              </div>

              {/* Absolute Static info on bottom for non-hover state */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between text-text-primary z-5 pointer-events-none group-hover:opacity-20 transition-opacity duration-300">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#89AACC] uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-medium font-display italic tracking-wide">
                    {project.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md">
                  <ArrowRight className="w-4 h-4 text-text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            id="work-lightbox-overlay"
            className="fixed inset-0 z-50 bg-bg/95 flex items-center justify-center p-4 md:p-10 overflow-y-auto custom-scrollbar"
          >
            {/* Animated Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none backdrop-blur-xl"
            />

            {/* Modal Box */}
            <motion.div
              id="work-lightbox-content"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-[960px] bg-surface border border-stroke rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                id="work-lightbox-close"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-bg/85 border border-stroke flex items-center justify-center text-text-primary hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: Big Image with Halftone */}
              <div className="w-full md:w-3/5 h-64 md:h-[500px] relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-25 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface to-transparent" />
              </div>

              {/* Right Side: Text Description & Specs */}
              <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col justify-between bg-surface relative">
                <div className="flex flex-col gap-6">
                  {/* Category Pill */}
                  <div>
                    <span className="accent-gradient text-[10px] font-semibold text-bg px-3 py-1 rounded-full uppercase tracking-widest inline-block font-mono">
                      {selectedProject.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-text-primary font-display italic">
                    {selectedProject.title}
                  </h3>

                  {/* Descr */}
                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans font-light">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Meta details mock lists */}
                <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-stroke text-xs text-muted font-sans font-light">
                  {/* ROLE:
                  <div className="flex justify-between">
                    <span className="font-medium text-text-primary flex items-center gap-1.5 font-mono">
                      <Layout className="w-3.5 h-3.5" /> ROLE:
                    </span>
                    <span>{selectedProject.role ?? "—"}</span>
                  </div>
                  */}
                  <div className="flex justify-between items-start gap-4">
                    <span className="font-medium text-text-primary flex items-center gap-1.5 font-mono shrink-0 whitespace-nowrap">
                      <Layers className="w-3.5 h-3.5" /> TECH STACK:
                    </span>
                    <span className="text-right">{selectedProject.tech ?? "—"}</span>
                  </div>
                  {/* CLIENT:
                  <div className="flex justify-between">
                    <span className="font-medium text-text-primary flex items-center gap-1.5 font-mono">
                      <Compass className="w-3.5 h-3.5" /> CLIENT:
                    </span>
                    <span>{selectedProject.client ?? "—"}</span>
                  </div>
                  */}
                </div>

                {/* Action button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="mt-8 group w-full relative inline-flex items-center justify-center rounded-full text-xs font-semibold py-3 border border-stroke hover:scale-[1.02] transition-transform bg-text-primary text-bg cursor-pointer"
                >
                  <span className="relative z-10">Back to Collection</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

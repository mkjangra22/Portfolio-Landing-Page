import { motion } from "motion/react";
import { JournalEntry } from "../types";
import { Award, CheckCircle } from "lucide-react";

const CERTIFICATIONS: JournalEntry[] = [
  {
    id: "cert-1",
    title: "Building LLM Applications & Prompt Engineering",
    category: "Nvidia",
    image: "nvidia.png",
    date: "May 2025",
  },
  {
    id: "cert-2",
    title: "Generative AI",
    category: "DataBricks",
    image: "databricks.jpg",
    date: "Jan 2026",
  },
  {
    id: "cert-3",
    title: "Machine Learning",
    category: "E-Cell, IIT Guwahati",
    image: "ecell_iitguwahati.png",
    date: "Sep 2025",
  },
  {
    id: "cert-4",
    title: "Python, HTML, C/C++, JavaScript",
    category: "Edupyramids, IIT Bombay",
    image: "iitbombay_edupyramid.jpg",
    date: "",
  },
  {
    id: "cert-5",
    title: "Idea Lab - Incubator",
    category: "AICTE",
    image: "aicte.jpg",
    date: "Feb 2024",
  },
];

const ACHIEVEMENTS: JournalEntry[] = [
  {
    id: "ach-1",
    title: "Vice Chair",
    category: "ACM Student Chapter PIET",
    image: "acm.jpeg",
    date: "",
  },
  {
    id: "ach-2",
    title: "Technical Head",
    category: "Google Developer Group on Campus PIET",
    image: "gdg.jpg",
    date: "",
  },
  {
    id: "ach-3",
    title: "Team Lead",
    category: "Log10 Technical club",
    image: "log10.jpeg",
    date: "",
  },
  {
    id: "ach-4",
    title: "SIH - Finalist 2024, 25",
    category: "Smart Indian Hackathon",
    image: "sih.png",
    date: "",
  },
  {
    id: "ach-5",
    title: "TechSprint Hackathon Winner",
    category: "Google Developer Group",
    image: "h2s.jpg",
    date: "",
  }
];

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-20 md:py-28 font-sans border-t border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header */}
        <motion.div
          id="journal-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col mb-12 md:mb-16"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-stroke" />
            <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Recognition
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary">
            Certifications & <span className="font-display italic">Achievements</span>
          </h2>

          {/* Subtext */}
          <p className="text-muted mt-3 text-sm">
            Professional certifications, course accreditations, and key engineering recognitions.</p>
        </motion.div>

        {/* 2-Column Grid Layout: Certifications (Left) vs Achievements (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12" id="journal-list">
          
          {/* Left Column: Certifications */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase pb-2 border-b border-stroke flex items-center gap-2">
              <Award className="w-4 h-4 text-[#4E85BF]" /> Certifications
            </h3>

            <div className="flex flex-col gap-4">
              {CERTIFICATIONS.map((entry, idx) => (
                <motion.div
                  key={entry.id}
                  id={`cert-pill-${entry.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex items-center justify-between gap-4 p-4 rounded-[28px] border border-stroke bg-surface/30 hover:bg-surface transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    {/* Thumbnail Image */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0 border border-stroke bg-bg flex items-center justify-center">
                      <img
                        src={entry.image}
                        alt={entry.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-15" />
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-[#89AACC] uppercase">
                          {entry.category}
                        </span>
                        {entry.date && (
                          <>
                            <span className="h-1 w-1 bg-stroke rounded-full" />
                            <span className="text-[10px] text-muted font-mono">
                              {entry.date}
                            </span>
                          </>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-medium text-text-primary group-hover:text-text-primary/90 transition-colors tracking-tight line-clamp-1">
                        {entry.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase pb-2 border-b border-stroke flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#4E85BF]" /> Achievements
            </h3>

            <div className="flex flex-col gap-4">
              {ACHIEVEMENTS.map((entry, idx) => (
                <motion.div
                  key={entry.id}
                  id={`ach-pill-${entry.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex items-center justify-between gap-4 p-4 rounded-[28px] border border-stroke bg-surface/30 hover:bg-surface transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    {/* Thumbnail Image */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0 border border-stroke bg-bg flex items-center justify-center">
                      <img
                        src={entry.image}
                        alt={entry.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-15" />
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-[#89AACC] uppercase">
                          {entry.category}
                        </span>
                        {entry.date && (
                          <>
                            <span className="h-1 w-1 bg-stroke rounded-full" />
                            <span className="text-[10px] text-muted font-mono">
                              {entry.date}
                            </span>
                          </>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-medium text-text-primary group-hover:text-text-primary/90 transition-colors tracking-tight line-clamp-1">
                        {entry.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

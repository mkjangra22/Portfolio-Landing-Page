import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { JournalEntry } from "../types";
import { ArrowRight, BookOpen, Clock, Calendar, ChevronDown, CheckCircle } from "lucide-react";

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "entry-1",
    title: "Speculative design in high-entropy rendering networks",
    category: "Nvidia",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=300",
    readTime: "5 Min Read",
    date: "Oct 24, 2026",
  },
  {
    id: "entry-2",
    title: "Decentralized visual systems & algorithmic curation",
    category: "DataBricks",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=300",
    readTime: "7 Min Read",
    date: "Sep 12, 2026",
  },
  {
    id: "entry-3",
    title: "The aesthetics of decay: Brutalism in VR sandboxes",
    category: "ESSAY",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=300",
    readTime: "4 Min Read",
    date: "Jul 08, 2026",
  },
  {
    id: "entry-4",
    title: "Adaptive layout systems and motion design constraints",
    category: "ENGINEERING",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300",
    readTime: "8 Min Read",
    date: "Jun 15, 2026",
  },
];

// Rich content for reading details
const INSIGHT_PARAGRAPHS: Record<string, string> = {
  "entry-1": "High-entropy rendering networks are exploring the limits of non-deterministic rendering engines. By feeding noise signals directly into physical lighting nodes, we allow the system to negotiate materials based on unpredictable environmental feeds, bypassing handcrafted textures for pure emergent properties.",
  "entry-2": "How do visual systems remain expressive when automated by systemic curators? Algorithmic curation forces design tokens into hyper-optimized slots. True tension emerges when we inject intentional feedback glitches into these classifiers, returning friction and emotional authenticity to layouts.",
  "entry-3": "The digital interpretation of raw concrete reveals a fascinating paradox: pixel density trying to emulate structural density. Virtual reality brutalism is not about mimicking physical weight, but about the overwhelming silence of vast, clean, low-poly geometry wrapped in generative noise shadows.",
  "entry-4": "Modern motion layout must treat viewport boundaries as malleable fluids. Hard breakpoints are relics. By modeling our container flexes as synchronized elastic bands and centering the physics of user gestures, we construct pages that respond organically to touch and scale.",
};

export default function Journal() {
  const [activeEntry, setActiveEntry] = useState<string | null>(null);

  const toggleRead = (id: string) => {
    setActiveEntry(activeEntry === id ? null : id);
  };

  return (
    <section id="journal" className="bg-bg py-20 md:py-28 font-sans">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header using the same framer motion animation as selected works */}
        <motion.div
          id="journal-header"
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
                Journal
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary">
              Recent <span className="font-display italic">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-muted mt-3 text-sm max-w-sm">
              Exploring the intersections of speculative art, creative coding paradigms, and typography structures.
            </p>
          </div>

          {/* "View all" Button - hidden on mobile */}
          <button
            id="view-all-journal-btn"
            className="group hidden md:inline-flex items-center gap-2 bg-surface hover:bg-surface/80 border border-stroke text-text-primary text-xs font-semibold uppercase tracking-wider rounded-full px-6 py-3 cursor-pointer hover:scale-105 transition-all duration-300 relative"
          >
            <span className="absolute -inset-[1px] bg-transparent rounded-full group-hover:accent-gradient -z-10 transition-all duration-300" />
            <span className="flex items-center gap-2">
              View all articles
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>

        {/* Horizontal Capsules / Pills list */}
        <div className="flex flex-col gap-4" id="journal-list">
          {JOURNAL_ENTRIES.map((entry, idx) => {
            const isReading = activeEntry === entry.id;

            return (
              <motion.div
                key={entry.id}
                id={`journal-pill-${entry.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col"
              >
                {/* Horizontal Capsule Card */}
                <div
                  id={`journal-pill-trigger-${entry.id}`}
                  onClick={() => toggleRead(entry.id)}
                  className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-[32px] sm:rounded-full border border-stroke cursor-pointer transition-all duration-300 ${
                    isReading 
                      ? "bg-surface border-text-primary/30 shadow-lg shadow-black/20" 
                      : "bg-surface/30 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Thumbnail Image */}
                    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border border-stroke">
                      <img
                        src={entry.image}
                        alt={entry.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-15" />
                    </div>

                    {/* Specs / Meta column on mobile, merged on desktop */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-[#89AACC] uppercase">
                          {entry.category}
                        </span>
                        <span className="h-1 w-1 bg-stroke rounded-full hidden sm:inline" />
                        <span className="text-[10px] text-muted font-mono hidden sm:inline">
                          {entry.date}
                        </span>
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-medium text-text-primary group-hover:text-text-primary/90 transition-colors tracking-tight line-clamp-1 pr-6">
                        {entry.title}
                      </h3>
                    </div>
                  </div>

                  {/* Metadata Row Right */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pl-16 sm:pl-0 pr-2">
                    {/* Date on mobile (repositioned) */}
                    <span className="text-[10px] text-muted font-mono sm:hidden">
                      {entry.date}
                    </span>

                    {/* Read timing info */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted font-mono bg-bg/40 px-3 py-1.5 rounded-full border border-stroke">
                        <Clock className="w-3.5 h-3.5 text-[#4E85BF]" />
                        <span>{entry.readTime}</span>
                      </div>

                      {/* Dropdown transition indicator arrow */}
                      <div
                        className={`w-8 h-8 rounded-full border border-stroke flex items-center justify-center bg-bg/50 transition-transform duration-300 ${
                          isReading ? "rotate-180 bg-[#4E85BF]/20 border-[#4E85BF]/30 text-[#89AACC]" : "text-muted"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded text reading drawer */}
                <AnimatePresence initial={false}>
                  {isReading && (
                    <motion.div
                      id={`journal-pill-expanded-${entry.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 mx-4 sm:mx-10 p-6 md:p-8 bg-surface/50 border-r border-l border-b border-stroke rounded-b-[28px] text-xs sm:text-sm text-muted leading-relaxed flex flex-col sm:flex-row gap-6">
                        <div className="sm:w-1/3 shrink-0 flex flex-col gap-2 font-mono text-[10px] text-muted border-b sm:border-b-0 sm:border-r border-stroke pb-4 sm:pb-0 sm:pr-4">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-[#89AACC]" />
                            <span className="font-bold uppercase tracking-wider text-text-primary">SECTION METRICS:</span>
                          </div>
                          <div>PUBLICATION: PERSPECTIVE LABS</div>
                          <div>RELEVANCE: ADVANCED DESIGN</div>
                          <div>LICENSE: CC BY-NC 4.0</div>
                        </div>
                        <div className="sm:w-2/3 flex flex-col gap-4">
                          <p>{INSIGHT_PARAGRAPHS[entry.id]}</p>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-[#89AACC] font-medium inline-flex">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Article fully read • Logged in local storage buffer</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

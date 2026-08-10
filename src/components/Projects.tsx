import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { ExplorationItem } from "../types";
import { X, ZoomIn, ExternalLink, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PROJECTS: ExplorationItem[] = [
  {
    id: "exp-1",
    title: "UniHub",
    image: "UniHub.png",
    images: ["UniHub.png", "UniHub_project.png", "UniHub_login.png"],
    category: "AI Campus Assistant",
    rotation: "-rotate-3 hover:rotate-1",
    description:
      "All-in-one campus platform for students to manage attendance, lecture schedules, assignments, results, events, marketplace, and student community interactions with smart AI assistant support and real-time updates.",
    role: "AI & Fullstack Developer",
    tech: ["LLM APIs", "React.js", "Firebase", "Tailwind CSS", "Node.js"],
    link: "https://unihub-ai.vercel.app/",
    github: "https://github.com/mkjangra22",
  },
  {
    id: "exp-2",
    title: "AutoMark",
    image: "AutoMark.png",
    images: ["AutoMark.png", "Automark_project.png", "Automark_login.png"],
    category: "Smart Attendance System",
    rotation: "rotate-2 hover:-rotate-1",
    description:
      "Attendance management system that uses face recognition to automatically detect and mark student attendance with real-time monitoring, secure data handling, and reduced manual effort.",
    role: "ML Engineer & Developer",
    tech: ["Python", "OpenCV", "Firebase", "React.js", "Machine Learning"],
    link: "",
    github: "https://github.com/mkjangra22",
  },
  {
    id: "exp-3",
    title: "LineUp",
    image: "LineUp (7).png",
    images: ["LineUp (7).png", ],
    category: "Queue Management System",
    rotation: "-rotate-2 hover:rotate-2",
    description:
      "Smart queue management and appointment booking system designed to streamline waiting lines, manage appointments, and provide real-time updates for visitors and service providers.",
    role: "Fullstack Developer",
    tech: ["React.js", "Node.js", "Firebase", "Tailwind CSS"],
    link: "",
    github: "https://github.com/mkjangra22",
  },
  {
    id: "exp-4",
    title: "Cricket Analyzer",
    image: "Cricket Analyzer.png",
    images: ["Cricket Analyzer.png", "cricketanalyzer.png"],
    category: "Dashboard & Analytics",
    rotation: "rotate-4 hover:-rotate-2",
    description:
      "A comprehensive cricket data analysis and visualization dashboard to analyze player performance, match statistics, and predictive match metrics.",
    role: "Data Analyst & Visualization Developer",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Data Visualization","PowerBI"],
    link: "",
    github: "https://github.com/mkjangra22",
  },
  {
    id: "exp-5",
    title: "Portfolio",
    image: "Portfolio new Logo.png",
    images: ["Portfolio new Logo.png", "Portfolio old Logo.png"],
    category: "Personal & Business",
    rotation: "-rotate-4 hover:rotate-1",
    description:
      "Modern high-performance developer portfolio featuring smooth GSAP animations, dark aesthetic, interactive project gallery, and seamless responsiveness.",
    role: "Frontend Architect & Designer",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Deploy"],
    link: "",
    github: "https://github.com/mkjangra22/Portfolio-Landing-Page",
  },
  {
    id: "exp-6",
    title: "E-Commerce",
    image: "Ecommerce.png",
    images: ["Ecommerce.png", "Website Development Logo.png", "webpage.png"],
    category: "Shopping Platform",
    rotation: "rotate-3 hover:-rotate-1",
    description:
      "Full-featured online shopping platform featuring product catalogs, cart management, checkout flow, auth system, and API key integrations.",
    role: "Frontend & Fullstack Developer",
    tech: ["HTML/CSS","React.js","Database", "Auth System", "Payment Gateway", "APIs","Domain" ],
    link: "",
    github: "https://github.com/mkjangra22",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  const [lightboxItem, setLightboxItem] = useState<ExplorationItem | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const pinnedContent = pinnedContentRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;

    if (!container || !pinnedContent || !col1 || !col2) return;

    // Use GSAP ScrollTrigger to pin Layer 1 text content
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: pinnedContent,
      pinSpacing: false,
    });

    // Create different speed scrolling parallax for Columns
    const parallax1 = gsap.fromTo(
      col1,
      { y: 150 },
      {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    );

    const parallax2 = gsap.fromTo(
      col2,
      { y: 350 },
      {
        y: -350,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      }
    );

    // Clean up scroll triggers on unmount
    return () => {
      pinTrigger.kill();
      parallax1.scrollTrigger?.kill();
      parallax2.scrollTrigger?.kill();
    };
  }, []);

  // Split items into 2 columns
  const col1Items = PROJECTS.filter((_, idx) => idx % 2 === 0);
  const col2Items = PROJECTS.filter((_, idx) => idx % 2 !== 0);

  const handleOpenModal = (item: ExplorationItem) => {
    setLightboxItem(item);
    setActiveImgIndex(0);
    setIsZoomed(false);
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative min-h-[250vh] bg-bg w-full overflow-hidden"
    >
      {/* LAYER 1: PINNED BACKGROUND CENTER TITLE BLOCK */}
      <div
        ref={pinnedContentRef}
        className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center p-6 text-center select-none z-10 pointer-events-none"
      >
        <div className="max-w-xl pointer-events-auto flex flex-col items-center">
          {/* Eyebrow */}
          <span className="inline-block accent-gradient-text text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-4 font-mono">
            My Work
          </span>

          {/* Heading */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-sans font-light text-text-primary tracking-tight leading-none mb-4">
            Featured <span className="font-display italic">Projects</span>
          </h2>

          {/* Subtext */}
          <p className="text-muted/80 text-xs sm:text-sm mb-6 leading">
            A selection of projects I've worked on, from concept to launch. Click any project to view photos and details.
          </p>
        </div>
      </div>

      {/* LAYER 2: PARALLAX COLUMNS (z-20, ABSOLUTE) */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24 py-20 flex justify-between gap-10 md:gap-32">
        {/* PARALLAX COLUMN 1 */}
        <div
          ref={col1Ref}
          className="w-1/2 flex flex-col gap-24 sm:gap-40 md:gap-48 pt-20"
        >
          {col1Items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(item)}
              className="group aspect-square max-w-[320px] w-full self-start cursor-zoom-in pointer-events-auto"
              id={`project-card-${item.id}`}
            >
              {/* Box frame with rotating hover animation */}
              <div
                className={`relative bg-surface border border-stroke rounded-2xl sm:rounded-3xl p-3 overflow-hidden shadow-xl shadow-black/40 transition-all duration-500 ease-out ${item.rotation}`}
              >
                {/* Image panel */}
                <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-bg">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-20 pointer-events-none" />

                  {/* Zoom indicator hover layout */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex flex-col justify-end p-4">
                    <span className="text-[9px] font-mono tracking-widest text-[#89AACC] uppercase mb-0.5">
                      {item.category}
                    </span>
                    <span className="text-sm font-display italic text-text-primary flex items-center justify-between">
                      <span>{item.title}</span>
                      <ZoomIn className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PARALLAX COLUMN 2 (scrolls independently/faster) */}
        <div
          ref={col2Ref}
          className="w-1/2 flex flex-col gap-24 sm:gap-40 md:gap-48 pt-44 sm:pt-60"
        >
          {col2Items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(item)}
              className="group aspect-square max-w-[320px] w-full self-end cursor-zoom-in pointer-events-auto"
              id={`project-card-${item.id}`}
            >
              {/* Box frame with rotating hover animation */}
              <div
                className={`relative bg-surface border border-stroke rounded-2xl sm:rounded-3xl p-3 overflow-hidden shadow-xl shadow-black/40 transition-all duration-500 ease-out ${item.rotation}`}
              >
                {/* Image panel */}
                <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-bg">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-20 pointer-events-none" />

                  {/* Zoom indicator hover layout */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex flex-col justify-end p-4">
                    <span className="text-[9px] font-mono tracking-widest text-[#89AACC] uppercase mb-0.5">
                      {item.category}
                    </span>
                    <span className="text-sm font-display italic text-text-primary flex items-center justify-between">
                      <span>{item.title}</span>
                      <ZoomIn className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RICH PROJECT OVERVIEW LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxItem && (
          <div
            id="project-lightbox-overlay"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            {/* Animated Backdrop Blur Click Exit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxItem(null)}
              className="absolute inset-0 pointer-events-auto cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              id="project-lightbox-content"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-[94vw] max-w-[1240px] bg-surface/95 border border-stroke rounded-3xl overflow-hidden shadow-2xl z-10 p-6 sm:p-9 flex flex-col my-auto max-h-[94vh] overflow-y-auto custom-scrollbar"
            >
              {/* Top Right Close Button */}
              <button
                id="project-lightbox-close"
                onClick={() => setLightboxItem(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-text-primary hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* 2-Column Responsive Layout (7 Cols Image / 5 Cols Specs) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-10 items-start pt-1">
                {/* LEFT COLUMN (7 Cols): Name, Category, Main Image & Photo Selector */}
                <div className="md:col-span-7 flex flex-col gap-4">
                  {/* Name & Category Header */}
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase">
                      {lightboxItem.category}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-display italic text-text-primary tracking-wide">
                      {lightboxItem.title}
                    </h3>
                  </div>

                  {/* Main Active Image Container (Fit full photo without cropping) */}
                  <div className="relative w-full min-h-[280px] max-h-[60vh] rounded-2xl overflow-hidden bg-bg border border-stroke flex items-center justify-center p-2.5 group shrink-0 transition-all duration-300">
                    <img
                      src={lightboxItem.images[activeImgIndex] || lightboxItem.image}
                      alt={`${lightboxItem.title} photo ${activeImgIndex + 1}`}
                      referrerPolicy="no-referrer"
                      onClick={() => setIsZoomed(true)}
                      className="max-w-full max-h-[56vh] w-auto h-auto object-contain rounded-xl transition-all duration-300 cursor-zoom-in group-hover:scale-[1.01]"
                      title="Click image to zoom full screen"
                    />

                    {/* Zoom Icon Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomed(true);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-text-primary hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg z-10 opacity-80 hover:opacity-100"
                      title="Click to Zoom Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4 text-[#89AACC]" />
                    </button>

                    {/* Left / Right Nav Arrows for Gallery */}
                    {lightboxItem.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImgIndex((prev) => (prev === 0 ? lightboxItem.images.length - 1 : prev - 1));
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-text-primary hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg z-10"
                          title="Previous Photo"
                        >
                          <ChevronLeft className="w-4.5 h-4.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImgIndex((prev) => (prev === lightboxItem.images.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-text-primary hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg z-10"
                          title="Next Photo"
                        >
                          <ChevronRight className="w-4.5 h-4.5" />
                        </button>
                      </>
                    )}

                    {/* Photo Count Indicator */}
                    {lightboxItem.images.length > 1 && (
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-bg/80 border border-stroke text-xs font-mono text-muted backdrop-blur-md z-10">
                        {activeImgIndex + 1} / {lightboxItem.images.length}
                      </div>
                    )}
                  </div>

                  {/* Photo Overview Selector (Thumbnails) */}
                  {lightboxItem.images.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 shrink-0 justify-start">
                      {lightboxItem.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveImgIndex(idx);
                            setIsZoomed(false);
                          }}
                          className={`relative w-24 h-16 overflow-hidden rounded-xl border-2 transition-all cursor-pointer shrink-0 ${
                            activeImgIndex === idx
                              ? "border-[#89AACC] scale-105 shadow-lg shadow-[#89AACC]/20"
                              : "border-stroke/60 opacity-60 hover:opacity-100 hover:border-stroke"
                          }`}
                          title={`Photo option ${idx + 1}`}
                        >
                          <img
                            src={img}
                            alt={`Photo option ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN (5 Cols): About, Tech Stack & Action Links */}
                <div className="md:col-span-5 flex flex-col gap-6 md:pl-2">
                  {/* Project Description Text */}
                  <div className="flex flex-col gap-2.5">
                    <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#89AACC]">
                      About Project
                    </h4>
                    <p className="text-sm sm:text-base text-muted/90 leading-relaxed font-normal">
                      {lightboxItem.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-stroke/50">
                    <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#89AACC]">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {lightboxItem.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 text-xs sm:text-sm font-mono font-medium rounded-full bg-surface border border-stroke text-text-primary shadow-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Buttons */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-5 border-t border-stroke/50 shrink-0 mt-auto">
                    {lightboxItem.link && (
                      <a
                        href={lightboxItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-text-primary text-bg font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                      >
                        <span>Visit Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE ZOOM OVERLAY MODAL */}
      <AnimatePresence>
        {isZoomed && lightboxItem && (
          <div
            id="image-zoom-overlay"
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Backdrop click exit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* Close Button */}
            <button
              id="image-zoom-close"
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-surface/90 border border-stroke flex items-center justify-center text-text-primary hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-2xl"
              title="Close Zoom View"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Zoomed Photo Display */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative z-10 max-w-[96vw] max-h-[92vh] flex items-center justify-center"
            >
              <img
                src={lightboxItem.images[activeImgIndex] || lightboxItem.image}
                alt={`${lightboxItem.title} full resolution zoomed photo`}
                referrerPolicy="no-referrer"
                className="max-w-[96vw] max-h-[92vh] w-auto h-auto object-contain rounded-2xl border border-stroke/60 shadow-2xl select-none"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

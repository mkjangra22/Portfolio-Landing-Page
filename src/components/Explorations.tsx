import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { ExplorationItem } from "../types";
import { X, Dribbble, Compass, RefreshCw, ZoomIn } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const EXPLORATIONS: ExplorationItem[] = [
  {
    id: "exp-1",
    title: "Vapor Obelisk",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=600",
    category: "CGI Structure",
    rotation: "-rotate-3 hover:rotate-1",
  },
  {
    id: "exp-2",
    title: "Helios Minimal",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
    category: "Organic Geometry",
    rotation: "rotate-2 hover:-rotate-1",
  },
  {
    id: "exp-3",
    title: "Tension Wave",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600",
    category: "Matte Mesh",
    rotation: "-rotate-2 hover:rotate-2",
  },
  {
    id: "exp-4",
    title: "Liquid Core",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
    category: "Fluid Simulation",
    rotation: "rotate-4 hover:-rotate-2",
  },
  {
    id: "exp-5",
    title: "Bento Monolith",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
    category: "Brutalist Study",
    rotation: "-rotate-4 hover:rotate-1",
  },
  {
    id: "exp-6",
    title: "Chroma Prism",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    category: "Prismatic Material",
    rotation: "rotate-3 hover:-rotate-1",
  },
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  const [lightboxItem, setLightboxItem] = useState<ExplorationItem | null>(null);

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
  const col1Items = EXPLORATIONS.filter((_, idx) => idx % 2 === 0);
  const col2Items = EXPLORATIONS.filter((_, idx) => idx % 2 !== 0);

  return (
    <section
      ref={containerRef}
      id="explorations"
      className="relative min-h-[250vh] bg-bg w-full overflow-hidden"
    >
      {/* LAYER 1: PINNED BACKGROUND CENTER TITLE BLOCK */}
      <div
        ref={pinnedContentRef}
        className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center p-6 text-center select-none z-10 pointer-events-none"
      >
        <div className="max-w-xl pointer-events-auto flex flex-col items-center">
          {/* Eyebrow */}
          <span className="accent-gradient bg-clip-text text-transparent text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-4 font-mono">
            Explorations
          </span>

          {/* Heading */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-sans font-light text-text-primary tracking-tight leading-none mb-4">
            Visual <span className="font-display italic">playground</span>
          </h2>

          {/* Subtext */}
          <p className="text-muted/80 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
            Unregulated aesthetic experiments, material renderings, and brutalist geometric layout drafts from daily practice.
          </p>

          {/* Dribbble CTA Button
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-surface/60 border border-stroke text-text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full px-5 py-2.5 hover:scale-105 active:scale-95 transition-all duration-300 relative shadow-lg shadow-black/30"
          >
            <span className="absolute -inset-[1px] bg-transparent rounded-full group-hover:accent-gradient -z-10 transition-all duration-300 pointer-events-none" />
            <Dribbble className="w-3.5 h-3.5 text-[#89AACC] group-hover:text-text-primary transition-colors" />
            <span>Follow on Dribbble</span>
          </a> */}
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
              onClick={() => setLightboxItem(item)}
              className="group aspect-square max-w-[320px] w-full self-start cursor-zoom-in pointer-events-auto"
              id={`exploration-card-${item.id}`}
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
              onClick={() => setLightboxItem(item)}
              className="group aspect-square max-w-[320px] w-full self-end cursor-zoom-in pointer-events-auto"
              id={`exploration-card-${item.id}`}
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

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxItem && (
          <div
            id="exploration-lightbox-overlay"
            className="fixed inset-0 z-50 bg-[#000000]/95 flex items-center justify-center p-4"
          >
            {/* Animated Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxItem(null)}
              className="absolute inset-0 pointer-events-auto cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              id="exploration-lightbox-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-[540px] bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl z-10 p-5 flex flex-col gap-4"
            >
              {/* Close Button */}
              <button
                id="exploration-lightbox-close"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-text-primary hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* High-res Image container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-bg border border-stroke">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 halftone-overlay mix-blend-multiply opacity-25 pointer-events-none" />
              </div>

              {/* Title and Specs footer */}
              <div className="flex justify-between items-end pt-1 px-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-mono text-[#89AACC] uppercase tracking-wider">
                    {lightboxItem.category}
                  </span>
                  <h3 className="text-xl font-display italic text-text-primary">
                    {lightboxItem.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1 font-mono text-[9px] text-muted">
                  <RefreshCw className="w-3 h-3 text-[#4E85BF] animate-spin" style={{ animationDuration: "6s" }} />
                  <span>3D RENDERING NODES</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

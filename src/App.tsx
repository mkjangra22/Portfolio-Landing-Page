import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Award, Briefcase, GraduationCap, Download, Eye, CheckCircle, Mail, MapPin } from "lucide-react";

// Import modules
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SelectedWorks from "./components/SelectedWorks";
import Explorations from "./components/Explorations";
import Journal from "./components/Journal";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

function MainPortfolioContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showResume, setShowResume] = useState(false);

  // Trigger GSAP animations right after Loading completes
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setStartHeroAnimation(true);
    }, 100);
  };

  // 1. Intersection Observer to sync Active Section during scrolling
  useEffect(() => {
    if (isLoading) return;

    const sections = ["home", "work", "journal", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section is visually dominant
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [isLoading]);

  // Smooth Navigation Handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div id="portfolio-app-root" className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden selection:bg-white/10 selection:text-text-primary">
      {/* Elegant Dark Top Ambient Glow */}
      <div className="gradient-glow"></div>

      {/* 1. Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          id="main-scroller-layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Floating Navbar */}
          <Navbar
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onResumeClick={() => setShowResume(true)}
          />

          {/* Section 2: Hero */}
          <Hero
            startAnimation={startHeroAnimation}
            onNavigate={handleNavigate}
          />

          {/* Stats section
          <Stats />
          */}

          {/* Section 3: Selected Works */}
          <SelectedWorks />

          {/* Section 4: Explorations
          <Explorations />
          */}

          {/* Section 5: Journal */}
          <Journal />

          {/* Section 6: Contact / Footer */}
          <Footer />



        </motion.div>
      )}

      {/* RESUME PDF VIEW & DOWNLOAD MODAL */}
      <AnimatePresence>
        {showResume && (
          <div
            id="resume-modal-overlay"
            className="fixed inset-0 z-50 bg-[#000000]/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6 overflow-hidden"
          >
            {/* Click backdrop to exit */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setShowResume(false)}
            />

            {/* Resume Card with iframe PDF viewer */}
            <motion.div
              id="resume-modal-card"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-[900px] h-[88vh] bg-surface/95 border border-stroke rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 p-4 sm:p-6"
            >
              {/* Top Control Bar */}
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-stroke shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] sm:text-xs text-muted font-mono uppercase tracking-[0.em]">
                    Curriculum Vitae
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Direct Download Button CTA */}
                  <a
                    href="/Mayank_s_Resume (1).pdf"
                    download="Mayank_Kumar_Resume.pdf"
                    className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-bg bg-[#89AACC] hover:bg-[#4E85BF] hover:text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>

                  {/* Close button */}
                  <button
                    id="resume-modal-close"
                    onClick={() => setShowResume(false)}
                    className="w-8 h-8 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-text-primary hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Embedded Resume PDF Viewer */}
              <div className="flex-1 w-full h-full rounded-2xl overflow-hidden bg-bg border border-stroke/50">
                <iframe
                  src="/Mayank_s_Resume (1).pdf#toolbar=1"
                  title="Mayank Kumar Resume PDF"
                  className="w-full h-full border-none rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainPortfolioContent />} />
      </Routes>
    </Router>
  );
}

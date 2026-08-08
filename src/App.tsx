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

      {/* DETAILED INTERACTIVE RESUME MODAL */}
      <AnimatePresence>
        {showResume && (
          <div
            id="resume-modal-overlay"
            className="fixed inset-0 z-50 bg-[#000000]/90 backdrop-blur-2xl flex items-center justify-center p-4 overload-y-auto"
          >
            {/* Click backdrop to exit */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setShowResume(false)}
            />

            {/* Resume Card with framer-motion slide up */}
            <motion.div
              id="resume-modal-card"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-[800px] h-[85vh] bg-surface/95 border border-stroke rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 p-6 md:p-8"
            >
              {/* Top Row Controls */}
              <div className="flex justify-between items-center pb-4 border-b border-stroke shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] sm:text-xs text-muted font-mono uppercase tracking-[0.2em]">
                    Curriculum Vitae
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Download & View Resume CTA */}
                  <a
                    href="/Mayank_s_Resume (1).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] sm:text-[15px] font-mono font-semibold uppercase tracking-wider text-[#89AACC] hover:text-text-primary hover:underline transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Resume</span>
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

              {/* Scrollable resume container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar py-6 pr-1 flex flex-col gap-8 font-sans">
                {/* Profile header block */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-bg/50 p-6 rounded-2xl border border-stroke">
                  <div>
                    <h2 className="text-3xl font-display italic text-text-primary">
                      Mayank Kumar
                    </h2>
                    <p className="text-xs sm:text-sm text-[#89AACC] font-mono uppercase tracking-widest mt-1">
                      AI/ML Engineer & Developer
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 text-[12px] text-muted font-mono">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#4E85BF]" />
                      <span>mayankjangra2015@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#4E85BF]" />
                      <span>Haryana, India</span>
                    </div>
                  </div>
                </div>

                {/* Grid columns section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left core column: Skills & Education */}
                  <div className="md:col-span-1 flex flex-col gap-8">
                    {/* Focus expertise skills pills */}
                    <div>
                      <h3 className="text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase pb-2 border-b border-stroke mb-4 flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5" /> Skills
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "Languages: Python, C++, SQL, HTML, CSS",
                          "Libraries/Frameworks: NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, React.js",
                          "Data Science & ML: Data Preprocessing, Exploratory Data Analysis (EDA), Model Building, Model Evaluation",
                          "AI: Prompt Engineering, Generative AI, LLMs, Agentic AI & n8n",
                          "Tools/Platforms: Git, GitHub, Jupyter Notebook, VS Code, Google Colab, Docker",
                          // "Core CS: DSA, OOPs, OS, DBMS, Networks",
                          // "Soft Skills: Problem Solving, Leadership, Team Collaboration, Quick Learner, Consistency & Discipline",
                          "Graphic Designing, Video Editing",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="bg-stroke/60 font-mono text-[9px] text-text-primary px-3 py-1 rounded-md border border-stroke hover:border-text-primary/30 hover:bg-bg transition-colors cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Educational background */}
                    <div>
                      <h3 className="text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase pb-2 border-b border-stroke mb-4 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" /> Education
                      </h3>
                      <div className="flex flex-col gap-4">
                        <div>
                          <div className="text-[10px] text-muted font-mono">2023 – 2027</div>
                          <h4 className="text-sm font-semibold text-text-primary mt-0.5">
                            BTech in CSE ( AI & ML )
                          </h4>
                          <p className="text-xs text-muted font-light">Kurukshetra University, Kurukshetra</p>
                        </div>
                        {/* <div>
                          <div className="text-[10px] text-muted font-mono">2023</div>
                          <h4 className="text-sm font-semibold text-text-primary mt-0.5">
                            High School
                          </h4>
                          <p className="text-xs text-muted font-light">CBSE</p>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* Right core column (span 2): Experiences */}
                  <div className="md:col-span-2 flex flex-col gap-6">
                    <h3 className="text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase pb-2 border-b border-stroke mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Experience History
                    </h3>

                    <div className="flex flex-col gap-6">
                      {/* Job 1 */}
                      <div>
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="text-base font-semibold text-text-primary">
                            AI Engineer Intern ( Remote )
                          </h4>
                          <span className="text-[10px] text-[#4E85BF] font-mono shrink-0">
                            June – July 2026
                          </span>
                        </div>
                        <div className="text-xs text-muted font-mono uppercase tracking-wide mt-0.5">
                          TechZolo 
                        </div>
                        <p className="text-xs text-muted mt-2 font-light leading-relaxed">
                          Work with the development team on technical tasks related to AI
systems, automation tools, and platform development.
                        </p>
                      </div>

                      {/* Job 2 */}
                      <div>
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="text-base font-semibold text-text-primary">
                            Project Intern - Machine Learning ( Remote )
                          </h4>
                          <span className="text-[10px] text-[#4E85BF] font-mono shrink-0">
                            July - August 2025
                          </span>
                        </div>
                        <div className="text-xs text-muted font-mono uppercase tracking-wide mt-0.5">
                          Fox Trading Solution
                        </div>
                        <p className="text-xs text-muted mt-2 font-light leading-relaxed">
                          Developed and evaluated ML models for diabetes prediction, human action detection, and bike-sharing demand forecast.
                        </p>
                      </div>

                      {/* Job 3 */}
                      <div>
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="text-base font-semibold text-text-primary">
                            Training and Internship program - AI/ML ( Hybrid )
                          </h4>
                          <span className="text-[10px] text-[#4E85BF] font-mono shrink-0">
                            July 2024
                          </span>
                        </div>
                        <div className="text-xs text-muted font-mono uppercase tracking-wide mt-0.5">
                          SkillifyMe 
                        </div>
                        <p className="text-xs text-muted mt-2 font-light leading-relaxed">
                          Learned Artificial Intelligence & Machine Learning concepts using Python and build a Loan Approval Prediction model.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom decorative verification */}
                <div className="flex justify-center items-center py-4 bg-surface rounded-xl border border-stroke font-mono text-[9px] text-muted">
                  <Award className="w-3.5 h-3.5 text-[#89AACC] mr-2" />
                  <span>MAYANK KUMAR PORTFOLIO • CERTIFIED AUTHENTIC</span>
                </div>
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

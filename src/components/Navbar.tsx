import { useState, useEffect } from "react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onResumeClick: () => void;
}

export default function Navbar({ activeSection, onNavigate, onResumeClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", target: "home" },
    // { label: "Projects", target: "projects" },
    // { label: "Recognition", target: "recognition" },
    { label: "Connect", target: "contact" },
  ];

  return (
    <nav
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300"
    >
      <div
        id="nav-inner-pill"
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-1.5 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/40 scale-95 border-white/15 bg-surface/90" : ""
        }`}
      >
        {/* 1. Logo Ring */}
        <button
          id="nav-logo-button"
          onClick={() => onNavigate("home")}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="relative w-9 h-9 flex items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 focus:outline-none"
        >
          {/* Accent ring: reverses direction on hover */}
          <div
            className={`absolute inset-0 accent-gradient rounded-full transition-transform duration-700 ${
              logoHovered ? "rotate-180 scale-105" : "rotate-0"
            }`}
          />
          {/* Inner bg-bg circle */}
          <div className="absolute inset-[2px] bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[14px] text-text-primary font-bold tracking-tight">
              MK
            </span>
          </div>
        </button>

        {/* 2. Divider (hidden on mobile) */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* 3. Nav Links */}
        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = activeSection === link.target;
            return (
              <button
                key={link.target}
                id={`nav-link-${link.target}`}
                onClick={() => onNavigate(link.target)}
                className={`text-xs sm:text-sm font-medium rounded-full px-3 sm:px-4 py-1.5 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-text-primary bg-stroke/70 font-semibold"
                    : "text-muted hover:text-text-primary hover:bg-stroke/40"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-2" />

        {/* 5. Featured CTA: Resume button */}
        <button
          id="nav-resume-button"
          onClick={onResumeClick}
          className="group relative inline-flex items-center justify-center rounded-full text-xs sm:text-sm font-bold h-9 px-4 cursor-pointer overflow-hidden transition-all duration-300"
        >
          {/* Absolute gradient border on hover */}
          <span className="absolute inset-0 bg-transparent rounded-full group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300" />
          <span className="absolute inset-[1px] bg-surface rounded-full group-hover:bg-surface/90 transition-all duration-300" />

          {/* Inner content */}
          <span className="relative z-10 text-text-primary flex items-center gap-1">
            <span>Resume</span>
            <span className="font-mono text-[10px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </span>
        </button>
      </div>
    </nav>
  );
}

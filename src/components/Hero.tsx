import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";

interface HeroProps {
  startAnimation: boolean;
  onNavigate: (sectionId: string) => void;
}

const ROLES = [ "AI & ML Engineer", "Developer", "Creative", "Tech Enthusiast" ];

export default function Hero({ startAnimation, onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle through roles every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Initialize HLS Video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl =
      "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log("HLS Play failed:", err));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari etc.)
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => console.log("Native Play failed:", err));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Entrance timing
  useEffect(() => {
    if (!startAnimation) return;

    // Reset initial state of elements to prevent flashing before animation
    const nameRevealEls = containerRef.current?.querySelectorAll(".name-reveal");
    const blurInEls = containerRef.current?.querySelectorAll(".blur-in");

    if (!nameRevealEls || !blurInEls) return;

    gsap.set(nameRevealEls, { opacity: 0, y: 50 });
    gsap.set(blurInEls, { opacity: 0, filter: "blur(10px)", y: 20 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to(
      nameRevealEls,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1,
      },
      0.1
    );

    tl.to(
      blurInEls,
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.0,
        stagger: 0.1,
      },
      0.3
    );
  }, [startAnimation]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-bg"
    >
      {/* Background HLS Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-40"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center">
        {/* Eyebrow */}
        <span
          id="hero-eyebrow"
          className="blur-in text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] mb-6 sm:mb-8 font-semibold"
        >
          
        </span>

        {/* Name */}
        <h1
          id="hero-name"
          className="name-reveal text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.85] tracking-tight text-text-primary mb-6"
        >
          Mayank Kumar
        </h1>

        {/* Role line */}
        <div id="hero-role-line" className="blur-in text-base sm:text-lg md:text-xl text-muted/90 font-medium mb-6">
          {" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block font-semibold px-1"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          
        </div>

        {/* Description */}
        <p
          id="hero-description"
          className="blur-in text-xs sm:text-sm md:text-base text-muted max-w-md mb-10 leading-relaxed"
        >
          Learning. Building. Engineering.<br/>Turning ideas into real-world solutions.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Button 1: Solid See Works */}
          <button
            id="hero-cta-works"
            onClick={() => onNavigate("projects")}
            className="group relative inline-flex items-center justify-center rounded-full text-sm font-semibold px-7 py-3.5 hover:scale-105 transition-transform duration-300 bg-text-primary text-bg cursor-pointer"
          >
            {/* Gradient border ring on hover */}
            <span className="absolute -inset-[1px] bg-transparent rounded-full group-hover:accent-gradient -z-10 transition-all duration-300" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-text-primary">
              See Works
            </span>
            <span className="absolute inset-0 bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1" />
          </button>

          {/* Button 2: Outlined Reach out */}
          <button
            id="hero-cta-reachout"
            onClick={() => onNavigate("contact")}
            className="group relative inline-flex items-center justify-center rounded-full text-sm font-semibold px-7 py-3.5 hover:scale-105 transition-transform duration-300 border border-stroke bg-bg/50 backdrop-blur-sm text-text-primary cursor-pointer"
          >
            {/* Gradient border ring on hover */}
            <span className="absolute -inset-[1px] bg-transparent rounded-full group-hover:accent-gradient -z-10 transition-all duration-300 animate-gradient-shift" />
            <span className="relative z-10">Reach out...</span>
            <span className="absolute inset-[1px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        id="hero-scroll-indicator"
        className="absolute bottom-6 flex flex-col items-center gap-2 select-none pointer-events-none z-10"
      >
        <span className="text-[9px] text-muted uppercase tracking-[0.2em] font-medium opacity-60">
          SCROLL
        </span>
        <div className="w-[1px] h-10 bg-stroke relative overflow-hidden">
          <div className="absolute left-0 right-0 h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}

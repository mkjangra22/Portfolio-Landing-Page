import { useEffect, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Learn", "Build", "Impact"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Animate counter from 0 to 100 over 2700ms using requestAnimationFrame
  useEffect(() => {
    const startTime = performance.now();
    const duration = 2700; // 2.7 seconds

    let frameId: number;

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * 100);

      setCount(currentCount);

      // Cycle words every 900ms (900ms * 3 = 2700ms)
      const wordIdx = Math.min(Math.floor(elapsed / 900), WORDS.length - 1);
      setCurrentWordIndex(wordIdx >= 0 ? wordIdx : 0);

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCounter);
      } else {
        // Delay of 400ms after reaching 100, then call onComplete
        const timeoutId = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timeoutId);
      }
    };

    frameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [onComplete]);

  return (
    <div
      id="loading-screen"
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
    >
      {/* Top Header Label */}
      <div className="flex justify-between items-start w-full">
        <motion.div
          id="loading-header-label"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Portfolio 
        </motion.div>
        <div className="text-xs text-muted/30 font-mono">
          {/* SYSTEM_ONLINE_STABLE */}
        </div>
      </div>

      {/* Center Word Rotator */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="h-24 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={WORDS[currentWordIndex]}
              id={`loading-word-${WORDS[currentWordIndex].toLowerCase()}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary"
            >
              {WORDS[currentWordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Content Row */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 w-full">
        {/* Left Side: Detail list */}
        <div className="flex flex-col gap-1 items-start font-mono text-[12px] text-muted">
          <div>NAME: MAYANK KUMAR</div>
          <div>LOCATION: HARYANA, INDIA</div>
          <div>COMPUTER SCIENCE ENGINEER</div>
        </div>

        {/* Right Side: Numeric Counter */}
        <div className="flex items-baseline" id="loading-counter-wrapper">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tight">
            {String(count).padStart(3, "0")}
          </span>
          <span className="text-[30px] text-muted font-mono ml-2">%</span>
        </div>
      </div>

      {/* Bottom accent progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div
          id="loading-progress-bar"
          className="accent-gradient h-full origin-left transition-transform duration-75 ease-out"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
          }}
        />
      </div>
    </div>
  );
}

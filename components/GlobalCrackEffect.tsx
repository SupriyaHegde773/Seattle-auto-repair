"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Crack {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export default function GlobalCrackEffect() {
  const [cracks, setCracks] = useState<Crack[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    // Only add effect if clicking on the document body directly or elements that bubble
    // We can add logic to ignore specific interactive elements if needed,
    // but user asked for "where ever i click"

    // Create new crack
    const newCrack = {
      id: Date.now(),
      x: e.pageX,
      y: e.pageY,
      rotation: Math.random() * 360,
    };

    setCracks((prev) => [...prev, newCrack]);

    // Remove after 3 seconds
    setTimeout(() => {
      setCracks((prev) => prev.filter((c) => c.id !== newCrack.id));
    }, 3000);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {cracks.map((crack) => (
          <motion.div
            key={crack.id}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
            transition={{ duration: 0.1 }} // Instant appear
            style={{
              position: "absolute",
              left: crack.x,
              top: crack.y - window.scrollY, // Make fixed relative to viewport
              x: "-50%",
              y: "-50%",
              rotate: crack.rotation,
              width: 150,
              height: 150,
            }}
          >
            {/* Realistic Glass Crack SVG */}
            <svg
              viewBox="0 0 100 100"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-lg"
            >
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.2" />
              </filter>

              {/* Main Crack Lines */}
              <path
                d="M50 50 L20 20 L10 25"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="1"
              />
              <path
                d="M50 50 L80 15 L85 5"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="1"
              />
              <path
                d="M50 50 L70 80 L75 90"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1"
              />
              <path
                d="M50 50 L30 70 L15 65"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="0.8"
              />
              <path
                d="M50 50 L90 55"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.5"
              />

              {/* Spiderweb details */}
              <path
                d="M35 35 L40 30"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="0.3"
              />
              <path
                d="M65 30 L60 25"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="0.3"
              />

              {/* Impact Center */}
              <circle cx="50" cy="50" r="1.5" fill="rgba(255,255,255,0.9)" />
              <circle
                cx="50"
                cy="50"
                r="8"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.2"
                fill="none"
              />
            </svg>

            {/* Visual shine/glint overlay */}
            <div className="absolute inset-0 bg-blue-400/10 mix-blend-overlay rounded-full blur-xl animate-pulse" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

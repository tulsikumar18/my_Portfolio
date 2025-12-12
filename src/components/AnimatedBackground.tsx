"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";
import Particles from "./Particles";
import ThreeDBlob from "./ThreeDBlob";
import VantaBackground from "./VantaBackground";
import FloatingShapes from "./FloatingShapes";
import AnimatedGradientOrbs from "./AnimatedGradientOrbs";

const AnimatedBackground = () => {
  console.log("[AnimatedBackground] Component rendering");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    console.log("[AnimatedBackground] Mounting component");
    setMounted(true);
    
    // Check initial theme
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };
    
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    // Also listen to storage events for theme changes
    const handleStorageChange = () => {
      checkTheme();
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Gradient overlay based on theme
  const gradientOverlay = useMemo(() => {
    if (theme === "dark") {
      return (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      );
    } else {
      return (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(167, 139, 250, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(153, 246, 228, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      );
    }
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ willChange: "opacity" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Layer 1: Animated Gradient Orbs (deepest background) */}
      <AnimatedGradientOrbs theme={theme} />

      {/* Layer 2: 3D Blob - Enhanced visibility */}
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <ThreeDBlob theme={theme} />
        </Suspense>
      </ErrorBoundary>

      {/* Layer 3: Vanta.js Effect */}
      <ErrorBoundary fallback={null}>
        <VantaBackground theme={theme} effect="waves" />
      </ErrorBoundary>

      {/* Layer 4: Floating Shapes */}
      <FloatingShapes theme={theme} />

      {/* Layer 5: TSParticles */}
      <ErrorBoundary fallback={null}>
        <Particles theme={theme} />
      </ErrorBoundary>

      {/* Layer 6: Gradient Overlays */}
      {gradientOverlay}
    </motion.div>
  );
};

export default AnimatedBackground;

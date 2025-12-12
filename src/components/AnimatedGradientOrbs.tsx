"use client";
import { motion } from "framer-motion";

const AnimatedGradientOrbs = ({ theme }: { theme: string }) => {
  const isDark = theme === "dark";
  
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ willChange: "transform" }}
    >
      {/* Large animated orbs */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "600px",
          height: "600px",
          left: "10%",
          top: "20%",
          background: isDark
            ? "radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.2), transparent)"
            : "radial-gradient(circle, rgba(167, 139, 250, 0.3), rgba(147, 197, 253, 0.15), transparent)",
        }}
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1], // Custom cubic bezier for smoother motion
        }}
      />
      
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "500px",
          height: "500px",
          right: "15%",
          bottom: "25%",
          background: isDark
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.35), rgba(99, 102, 241, 0.15), transparent)"
            : "radial-gradient(circle, rgba(147, 197, 253, 0.3), rgba(167, 139, 250, 0.15), transparent)",
        }}
        animate={{
          x: [0, -150, 150, 0],
          y: [0, 150, -150, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "400px",
          height: "400px",
          left: "50%",
          top: "60%",
          background: isDark
            ? "radial-gradient(circle, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.15), transparent)"
            : "radial-gradient(circle, rgba(153, 246, 228, 0.25), rgba(167, 139, 250, 0.15), transparent)",
        }}
        animate={{
          x: [0, 120, -120, 0],
          y: [0, -80, 80, 0],
          scale: [1, 1.3, 0.7, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
          delay: 4,
        }}
      />
    </div>
  );
};

export default AnimatedGradientOrbs;


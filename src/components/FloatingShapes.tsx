"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FloatingShapeProps {
  theme: string;
  delay?: number;
  duration?: number;
  size?: number;
  left?: string;
  top?: string;
}

const FloatingShape = ({ theme, delay = 0, duration = 20, size = 100, left, top }: FloatingShapeProps) => {
  const isDark = theme === "dark";
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: left || `${Math.random() * 100}%`,
        top: top || `${Math.random() * 100}%`,
        width: size,
        height: size,
        willChange: "transform, opacity",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.3, 0],
        scale: [0, 1, 0],
        y: [0, -200, -400],
        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: [0.25, 0.1, 0.25, 1], // Smooth ease for floating
      }}
    >
      <div
        className="w-full h-full rounded-full blur-xl"
        style={{
          background: isDark
            ? `radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.2), transparent)`
            : `radial-gradient(circle, rgba(167, 139, 250, 0.3), rgba(147, 197, 253, 0.2), transparent)`,
        }}
      />
    </motion.div>
  );
};

const FloatingShapes = ({ theme }: { theme: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingShape
          key={i}
          theme={theme}
          delay={i * 2}
          duration={15 + Math.random() * 10}
          size={80 + Math.random() * 120}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;


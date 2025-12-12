"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  aos?: string;
  aosDelay?: number;
  className?: string;
}

const AnimatedCard = ({ 
  children, 
  delay = 0,
  aos,
  aosDelay,
  className = "",
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      }}
      whileHover={{
        scale: 1.02,
        y: -8,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      data-aos={aos}
      data-aos-delay={aosDelay}
    >
      <Card className={`transition-all duration-300 ${className}`}>
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;


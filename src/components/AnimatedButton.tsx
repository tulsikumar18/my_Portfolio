"use client";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { buttonScale } from "@/utils/animations";

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
  href?: string;
  delay?: number;
}

const AnimatedButton = ({ 
  children, 
  href, 
  delay = 0,
  className = "",
  ...props 
}: AnimatedButtonProps) => {
  const buttonContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.3, 
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      whileHover={buttonScale.hover}
      whileTap={buttonScale.tap}
    >
      <Button
        className={`transform transition-all duration-300 ${className}`}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

export default AnimatedButton;


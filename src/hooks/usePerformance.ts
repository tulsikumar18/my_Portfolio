import { useEffect, useState } from "react";

/**
 * Hook to detect device performance and adjust animations accordingly
 */
export const usePerformance = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Detect low performance devices
    const checkPerformance = () => {
      // Check for hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 4;
      
      // Check for device memory (if available)
      const memory = (navigator as any).deviceMemory || 4;
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      // Consider it low performance if:
      // - Less than 4 cores
      // - Less than 4GB RAM
      // - User prefers reduced motion
      const lowPerf = cores < 4 || memory < 4 || prefersReducedMotion;
      
      setIsLowPerformance(lowPerf);
    };

    checkPerformance();

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return {
    isLowPerformance,
    isMobile,
    particleCount: isLowPerformance || isMobile ? 30 : 80,
    enableAnimations: !isLowPerformance,
  };
};

/**
 * Hook to debounce values for performance
 */
export const useDebounce = <T,>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook to throttle function calls
 */
export const useThrottle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = 100
): T => {
  const [lastRan, setLastRan] = useState(Date.now());

  return ((...args: any[]) => {
    const now = Date.now();
    if (now - lastRan >= delay) {
      func(...args);
      setLastRan(now);
    }
  }) as T;
};


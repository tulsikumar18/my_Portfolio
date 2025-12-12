"use client";
import { useCallback, useMemo } from "react";
import ParticlesComponent from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Particles = ({ theme }: { theme: string }) => {
  console.log("[Particles] Component rendering, theme:", theme);
  // Debounced particle count based on screen size
  const particleCount = useMemo(() => {
    if (typeof window === "undefined") return 80;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    return isMobile ? 30 : isTablet ? 50 : 80;
  }, []);

  const particlesInit = useCallback(async (engine: any) => {
    try {
      await loadSlim(engine);
    } catch (error) {
      console.error("[Particles] Error loading particles engine:", error);
    }
  }, []);

  const particlesLoaded = useCallback(async () => {
    // Particles loaded successfully
  }, []);

  const getParticleConfig = useMemo(() => {
    const isDark = theme === "dark";
    
    return {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 150,
            duration: 0.6,
            factor: 100,
            speed: 0.8,
            maxSpeed: 30,
            easing: "ease-out-cubic",
          },
          attract: {
            distance: 200,
            duration: 0.6,
            easing: "ease-out-cubic",
            factor: 1,
            maxSpeed: 30,
            speed: 0.8,
          },
        },
      },
      particles: {
        color: {
          value: isDark 
            ? ["#8B5CF6", "#6366F1", "#3B82F6", "#0EA5E9", "#A78BFA"]
            : ["#A78BFA", "#93C5FD", "#99F6E4", "#FDE047", "#C4B5FD"],
        },
        links: {
          color: isDark ? "#8B5CF6" : "#A78BFA",
          distance: 150,
          enable: true,
          opacity: isDark ? 0.75 : 0.55,
          width: 2,
          triangles: {
            enable: true,
            opacity: isDark ? 0.2 : 0.1,
          },
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: {
            default: "bounce" as const,
          },
          random: false,
          speed: {
            min: 0.3,
            max: 1.2,
          },
          straight: false,
          attract: {
            enable: true,
            rotate: {
              x: 600,
              y: 1200,
            },
          },
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: particleCount,
        },
        opacity: {
          value: isDark ? 0.9 : 0.7,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.3,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: 1,
            max: 4,
          },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.5,
            sync: false,
          },
        },
        shadow: {
          enable: isDark,
          blur: 5,
          color: {
            value: "#8B5CF6",
          },
          offset: {
            x: 0,
            y: 0,
          },
        },
        twinkle: {
          particles: {
            enable: isDark,
            frequency: 0.05,
            opacity: 1,
          },
        },
      },
      detectRetina: true,
      smooth: true,
      style: {
        filter: isDark ? "blur(0.5px)" : "none",
      },
    };
  }, [theme, particleCount]);

  return (
    <div className="absolute inset-0 opacity-100 transition-opacity duration-1000">
      <ParticlesComponent
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={getParticleConfig}
        className="absolute inset-0"
      />
    </div>
  );
};

export default Particles;

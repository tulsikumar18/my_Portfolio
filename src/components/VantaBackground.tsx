"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type VantaEffect = "waves" | "fog" | "globe" | "cells" | "none";

interface VantaBackgroundProps {
  theme: string;
  effect?: VantaEffect;
}

const VantaBackground = ({ theme, effect = "waves" }: VantaBackgroundProps) => {
  console.log("[VantaBackground] Component rendering, theme:", theme, "effect:", effect);
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !vantaRef.current || effect === "none") {
      return;
    }

    let effectInstance: any = null;

    const loadVantaEffect = async () => {
      try {
        let VantaEffect: any;

        switch (effect) {
          case "waves":
            const WAVES = await import("vanta/dist/vanta.waves.min.js");
            VantaEffect = WAVES.default || WAVES;
            break;
          case "fog":
            const FOG = await import("vanta/dist/vanta.fog.min.js");
            VantaEffect = FOG.default || FOG;
            break;
          case "globe":
            const GLOBE = await import("vanta/dist/vanta.globe.min.js");
            VantaEffect = GLOBE.default || GLOBE;
            break;
          case "cells":
            const CELLS = await import("vanta/dist/vanta.cells.min.js");
            VantaEffect = CELLS.default || CELLS;
            break;
          default:
            return;
        }

        if (VantaEffect && vantaRef.current) {
          effectInstance = VantaEffect({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: theme === "dark" ? 0x6366f1 : 0xa78bfa,
            backgroundColor: theme === "dark" ? 0x000000 : 0xffffff,
            shininess: theme === "dark" ? 50 : 30,
            waveHeight: theme === "dark" ? 20 : 15,
            waveSpeed: 1.0,
            zoom: 0.75,
          });

          setVantaEffect(effectInstance);
        }
      } catch (error) {
        console.error("[VantaBackground] Error loading vanta effect:", error);
      }
    };

    loadVantaEffect();

    return () => {
      if (effectInstance) {
        try {
          effectInstance.destroy();
        } catch (error) {
          console.error("[VantaBackground] Error destroying effect:", error);
        }
      }
    };
  }, [mounted, effect, theme]);

  // Update effect when theme changes
  useEffect(() => {
    if (vantaEffect && vantaRef.current) {
      try {
        vantaEffect.setOptions({
          color: theme === "dark" ? 0x6366f1 : 0xa78bfa,
          backgroundColor: theme === "dark" ? 0x000000 : 0xffffff,
        });
      } catch (error) {
        console.error("[VantaBackground] Error updating effect:", error);
      }
    }
  }, [theme, vantaEffect]);

  if (!mounted || effect === "none") {
    return null;
  }

  return (
    <div 
      ref={vantaRef} 
      className="absolute inset-0 opacity-40 transition-opacity duration-1000 gpu-accelerated"
      style={{ 
        filter: theme === "dark" ? "blur(1px)" : "blur(0.5px)",
        willChange: "opacity, filter",
      }}
    />
  );
};

export default VantaBackground;

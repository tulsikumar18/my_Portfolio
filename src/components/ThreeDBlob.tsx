"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

// Lazy load React Three Fiber
let Canvas: any;
let useFrame: any;
let r3fLoaded = false;

const loadR3F = async () => {
  if (r3fLoaded) return;
  try {
    const r3f = await import("@react-three/fiber");
    Canvas = r3f.Canvas;
    useFrame = r3f.useFrame;
    r3fLoaded = true;
  } catch (error) {
    console.error("[ThreeDBlob] Failed to load:", error);
    throw error;
  }
};

// Mouse position tracking
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        // Smoother interpolation with exponential easing
        lastX = lastX + (x - lastX) * 0.15;
        lastY = lastY + (y - lastY) * 0.15;
        setMousePosition({ x: lastX, y: lastY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return mousePosition;
};

// Main 3D Blob
const Blob = ({ theme, position, scale = 1 }: { theme: string; position: [number, number, number]; scale?: number }) => {
  if (!useFrame) return null;
  
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const mousePosition = useMousePosition();

  const getBlobColor = useMemo(() => {
    return theme === "dark" ? "#6366F1" : "#8B5CF6";
  }, [theme]);

  useFrame((state: any, delta: number) => {
    if (!meshRef.current) return;
    timeRef.current += delta * 0.5;

    // Smooth dynamic rotation with delta-based movement
    meshRef.current.rotation.x = Math.sin(timeRef.current * 0.3) * 0.2;
    meshRef.current.rotation.y += delta * 0.5; // Frame-rate independent
    meshRef.current.rotation.z = Math.cos(timeRef.current * 0.2) * 0.1;

    // Smooth cursor parallax with improved interpolation
    const targetX = mousePosition.x * 2 * scale;
    const targetY = mousePosition.y * 2 * scale;

    // Smoother lerp with delta-based interpolation
    const lerpFactor = Math.min(1, delta * 8); // Frame-rate independent smooth interpolation
        meshRef.current.position.x = THREE.MathUtils.lerp(
          meshRef.current.position.x,
      position[0] + targetX,
      lerpFactor
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
      position[1] + targetY,
      lerpFactor
    );

    // Smoother pulsing scale with eased animation
    const pulse = 1 + Math.sin(timeRef.current) * 0.08;
    const currentScale = meshRef.current.scale.x;
    const targetScale = scale * pulse;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(currentScale, targetScale, lerpFactor)
    );
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[3 * scale, 2]} />
      <meshStandardMaterial
        color={getBlobColor}
        transparent
        opacity={theme === "dark" ? 0.55 : 0.45}
        roughness={0.2}
        metalness={0.5}
        emissive={getBlobColor}
        emissiveIntensity={theme === "dark" ? 0.7 : 0.5}
      />
    </mesh>
  );
};

// Floating Orb
const FloatingOrb = ({ theme, position, delay = 0 }: { theme: string; position: [number, number, number]; delay?: number }) => {
  if (!useFrame) return null;
  
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(delay);

  const color = useMemo(() => {
    return theme === "dark" ? "#8B5CF6" : "#A78BFA";
  }, [theme]);

  useFrame((state: any, delta: number) => {
    if (!meshRef.current) return;
    timeRef.current += delta * 0.3;

    // Smooth floating motion with eased interpolation
    const targetY = position[1] + Math.sin(timeRef.current) * 0.5;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      Math.min(1, delta * 10)
    );
    
    // Smooth rotation
    meshRef.current.rotation.x += delta * 2;
    meshRef.current.rotation.y += delta * 3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.75}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Rotating Ring
const RotatingRing = ({ theme, position }: { theme: string; position: [number, number, number] }) => {
  if (!useFrame) return null;
  
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const color = useMemo(() => {
    return theme === "dark" ? "#3B82F6" : "#60A5FA";
  }, [theme]);

  useFrame((state: any, delta: number) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    
    // Smooth rotation with delta
    meshRef.current.rotation.z += delta * 4;
    meshRef.current.rotation.y += delta * 2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[2, 0.1, 16, 100]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.5}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
};

const ThreeDBlob = ({ theme }: { theme: string }) => {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await loadR3F();
        setTimeout(() => {
          setLoaded(true);
          setMounted(true);
        }, 200);
      } catch (err) {
        console.error("[ThreeDBlob] Initialization failed:", err);
        setError(true);
      }
    };
    init();
  }, []);

  if (error || !loaded || !mounted || !Canvas) {
    return null;
  }

  try {
  return (
      <Canvas
        className="absolute inset-0 gpu-accelerated"
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={theme === "dark" ? 0.5 : 0.7} />
      <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={theme === "dark" ? "#8B5CF6" : "#A78BFA"} />
        <directionalLight position={[0, 5, 5]} intensity={0.4} />
        
        {/* Main blob - more visible */}
        <Blob theme={theme} position={[0, 0, 0]} scale={1.2} />
        
        {/* Secondary blobs */}
        <Blob theme={theme} position={[-4, 2, -2]} scale={0.8} />
        <Blob theme={theme} position={[4, -2, -2]} scale={0.6} />
        
        {/* Floating orbs */}
        <FloatingOrb theme={theme} position={[-3, 3, -1]} delay={0} />
        <FloatingOrb theme={theme} position={[3, -3, -1]} delay={1} />
        <FloatingOrb theme={theme} position={[0, 4, -1]} delay={2} />
        
        {/* Rotating rings */}
        <RotatingRing theme={theme} position={[-5, 0, -3]} />
        <RotatingRing theme={theme} position={[5, 0, -3]} />
    </Canvas>
  );
  } catch (err) {
    console.error("[ThreeDBlob] Render error:", err);
    return null;
  }
};

export default ThreeDBlob;

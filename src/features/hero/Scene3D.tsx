import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Enhanced Globe component with visible effects
const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);

  // Auto-rotation with different speeds for dynamic effect
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3; // Faster rotation
      meshRef.current.rotation.x += delta * 0.1; // Slight tilt animation
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.2; // Counter-rotation
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.rotation.y += delta * 0.5; // Fastest rotation
    }
  });

  return (
    <>
      {/* Main Globe - Much brighter and more visible */}
      <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4f46e5"
          roughness={0.3}
          metalness={0.7}
          emissive="#a855f7"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Inner Atmosphere - More visible */}
      <Sphere ref={atmosphereRef} args={[2.1, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.4}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer Glow - Enhanced visibility */}
      <Sphere ref={outerGlowRef} args={[2.5, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Additional Visual Effects */}
      {/* Wireframe overlay for tech aesthetic */}
      <Sphere args={[1.9, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Floating particles around globe */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 0.5) * 2;

        return (
          <Sphere key={i} args={[0.05, 8, 8]} position={[x, y, z]}>
            <meshBasicMaterial
              color={i % 2 === 0 ? "#a855f7" : "#3b82f6"}
              transparent
              opacity={0.8}
            />
          </Sphere>
        );
      })}
    </>
  );
};

const Scene3D = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64 md:w-80 md:h-80">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          style={{ background: "transparent" }}
        >
          {/* Enhanced Lighting Setup */}
          <ambientLight intensity={0.6} color="#ffffff" />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-5, -5, 5]} intensity={0.8} color="#a855f7" />
          <pointLight position={[0, 0, -5]} intensity={0.6} color="#3b82f6" />

          {/* Globe */}
          <Globe />

          {/* Interactive Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            rotateSpeed={0.8}
            dampingFactor={0.03}
            enableDamping
          />
        </Canvas>
      </div>
    </div>
  );
};

export default Scene3D;

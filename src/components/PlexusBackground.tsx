import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
}

// Enhanced Particle Network System
const ParticleNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef(new THREE.Vector2(0, 0));
  const { viewport, size } = useThree();

  // Configuration - Spread across full viewport
  const config = {
    particleCount: 250,
    connectionDistance: 3.5,
    maxConnections: 5,
    mouseInfluence: 1.8,
    animationSpeed: 0.5,
  };

  // Initialize particles
  const particles = useMemo(() => {
    const particleArray: Particle[] = [];
    // Use full viewport dimensions with some padding
    const spreadX = viewport.width * 1.2;
    const spreadY = viewport.height * 1.2;

    for (let i = 0; i < config.particleCount; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * spreadX,
        (Math.random() - 0.5) * spreadY,
        (Math.random() - 0.5) * 6
      );

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.005
      );

      particleArray.push({
        position: position.clone(),
        velocity,
        originalPosition: position.clone(),
      });
    }

    return particleArray;
  }, [viewport.width, viewport.height, config.particleCount]);

  // Create geometry
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(config.particleCount * 3);
    const colors = new Float32Array(config.particleCount * 3);

    particles.forEach((particle, i) => {
      const i3 = i * 3;
      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;

      // Subtle color palette for better content readability
      const colorVariation = Math.random();
      let color;
      if (colorVariation < 0.3) {
        color = new THREE.Color(0x2d4d66); // Subtle cyan-blue
      } else if (colorVariation < 0.6) {
        color = new THREE.Color(0x334466); // Subtle blue
      } else {
        color = new THREE.Color(0x3d3d5d); // Subtle purple-blue
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    });

    return { positions, colors };
  }, [particles, config.particleCount]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;

      mousePosition.current.set(
        (x * viewport.width) / 2,
        (y * viewport.height) / 2
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size, viewport]);

  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current?.geometry?.attributes?.position) return;

    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const positions = positionsAttr.array as Float32Array;
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    const time = state.clock.getElapsedTime();
    const mouse = mousePosition.current;

    // Update particles
    particles.forEach((particle, i) => {
      const i3 = i * 3;

      // Gentle floating animation
      particle.position.x += Math.sin(time * 0.3 + i * 0.1) * 0.001;
      particle.position.y += Math.cos(time * 0.2 + i * 0.1) * 0.001;

      // Mouse interaction
      const mouseDistance = new THREE.Vector2(
        particle.position.x,
        particle.position.y
      ).distanceTo(mouse);

      if (mouseDistance < config.mouseInfluence) {
        const direction = new THREE.Vector2(
          particle.position.x - mouse.x,
          particle.position.y - mouse.y
        ).normalize();

        const force =
          (config.mouseInfluence - mouseDistance) / config.mouseInfluence;
        particle.position.x += direction.x * force * 0.02;
        particle.position.y += direction.y * force * 0.02;
      }

      // Boundary constraints - use full viewport
      const boundX = viewport.width * 0.6;
      const boundY = viewport.height * 0.6;
      if (Math.abs(particle.position.x) > boundX) {
        particle.position.x = Math.sign(particle.position.x) * boundX;
      }
      if (Math.abs(particle.position.y) > boundY) {
        particle.position.y = Math.sign(particle.position.y) * boundY;
      }

      // Update position array
      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;
    });

    // Generate connections
    for (let i = 0; i < particles.length; i++) {
      let connections = 0;
      for (
        let j = i + 1;
        j < particles.length && connections < config.maxConnections;
        j++
      ) {
        const distance = particles[i].position.distanceTo(
          particles[j].position
        );

        if (distance < config.connectionDistance) {
          linePositions.push(
            particles[i].position.x,
            particles[i].position.y,
            particles[i].position.z,
            particles[j].position.x,
            particles[j].position.y,
            particles[j].position.z
          );

          const opacity = (1 - distance / config.connectionDistance) * 0.4;
          const lineColor = new THREE.Color(0x445566);

          lineColors.push(lineColor.r, lineColor.g, lineColor.b, opacity);
          lineColors.push(lineColor.r, lineColor.g, lineColor.b, opacity);
          connections++;
        }
      }
    }

    positionsAttr.needsUpdate = true;

    // Update lines
    if (linesRef.current && linePositions.length > 0) {
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      lineGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(lineColors, 4)
      );

      if (linesRef.current.geometry) {
        linesRef.current.geometry.dispose();
      }
      linesRef.current.geometry = lineGeometry;
    }
  });

  return (
    <>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          transparent
          opacity={0.7}
          sizeAttenuation={true}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          transparent
          vertexColors={true}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
};

// Main PlexusBackground Component
const PlexusBackground = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1,
        background:
          "radial-gradient(ellipse at center, #0f0f1f 0%, #1a1a3a 20%, #141428 50%, #0f0f1f 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        {/* Subtle lighting for content readability */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.2} color="#445566" />
        <pointLight position={[-10, -10, 5]} intensity={0.15} color="#334466" />
        <pointLight position={[0, 0, 15]} intensity={0.1} color="#3d3d5d" />

        {/* Particle Network */}
        <ParticleNetwork />
      </Canvas>
    </div>
  );
};

export default PlexusBackground;

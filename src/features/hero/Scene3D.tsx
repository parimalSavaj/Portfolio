import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Noise function for organic displacement
const noiseVertexShader = `
  uniform float uTime;
  uniform float uIntensity;
  
  // Simple noise function
  float noise(vec3 position) {
    return sin(position.x * 10.0) * sin(position.y * 10.0) * sin(position.z * 10.0);
  }
  
  // More complex 3D noise
  float turbulence(vec3 position) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 0.5;
    
    for(int i = 0; i < 4; i++) {
      value += amplitude * noise(position * frequency + uTime * 0.1);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }
  
  void main() {
    vec3 pos = position;
    
    // Apply time-based displacement using noise
    float displacement = turbulence(pos + uTime * 0.3) * uIntensity;
    
    // Normalize and apply displacement
    vec3 newPosition = pos + normalize(pos) * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Iridescent fragment shader
const iridescenceFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  void main() {
    // Create iridescent effect based on viewing angle and time
    vec2 uv = gl_FragCoord.xy / vec2(800.0, 600.0);
    
    // Time-based color shifting
    float timeShift = sin(uTime * 0.5) * 0.5 + 0.5;
    
    // Create color gradient
    vec3 color1 = mix(uColor1, uColor2, timeShift);
    vec3 color2 = mix(uColor2, uColor3, sin(uTime * 0.7) * 0.5 + 0.5);
    
    // Gradient based on UV coordinates
    vec3 finalColor = mix(color1, color2, uv.y);
    
    // Add shimmer effect
    float shimmer = sin(uv.x * 20.0 + uTime * 2.0) * sin(uv.y * 20.0 + uTime * 1.5) * 0.1 + 0.9;
    finalColor *= shimmer;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Generative Art Blob Component
const GenerativeBlob = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Shader uniforms
  const uniforms = {
    uTime: { value: 0 },
    uIntensity: { value: 0.3 },
    uColor1: { value: new THREE.Color("#a855f7") }, // Aurora purple
    uColor2: { value: new THREE.Color("#3b82f6") }, // Aurora blue
    uColor3: { value: new THREE.Color("#ec4899") }, // Aurora pink
  };

  // Animation loop
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }

    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={noiseVertexShader}
        fragmentShader={iridescenceFragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

const Scene3D = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full min-h-[300px]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: "transparent" }}
        >
          {/* Minimal Lighting for Shader Material */}
          <ambientLight intensity={0.2} />

          {/* Generative Art Blob */}
          <GenerativeBlob />
        </Canvas>
      </div>
    </div>
  );
};

export default Scene3D;

import React from "react";
import { useMousePosition } from "../../hooks/useMousePosition";

const Scene3D = () => {
  const mousePosition = useMousePosition(true);

  // Calculate parallax rotation (dramatic effect for testing)
  const rotateX = mousePosition.y * -30; // Inverted for natural feel
  const rotateY = mousePosition.x * 30;

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* CSS-only 3D Aurora Object */}
      <div
        className="relative transition-transform duration-100 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main Aurora Shape */}
        <div
          className="w-32 h-32 relative animate-spin"
          style={{
            animation:
              "spin 8s linear infinite, pulse 4s ease-in-out infinite alternate",
          }}
        >
          {/* Aurora Rings */}
          <div className="absolute inset-0 border-4 border-aurora-purple rounded-full opacity-60 animate-ping"></div>
          <div className="absolute inset-2 border-2 border-aurora-blue rounded-full opacity-40"></div>
          <div className="absolute inset-4 border border-aurora-purple rounded-full opacity-80"></div>

          {/* Center Glow */}
          <div className="absolute inset-8 bg-gradient-to-br from-aurora-purple to-aurora-blue rounded-full blur-sm opacity-60"></div>
          <div className="absolute inset-10 bg-aurora-purple rounded-full animate-pulse"></div>
        </div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-aurora-blue rounded-full opacity-60"
            style={{
              top: `${20 + Math.sin(i * 0.8) * 40}%`,
              left: `${20 + Math.cos(i * 0.8) * 40}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        ))}

        {/* Orbiting Elements */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animation: "spin 12s linear infinite reverse" }}
        >
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-aurora-blue rounded-full opacity-80"></div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-aurora-purple rounded-full opacity-60"></div>
          <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-2 h-2 bg-aurora-blue rounded-full opacity-70"></div>
          <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 bg-aurora-purple rounded-full opacity-50"></div>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default Scene3D;

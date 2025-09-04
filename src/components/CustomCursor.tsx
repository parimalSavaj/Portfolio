import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Cancel previous animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if hovering over interactive elements
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.classList.contains("cursor-pointer") ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest(".group");

      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const cursorVariants = {
    default: {
      scale: 1,
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      scale: 1.5,
      opacity: isVisible ? 0.9 : 0,
    },
  };

  const trailVariants = {
    default: {
      scale: 1,
      opacity: isVisible ? 0.5 : 0,
    },
    hover: {
      scale: 1.3,
      opacity: isVisible ? 0.3 : 0,
    },
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        html, body, * {
          cursor: none !important;
        }
        input, textarea, select {
          cursor: none !important;
        }
        button, a, [role="button"] {
          cursor: none !important;
        }
      `}</style>

      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          ...(isHovering ? cursorVariants.hover : cursorVariants.default),
        }}
        transition={{
          x: { type: "spring", stiffness: 800, damping: 35, mass: 0.2 },
          y: { type: "spring", stiffness: 800, damping: 35, mass: 0.2 },
          scale: { type: "spring", stiffness: 400, damping: 25, mass: 0.3 },
          opacity: { duration: 0.15 },
        }}
      >
        <div className="w-3 h-3 bg-aurora-purple rounded-full shadow-lg shadow-aurora-purple/40" />
      </motion.div>

      {/* Trailing Circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          ...(isHovering ? trailVariants.hover : trailVariants.default),
        }}
        transition={{
          x: { type: "spring", stiffness: 150, damping: 25, mass: 0.5 },
          y: { type: "spring", stiffness: 150, damping: 25, mass: 0.5 },
          scale: { type: "spring", stiffness: 300, damping: 20, mass: 0.4 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="w-8 h-8 border-2 border-aurora-blue rounded-full shadow-lg shadow-aurora-blue/20" />
      </motion.div>

      {/* Aurora Glow Effect on Hover */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.3,
            scale: 1,
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            x: { type: "spring", stiffness: 100, damping: 20, mass: 0.6 },
            y: { type: "spring", stiffness: 100, damping: 20, mass: 0.6 },
            scale: { type: "spring", stiffness: 200, damping: 15, mass: 0.3 },
            opacity: { duration: 0.2 },
          }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-aurora-purple/30 to-aurora-blue/30 rounded-full blur-md" />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;

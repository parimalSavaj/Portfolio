import { useState, useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = (enable: boolean = true) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!enable) return;

    const handleMouseMove = (event: MouseEvent) => {
      // Cancel previous animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(() => {
        // Calculate relative position as percentage from center (-0.5 to 0.5)
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        setMousePosition({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enable]);

  return mousePosition;
};

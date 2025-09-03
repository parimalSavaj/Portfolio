import { useCallback } from "react";

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const { offset = 80, duration = 800 } = options;

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      // Calculate the target position with header offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Smooth scroll with custom timing
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
    [offset]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return { scrollToSection, scrollToTop };
};

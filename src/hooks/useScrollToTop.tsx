import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook that scrolls to top when the route changes
 * Useful for ensuring pages start at the top when navigating
 */
export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top immediately when route changes
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
};

export default useScrollToTop;

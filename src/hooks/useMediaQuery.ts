"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect media query matches
 * Useful for conditional rendering based on screen size
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

/**
 * Convenience hook for mobile detection
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}

/**
 * Convenience hook for tablet detection
 */
export function useIsTablet(): boolean {
  return useMediaQuery("(max-width: 1024px)");
}

"use client";
import { useEffect, useState } from "react";

export function useBreakpoint() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return {
    isMobile:  width > 0 && width < 640,
    isTablet:  width >= 640 && width <= 1024,
    isDesktop: width > 1024,
    isLarge:   width >= 1440,
    width,
  };
}
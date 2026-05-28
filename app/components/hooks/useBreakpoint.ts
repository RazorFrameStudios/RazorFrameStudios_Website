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
    isMobile:       width > 0    && width < 768,     // < 768px         — phones
    isTablet:       width >= 768  && width < 1025,   // 768–1025px      — iPads, tablets
    isLaptop:       width >= 1025 && width < 1920,   // 1025–1920px     — laptops up to Full HD (1080p)
    isDesktop:      width >= 1920 && width < 2560,   // 1920–2560px     — desktop monitors up to 1440p
    is2K:           width >= 2560 && width < 3840,   // 2560–3840px     — 2K monitors (2560x1440)
    is4K:           width >= 3840,                    // 3840px+         — 4K monitors (3840x2160)
    width,
  };
}
"use client";
import ReactLenis from "lenis/react";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }} root>
      {children}
    </ReactLenis>
  );
};

"use client";
import ReactLenis, { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }} root>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
};

const ScrollReset = () => {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
};

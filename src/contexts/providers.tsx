"use client";
import { animate, AnimationSequence } from "motion/react";
import { TransitionRouter } from "next-transition-router";
import { useRef } from "react";
import { LenisProvider } from "~/components/providers/lenis";
import { ThemeProvider } from "~/components/providers/theme-provider";

const DURATION = 0.5;
const STAGGER = 0.2;
const EASE = "circInOut";

export default function Providers({ children }: { children: React.ReactNode }) {
  const firstLayer = useRef<HTMLDivElement>(null);
  const secondLayer = useRef<HTMLDivElement>(null);

  const sweep = (
    y: string,
    next: () => void,
    layers: React.RefObject<HTMLDivElement | null>[],
  ) => {
    const [lead, trail] = layers.map((ref) => ref.current);

    if (!lead || !trail) {
      next();
      return;
    }

    const sequence = [
      [lead, { y: [y] }, { duration: DURATION, ease: EASE }],
      [
        trail,
        { y: [y] },
        { duration: DURATION, ease: EASE, at: `-${STAGGER}` },
      ],
    ] satisfies AnimationSequence;

    const controls = animate(sequence);
    controls.then(next);

    return () => controls.stop();
  };

  return (
    <TransitionRouter
      auto
      leave={(next) => sweep("-100%", next, [firstLayer, secondLayer])}
      enter={(next) => sweep("100%", next, [secondLayer, firstLayer])}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <LenisProvider>
          <div className="mt-20">{children}</div>
        </LenisProvider>
      </ThemeProvider>

      <div
        ref={firstLayer}
        className="w-full h-dvh fixed inset-0 z-50 translate-y-full bg-primary-foreground pointer-events-none will-change-transform"
      />
      <div
        ref={secondLayer}
        className="w-full h-dvh fixed inset-0 z-50 translate-y-full bg-background pointer-events-none will-change-transform"
      />
    </TransitionRouter>
  );
}

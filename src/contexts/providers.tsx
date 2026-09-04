"use client";
import { animate, AnimationSequence } from "motion/react";
import { TransitionRouter } from "next-transition-router";
import { useRef } from "react";
import { LenisProvider } from "~/components/providers/lenis";
import { ThemeProvider } from "~/components/providers/theme-provider";

const DURATION = 0.55;
const STAGGER = 0.3;
const EASE = "circInOut";

export default function Providers({ children }: { children: React.ReactNode }) {
  const firstLayer = useRef<HTMLDivElement>(null);
  const secondLayer = useRef<HTMLDivElement>(null);
  const thirdLayer = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const sweep = (
    x: string,
    next: () => void,
    layers: React.RefObject<HTMLDivElement | null>[],
  ) => {
    const [first, second, third, container] = layers.map((ref) => ref.current);

    if (!first || !second || !third || !container) {
      next();
      return;
    }

    const sequence = [
      [
        container,
        { x: [x], opacity: ["20%"] },
        { duration: DURATION / 2, ease: EASE },
      ],
      [first, { x: [x] }, { duration: DURATION, ease: EASE }],
      [
        second,
        { x: [x === "-100%" ? "100%" : x === "100%" ? "-100%" : x] },
        { duration: DURATION, ease: EASE, at: `-${STAGGER}` },
      ],
      [
        third,
        { x: [x] },
        { duration: DURATION, ease: EASE, at: `-${STAGGER * 2}` },
      ],
    ] satisfies AnimationSequence;

    const controls = animate(sequence);
    controls.then(next);

    return () => controls.stop();
  };

  return (
    <TransitionRouter
      auto
      leave={(next) =>
        sweep("-100%", next, [firstLayer, secondLayer, thirdLayer, container])
      }
      enter={(next) =>
        sweep("100%", next, [firstLayer, secondLayer, thirdLayer, container])
      }
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <LenisProvider>
          <div className="mt-20">{children}</div>
        </LenisProvider>
      </ThemeProvider>

      <div
        ref={container}
        className="w-full h-dvh bg-black blur-lg fixed opacity-0 inset-0 z-49 translate-x-full pointer-events-none will-change-transform"
      />

      <div className="grid grid-rows-3 grid-cols-1 fixed inset-0 z-50 pointer-events-none">
        <div
          ref={firstLayer}
          className="w-full h-full translate-x-full bg-foreground will-change-transform"
        />
        <div
          ref={secondLayer}
          className="w-full h-full -translate-x-full bg-background will-change-transform"
        />
        <div
          ref={thirdLayer}
          className="w-full h-full translate-x-full bg-foreground will-change-transform"
        />
      </div>
    </TransitionRouter>
  );
}

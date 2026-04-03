"use client";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

export function LettersPullUp({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const splitText = words[activeIndex]!.split("");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [words]);

  const pullUpVariants = {
    initial: { y: 20, opacity: 0, filter: "blur(20px)" },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        filter: { duration: 0.8, delay: i * 0.1 },
        delay: i * 0.1,
      },
    }),
    exit: (i: number) => ({
      y: -20,
      opacity: 0,
      filter: "blur(20px)",
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div ref={ref} className="flex">
      <AnimatePresence mode="popLayout">
        {splitText.map((current, i) => (
          <motion.div
            key={`${activeIndex}-${i}`}
            variants={pullUpVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            exit="exit"
            custom={i}
            className={cn(`text-white sm:text-sm`, className)}
          >
            {current === " " ? <span>&nbsp;</span> : current}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

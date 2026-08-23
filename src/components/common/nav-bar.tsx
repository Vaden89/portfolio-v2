"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, Transition } from "motion/react";

const routes = [
  { path: "/", name: "Home" },
  { path: "/work", name: "Work" },
  { path: "/projects", name: "Projects" },
  { path: "/skills", name: "Skills" },
  { path: "/blog", name: "Blog" },
];

export const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <motion.nav
      animate={{ height: "auto" }}
      className="fixed top-4 right-6 left-6 z-50 box-border border border-primary-dark-gray px-4 bg-background flex flex-col overflow-hidden max-w-[45rem] mx-auto rounded-xl"
    >
      <div className="w-full flex items-center justify-between py-3">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={28}
          height={28}
          className="w-auto h-auto"
        />

        <DesktopMenu />
        <MobileMenu isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} />
      </div>

      <AnimatePresence mode="sync">
        {isMobileNavOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { type: "spring", bounce: 0.35, duration: 0.45 },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { type: "spring", ease: "easeInOut", duration: 0.5 },
            }}
            className="flex flex-col text-[15px]"
          >
            {routes.map((route) => (
              <span
                key={route.name}
                className="font-montserrat font-medium text-primary-gray uppercase mb-3"
              >
                <Link
                  href={route.path}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {route.name}
                </Link>
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const MobileMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const topLineVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  };

  const middleLineVariants = {
    closed: { opacity: 1, x: 0 },
    open: { opacity: 0, x: -10 },
  };

  const bottomLineVariants = {
    closed: { rotate: 0 },
    open: { rotate: -45, top: "10px", width: "18px" },
  };

  const transition: Transition = { duration: 0.3, ease: "easeInOut" };

  return (
    <>
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="relative w-4 h-3 sm:hidden"
      >
        <motion.div
          variants={topLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={transition}
          className="w-4 h-0.5 bg-foreground absolute -top-0.5 origin-bottom-left"
        />
        <motion.div
          transition={transition}
          variants={middleLineVariants}
          animate={isOpen ? "open" : "closed"}
          className="w-4 h-0.5 bg-foreground absolute top-[3px] origin-bottom-left"
        />
        <motion.div
          variants={bottomLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={transition}
          className="w-4 h-0.5 bg-foreground absolute top-2 origin-bottom-left"
        />
      </button>
    </>
  );
};

const DesktopMenu = () => {
  return (
    <ul className="items-center gap-4 hidden sm:flex">
      {routes.map((route) => (
        <li
          key={route.name}
          className="text-[13px] font-montserrat font-medium text-primary-gray hover:text-[#0d6efd]"
        >
          <Link href={route.path}>{route.name}</Link>
        </li>
      ))}
    </ul>
  );
};

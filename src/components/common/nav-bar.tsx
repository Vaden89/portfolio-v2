"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, Transition } from "motion/react";

const routes = [
  { path: "/", name: "Home" },
  { path: "/work", name: "Work" },
  { path: "/projects", name: "Projects" },
  { path: "/skills", name: "Skills" },
  { path: "/contact", name: "Contact" },
];

export const Navbar = () => {
  return (
    <div className="bg-background pt-4 sticky z-50 top-0 mb-4 shadow-md">
      <nav className="w-full h-12 flex items-center justify-between border-primary-dark-gray border px-2 bg-background">
        <Image src="/images/logo.png" alt="Logo" width={28} height={28} />
        <div>
          <DesktopMenu />
          <MobileMenu />
        </div>
      </nav>
    </div>
  );
};

const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const topLineVariants = {
    closed: { rotate: 0 },
    open: { rotate: 35 },
  };

  const middleLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomLineVariants = {
    closed: { rotate: 0 },
    open: { rotate: -32 },
  };

  const transition: Transition = { duration: 0.3, ease: "easeInOut" };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen((p) => !p)}
        className="relative w-4 h-3 sm:hidden"
      >
        <motion.div
          variants={topLineVariants}
          animate={isMobileMenuOpen ? "open" : "closed"}
          transition={transition}
          className="w-4 h-0.5 bg-foreground absolute top-0 origin-left"
        />
        <motion.div
          variants={middleLineVariants}
          animate={isMobileMenuOpen ? "open" : "closed"}
          transition={transition}
          className="w-4 h-0.5 bg-foreground absolute top-1"
        />
        <motion.div
          variants={bottomLineVariants}
          animate={isMobileMenuOpen ? "open" : "closed"}
          transition={transition}
          className="w-4 h-0.5 bg-foreground absolute top-[8.5px] origin-left"
        />
        {isMobileMenuOpen && <MainMobileMenu />}
      </button>
    </>
  );
};

const MainMobileMenu = () => {
  const linkVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.ul
      initial="initial"
      animate="animate"
      transition={{ delayChildren: 0.3, staggerChildren: 0.1 }}
      className="w-36 py-3 rounded-xl absolute z-50 top-9 -right-2 border border-primary-dark-gray bg-[#111114] flex flex-col gap-2"
    >
      {routes.map((route) => (
        <motion.li
          key={route.path}
          variants={linkVariants}
          className="text-[13px] font-montserrat font-medium text-primary-gray"
        >
          <Link href={route.path}>{route.name}</Link>
        </motion.li>
      ))}
    </motion.ul>
  );
};

const DesktopMenu = () => {
  return (
    <ul className="items-center gap-4 hidden sm:flex">
      {routes.map((route) => (
        <li
          key={route.path}
          className="text-[13px] font-montserrat font-medium text-primary-gray hover:text-[#0d6efd]"
        >
          <Link href={route.path}>{route.name}</Link>
        </li>
      ))}
    </ul>
  );
};

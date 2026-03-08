import { ArrowUpRight, Copyright } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full h-[40vh] flex flex-col py-5">
      <div className="h-full flex-1"></div>
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="text-xl sm:text-3xl font-bold">
          Want to build something cool?
        </span>
        <div className="flex gap-2">
          <button className="bg-foreground text-background px-2 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base font-medium">
            Let&apos;s Talk
          </button>
          <button className="flex px-2 py-1.5 sm:px-4 sm:py-2 bg-[#343a40] rounded text-sm sm:text-base font-medium">
            <span>My Work</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
      <div className="w-full mt-7 flex text-xs sm:text-sm items-center justify-between font-montserrat text-[#adb5bd]">
        <span>
          Built by <span className="text-[#ced4da] font-medium">Isaac</span>
        </span>
        <div className="flex items-center gap-2">
          <Copyright size={16} />
          <span>2026 Isaac</span>
        </div>
      </div>
    </footer>
  );
};

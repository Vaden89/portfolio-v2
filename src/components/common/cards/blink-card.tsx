import { ReactNode } from "react";
import { cn } from "~/lib/utils";

export function BlinkCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const styling = cn(
    "group relative rounded-sm border border-border p-4 sm:p-6 text-white cursor-pointer",
    className,
  );
  return (
    <div className={styling}>
      <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l-2 border-t-2 border-black dark:border-white transition-all duration-300 group-hover:h-3.5 group-hover:w-3.5 group-hover:opacity-30 test"></span>
      <span className="pointer-events-none absolute -right-px -top-px h-2 w-2 border-r-2 border-t-2 border-black dark:border-white transition-all duration-300 group-hover:h-3.5 group-hover:w-3.5 group-hover:opacity-30 test"></span>
      <span className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b-2 border-l-2 border-black dark:border-white transition-all duration-300 group-hover:h-3.5 group-hover:w-3.5 group-hover:opacity-30 test"></span>
      <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b-2 border-r-2 border-black dark:border-white transition-all duration-300 group-hover:h-3.5 group-hover:w-3.5 group-hover:opacity-30 test"></span>

      <div>{children}</div>
    </div>
  );
}

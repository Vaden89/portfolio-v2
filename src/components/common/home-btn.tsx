import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const HomeButton = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 text-[13px] text-[#ced4da] hover:text-[#0d6efd]"
    >
      <ArrowLeft size={16} />
      <span>Home</span>
    </Link>
  );
};

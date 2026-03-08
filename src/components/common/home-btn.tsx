import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const HomeButton = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-[#ced4da]">
      <ArrowLeft size={20} />
      <span>Home</span>
    </Link>
  );
};

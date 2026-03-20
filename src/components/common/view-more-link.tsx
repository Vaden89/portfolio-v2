import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const ViewMoreLink = ({ link }: { link: string }) => {
  return (
    <Link
      href={link}
      className="flex items-center gap-1 text-[13px] text-[#ced4da] hover:text-[#0d6efd] font-montserrat"
    >
      view all <ArrowRight size={14} />
    </Link>
  );
};

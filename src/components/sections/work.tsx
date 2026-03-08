import { ArrowRight, CornerDownRight } from "lucide-react";
import Link from "next/link";
import { work } from "~/data/work";

export const WorkSection = () => {
  return (
    <section>
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bitcount text-3xl">Work</h2>
        <Link href="/work" className="flex items-center gap-1">
          <span className="text-sm">view more</span>
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {work.map((item, index) => {
          return <WorkItem key={index} {...item} />;
        })}
      </div>
    </section>
  );
};

const WorkItem = ({
  employer,
  startDate,
  role,
  endDate,
}: {
  employer: string;
  startDate: string;
  endDate: string;
  role: string;
}) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-[#343a40] flex items-center justify-center">
          {employer.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium">{employer}</span>
      </div>
      <div className="flex gap-2 items-center">
        <CornerDownRight color="#343a40" className="ml-3 mt-1" />
        <div className="flex mt-2 gap-8 text-[#ced4da]">
          <span className="text-sm">{startDate}</span>
          <span className="text-sm">{role}</span>
          {endDate === "Present" && (
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span>Now</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { CornerDownRight } from "lucide-react";
import { work } from "~/data/work";
import { ViewMoreLink } from "../common/view-more-link";
import Image from "next/image";

export const WorkSection = () => {
  const highlightedWork = [...work].splice(0, 4);

  return (
    <section>
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bitcount text-3xl">Work</h2>
        <ViewMoreLink link="/work" />
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {highlightedWork.map((item, index) => {
          return <WorkItem key={index} {...item} />;
        })}
      </div>
    </section>
  );
};

const WorkItem = ({
  image,
  employer,
  startDate,
  role,
  endDate,
}: {
  image?: string;
  employer: string;
  startDate: string;
  endDate: string;
  role: string;
}) => {
  return (
    <div className="w-full flex flex-col text-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-[#101113] border border-[#343a40/20] font-semibold flex items-center text-xs justify-center">
          {image ? (
            <Image
              src={image}
              alt={employer}
              width={16}
              height={16}
              className="w-4 h-4"
            />
          ) : (
            <span>{employer.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <span className="font-medium text-sm">{employer}</span>
      </div>
      <div className="flex gap-2 items-center">
        <CornerDownRight color="#343a40" className="ml-3 mt-1" />
        <div className="flex mt-2 gap-8 text-primary-gray">
          <span className="text-[13px]">{startDate}</span>
          <span className="text-[13px]">{role}</span>
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

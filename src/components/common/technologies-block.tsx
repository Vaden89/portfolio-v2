export const TechnologiesBlock = ({
  technologies,
}: {
  technologies: string[];
}) => {
  return (
    <div className="w-full flex flex-wrap gap-1 ">
      {technologies.map((technology, index) => (
        <span
          key={index}
          className="text-xs dark:bg-zinc-900 border border-primary-dark-gray dark:text-primary-gray rounded-lg px-1.5 p-1"
        >
          {technology}
        </span>
      ))}
    </div>
  );
};

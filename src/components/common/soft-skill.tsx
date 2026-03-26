export const SoftSkillBlock = ({ skill }: { skill: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-1 h-1 rounded-full bg-primary-gray" />
      <span className="text-[13px] font-medium text-primary-gray">{skill}</span>
    </div>
  );
};

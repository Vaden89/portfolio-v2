interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <header className="flex flex-col">
      <h1 className="font-bitcount text-3xl font-semibold">{title}</h1>
      <p className="text-[13px] text-[#ced4da] font-montserrat">{subtitle}</p>
    </header>
  );
};

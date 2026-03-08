import { HomeButton } from "~/components/common/home-btn";

export default function () {
  return (
    <main className="flex flex-col gap-5">
      <HomeButton />
      <div className="flex flex-col">
        <h1 className="font-bitcount text-5xl font-semibold">Projects</h1>
        <p className="text-sm text-[#ced4da] font-montserrat">
          Products, tools, and open-source contributions I've built or helped
          shape
        </p>
      </div>
    </main>
  );
}

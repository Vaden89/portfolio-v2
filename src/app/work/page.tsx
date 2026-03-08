import { HomeButton } from "~/components/common/home-btn";

export default function () {
  return (
    <main className="flex flex-col gap-5">
      <HomeButton />
      <div className="flex flex-col">
        <h1 className="font-bitcount text-5xl font-semibold">My Experience</h1>
        <p className="text-sm text-[#ced4da] font-montserrat">
          My professional Journey and the amazing teams I'm proud to have been a
          part of.
        </p>
      </div>
    </main>
  );
}

import Link from "next/link";

const SlugButton = () => {
  return (
    <>
      <Link
        href="/MyPlan"
        className="flex items-center gap-2 rounded-lg bg-[#baff00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#a8e600] active:scale-95"
      >
        Add to today's plan
      </Link>
    </>
  );
};

export default SlugButton;

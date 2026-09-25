import Link from "next/link";

const SlugButton2 = () => {
  return (
    <>
      <Link
        href="/MyPlan"
        type="button"
        className="flex items-center gap-2 rounded-lg border border-[#303640] bg-transparent px-5 py-2.5 text-xs font-medium text-gray-300 transition hover:bg-[#181c22] hover:text-white active:scale-95"
      >
        Save for later
      </Link>
    </>
  );
};

export default SlugButton2;

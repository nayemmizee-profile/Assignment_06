"use client";

import { cardContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const SlugButton2 = ({ exercise }) => {
  const router = useRouter();

  const { setSaveCard } = useContext(cardContext);

  function handleSaveForLater() {
    setSaveCard((previous) => {
      // Prevent duplicate exercise
      const alreadySaved = previous.some((item) => item.id === exercise.id);

      if (alreadySaved) {
        toast(`"${exercise.name}" is already saved.`);
        return previous;
      }

      toast.success(`"${exercise.name}" saved for later.`);

      return [...previous, exercise];
    });

    router.push("/MyPlan");
  }

  return (
    <button
      type="button"
      onClick={handleSaveForLater}
      className="flex items-center gap-2 rounded-lg border border-[#303640] bg-transparent px-5 py-2.5 text-xs font-medium text-gray-300 transition hover:bg-[#181c22] hover:text-white active:scale-95"
    >
      Save for later
    </button>
  );
};

export default SlugButton2;

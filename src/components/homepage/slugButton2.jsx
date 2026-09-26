"use client";

import { useRouter } from "next/navigation";

const SlugButton2 = ({ exercise }) => {
  const router = useRouter();

  function handleSaveForLater() {
    if (!exercise) {
      console.error("No exercise was provided to SlugButton2");
      return;
    }

    try {
      const stored = localStorage.getItem("savedPlan");

      const currentPlan = stored ? JSON.parse(stored) : [];

      const existingPlan = Array.isArray(currentPlan)
        ? currentPlan.filter(Boolean)
        : [];

      const alreadyExists = existingPlan.some(
        (item) => String(item.DataID) === String(exercise.DataID),
      );

      if (alreadyExists) {
        console.log("Exercise already exists in Saved");
        router.push("/MyPlan");
        return;
      }

      const updatedPlan = [...existingPlan, exercise];

      localStorage.setItem("savedPlan", JSON.stringify(updatedPlan));

      console.log("Exercise saved for later:", exercise);

      router.push("/MyPlan");
    } catch (error) {
      console.error("Failed to save exercise:", error);
    }
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

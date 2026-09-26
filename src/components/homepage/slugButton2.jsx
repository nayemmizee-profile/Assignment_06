"use client";

import { useRouter } from "next/navigation";
const SlugButton2 = () => {
  const router = useRouter();

  function handleAddPlan() {
    if (!exercise) {
      console.error("No exercise was provided to SlugButton");
      return;
    }

    const storedPlan = localStorage.getItem("myPlan");

    let existingPlan = [];

    try {
      const parsedPlan = storedPlan ? JSON.parse(storedPlan) : [];

      existingPlan = Array.isArray(parsedPlan)
        ? parsedPlan.filter((item) => item !== null)
        : [];
    } catch (error) {
      console.error("Invalid myPlan data:", error);
      existingPlan = [];
    }

    // Check if this exercise is already added
    const alreadyExists = existingPlan.some(
      (item) => String(item.id) === String(exercise.id),
    );

    if (!alreadyExists) {
      const updatedPlan = [...existingPlan, exercise];

      localStorage.setItem("myPlan", JSON.stringify(updatedPlan));
    }

    router.push("/MyPlan");

    router.push("/MyPlan");

    try {
      const stored = localStorage.getItem("savedPlan");
      const currentPlan = stored ? JSON.parse(stored) : [];
      const alreadyExists = currentPlan.some(
        (item) => String(item.DataID) === String(exercise.DataID),
      );
      if (alreadyExists) {
        return;
      }
      const updatedPlan = [...currentPlan, exercise];
      localStorage.setItem("savedPlan", JSON.stringify(updatedPlan));
    } catch (error) {
      console.error("Failed to save exercise:", error);
    }
  }

  return (
    <>
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg border border-[#303640] bg-transparent px-5 py-2.5 text-xs font-medium text-gray-300 transition hover:bg-[#181c22] hover:text-white active:scale-95"
        onClick={() => handleAddPlan()}
      >
        Save for later
      </button>
    </>
  );
};

export default SlugButton2;

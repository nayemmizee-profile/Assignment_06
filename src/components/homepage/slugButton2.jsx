"use client";

import { CardContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const SlugButton2 = ({ exercise }) => {
  const router = useRouter();

  const { setSaveCard, todayPlan } = useContext(CardContext);

  function handleSaveForLater() {
    if (!exercise) {
      console.error("No exercise was provided.");
      return;
    }

    // Check if this exercise is already in today's plan
    const alreadyInTodayPlan = todayPlan.some(
      (card) => String(card.id) === String(exercise.id),
    );

    if (alreadyInTodayPlan) {
      toast.warn(`"${exercise.name}" is already in today's plan.`);
      return;
    }

    // Add to save card
    setSaveCard((previous) => {
      // Prevent duplicate saved exercise
      const alreadySaved = previous.some(
        (item) => String(item.id) === String(exercise.id),
      );

      if (alreadySaved) {
        toast.warn(`"${exercise.name}" is already saved.`);
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

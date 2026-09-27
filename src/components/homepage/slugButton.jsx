"use client";

import { CardContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const SlugButton = ({ exercise }) => {
  const router = useRouter();

  const { setTodayPlan, saveCard } = useContext(CardContext);

  function handleAddPlan() {
    if (!exercise) {
      console.error("No exercise was provided.");
      return;
    }

    // Check if this exercise is already saved for later
    const alreadySaved = saveCard.some(
      (card) => String(card.id) === String(exercise.id),
    );

    if (alreadySaved) {
      toast.warn(`"${exercise.name}" is already saved for later.`);
      return;
    }

    // Add to today's plan
    setTodayPlan((previous) => {
      const alreadyExists = previous.some(
        (item) => String(item.id) === String(exercise.id),
      );

      if (alreadyExists) {
        toast.warn(`"${exercise.name}" is already in today's plan.`);
        return previous;
      }
      toast.success(`"${exercise.name}" added to today's plan.`);
      return [...previous, exercise];
    });

    router.push("/MyPlan");
  }

  return (
    <button
      type="button"
      onClick={handleAddPlan}
      className="flex items-center gap-2 rounded-lg bg-[#baff00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#a8e600] active:scale-95"
    >
      Add to today's plan
    </button>
  );
};
export default SlugButton;

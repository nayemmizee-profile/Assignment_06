"use client";
import { cardContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const SlugButton = ({ exercise }) => {
  const router = useRouter();

  const { setTodayPlan } = useContext(cardContext);
  function handleAddPlan() {
    if (!exercise) {
      console.error("No exercise was provided.");
      return;
    }

    setTodayPlan((previous) => {
      const alreadyExists = previous.some(
        (item) => String(item.id) === String(exercise.id),
      );

      if (alreadyExists) {
        toast(`"${exercise.name}" is already in today's plan.`);
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

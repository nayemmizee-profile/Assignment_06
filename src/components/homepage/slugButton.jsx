// "use client";
// import { useRouter } from "next/navigation";
// const SlugButton = ({ exercise }) => {
//   const router = useRouter();

//   function handleAddPlan() {
//     const existingPlan = JSON.parse(localStorage.getItem("myPlan")) || [];

//     const updatedPlan = [...existingPlan, exercise];

//     localStorage.setItem("myPlan", JSON.stringify(updatedPlan));
//     // console.log("addTask ", "task added");

//     router.push("/MyPlan");
//   }

//   return (
//     <>
//       {/* <Link href="/MyPlan"> */}
//       <button
//         className="flex items-center gap-2 rounded-lg bg-[#baff00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#a8e600] active:scale-95"
//         onClick={() => handleAddPlan()}
//       >
//         Add to today's plan
//       </button>
//       {/* </Link> */}
//     </>
//   );
// };

// export default SlugButton;
"use client";

import { useRouter } from "next/navigation";

const SlugButton = ({ exercise }) => {
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

    try {
      const stored = localStorage.getItem("myPlan");
      const currentPlan = stored ? JSON.parse(stored) : [];
      const alreadyExists = currentPlan.some(
        (item) => String(item.DataID) === String(exercise.DataID),
      );
      if (alreadyExists) {
        return;
      }
      const updatedPlan = [...currentPlan, { ...exercise, completed: false }];
      localStorage.setItem("myPlan", JSON.stringify(updatedPlan));
    } catch (error) {
      console.error("Failed to add exercise:", error);
    }
  }

  return (
    <>
      <button
        className="flex items-center gap-2 rounded-lg bg-[#baff00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#a8e600] active:scale-95"
        onClick={handleAddPlan}
      >
        Add to today's plan
      </button>
    </>
  );
};

export default SlugButton;

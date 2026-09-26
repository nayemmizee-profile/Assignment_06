"use client";

import { Check, Clock3, Flame, Star, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const initialExercises = [];

/* =========================================================
   MY PLAN PAGE
========================================================= */

export default function MyPlan({
  exercises = initialExercises,
  handleDetails,
}) {
  /* =======================================================
     STATE
  ======================================================= */

  const [activeTab, setActiveTab] = useState("today");

  const [sortBy, setSortBy] = useState("duration");

  // Today's Plan
  const [myPlan, setMyPlan] = useState([]);

  // Saved for Later
  const [savedPlan, setSavedPlan] = useState([]);

  /* =======================================================
     LOAD LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    try {
      const storedTodayPlan = localStorage.getItem("myPlan");

      const storedSavedPlan = localStorage.getItem("savedPlan");

      const todayPlan = storedTodayPlan ? JSON.parse(storedTodayPlan) : [];

      const savedPlanData = storedSavedPlan ? JSON.parse(storedSavedPlan) : [];

      setMyPlan(Array.isArray(todayPlan) ? todayPlan.filter(Boolean) : []);

      setSavedPlan(
        Array.isArray(savedPlanData) ? savedPlanData.filter(Boolean) : [],
      );
    } catch (error) {
      console.error("Failed to load plans:", error);

      setMyPlan([]);
      setSavedPlan([]);
    }
  }, []);

  /* =======================================================
     ADD TO TODAY'S PLAN
  ======================================================= */

  function handleAddPlan(exercise) {
    if (!exercise) return;

    setMyPlan((previousPlan) => {
      const alreadyExists = previousPlan.some(
        (item) => String(item.DataID) === String(exercise.DataID),
      );

      if (alreadyExists) {
        return previousPlan;
      }

      const updatedPlan = [
        ...previousPlan,
        {
          ...exercise,
          completed: false,
        },
      ];

      localStorage.setItem("myPlan", JSON.stringify(updatedPlan));

      return updatedPlan;
    });
  }

  /* =======================================================
     SAVE FOR LATER
  ======================================================= */

  function handleSaveForLater(exercise) {
    if (!exercise) return;

    setSavedPlan((previousPlan) => {
      const alreadyExists = previousPlan.some(
        (item) => String(item.DataID) === String(exercise.DataID),
      );

      if (alreadyExists) {
        return previousPlan;
      }

      const updatedPlan = [...previousPlan, exercise];

      localStorage.setItem("savedPlan", JSON.stringify(updatedPlan));

      return updatedPlan;
    });
  }

  /* =======================================================
     MARK AS DONE
  ======================================================= */

  function handleDone(DataID) {
    setMyPlan((previousPlan) => {
      const updatedPlan = previousPlan.map((exercise) => {
        if (String(exercise.DataID) === String(DataID)) {
          return {
            ...exercise,
            completed: !exercise.completed,
          };
        }

        return exercise;
      });

      localStorage.setItem("myPlan", JSON.stringify(updatedPlan));

      return updatedPlan;
    });
  }

  /* =======================================================
     REMOVE EXERCISE
  ======================================================= */

  function handleRemove(DataID) {
    /* ---------------------------------------------
       Remove from Today's Plan
    --------------------------------------------- */

    if (activeTab === "today") {
      setMyPlan((previousPlan) => {
        const updatedPlan = previousPlan.filter(
          (exercise) => String(exercise.DataID) !== String(DataID),
        );

        localStorage.setItem("myPlan", JSON.stringify(updatedPlan));

        return updatedPlan;
      });

      return;
    }

    /* ---------------------------------------------
       Remove from Saved Plan
    --------------------------------------------- */

    if (activeTab === "saved") {
      setSavedPlan((previousPlan) => {
        const updatedPlan = previousPlan.filter(
          (exercise) => String(exercise.DataID) !== String(DataID),
        );

        localStorage.setItem("savedPlan", JSON.stringify(updatedPlan));

        return updatedPlan;
      });
    }
  }

  /* =======================================================
     MOVE SAVED → TODAY'S PLAN
  ======================================================= */

  function handleMoveToToday(exercise) {
    if (!exercise) return;

    /* ---------------------------------------------
       Add to Today's Plan
    --------------------------------------------- */

    setMyPlan((previousPlan) => {
      const alreadyExists = previousPlan.some(
        (item) => String(item.DataID) === String(exercise.DataID),
      );

      if (alreadyExists) {
        return previousPlan;
      }

      const updatedPlan = [
        ...previousPlan,
        {
          ...exercise,
          completed: false,
        },
      ];

      localStorage.setItem("myPlan", JSON.stringify(updatedPlan));

      return updatedPlan;
    });

    /* ---------------------------------------------
       Remove from Saved
    --------------------------------------------- */

    setSavedPlan((previousPlan) => {
      const updatedPlan = previousPlan.filter(
        (item) => String(item.DataID) !== String(exercise.DataID),
      );

      localStorage.setItem("savedPlan", JSON.stringify(updatedPlan));

      return updatedPlan;
    });

    /* ---------------------------------------------
       Automatically open Today's Plan
    --------------------------------------------- */

    setActiveTab("today");
  }

  /* =======================================================
     CURRENT DATA
  ======================================================= */

  const currentExercises = activeTab === "today" ? myPlan : savedPlan;

  /* =======================================================
     SORT
  ======================================================= */

  const filteredExercises = useMemo(() => {
    return [...currentExercises].sort((a, b) => {
      /* Duration */

      if (sortBy === "duration") {
        return Number(b.duration || 0) - Number(a.duration || 0);
      }

      /* Calories */

      if (sortBy === "calories") {
        return Number(b.calories || 0) - Number(a.calories || 0);
      }

      /* Name */

      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }

      return 0;
    });
  }, [currentExercises, sortBy]);

  /* =======================================================
     TODAY'S PLAN STATS
  ======================================================= */

  const stats = useMemo(() => {
    return myPlan.reduce(
      (total, exercise) => {
        return {
          exercises: total.exercises + 1,

          minutes: total.minutes + Number(exercise.duration || 0),

          calories: total.calories + Number(exercise.calories || 0),
        };
      },
      {
        exercises: 0,
        minutes: 0,
        calories: 0,
      },
    );
  }, [myPlan]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="min-h-screen bg-[#0d0f13] px-6 py-12 text-white md:px-12">
      <div className="mx-auto max-w-[1216px]">
        {/* ===============================================
            HEADER
        =============================================== */}

        <div className="mb-7">
          <h1 className="font-[Impact,Arial,sans-serif] text-3xl tracking-wide">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-[#8d929d]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* ===============================================
            STATS
        =============================================== */}

        <div className="rounded-2xl border border-[#242832] bg-[#12151b] px-6 py-7">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <Stat label="Exercises" value={stats.exercises} highlight />

            <Stat label="Minutes" value={stats.minutes} bordered />

            <Stat label="Calories" value={stats.calories} />
          </div>
        </div>

        {/* ===============================================
            CONTROLS
        =============================================== */}

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* =============================================
              TABS
          ============================================= */}

          <div className="inline-flex w-fit rounded-xl border border-[#252a33] bg-[#14171d] p-1">
            {/* Today's Plan */}

            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`rounded-lg px-5 py-2 text-sm transition ${
                activeTab === "today"
                  ? "bg-[#20252e] font-semibold text-white shadow-sm"
                  : "text-[#8c929d] hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            {/* Saved */}

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-7 py-2 text-sm transition ${
                activeTab === "saved"
                  ? "bg-[#20252e] font-semibold text-white shadow-sm"
                  : "text-[#8c929d] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* =============================================
              SORT
          ============================================= */}

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#858b96]">Sort By</span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer appearance-none rounded-xl border border-[#272c35] bg-[#12151b] px-4 py-2 text-sm text-white outline-none transition hover:border-[#363c47] focus:border-[#baff00]"
            >
              <option value="duration">Duration</option>

              <option value="calories">Calories</option>

              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* ===============================================
            EXERCISES
        =============================================== */}

        <div className="mt-7 min-h-[308px] rounded-2xl border border-dashed border-[#272c34] bg-[#0f1115]">
          {filteredExercises.length === 0 ? (
            <EmptyState activeTab={activeTab} />
          ) : (
            <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.DataID}
                  exercise={exercise}
                  activeTab={activeTab}
                  handleDone={handleDone}
                  handleRemove={handleRemove}
                  handleDetails={handleDetails}
                  handleMoveToToday={handleMoveToToday}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STAT COMPONENT
========================================================= */

function Stat({ label, value, highlight = false, bordered = false }) {
  return (
    <div
      className={`px-0 md:px-6 ${
        bordered
          ? "border-y border-[#242832] py-5 md:border-y-0 md:border-x md:py-0"
          : ""
      }`}
    >
      <p className="text-sm text-[#858b96]">{label}</p>

      <p
        className={`mt-1 text-[40px] font-extrabold leading-none ${
          highlight ? "text-[#baff00]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ activeTab }) {
  return (
    <div className="flex min-h-[308px] flex-col items-center justify-center px-5 text-center">
      <h2
        className="text-[22px] font-extrabold tracking-wide text-white"
        style={{
          fontFamily: "Impact, Arial Narrow, sans-serif",
        }}
      >
        NOTHING HERE YET
      </h2>

      <p className="mt-2 text-sm text-[#8c919b]">
        {activeTab === "today"
          ? "Browse the library and add a lift to get today moving."
          : "Save an exercise for later and it will appear here."}
      </p>

      <button
        type="button"
        className="mt-6 rounded-full bg-[#baff00] px-7 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c8ff32] hover:shadow-[0_0_25px_rgba(186,255,0,0.15)] active:scale-95"
      >
        Go to workouts
      </button>
    </div>
  );
}

/* =========================================================
   EXERCISE CARD
========================================================= */

function ExerciseCard({
  exercise,
  activeTab,
  handleDone,
  handleRemove,
  handleDetails,
  handleMoveToToday,
}) {
  return (
    <div className=" gap-4 rounded-2xl border border-[#272c35] bg-[#13161c] p-4 transition duration-300 hover:border-[#343a46] sm:flex-row sm:items-center">
      {/* ===============================================
          IMAGE
      =============================================== */}

      <div className="h-[110px] w-full shrink-0 overflow-hidden rounded-xl sm:h-[82px] sm:w-[148px]">
        <Image
          src={exercise.image}
          alt={exercise.name || "Exercise"}
          width={148}
          height={82}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* ===============================================
          INFORMATION
      =============================================== */}

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base font-bold uppercase tracking-wide text-white">
          {exercise.name}
        </h2>

        <p className="mt-1 text-sm text-gray-400">{exercise.equipment}</p>

        {/* Stats */}

        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
          {/* Duration */}

          <div className="flex items-center gap-1.5 text-gray-300">
            <Clock3 className="h-4 w-4 text-lime-400" />

            <span>{exercise.duration} min</span>
          </div>

          {/* Calories */}

          <div className="flex items-center gap-1.5 text-gray-300">
            <Flame className="h-4 w-4 text-lime-400" />

            <span>{exercise.calories} kcal</span>
          </div>

          {/* Rating */}

          <div className="flex items-center gap-1.5 text-gray-300">
            <Star className="h-4 w-4 fill-lime-400 text-lime-400" />

            <span>{exercise.rating}</span>
          </div>
        </div>
      </div>

      {/* ===============================================
          BUTTONS
      =============================================== */}

      <div className="flex shrink-0 flex-wrap items-center mt-2 gap-3">
        {/* View Details */}

        <button
          type="button"
          onClick={() => handleDetails?.(exercise)}
          className="rounded-full border border-[#344052] px-5 py-2.5 text-sm font-medium text-gray-200 transition hover:border-gray-500 hover:bg-[#1b2028]"
        >
          View Details
        </button>

        {/* =============================================
            TODAY'S PLAN BUTTON
        ============================================= */}

        {activeTab === "today" && (
          <button
            type="button"
            onClick={() => handleDone(exercise.DataID)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              exercise.completed
                ? "bg-green-500 text-black hover:bg-green-400"
                : "bg-[#b6ff00] text-black hover:bg-[#c4ff33]"
            }`}
          >
            <Check className="h-4 w-4" />

            {exercise.completed ? "Completed" : "Mark as Done"}
          </button>
        )}

        {/* =============================================
            SAVED BUTTON
        ============================================= */}

        {activeTab === "saved" && (
          <button
            type="button"
            onClick={() => handleMoveToToday(exercise)}
            className="flex items-center gap-2 rounded-full bg-[#b6ff00] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c4ff33]"
          >
            <Check className="h-4 w-4" />
            Add to Today
          </button>
        )}

        {/* =============================================
            REMOVE
        ============================================= */}

        <button
          type="button"
          onClick={() => handleRemove(exercise.DataID)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-[#20242c] hover:text-white"
          aria-label={`Remove ${exercise.name || "exercise"}`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

// "use client";

// import { useMemo, useState } from "react";

// const initialExercises = [];

// export default function MyPlan({
//   exercises = initialExercises,
//   handleAddPlan,
// }) {
//   const [activeTab, setActiveTab] = useState("saved");
//   const [sortBy, setSortBy] = useState("duration");
//   const [myPlan, setMyPlan] = useState([]);

//   useEffect(() => {
//     const storedPlan = localStorage.getItem("myPlan");

//     try {
//       const parsedPlan = storedPlan ? JSON.parse(storedPlan) : [];

//       const validPlan = Array.isArray(parsedPlan)
// ? parsedPlan.filter((exercise) => exercise !== null)
//         : [];

//       setMyPlan(validPlan);
//     } catch (error) {
//       console.error("Failed to load myPlan:", error);
//       setMyPlan([]);
//     }
//   }, []);

//   function exerciseCount(exercise) {
//     setMyPlan((previous) => [...previous, exercise]);
//   }
//   // Filter exercises based on selected tab
//   const filteredExercises = useMemo(() => {
//     const filtered = exercises.filter(
//       (exercise) => exercise.status === activeTab,
//     );

//     return [...filtered].sort((a, b) => {
//       if (sortBy === "duration") {
//         return b.duration - a.duration;
//       }

//       if (sortBy === "calories") {
//         return b.calories - a.calories;
//       }

//       if (sortBy === "name") {
//         return a.name.localeCompare(b.name);
//       }

//       return 0;
//     });
//   }, [exercises, activeTab, sortBy]);

//   // Calculate stats dynamically
//   //   const stats = useMemo(() => {
//   //     return myPlan.reduce(
//   //       (total, exercise) => ({
//   //         exercises: total.exercises + 1,
//   //         minutes: total.exercise + exercise.duration,
//   //         calories: total.exercise + exercise.calories,
//   //       }),
//   //       {
//   //         exercises: 0,
//   //         minutes: 0,
//   //         calories: 0,
//   //       },
//   //     );
//   //   }, [myPlan]);

//   const stats = useMemo(() => {
//     return myPlan.reduce(
//       (total, exercise) => ({
//         exercises: total.exercises + 1,

//         minutes: total.minutes + Number(exercise.duration || 0),

//         calories: total.calories + Number(exercise.calories || 0),
//       }),
//       {
//         exercises: 0,
//         minutes: 0,
//         calories: 0,
//       },
//     );
//   }, [myPlan]);

//   return (
//     <section className="min-h-screen bg-[#0d0f13] px-6 py-12 text-white md:px-12">
//       <div className="mx-auto max-w-[1216px]">
//         {/* Header */}
//         <div className="mb-7">
//           <h1 className="font-[Impact,Arial,sans-serif] text-3xl tracking-wide">
//             MY PLAN
//           </h1>

//           <p className="mt-2 text-sm text-[#8d929d]">
//             Cap of five lifts for today. Finish them, then load more.
//           </p>
//         </div>

//         {/* Stats Card */}
//         <div className="rounded-2xl border border-[#242832] bg-[#12151b] px-6 py-7 md:px-6">
//           <div className="grid grid-cols-1 md:grid-cols-3">
//             {/* Exercises */}
//             <Stat label="Exercises" value={stats.exercises} highlight />

//             {/* Minutes */}
//             <Stat label="Minutes" value={stats.minutes} bordered />

//             {/* Calories */}
//             <Stat label="Calories" value={stats.calories} />
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           {/* Tabs */}
//           <div className="inline-flex w-fit rounded-xl border border-[#252a33] bg-[#14171d] p-1">
//             <button
//               onClick={() => setActiveTab("today")}
//               className={`rounded-lg px-5 py-2 text-sm transition ${
//                 activeTab === "today"
//                   ? "bg-[#20252e] font-semibold text-white shadow-sm"
//                   : "text-[#8c929d] hover:text-white"
//               }`}
//             >
//               Today&apos;s Plan
//             </button>

//             <button
//               onClick={() => setActiveTab("saved")}
//               className={`rounded-lg px-7 py-2 text-sm transition ${
//                 activeTab === "saved"
//                   ? "bg-[#20252e] font-semibold text-white shadow-sm"
//                   : "text-[#8c929d] hover:text-white"
//               }`}
//             >
//               Saved
//             </button>
//           </div>

//           {/* Sort */}
//           <div className="flex items-center gap-3">
//             <span className="text-sm text-[#858b96]">Sort By</span>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="cursor-pointer appearance-none rounded-xl border border-[#272c35] bg-[#12151b] px-4 py-2 text-sm text-white outline-none transition hover:border-[#363c47] focus:border-[#baff00]"
//             >
//               <option value="duration">Duration</option>
//               <option value="calories">Calories</option>
//               <option value="name">Name</option>
//             </select>
//           </div>
//         </div>

//         {/* Exercise Content */}
//         <div className="mt-7 min-h-[308px] rounded-2xl border border-dashed border-[#272c34] bg-[#0f1115]">
//           {filteredExercises.length === 0 ? (
//             <EmptyState />
//           ) : (
//             <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
//               {filteredExercises.map((exercise) => (
//                 <ExerciseCard key={exercise.id} exercise={exercise} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* --------------------------------
//    STAT COMPONENT
// -------------------------------- */

// function Stat({ label, value, highlight = false, bordered = false }) {
//   return (
//     <div
//       className={`px-0 md:px-6 ${
//         bordered
//           ? "border-y border-[#242832] py-5 md:border-y-0 md:border-x md:py-0"
//           : ""
//       }`}
//     >
//       <p className="text-sm text-[#858b96]">{label}</p>

//       <p
//         className={`mt-1 text-[40px] font-extrabold leading-none ${
//           highlight ? "text-[#baff00]" : "text-white"
//         }`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// /* --------------------------------
//    EMPTY STATE
// -------------------------------- */

// function EmptyState() {
//   return (
//     <div className="flex min-h-[308px] flex-col items-center justify-center px-5 text-center">
//       <h2
//         className="text-[22px] font-extrabold tracking-wide text-white"
//         style={{
//           fontFamily: "Impact, Arial Narrow, sans-serif",
//         }}
//       >
//         NOTHING HERE YET
//       </h2>

//       <p className="mt-2 text-sm text-[#8c919b]">
//         Browse the library and add a lift to get today moving.
//       </p>

//       <button className="mt-6 rounded-full bg-[#baff00] px-7 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c8ff32] hover:shadow-[0_0_25px_rgba(186,255,0,0.15)] active:scale-95">
//         Go to workouts
//       </button>
//     </div>
//   );
// }

// /* --------------------------------
//    EXERCISE CARD
// -------------------------------- */

// function ExerciseCard({ exercise }) {
//   return (
//     <div className="rounded-xl border border-[#252a33] bg-[#14171d] p-5 transition hover:border-[#3a404b]">
//       <h3 className="font-semibold text-white">{exercise.name}</h3>

//       <div className="mt-4 flex justify-between text-sm">
//         <span className="text-[#858b96]">Duration</span>

//         <span className="text-white">{exercise.duration} min</span>
//       </div>

//       <div className="mt-2 flex justify-between text-sm">
//         <span className="text-[#858b96]">Calories</span>

//         <span className="text-white">{exercise.calories} kcal</span>
//       </div>
//     </div>
//   );
// }

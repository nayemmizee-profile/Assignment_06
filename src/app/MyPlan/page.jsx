"use client";

import { Check, Clock3, Flame, Star, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useMemo, useState } from "react";

export default function MyPlan({ handleDetails }) {
  const [activeTab, setActiveTab] = useState("today");

  const [sortBy, setSortBy] = useState("duration");

  const [myPlan, setMyPlan] = useState([]);

  const [savedPlan, setSavedPlan] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD DATA FROM LOCAL STORAGE
  // ==========================================

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
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // ADD EXERCISE TO TODAY
  // ==========================================

  function handleAddPlan(exercise) {
    if (!exercise) return;

    setMyPlan((previousPlan) => {
      // Maximum 5 exercises
      if (previousPlan.length >= 5) {
        return previousPlan;
      }

      // Check duplicate
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

  // ==========================================
  // SAVE FOR LATER
  // ==========================================

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

  // ==========================================
  // MARK AS DONE
  // ==========================================

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

  // ==========================================
  // REMOVE EXERCISE
  // ==========================================

  function handleRemove(DataID) {
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

    setSavedPlan((previousPlan) => {
      const updatedPlan = previousPlan.filter(
        (exercise) => String(exercise.DataID) !== String(DataID),
      );

      localStorage.setItem("savedPlan", JSON.stringify(updatedPlan));

      return updatedPlan;
    });
  }

  // ==========================================
  // MOVE SAVED EXERCISE TO TODAY
  // ==========================================

  function handleMoveToToday(exercise) {
    if (!exercise) return;

    // Maximum 5 exercises
    if (myPlan.length >= 5) {
      return;
    }

    // Check if already exists
    const alreadyExists = myPlan.some(
      (item) => String(item.DataID) === String(exercise.DataID),
    );

    if (alreadyExists) {
      return;
    }

    // Add exercise to today's plan
    const updatedTodayPlan = [
      ...myPlan,
      {
        ...exercise,
        completed: false,
      },
    ];

    // Remove from saved
    const updatedSavedPlan = savedPlan.filter(
      (item) => String(item.DataID) !== String(exercise.DataID),
    );

    setMyPlan(updatedTodayPlan);

    setSavedPlan(updatedSavedPlan);

    localStorage.setItem("myPlan", JSON.stringify(updatedTodayPlan));

    localStorage.setItem("savedPlan", JSON.stringify(updatedSavedPlan));

    // Switch to today's tab
    setActiveTab("today");
  }

  // ==========================================
  // CURRENT ACTIVE TAB DATA
  // ==========================================

  const currentExercises = activeTab === "today" ? myPlan : savedPlan;

  // ==========================================
  // SORT CURRENT TAB
  // ==========================================

  const filteredExercises = useMemo(() => {
    return [...currentExercises].sort((a, b) => {
      if (sortBy === "duration") {
        return Number(b.duration || 0) - Number(a.duration || 0);
      }

      if (sortBy === "calories") {
        return Number(b.calories || 0) - Number(a.calories || 0);
      }

      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }

      return 0;
    });
  }, [currentExercises, sortBy]);

  // ==========================================
  // ACTIVE TAB STATS
  // ==========================================

  const stats = useMemo(() => {
    return currentExercises.reduce(
      (total, exercise) => ({
        exercises: total.exercises + 1,

        minutes: total.minutes + Number(exercise.duration || 0),

        calories: total.calories + Number(exercise.calories || 0),
      }),
      {
        exercises: 0,
        minutes: 0,
        calories: 0,
      },
    );
  }, [currentExercises]);

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="min-h-screen bg-[#0d0f13] px-6 py-12 text-white md:px-12">
      <div className="mx-auto max-w-[1216px]">
        {/* HEADER */}

        <div className="mb-7">
          <h1 className="font-[Impact,Arial,sans-serif] text-3xl tracking-wide">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-[#8d929d]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* ========================================
            STATS
        ======================================== */}

        <div className="rounded-2xl border border-[#242832] bg-[#12151b] px-6 py-7">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <Stat label="Exercises" value={stats.exercises} highlight />

            <Stat label="Minutes" value={stats.minutes} bordered />

            <Stat label="Calories" value={stats.calories} />
          </div>
        </div>

        {/* ========================================
            TABS + SORT
        ======================================== */}

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* TABS */}

          <div className="inline-flex w-fit rounded-xl border border-[#252a33] bg-[#14171d] p-1">
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

          {/* SORT */}

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

        {/* ========================================
            EXERCISES
        ======================================== */}

        <div className="mt-7 min-h-[308px] rounded-2xl border border-dashed border-[#272c34] bg-[#0f1115]">
          {loading ? (
            <div className="flex min-h-[308px] items-center justify-center">
              Loading workouts…
            </div>
          ) : filteredExercises.length === 0 ? (
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

// ==========================================
// STAT COMPONENT
// ==========================================

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

// ==========================================
// EMPTY STATE
// ==========================================

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

      <Link
        href="/"
        className="mt-6 rounded-full bg-[#baff00] px-7 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c8ff32] hover:shadow-[0_0_25px_rgba(186,255,0,0.15)] active:scale-95"
      >
        Go to workouts
      </Link>
    </div>
  );
}

// ==========================================
// EXERCISE CARD
// ==========================================

function ExerciseCard({
  exercise,
  activeTab,
  handleDone,
  handleRemove,
  handleDetails,
  handleMoveToToday,
}) {
  return (
    <div className="rounded-2xl border border-[#272c35] bg-[#13161c] p-4">
      {/* IMAGE */}

      <div className="h-[110px] w-full overflow-hidden rounded-xl">
        <Image
          src={exercise.image}
          alt={exercise.name || "Exercise"}
          width={148}
          height={82}
          className="h-full w-full object-cover"
        />
      </div>

      {/* INFO */}

      <div className="mt-4">
        <h2 className="truncate text-base font-bold uppercase text-white">
          {exercise.name}
        </h2>

        <p className="mt-1 text-sm text-gray-400">{exercise.equipment}</p>

        <div className="mt-2 flex flex-wrap gap-4 text-xs">
          {/* DURATION */}

          <div className="flex items-center gap-1.5 text-gray-300">
            <Clock3 className="h-4 w-4 text-lime-400" />

            <span>{Number(exercise.duration || 0)} min</span>
          </div>

          {/* CALORIES */}

          <div className="flex items-center gap-1.5 text-gray-300">
            <Flame className="h-4 w-4 text-lime-400" />

            <span>{Number(exercise.calories || 0)} kcal</span>
          </div>

          {/* RATING */}

          <div className="flex items-center gap-1.5 text-gray-300">
            <Star className="h-4 w-4 fill-lime-400 text-lime-400" />

            <span>{exercise.rating}</span>
          </div>
        </div>
      </div>

      {/* BUTTONS */}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {/* VIEW DETAILS */}

        <button
          type="button"
          onClick={() => handleDetails?.(exercise)}
          className="rounded-full border border-[#344052] px-5 py-2.5 text-sm font-medium text-gray-200 transition hover:border-gray-500 hover:bg-[#1b2028]"
        >
          View Details
        </button>

        {/* MARK AS DONE */}

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

        {/* ADD TO TODAY */}

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

        {/* REMOVE */}

        <button
          type="button"
          onClick={() => handleRemove(exercise.DataID)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-[#20242c] hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

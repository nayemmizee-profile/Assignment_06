"use client";

import { useMemo, useState } from "react";

const initialExercises = [];

export default function MyPlan({ exercises = initialExercises }) {
  const [activeTab, setActiveTab] = useState("saved");
  const [sortBy, setSortBy] = useState("duration");

  // Filter exercises based on selected tab
  const filteredExercises = useMemo(() => {
    const filtered = exercises.filter(
      (exercise) => exercise.status === activeTab,
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "duration") {
        return b.duration - a.duration;
      }

      if (sortBy === "calories") {
        return b.calories - a.calories;
      }

      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });
  }, [exercises, activeTab, sortBy]);

  // Calculate stats dynamically
  const stats = useMemo(() => {
    return filteredExercises.reduce(
      (total, exercise) => ({
        exercises: total.exercises + 1,
        minutes: total.minutes + exercise.duration,
        calories: total.calories + exercise.calories,
      }),
      {
        exercises: 0,
        minutes: 0,
        calories: 0,
      },
    );
  }, [filteredExercises]);

  return (
    <section className="min-h-screen bg-[#0d0f13] px-6 py-12 text-white md:px-12">
      <div className="mx-auto max-w-[1216px]">
        {/* Header */}
        <div className="mb-7">
          <h1 className="font-[Impact,Arial,sans-serif] text-3xl tracking-wide">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-[#8d929d]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats Card */}
        <div className="rounded-2xl border border-[#242832] bg-[#12151b] px-6 py-7 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Exercises */}
            <Stat label="Exercises" value={stats.exercises} highlight />

            {/* Minutes */}
            <Stat label="Minutes" value={stats.minutes} bordered />

            {/* Calories */}
            <Stat label="Calories" value={stats.calories} />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Tabs */}
          <div className="inline-flex w-fit rounded-xl border border-[#252a33] bg-[#14171d] p-1">
            <button
              onClick={() => setActiveTab("today")}
              className={`rounded-lg px-5 py-2 text-sm transition ${
                activeTab === "today"
                  ? "bg-[#20252e] font-semibold text-white shadow-sm"
                  : "text-[#8c929d] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
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

          {/* Sort */}
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

        {/* Exercise Content */}
        <div className="mt-7 min-h-[308px] rounded-2xl border border-dashed border-[#272c34] bg-[#0f1115]">
          {filteredExercises.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------
   STAT COMPONENT
-------------------------------- */

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

/* --------------------------------
   EMPTY STATE
-------------------------------- */

function EmptyState() {
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
        Browse the library and add a lift to get today moving.
      </p>

      <button className="mt-6 rounded-full bg-[#baff00] px-7 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c8ff32] hover:shadow-[0_0_25px_rgba(186,255,0,0.15)] active:scale-95">
        Go to workouts
      </button>
    </div>
  );
}

/* --------------------------------
   EXERCISE CARD
-------------------------------- */

function ExerciseCard({ exercise }) {
  return (
    <div className="rounded-xl border border-[#252a33] bg-[#14171d] p-5 transition hover:border-[#3a404b]">
      <h3 className="font-semibold text-white">{exercise.name}</h3>

      <div className="mt-4 flex justify-between text-sm">
        <span className="text-[#858b96]">Duration</span>

        <span className="text-white">{exercise.duration} min</span>
      </div>

      <div className="mt-2 flex justify-between text-sm">
        <span className="text-[#858b96]">Calories</span>

        <span className="text-white">{exercise.calories} kcal</span>
      </div>
    </div>
  );
}

"use client";
import { CardContext } from "@/context/context";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

const ListedCard = () => {
  const { saveCard, setSaveCard, todayPlan, setTodayPlan } =
    useContext(CardContext);

  //   console.log(saveCard, todayPlan);

  const handleMarkDone = (id) => {
    setTodayPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleRemove = (id) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMarkDone2 = (id) => {
    setSaveCard((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleRemove2 = (id) => {
    setSaveCard((prev) => prev.filter((item) => item.id !== id));
  };
  // ai
  // ai
  // ai

  const [activeTab, setActiveTab] = useState("today");

  const activeExercises = activeTab === "today" ? todayPlan : saveCard;

  const totalExercises = activeExercises.length;

  const totalMinutes = activeExercises.reduce(
    (total, exercise) => total + Number(exercise.duration || 0),
    0,
  );

  const totalCalories = activeExercises.reduce(
    (total, exercise) => total + Number(exercise.caloriesBurned || 0),
    0,
  );

  const [sortBy, setSortBy] = useState("default");

  const sortedExercises = [...activeExercises].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(a.duration || 0) - Number(b.duration || 0);
    }

    if (sortBy === "calories") {
      return Number(a.caloriesBurned || 0) - Number(b.caloriesBurned || 0);
    }

    if (sortBy === "rating") {
      return Number(b.rating || 0) - Number(a.rating || 0);
    }

    return 0;
  });

  //   const [activeTab, setActiveTab] = useState("today");

  //   const activeExercises = activeTab === "today" ? todayCard : saveCard;

  //   const totalExercises = activeExercises.length;

  //   const totalMinutes = activeExercises.reduce(
  //     (total, exercise) => total + exercise.duration,
  //     0,
  //   );

  //   const totalCalories = activeExercises.reduce(
  //     (total, exercise) => total + exercise.calories,
  //     0,
  //   );

  //   const sortedExercises = [...activeExercises].sort((a, b) => {
  //     if (sortBy === "duration") {
  //       return a.duration - b.duration;
  //     }

  //     if (sortBy === "calories") {
  //       return a.calories - b.calories;
  //     }

  //     if (sortBy === "rating") {
  //       return b.rating - a.rating;
  //     }

  //     return 0;
  // };

  // ai
  // ai
  // ai
  // ai
  // ai

  return (
    <main className="min-h-screen bg-[#0b0d10] px-4 py-7 text-white sm:px-6 lg:px-7">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-[25px] font-extrabold uppercase tracking-tight">
            My Plan
          </h1>

          <p className="mt-1 text-[13px] text-[#858a94]">
            Cap off five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats */}
        <section className="mb-7 rounded-xl border border-[#242932] bg-[#11141a]">
          <div className="grid grid-cols-3">
            {/* Exercises */}
            <div className="border-r border-[#20242b] px-5 py-6 sm:px-7">
              <p className="mb-1 text-[11px] text-[#858a94]">Exercises</p>

              <p className="text-[32px] font-extrabold leading-none text-[#c8ff00]">
                {totalExercises}
              </p>
            </div>

            {/* Minutes */}
            <div className="border-r border-[#20242b] px-5 py-6 sm:px-7">
              <p className="mb-1 text-[11px] text-[#858a94]">Minutes</p>

              <p className="text-[32px] font-extrabold leading-none">
                {totalMinutes}
              </p>
            </div>

            {/* Calories */}
            <div className="px-5 py-6 sm:px-7">
              <p className="mb-1 text-[11px] text-[#858a94]">Calories</p>

              <p className="text-[32px] font-extrabold leading-none">
                {totalCalories}
              </p>
            </div>
          </div>
        </section>

        {/* Tabs Area */}
        <div className="bg-black">
          {/* Tab Header + Sort */}
          <div className="relative mb-4 w-full">
            {/* Tabs */}
            <div className="tabs tabs-box w-full gap-3 bg-black">
              {/* Today's Plan */}
              <input
                type="radio"
                name="my_tabs_6"
                className="tab bg-gray-800 text-white"
                aria-label="Today's Plan"
                onChange={() => setActiveTab("today")}
                defaultChecked
              />

              {/* Today's Plan Content */}
              <div className="tab-content w-full bg-black border-base-300 p-6">
                {sortedExercises.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-blue-400 bg-zinc-900 px-6 py-16">
                    <h1 className="text-4xl font-extrabold text-white">
                      NOTHING HERE YET
                    </h1>

                    <p className="mt-2 text-center text-[12px] text-gray-400">
                      Browse the library and add a lift to get today moving.
                    </p>

                    <Link
                      href="/"
                      className="mt-4 flex h-9 w-[160px] items-center justify-center rounded-2xl bg-green-900 px-5 py-6 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      Go to workouts
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {sortedExercises.map((listcard) => (
                      <div
                        key={listcard.id}
                        className="flex min-h-[118px] w-full items-center justify-between rounded-2xl border border-[#252b35] bg-[#15181e] px-4 py-4"
                      >
                        {/* Left Side */}
                        <div className="flex items-center gap-4">
                          {/* Image */}
                          <div className="h-[84px] w-[148px] shrink-0 overflow-hidden rounded-xl">
                            <Image
                              src={listcard.image}
                              alt={listcard.name}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          {/* Exercise Info */}
                          <div className="flex flex-col gap-1">
                            <h3 className="text-[16px] font-bold uppercase text-white">
                              {listcard.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {listcard.equipment}
                            </p>

                            {/* Stats */}
                            <div className="mt-1 flex items-center gap-4 text-sm text-gray-300">
                              <span>
                                <span className="text-[#baff00]">◷</span>{" "}
                                {listcard.duration} min
                              </span>

                              <span>
                                <span className="text-[#baff00]">♨</span>{" "}
                                {listcard.caloriesBurned} kcal
                              </span>

                              <span>
                                <span className="text-[#baff00]">☆</span>{" "}
                                {listcard.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                          {/* View Details */}
                          <Link
                            href={`/exercises/${listcard.id}`}
                            className="flex h-9 items-center justify-center rounded-full bg-green-500 px-5 text-sm font-semibold text-white transition hover:bg-green-600"
                          >
                            View Details
                          </Link>

                          {/* Mark Done */}
                          <button
                            onClick={() => handleMarkDone(listcard.id)}
                            className={`h-9 rounded-full px-5 text-sm font-semibold transition ${
                              listcard.completed
                                ? "bg-green-500 text-white"
                                : "bg-[#baff00] text-black hover:bg-[#a8e600]"
                            }`}
                          >
                            {listcard.completed ? "✓ Done" : "✓ Mark as Done"}
                          </button>

                          {/* Remove */}
                          <button
                            onClick={() => handleRemove(listcard.id)}
                            className="ml-1 text-xl text-gray-500 transition hover:text-white"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Saved Tab */}
              <input
                type="radio"
                name="my_tabs_6"
                className="tab bg-gray-800 px-10 text-white"
                aria-label="Saved"
                onChange={() => setActiveTab("saved")}
              />

              {/* Saved Content */}
              <div className="tab-content w-full bg-black border-base-300 p-6">
                {sortedExercises.length === 0 ? (
                  <div className="flex min-h-[200px] items-center justify-center">
                    <p className="text-gray-400">No saved exercises yet.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {sortedExercises.map((list) => (
                      <div
                        key={list.id}
                        className="flex min-h-[118px] w-full items-center justify-between rounded-2xl border border-[#252b35] bg-[#15181e] px-4 py-4"
                      >
                        {/* Left Side */}
                        <div className="flex items-center gap-4">
                          {/* Image */}
                          <div className="h-[84px] w-[148px] shrink-0 overflow-hidden rounded-xl">
                            <Image
                              src={list.image}
                              alt={list.name}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          {/* Exercise Info */}
                          <div className="flex flex-col gap-1">
                            <h3 className="text-[16px] font-bold uppercase text-white">
                              {list.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {list.equipment}
                            </p>

                            {/* Stats */}
                            <div className="mt-1 flex items-center gap-4 text-sm text-gray-300">
                              <span>
                                <span className="text-[#baff00]">◷</span>{" "}
                                {list.duration} min
                              </span>

                              <span>
                                <span className="text-[#baff00]">♨</span>{" "}
                                {list.caloriesBurned} kcal
                              </span>

                              <span>
                                <span className="text-[#baff00]">☆</span>{" "}
                                {list.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                          {/* View Details */}
                          <Link
                            href={`/exercises/${list.id}`}
                            className="flex h-9 items-center justify-center rounded-full bg-green-500 px-5 text-sm font-semibold text-white transition hover:bg-green-600"
                          >
                            View Details
                          </Link>

                          {/* Mark Done */}
                          <button
                            onClick={() => handleMarkDone2(list.id)}
                            className={`h-9 rounded-full px-5 text-sm font-semibold transition ${
                              list.completed
                                ? "bg-green-500 text-white"
                                : "bg-[#baff00] text-black hover:bg-[#a8e600]"
                            }`}
                          >
                            {list.completed ? "✓ Done" : "✓ Mark as Done"}
                          </button>

                          {/* Remove */}
                          <button
                            onClick={() => handleRemove2(list.id)}
                            className="ml-1 text-xl text-gray-500 transition hover:text-white"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SORT - RIGHT SIDE */}
            <div className="absolute right-0 top-0 z-10">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 min-w-[140px] rounded-xl border border-[#252b35] bg-[#15181e] px-4 text-sm text-white outline-none transition hover:border-[#3a4350]"
              >
                <option value="default">Sort By</option>
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ListedCard;

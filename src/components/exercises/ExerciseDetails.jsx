import { Bookmark, CalendarPlus } from "lucide-react";
import Image from "next/image";

export default function ExerciseDetails({ exercise }) {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1400px] items-center px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* IMAGE */}

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
            <Image
              src={exercise.image}
              alt={exercise.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* DETAILS */}

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-black uppercase sm:text-4xl">
              {exercise.name}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              {exercise.description}
            </p>

            {/* CATEGORIES */}

            <div className="mt-4 flex flex-wrap gap-2">
              {exercise.muscleGroups?.map((group) => (
                <span
                  key={group}
                  className="
                    rounded-full
                    bg-[#baff00]
                    px-3
                    py-1
                    text-[11px]
                    font-bold
                    text-black
                  "
                >
                  {group}
                </span>
              ))}
            </div>

            {/* INFO */}

            <div className="mt-5 overflow-hidden rounded-xl border border-[#252a34] bg-[#15181e]">
              <InfoRow label="Equipment" value={exercise.equipment} />

              <InfoRow label="Difficulty" value={exercise.difficulty} />

              <InfoRow label="Sets" value={exercise.sets} />

              <InfoRow label="Reps" value={exercise.reps} />

              <InfoRow label="Duration" value={exercise.duration} />

              <InfoRow
                label="Calories"
                value={`${exercise.caloriesBurned} kcal`}
              />

              <InfoRow label="Rating" value={exercise.rating} last />
            </div>

            {/* INSTRUCTIONS */}

            <div className="mt-6">
              <h2 className="text-xs font-black uppercase">Instructions</h2>

              <ol className="mt-3 space-y-3 text-sm text-gray-400">
                {exercise.instructions?.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-gray-500">{index + 1}.</span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* BUTTONS */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                className="
                  flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#baff00]
                  px-5
                  text-xs
                  font-bold
                  text-black
                  hover:bg-[#c7ff33]
                "
              >
                <CalendarPlus size={14} />
                Add to today's plan
              </button>

              <button
                className="
                  flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-[#303642]
                  px-5
                  text-xs
                  text-gray-300
                  hover:bg-[#181c22]
                "
              >
                <Bookmark size={14} />
                Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value, last }) {
  return (
    <div
      className={`
        flex
        min-h-[45px]
        items-center
        justify-between
        px-4
        sm:px-5
        ${!last ? "border-b border-[#252a34]" : ""}
      `}
    >
      <span
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-wide
          text-gray-500
        "
      >
        {label}
      </span>

      <span className="text-sm text-gray-300">{value}</span>
    </div>
  );
}

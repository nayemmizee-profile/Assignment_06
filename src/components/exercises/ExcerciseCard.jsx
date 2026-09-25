import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export default function ExerciseCard({ exercise }) {
  return (
    <article
      className="
        overflow-hidden
        rounded-[9px]
        border
        border-zinc-800
        bg-[#121419]
        transition-all
        duration-200
        hover:-translate-y-[3px]
        hover:border-zinc-700
        hover:shadow-2xl
      "
    >
      {/* IMAGE */}

      <div className="group relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <Link href={`/exercises/${exercise.DataID}`}>
          <Image
            src={exercise.image}
            alt={exercise.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="
              object-cover
              transition-transform
              duration-300
              group-hover:scale-[1.035]
            "
          />
        </Link>

        {/* FAVORITE */}

        <div className="absolute right-2 top-2">
          <FavoriteButton exerciseId={exercise.DataID} />
        </div>
      </div>

      {/* CARD CONTENT */}

      <div className="p-3 sm:p-[11px]">
        {/* MUSCLE GROUPS */}

        <div className="mb-2 flex flex-wrap gap-1">
          {exercise.muscleGroups?.map((group) => (
            <span
              key={group}
              className="
                rounded-[3px]
                bg-lime-400
                px-[6px]
                py-[3px]
                text-[7px]
                font-black
                uppercase
                leading-none
                text-black
              "
            >
              {group}
            </span>
          ))}
        </div>

        {/* NAME */}

        <Link href={`/exercises/${exercise.DataID}`}>
          <h2
            className="
              cursor-pointer
              text-[10px]
              font-extrabold
              uppercase
              leading-[1.3]
              text-white
              transition
              hover:text-lime-400
            "
          >
            {exercise.name}
          </h2>
        </Link>

        {/* EQUIPMENT */}

        <p className="mb-3 mt-1 text-[8px] text-zinc-600">
          {exercise.equipment}
        </p>

        {/* STATS */}

        <div
          className="
            flex
            flex-wrap
            gap-x-3
            gap-y-1
            border-t
            border-zinc-800
            pt-2
            text-[8px]
            text-zinc-600
          "
        >
          <span>◷ {exercise.duration} min</span>

          <span>◆ {exercise.caloriesBurned} kcal</span>

          <span>★ {exercise.rating}</span>
        </div>
      </div>
    </article>
  );
}

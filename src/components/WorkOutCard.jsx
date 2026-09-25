import ExerciseCard from "@/components/exercises/ExcerciseCard";
import { getExercises } from "@/lib/exercises";

export default async function HomePage() {
  const exercises = await getExercises();

  return (
    <main className="min-h-screen bg-[#08090b] px-3 py-5 text-white sm:px-5 sm:py-7 lg:px-6 lg:py-8">
      <div className="mx-auto w-full max-w-[1180px]">
        {/* HEADER */}

        <header className="mb-6 flex items-end justify-between sm:mb-7">
          <div>
            <h1 className="text-[16px] font-extrabold tracking-tight sm:text-[17px]">
              THE LIBRARY
            </h1>

            <p className="mt-1 text-[10px] text-zinc-500 sm:text-[11px]">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <span className="hidden text-[9px] tracking-widest text-zinc-600 sm:block">
            {exercises.length} EXERCISES
          </span>
        </header>

        {/* EXERCISE GRID */}

        <section
          className="
    grid
    grid-cols-1
    gap-3
    sm:grid-cols-2
    sm:gap-[11px]
    lg:grid-cols-3
  "
        >
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </section>
      </div>
    </main>
  );
}

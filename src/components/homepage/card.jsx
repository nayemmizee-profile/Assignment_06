import Image from "next/image";
import Link from "next/link";
// import FavoriteButton from "./FavoriteButton";

const cardData = async () => {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!response.ok) {
    throw new Error("Failed to fetch exercise data");
  }

  const data = await response.json();

  return data;
};

const Card = async () => {
  const callData = await cardData();

  //   console.log(callData, "carddata");

  return (
    <main className="min-h-screen bg-[#08090b] px-3 py-5 text-white sm:px-5 sm:py-7 lg:px-6 lg:py-8">
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Header */}
        <header className="mb-5 sm:mb-6">
          <h1 className="text-3xl font-extrabold  sm:text-[40px]">
            THE LIBRARY
          </h1>

          <p className="mt-1 text-[14px] text-zinc-500 sm:text-[16px]">
            Twelve lifts covering every major muscle group.
          </p>
        </header>

        {/* Exercise Grid */}
        <section
          className="
            grid
            grid-cols-1
            gap-[10px]
            sm:grid-cols-2
            sm:gap-[11px]
            lg:grid-cols-3
          "
        >
          {callData.map((exercises, id) => (
            <article
              key={exercises.id}
              className="
                group
                overflow-hidden
                rounded-[9px]
                border
                border-zinc-800
                bg-[#121419]
                transition-all
                duration-200
                hover:-translate-y-[2px]
                hover:border-zinc-700
                hover:shadow-xl
              "
            >
              {/* Image */}
              <Link href={`/exercises/${exercises.id}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  {/* <Link href={`/exercises/${exercises.id}`}> */}
                  <Image
                    src={exercises.image}
                    alt={exercises.name}
                    fill
                    priority={exercises.id <= 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.035]"
                  />
                  {/* </Link> */}
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-[20px]">
                  {/* Muscle Groups */}
                  <div className="mb-2 flex flex-wrap gap-1">
                    {exercises.muscleGroups?.map((group) => (
                      <span
                        key={group}
                        className="
                        rounded-[3px]
                        bg-lime-400
                        px-[6px]
                        py-[3px]
                        text-[14px]
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

                  {/* Exercise Name */}
                  <Link href={`/exercises/${exercises.id}`}>
                    <h2
                      className="
                      cursor-pointer
                      text-[16px]
                      font-extrabold
                      uppercase
                      leading-[1.3]
                      text-white
                      transition-colors
                      hover:text-lime-400
                    "
                    >
                      {exercises.name}
                    </h2>
                  </Link>

                  {/* Equipment */}
                  <p className="mb-3 mt-1 text-[12px] text-zinc-500">
                    {exercises.equipment}
                  </p>

                  {/* Stats */}
                  <div
                    className="
                    flex
                    flex-wrap
                    gap-x-3
                    gap-y-1
                    border-t
                    border-zinc-800
                    pt-2
                    text-[14px]
                    text-zinc-600
                  "
                  >
                    <span>◷ {exercises.duration} min</span>

                    <span>◆ {exercises.caloriesBurned} kcal</span>

                    <span>★ {exercises.rating}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Card;

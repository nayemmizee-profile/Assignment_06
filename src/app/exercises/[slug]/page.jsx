import SlugButton from "@/components/homepage/slugButton";
import SlugButton2 from "@/components/homepage/slugButton2";
import Image from "next/image";
const cardData = async () => {
  const response = await fetch("https://api.api-store.workers.dev/api/fitlog");

  if (!response.ok) {
    throw new Error("Failed to fetch exercise data");
  }

  const data = await response.json();

  return data;
};

const ParamsDetails = async ({ params }) => {
  const { slug } = await params;

  const pageData = await cardData();

  const detail = pageData.find((card) => String(card.id) === String(slug));

  if (!detail) {
    return (
      <main className="min-h-screen bg-[#0d0f12] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-xl font-bold">Exercise not found</h1>
        </div>
      </main>
    );
  }

  const details = [
    {
      label: "EQUIPMENT",
      value: detail.equipment,
    },
    {
      label: "DIFFICULTY",
      value: detail.difficulty,
    },
    {
      label: "SETS",
      value: detail.sets,
    },
    {
      label: "REPS",
      value: detail.reps,
    },
    {
      label: "DURATION",
      value: detail.duration,
    },
    {
      label: "CALORIES",
      value: `${detail.calories} kcal`,
    },
    {
      label: "RATING",
      value: detail.rating,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        {/* Main layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(400px,1fr)_minmax(450px,1fr)] lg:gap-10">
          {/* IMAGE */}
          <div className="relative h-[450px] overflow-hidden rounded-xl sm:h-[550px] lg:h-[650px]">
            <Image
              src={detail.image}
              alt={detail.name || "Exercise"}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col">
            {/* TITLE */}
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                {detail.name}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                {detail.description}
              </p>
            </div>

            {/* TAGS */}
            <div className="mt-4 flex flex-wrap gap-2">
              {detail.muscleGroups?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#baff00] px-3 py-1 text-xs font-bold text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* DETAILS */}
            <div className="mt-5 overflow-hidden rounded-xl border border-[#242832] bg-[#15181e]">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="flex min-h-[50px] items-center justify-between border-b border-[#242832] px-4 last:border-b-0"
                >
                  <span className="text-[10px] font-bold tracking-wider text-gray-400">
                    {item.label}
                  </span>

                  <span className="text-xs font-medium text-gray-200">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-6">
              <h2 className="text-sm font-black tracking-wide text-white">
                INSTRUCTIONS
              </h2>

              <ol className="mt-3 space-y-3">
                {detail.instructions?.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-xs leading-5 text-gray-400"
                  >
                    <span className="shrink-0 text-gray-500">{index + 1}</span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-wrap gap-3">
              <SlugButton exercise={detail} />

              <SlugButton2 exercise={detail} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ParamsDetails;

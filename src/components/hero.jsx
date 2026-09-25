import banner from "@/images/banner.png";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[#0b0c0f] px-4 py-7 sm:px-6 md:px-8 md:py-12">
      <div className="mx-auto flex min-h-[465px] max-w-[1340px] overflow-hidden rounded-[17px] border border-[#292d35] bg-[#15171c]">
        {/* LEFT SIDE */}
        <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 md:w-[58%] md:px-14 md:py-14">
          {/* Small Heading */}
          <span className="mb-5 text-[11px] font-extrabold tracking-[1.5px] text-[#baff00] sm:text-xs">
            WORKOUT LIBRARY
          </span>

          {/* Main Heading */}
          <h1 className="font-['Times_New_Roman',serif] text-[42px] font-black leading-[0.92] tracking-[-1.5px] text-white sm:text-[52px] md:text-[60px] lg:text-[70px]">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[540px] text-sm leading-[1.55] text-[#9297a1] sm:text-[15px] md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          {/* Button */}
          <div className="mt-6">
            <Link
              href="/workouts"
              className="inline-flex rounded-[5px] bg-[#baff00] px-6 py-3 text-xs font-black text-[#080a0b] transition duration-200 hover:-translate-y-0.5 hover:bg-[#c7ff38]"
            >
              BROWSE WORKOUTS
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE / IMAGE */}
        <div className="hidden w-[42%] items-center justify-center md:flex">
          <Image
            src={banner}
            alt="Workout machine"
            width={370}
            height={370}
            className="w-[300px] object-contain lg:w-[370px]"
          />
        </div>
      </div>
    </section>
  );
}

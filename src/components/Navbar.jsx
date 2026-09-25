"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-[#1d2025] bg-[#0b0c0f]">
      <div className="mx-auto flex h-[84px] max-w-[1400px] items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[19px] font-extrabold tracking-wide text-white"
        >
          <span className="text-2xl text-[#baff00]">⚒</span>
          <span>FITLOG</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
          {/* Workouts */}
          <Link
            href="/"
            className={`rounded-full px-[17px] py-2 text-[13px] border-1 font-bold transition ${
              pathname === "/"
                ? "bg-[#17220f] text-[#baff00]"
                : "text-[#92969e] hover:bg-[#202f12] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/MyPlan"
            className={`rounded-full px-[17px] py-2 border-1 text-[13px] font-medium transition ${
              pathname === "/MyPlan"
                ? "bg-[#17220f] text-[#baff00]"
                : "text-[#92969e] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-7 md:flex">
          {/* Plan */}
          <div className="flex items-center gap-2 text-[13px] text-[#999da5]">
            <span>Plan</span>

            <span className="flex h-[21px] w-[21px] items-center justify-center rounded-full bg-[#baff00] text-[12px] font-extrabold text-black">
              0
            </span>
          </div>

          {/* Saved */}
          <div className="flex items-center gap-2 text-[13px] text-[#999da5]">
            <span>Saved</span>

            <span className="flex h-[21px] w-[21px] items-center justify-center rounded-full border border-[#383c43] text-[12px] text-[#8f939c]">
              0
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-[#baff00] md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[#1d2025] bg-[#0b0c0f] px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-[#17220f] px-4 py-3 text-sm font-bold text-[#baff00]"
            >
              Workouts
            </Link>

            <Link
              href="/MyPlan"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-[#999da5] hover:bg-[#15171c] hover:text-white"
            >
              My Plan
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

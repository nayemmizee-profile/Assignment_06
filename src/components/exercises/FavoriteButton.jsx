"use client";

import { useState } from "react";

export default function FavoriteButton({ exerciseId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function toggleFavorite() {
    setIsFavorite((current) => !current);
  }

  return (
    <button
      onClick={toggleFavorite}
      aria-label="Favorite"
      className={`
        grid
        h-7
        w-7
        place-items-center
        rounded-full
        border
        border-white/15
        bg-black/50
        text-sm
        backdrop-blur
        transition
        hover:bg-black/70
        ${isFavorite ? "text-lime-400" : "text-white"}
      `}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}

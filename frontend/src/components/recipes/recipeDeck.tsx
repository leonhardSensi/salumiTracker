"use client";
import { Irecipe } from "../../interfaces/interfaces";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserInput from "../generic/input/userInput";

export default function RecipeDeck({
  recipes,
}: {
  recipes: Irecipe[] | undefined;
}) {
  // 1. Read from localStorage on mount
  const [pendingViewMode, setPendingViewMode] = useState<"deck" | "list">(
    () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("recipeViewMode");
        if (stored === "deck" || stored === "list") return stored;
      }
      return "deck";
    }
  );
  const [viewMode, setViewMode] = useState(pendingViewMode);

  // 2. Write to localStorage when changed
  useEffect(() => {
    localStorage.setItem("recipeViewMode", pendingViewMode);
    // Delay the actual content switch for smooth highlight animation
    const timeout = setTimeout(() => setViewMode(pendingViewMode), 250); // match transition duration
    return () => clearTimeout(timeout);
  }, [pendingViewMode]);

  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  if (!recipes) {
    return (
      <div className="flex text-xl justify-center text-black">
        <p>There was an error getting recipes.</p>
      </div>
    );
  }
  if (recipes.length === 0) {
    return (
      <div className="flex text-xl justify-center">
        <p>No recipes found. Create a new one instead!</p>
      </div>
    );
  }

  // Filter recipes by search
  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  // Ensure index is valid for filteredRecipes
  const safeIndex = Math.min(index, Math.max(filteredRecipes.length - 1, 0));

  // Looping logic for deck
  const prev = () =>
    setIndex((i) =>
      filteredRecipes.length
        ? (i - 1 + filteredRecipes.length) % filteredRecipes.length
        : 0
    );
  const next = () =>
    setIndex((i) =>
      filteredRecipes.length ? (i + 1) % filteredRecipes.length : 0
    );

  // Search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIndex(0); // Always reset to first result on new search
  };

  // Segmented control animation
  const highlightVariants = {
    deck: { x: 0 },
    list: { x: "100%" },
  };

  // Use pendingViewMode for the toggle highlight, but viewMode for the content
  const highlightPosition = pendingViewMode === "deck" ? "left-0" : "left-1/2";

  return (
    <div className="relative w-full flex flex-col items-center h-[65vh]">
      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-6 flex justify-center items-center">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search recipes..."
          className="w-full px-6 py-3 my-2 rounded-lg border border-wetSand focus:outline-none focus:ring-2 focus:ring-wetSand text-lg"
        />
        {/* Animated Segmented Toggle */}
        <div className="w-full max-w-2xl flex justify-end">
          <div className="relative inline-flex bg-eggshell border border-wetSand rounded-full p-1 shadow min-w-[180px] overflow-hidden">
            {/* Animated highlight "liquid" pill */}
            <motion.div
              layout
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 1.2,
              }}
              className={`absolute top-0 h-full w-1/2 rounded-full z-0 bg-wetSand transition-all duration-300 ${highlightPosition}`}
              style={{
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
              }}
            />
            <button
              type="button"
              onClick={() => setPendingViewMode("deck")}
              className={`relative z-10 px-5 py-2 rounded-full font-semibold transition-all duration-200
              ${
                pendingViewMode === "deck"
                  ? "text-eggshell"
                  : "text-wetSand hover:bg-flesh/60"
              }`}
              aria-pressed={pendingViewMode === "deck"}
            >
              <span className="inline-flex items-center gap-2">
                <Image src="/deck.svg" width={18} height={18} alt="Deck view" />
                Deck
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPendingViewMode("list")}
              className={`relative z-10 px-5 py-2 rounded-full font-semibold transition-all duration-200
              ${
                pendingViewMode === "list"
                  ? "text-eggshell"
                  : "text-wetSand hover:bg-flesh/60"
              }`}
              aria-pressed={pendingViewMode === "list"}
            >
              <span className="inline-flex items-center gap-2">
                <Image src="/list.svg" width={18} height={18} alt="List view" />
                List
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Deck View */}
      {viewMode === "deck" ? (
        filteredRecipes.length === 0 ? (
          <div className="flex text-xl justify-center">
            <p>No recipes found.</p>
          </div>
        ) : (
          <>
            <div className="relative w-full flex justify-center items-center min-h-[420px]">
              {filteredRecipes.map((recipe, i) => {
                // Calculate position relative to active index
                let pos = i - safeIndex;
                if (pos < -Math.floor(filteredRecipes.length / 2))
                  pos += filteredRecipes.length;
                if (pos > Math.floor(filteredRecipes.length / 2))
                  pos -= filteredRecipes.length;

                const isActive = pos === 0;
                const scale = isActive ? 1 : 0.92;
                const y = pos * 30;
                const z = 100 - Math.abs(pos);
                const opacity = Math.abs(pos) > 2 ? 0 : 1;

                return (
                  <motion.div
                    key={recipe.id}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{
                      zIndex: z,
                      opacity,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    className={`absolute w-full max-w-2xl p-0 flex flex-col items-center ${
                      isActive ? "ring-4 ring-wetSand" : ""
                    }`}
                    animate={{
                      scale,
                      y,
                      boxShadow: isActive
                        ? "0 12px 48px 0 rgba(0,0,0,0.18)"
                        : "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div
                      className={`relative w-full h-full bg-gradient-to-br from-flesh to-eggshell rounded-3xl shadow-2xl border border-wetSand transition-all duration-300 ${
                        isActive
                          ? "scale-105"
                          : "opacity-80 blur-[1px] grayscale-[0.2]"
                      }`}
                    >
                      {/* Decorative top bar */}
                      <div className="flex items-center justify-between px-8 py-4 rounded-t-3xl">
                        <span className="text-xs text-stone">
                          {recipe.created_at
                            ? new Date(recipe.created_at).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                      {/* Main content */}
                      <div className="flex flex-col items-center px-12 py-8">
                        <Link href={`/recipes/${recipe.id}`} className="w-full">
                          <h2 className="text-4xl font-serif mb-4 text-wetSand text-center drop-shadow-lg hover:underline transition-all duration-200">
                            {recipe.title}
                          </h2>
                        </Link>
                        <div className="flex gap-6 mt-2">
                          <Link href={`/recipes/edit/${recipe.id}`}>
                            <button
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-wetSand text-eggshell font-semibold shadow hover:bg-wetSand/90 transition"
                              title="Edit"
                            >
                              <Image
                                className="w-6 h-6"
                                src="/editButton.svg"
                                width={24}
                                height={24}
                                alt="edit"
                              />
                              Edit
                            </button>
                          </Link>
                          <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-200 text-red-900 font-semibold shadow hover:bg-red-300 transition"
                            title="Delete"
                            // onClick={...}
                          >
                            <Image
                              className="w-6 h-6"
                              src="/delete.svg"
                              width={24}
                              height={24}
                              alt="delete"
                            />
                            Delete
                          </button>
                        </div>
                      </div>
                      {/* Decorative bottom bar */}
                      <div className="flex justify-center items-center px-8 py-2 rounded-b-3xl">
                        <span className="text-xs text-stone tracking-widest">
                          {recipe.steps ? `${recipe.steps.length} steps` : ""}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex justify-center gap-8 mt-6">
              <button
                type="button"
                onClick={prev}
                className="bg-wetSand text-eggshell px-4 py-2 rounded-full shadow hover:scale-105 transition"
                aria-label="Previous recipe"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={next}
                className="bg-wetSand text-eggshell px-4 py-2 rounded-full shadow hover:scale-105 transition"
                aria-label="Next recipe"
              >
                ↓
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              {filteredRecipes.map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === index
                      ? "bg-wetSand"
                      : "bg-eggshell border border-wetSand"
                  } inline-block`}
                />
              ))}
            </div>
          </>
        )
      ) : // List View
      filteredRecipes.length === 0 ? (
        <div className="flex text-xl justify-center">
          <p>No recipes found.</p>
        </div>
      ) : (
        <div className="w-full max-w-2xl flex flex-col gap-6 p-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="w-full bg-gradient-to-br from-flesh to-eggshell rounded-3xl shadow-2xl border border-wetSand transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between px-8 py-4 rounded-t-3xl">
                <span className="text-xs text-stone">
                  {recipe.created_at
                    ? new Date(recipe.created_at).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center px-12 py-8 gap-4">
                <Link href={`/recipes/${recipe.id}`} className="w-full">
                  <h2 className="text-3xl font-serif mb-2 text-wetSand text-center drop-shadow-lg hover:underline transition-all duration-200">
                    {recipe.title}
                  </h2>
                </Link>
                <div className="flex gap-4 mt-2 w-2/3">
                  <Link href={`/recipes/edit/${recipe.id}`} className="w-fit">
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-wetSand text-eggshell font-semibold shadow hover:bg-wetSand/90 transition"
                      title="Edit"
                    >
                      <Image
                        className="w-6 h-6"
                        src="/editButton.svg"
                        width={24}
                        height={24}
                        alt="edit"
                      />
                      Edit
                    </button>
                  </Link>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-200 text-red-900 font-semibold shadow hover:bg-red-300 transition"
                    title="Delete"
                    // onClick={...}
                  >
                    <Image
                      className="w-6 h-6"
                      src="/delete.svg"
                      width={24}
                      height={24}
                      alt="delete"
                    />
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center px-8 py-2 rounded-b-3xl">
                <span className="text-xs text-stone tracking-widest">
                  {recipe.steps ? `${recipe.steps.length} steps` : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

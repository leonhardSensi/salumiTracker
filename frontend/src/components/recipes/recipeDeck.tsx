"use client";
import { Irecipe } from "../../interfaces/interfaces";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Edit3, Trash2, BookOpen, Eye } from "lucide-react";

export default function RecipeDeck({
  recipes,
}: {
  recipes: Irecipe[] | undefined;
}) {
  const [search, setSearch] = useState("");

  if (!recipes) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-4"
        >
          <BookOpen size={64} className="text-wetSand/50" strokeWidth={1} />
        </motion.div>
        <p className="text-xl text-stone">
          There was an error getting recipes.
        </p>
      </motion.div>
    );
  }

  if (recipes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-4"
        >
          <BookOpen size={64} className="text-wetSand/50" strokeWidth={1} />
        </motion.div>
        <h3 className="font-serif text-2xl font-bold text-wetSand mb-2">
          No recipes found
        </h3>
        <p className="text-stone">Create your first recipe to get started!</p>
      </motion.div>
    );
  }

  // Filter recipes by search
  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  // Search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Search Bar */}
      <div className="w-full max-w-3xl mb-8">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search recipes..."
          className="w-full px-6 py-3 rounded-lg border-2 border-wetSand/30 focus:outline-none focus:ring-2 focus:ring-wetSand focus:border-wetSand text-lg text-stone shadow-sm bg-white transition-all"
        />
      </div>

      {/* List View */}
      {filteredRecipes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <BookOpen size={64} className="text-wetSand/50" strokeWidth={1} />
          </motion.div>
          <h3 className="font-serif text-2xl font-bold text-wetSand mb-2">
            No recipes found
          </h3>
          <p className="text-stone">
            {search
              ? "Try a different search term"
              : "Create your first recipe to get started"}
          </p>
        </motion.div>
      ) : (
        <div className="w-full max-w-4xl space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function RecipeCard({ recipe, index }: { recipe: Irecipe; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    // Add your delete logic here
    console.log("Deleting recipe:", recipe.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        whileHover={{
          y: -6,
          transition: { duration: 0.3 },
        }}
        className="relative bg-gradient-to-br from-flesh to-eggshell rounded-2xl p-6 shadow-md hover:shadow-2xl transition-shadow duration-300 border-2 border-wetSand/50 overflow-hidden"
      >
        {/* Decorative corner accent */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? 0 : -45,
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 right-0 w-20 h-20 bg-wetSand/10 rounded-bl-full"
        />

        <div className="relative flex items-start justify-between gap-4">
          {/* Left side - Recipe info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChefHat size={24} className="text-wetSand" strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-serif text-2xl font-bold text-stone">
                {recipe.title}
              </h3>
            </div>

            {/* Date badge */}
            <div className="flex items-center gap-2 text-sm text-stone">
              <div className="w-2 h-2 rounded-full bg-wetSand" />
              <span className="font-medium">
                {recipe.created_at
                  ? new Date(recipe.created_at).toLocaleDateString()
                  : ""}
              </span>
              {recipe.steps && recipe.steps.length > 0 && (
                <>
                  <span className="text-wetSand/50">•</span>
                  <span className="font-medium">
                    {recipe.steps.length}{" "}
                    {recipe.steps.length === 1 ? "step" : "steps"}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2">
            <Link href={`/recipes/${recipe.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-wetSand text-eggshell rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-wetSand/90 transition-colors shadow-md"
              >
                <Eye size={16} />
                <span>View</span>
              </motion.button>
            </Link>

            <Link href={`/recipes/edit/${recipe.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-wetSand text-eggshell rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-wetSand/90 transition-colors shadow-md"
              >
                <Edit3 size={16} />
                <span>Edit</span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-eggshell text-wetSand rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-wetSand hover:text-eggshell transition-colors shadow-md border border-wetSand/30"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-2xl z-50 max-w-md w-full mx-4"
            >
              <h3 className="font-serif text-2xl font-bold text-stone mb-2">
                Delete Recipe?
              </h3>
              <p className="text-stone mb-6">
                Are you sure you want to delete "{recipe.title}"? This action
                cannot be undone.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 bg-eggshell text-stone rounded-xl font-medium hover:bg-flesh transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleDelete();
                    setShowDeleteConfirm(false);
                  }}
                  className="flex-1 px-4 py-3 bg-wetSand text-eggshell rounded-xl font-medium hover:bg-wetSand/90 transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

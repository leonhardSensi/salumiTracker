"use client";

import RecipeDeck from "../../components/recipes/recipeDeck";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";
import { RecipeError, getRecipes } from "../../api/recipeApi";
import { Irecipe } from "../../interfaces/interfaces";
import { ModalProvider } from "../../utils/modalProvider";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Plus } from "lucide-react";

export default function Recipes() {
  const {
    status,
    error: errorMessage,
    data: recipes,
  } = useQuery<Irecipe[], RecipeError>({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return (
    <ModalProvider>
      <PrivateLayout>
        <main className="flex-1 p-8 bg-eggshell rounded-tl-[4rem] overflow-y-auto">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <BookOpen size={48} className="text-wetSand" strokeWidth={1.5} />
            </motion.div>
            <h1 className="font-serif text-5xl font-bold text-wetSand mb-4">
              Your Recipes
            </h1>
            <p className="text-stone text-lg">
              {recipes?.length || 0}{" "}
              {recipes?.length === 1 ? "recipe" : "recipes"} in your collection
            </p>
          </motion.div>

          {/* Add new recipe button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <Link href="/add_recipe">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-wetSand text-eggshell rounded-xl font-serif font-semibold text-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Plus size={24} />
                <span>Create New Recipe</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Recipe list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <RecipeDeck recipes={recipes} />
          </motion.div>
        </main>
      </PrivateLayout>
    </ModalProvider>
  );
}

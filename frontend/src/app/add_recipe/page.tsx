"use client";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import React from "react";
import RecipeInput from "../../components/generic/input/recipes/recipeInput";
import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";

export default function NewRecipe() {
  return (
    <PrivateLayout>
      <div className="flex flex-col items-center w-full p-12 bg-eggshell overflow-y-auto rounded-tl-[4rem]">
        {/* Header with icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <ChefHat size={48} className="text-wetSand" strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-5xl font-serif font-bold text-wetSand">
            Add Recipe
          </h1>
        </motion.div>

        <RecipeInput />
      </div>
    </PrivateLayout>
  );
}

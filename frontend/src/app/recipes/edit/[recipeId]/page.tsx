"use client";

import { getRecipe } from "../../../../api/recipeApi";
import EditRecipeInput from "../../../../components/generic/input/recipes/editRecipeInput";
import { PrivateLayout } from "../../../../components/PrivateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function EditRecipeDetails() {
  const params = useParams();

  const {
    status: statusRecipe,
    error: errorRecipe,
    data: recipe,
  } = useQuery({
    queryKey: ["recipe", params.recipeId],
    queryFn: () => getRecipe(params.recipeId as string),
  });

  return (
    <PrivateLayout>
      <motion.div
        className="flex flex-col items-center w-full p-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="w-fit text-6xl text-wetSand font-serif mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Edit {recipe ? recipe.title : "Recipe"}
        </motion.h1>
        <motion.div
          className="flex flex-col items-center h-fit w-full overflow-auto rounded-xl bg-flesh shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {recipe && <EditRecipeInput recipeToEdit={recipe} />}
        </motion.div>
      </motion.div>
    </PrivateLayout>
  );
}

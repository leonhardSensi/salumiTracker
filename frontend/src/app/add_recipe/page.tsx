"use client";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import React from "react";
import RecipeInput from "../../components/generic/input/recipes/recipeInput";

export default function NewRecipe() {
  return (
    <PrivateLayout>
      <div className="flex flex-col items-center w-full p-12">
        <h1 className="w-fit text-6xl text-wetSand font-serif mb-4">
          Add Recipe
        </h1>

        <div className="flex flex-col items-center h-fit w-full overflow-auto rounded-xl bg-flesh shadow-2xl">
          <RecipeInput />
        </div>
      </div>
    </PrivateLayout>
  );
}

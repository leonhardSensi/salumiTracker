"use client";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import React from "react";
import RecipeInput from "../../components/generic/input/recipes/recipeInput";

export default function NewRecipe() {
  return (
    <PrivateLayout>
      <div className="flex flex-col items-center h-fit overflow-auto my-16 rounded-lg bg-salumeBlue mx-80 z-10 shadow-2xl">
        <h1 className="w-fit text-6xl text-salumeWhite border-b-salumeWhite border-b-4 border-double font-bold font-Montserrat mt-16">
          Add Recipe
        </h1>
        <div className="py-16 w-2/3">
          <RecipeInput />
        </div>
      </div>
    </PrivateLayout>
  );
}

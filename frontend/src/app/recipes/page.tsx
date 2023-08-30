"use client";

import { useEffect, useState } from "react";
import { Irecipe, IrecipeResponse } from "../../interfaces/interfaces";
import RecipeList from "@/components/recipes/recipeList";
import PrivateLayout from "@/components/PrivateLayout/privateLayout";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Irecipe[]>();

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch("http://localhost:8000/api/recipes", {
        method: "GET",
        credentials: "include",
      });
      const data: IrecipeResponse = await response.json();
      if (data.status) {
        setRecipes(data.data.recipes);
      } else {
        console.log("no recipes found");
      }
    };
    getRecipes();
  }, []);

  return (
    <PrivateLayout>
      <RecipeList recipes={recipes} />
    </PrivateLayout>
  );
}

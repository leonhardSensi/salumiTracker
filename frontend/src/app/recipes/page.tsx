"use client";

import RecipeList from "@/components/recipes/recipeList";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";
import { SalumiError, getRecipes } from "@/api/recipeApi";
import { useRouter } from "next/navigation";
import { Irecipe } from "@/interfaces/interfaces";

export default function Recipes() {
  const router = useRouter();

  const {
    status,
    error: errorMessage,
    data: recipes,
  } = useQuery<Irecipe[], SalumiError>({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  console.log("RECIPE DETAILS", status, errorMessage, recipes);

  if (status === "loading") {
    return (
      <PrivateLayout>
        <p className="text-black">Loading</p>
      </PrivateLayout>
    );
  }
  if (status === "error") {
    return (
      <PrivateLayout>
        <p className="text-black">{errorMessage.message}</p>
      </PrivateLayout>
    );
  }

  return (
    <PrivateLayout>
      <RecipeList recipes={recipes} />
    </PrivateLayout>
  );
}

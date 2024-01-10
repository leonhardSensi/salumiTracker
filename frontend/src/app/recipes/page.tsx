"use client";

import RecipeList from "@/components/recipes/recipeList";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";
import { SalumiError, getRecipes } from "@/api/recipeApi";
import { Irecipe } from "@/interfaces/interfaces";
import LinkButton from "@/components/generic/button/linkButton";

export default function Recipes() {
  const {
    status,
    error: errorMessage,
    data: recipes,
  } = useQuery<Irecipe[], SalumiError>({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return (
    <PrivateLayout>
      <div className="flex flex-col w-full h-fit items-center">
        <LinkButton
          text="Create"
          href="/add_recipe"
          width="w-fit"
          height="h-12"
        />

        <div className="relative shadow-md rounded-lg bg-white w-full">
          <RecipeList recipes={recipes} />
        </div>
      </div>
    </PrivateLayout>
  );
}

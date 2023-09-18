"use client";

import RecipeList from "@/components/recipes/recipeList";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "@/hooks/recipeHooks";
import { useRouter } from "next/navigation";

export default function Recipes() {
  const router = useRouter();

  const {
    status,
    error,
    data: recipes,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  if (status === "loading") {
    return <p className="text-black">Loading</p>;
  }
  if (error === "error") {
    return <p className="text-black">{JSON.stringify(error)}</p>;
  }
  if (recipes?.status === "fail") {
    router.push("/login");
    return;
  }

  return (
    <PrivateLayout>
      <RecipeList recipes={recipes?.data.recipes} />
    </PrivateLayout>
  );
}

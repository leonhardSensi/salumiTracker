"use client";
import { useParams } from "next/navigation";
import { PrivateLayout } from "../../../components/PrivateLayout/privateLayout";
import RecipeDetails from "../../../components/recipes/recipeDetails";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "../../../api/recipeApi";

export default function Recipe() {
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
      {recipe ? (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-6xl my-8 h-fit font-serif text-wetSand">
            {recipe.title}
          </h1>

          {/* <div className="text-stone w-full h-fit justify-center overflow-auto rounded-xl bg-flesh z-10 shadow-2xl p-12 m-12"> */}
          <RecipeDetails {...recipe} />
        </div>
      ) : (
        // </div>
        <>
          {statusRecipe === "loading" && <p>Loading...</p>}
          {statusRecipe === "error" && <p>{JSON.stringify(errorRecipe)}</p>}
        </>
      )}
    </PrivateLayout>
  );
}

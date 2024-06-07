"use client";

import { getRecipe } from "../../../../api/recipeApi";
import EditRecipeInput from "../../../../components/generic/input/recipes/editRecipeInput";
import { PrivateLayout } from "../../../../components/privateLayout/PrivateLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
      {/* <div className="w-full flex flex-col items-center h-full justify-center my-16"> */}
      {/* <div className="py-16 w-2/3 rounded-lg"> */}
      {/* <div className="flex flex-col w-full h-full items-center"> */}
      <div className="flex flex-col items-center h-fit overflow-auto my-16 rounded-lg bg-salumeBlue mx-80 z-10 shadow-2xl">
        <h1 className="w-fit text-6xl text-salumeWhite border-b-salumeWhite border-b-4 border-double font-bold font-Montserrat mt-16">
          Edit Recipe
        </h1>
        <div className="py-16 w-2/3">
          {recipe && <EditRecipeInput recipeToEdit={recipe} />}
          {/* {recipe && <RecipeInput recipe={recipe} />} */}
        </div>
      </div>
    </PrivateLayout>
  );
}

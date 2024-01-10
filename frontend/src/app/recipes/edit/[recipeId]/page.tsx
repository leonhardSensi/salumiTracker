"use client";

import { getRecipe } from "@/api/recipeApi";
import EditRecipeInput from "@/components/generic/input/recipes/editRecipeInput";
import PrivateLayout from "@/components/privateLayout/privateLayout";
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
      <div className="w-full flex flex-col items-center h-full justify-center my-16">
        <div className="py-16 w-2/3 rounded-lg">
          {recipe && <EditRecipeInput recipe={recipe} />}
        </div>
      </div>
    </PrivateLayout>
  );
}

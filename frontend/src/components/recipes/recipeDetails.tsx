"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "@/api/recipeApi";
import { useParams } from "next/navigation";
import PrivateLayout from "../privateLayout/privateLayout";
import BackButton from "../generic/button/backButton";
import LoadingCard from "../generic/loading/loadingCard";
import LoadingSpinner from "../generic/loading/loadingSpinner";

export default function RecipeDetails() {
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
      <div>
        <BackButton />
        <div className="mx-16 flex flex-col items-center">
          {statusRecipe === "loading" && <LoadingSpinner />}
          {errorRecipe === "error" && (
            <p className="text-black">{JSON.stringify(errorRecipe)}</p>
          )}
          {recipe && (
            <>
              <Image
                width={200}
                height={200}
                src={`http://localhost:8000/recipes/${recipe.image}`}
                alt={"recipe image"}
                className="w-100 h-100 mb-8"
              />

              <h1 className="text-black text-4xl mb-2 h-fit">{recipe.title}</h1>
              <p className="text-black text-xl">
                Created on: {recipe.created_at}
              </p>

              <p className="text-black text-xl mt-16">{recipe.content}</p>
            </>
          )}
        </div>
      </div>
    </PrivateLayout>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "@/api/recipeApi";
import { useRouter, useParams } from "next/navigation";

export default function RecipeDetails() {
  const router = useRouter();
  const params = useParams();

  const {
    status: statusRecipe,
    error: errorRecipe,
    data: recipe,
  } = useQuery({
    queryKey: ["recipe", params.recipeId],
    queryFn: () => getRecipe(params.recipeId as string),
  });

  if (statusRecipe === "loading") return <p className="text-black">Loading</p>;
  if (errorRecipe === "error")
    return <p className="text-black">{JSON.stringify(errorRecipe)}</p>;

  return recipe ? (
    <div>
      <svg
        className="h-12"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <Link className="w-12" href="/recipes">
          <g>
            <path d="M8 12l6-6v12z" fill="#111827" fillOpacity={0.9} />
          </g>
        </Link>
      </svg>

      <div className="mx-16 flex flex-col items-center">
        <Image
          width={200}
          height={200}
          src={`http://localhost:8000/recipes/${recipe.image}`}
          alt={"recipe image"}
          className="w-100 h-100 mb-8"
        />

        <h1 className="text-black text-4xl mb-2 h-fit">{recipe.title}</h1>
        <p className="text-black text-xl">Created on: {recipe.created_at}</p>

        <p className="text-black text-xl mt-16">{recipe.content}</p>
      </div>
    </div>
  ) : (
    <p className="text-black">No access</p>
  );
}

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
        {/* {status === "loading" && (
          <div className="mb-16 w-full mx-16 grid grid-cols-2 gap-24 justify-items-center">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        )}
        {status === "error" && (
          <p className="text-black">{errorMessage.message}</p>
        )}
        {recipes && <RecipeList recipes={recipes} />} */}
        {/* <Link
          href={"/add_recipe"}
          className="flex items-center justify-center m-8 w-24 h-12 text-xl p-1 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
        >
          Create
        </Link> */}
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

import { Irecipe, IrecipeResponse } from "@/interfaces/interfaces";

export class SalumiError extends Error {}

export async function getRecipes(): Promise<Irecipe[]> {
  const response = await fetch("http://localhost:8000/api/recipes", {
    method: "GET",
    credentials: "include",
  });
  const responseData: IrecipeResponse = await response.json();
  if (responseData.status === "error") {
    throw new SalumiError("Oh no, could not get all the recipes");
  } else if (responseData.data) {
    return responseData.data.recipes;
  }
  return [];
}

export async function getRecipe(recipeId: string): Promise<Irecipe> {
  const response = await fetch(
    `http://localhost:8000/api/recipes/${recipeId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const responseData = await response.json();
  if (responseData.status === "error") {
    throw new SalumiError("Oh no, could not get this recipe");
  } else {
    return responseData.data.recipe;
  }
}

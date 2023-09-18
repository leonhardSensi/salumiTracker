import { IrecipeResponse } from "@/interfaces/interfaces";

export async function getRecipes() {
  const response = await fetch("http://localhost:8000/api/recipes", {
    method: "GET",
    credentials: "include",
  });
  const data: IrecipeResponse = await response.json();
  return data;
}

export async function getRecipe(recipeId: string) {
  if (typeof recipeId === "string") {
    const response = await fetch(
      `http://localhost:8000/api/recipes/${recipeId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  }
}

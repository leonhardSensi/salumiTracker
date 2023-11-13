import { submitRecipe } from "@/api/recipeApi";
import { IrecipeToCreate } from "@/interfaces/interfaces";
import { useMutation } from "@tanstack/react-query";

export const useRecipeMutation = () => {
  return useMutation({
    mutationFn: (recipe: IrecipeToCreate) => {
      return submitRecipe(
        recipe.title,
        recipe.cuts,
        recipe.spices,
        recipe.steps
      );
    },
  });
};

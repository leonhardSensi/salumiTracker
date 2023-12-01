import { submitRecipe, updateRecipe } from "@/api/recipeApi";
import { IrecipeToCreate, IrecipeToUpdate } from "@/interfaces/interfaces";
import { useMutation } from "@tanstack/react-query";

export const useRecipeMutation = () => {
  return useMutation({
    mutationFn: (recipe: IrecipeToCreate) => {
      return submitRecipe(
        recipe.title,
        recipe.curing,
        recipe.salting,
        recipe.drying,
        recipe.cuts,
        recipe.spices,
        recipe.steps
      );
    },
  });
};

export const useUpdateRecipeMutation = () => {
  return useMutation({
    mutationFn: (recipe: IrecipeToUpdate) => {
      return updateRecipe(
        recipe.id,
        recipe.title,
        recipe.cuts,
        recipe.spices,
        recipe.steps
      );
    },
  });
};

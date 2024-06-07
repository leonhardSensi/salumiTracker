import {
  addSalumeImage,
  deleteSalume,
  submitSalume,
  updateSalumeRating,
  updateSalumeState,
} from "@/api/salumeApi";
import {
  ISalumeToCreate,
  ISalume,
  ISalumeToUpdate,
} from "@/interfaces/interfaces";
import { useMutation } from "@tanstack/react-query";

export const useSalumeMutation = () => {
  return useMutation({
    mutationFn: (salume: ISalumeToCreate) => {
      return submitSalume(
        salume.name,
        salume.recipeId,
        salume.notes,
        salume.state
      );
    },
  });
};

export const useUpdateSalumeStateMutation = () => {
  return useMutation({
    mutationFn: (salume: ISalumeToUpdate) => {
      return updateSalumeState(
        salume.id,
        salume.name,
        salume.notes,
        salume.recipeId,
        salume.state
      );
    },
  });
};

export const useAddSalumeImageMutation = () => {
  return useMutation({
    mutationFn: (salume: ISalumeToUpdate) => {
      return addSalumeImage(
        salume.id,
        salume.name,
        salume.notes,
        // salume.recipeId,
        salume.state,
        salume.image
      );
    },
  });
};

export const useUpdateSalumeRatingMutation = () => {
  return useMutation({
    mutationFn: (salume: ISalume) => {
      return updateSalumeRating(salume.id, salume.rating);
    },
  });
};

export const useDeleteSalumeMutation = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return deleteSalume(id);
    },
  });
};

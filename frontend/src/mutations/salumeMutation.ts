import {
  deleteSalume,
  submitSalume,
  updateSalumeRating,
  updateSalumeState,
} from "../api/salumeApi";
import {
  ISalumeToCreate,
  ISalume,
  ISalumeToUpdate,
} from "../interfaces/interfaces";
import { useMutation } from "@tanstack/react-query";

export const useSalumeMutation = () => {
  return useMutation({
    mutationFn: (salume: ISalumeToCreate) => {
      return submitSalume(
        salume.name,
        salume.recipeId,
        salume.notes,
        salume.state,
        salume.startWeight
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

export const useAddSalumeImageMutation = () =>
  useMutation(
    async ({
      salumeId,
      formData,
    }: {
      salumeId: string;
      formData: FormData;
    }) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/salume/${salumeId}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );
    }
  );

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

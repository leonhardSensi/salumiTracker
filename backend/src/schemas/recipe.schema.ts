import { object, string, TypeOf } from "zod";

export const createRecipeSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    content: string({
      required_error: "Content is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
  }),
});

const params = {
  params: object({
    recipeId: string(),
  }),
};

export const getRecipeSchema = object({
  ...params,
});

export const updateRecipeSchema = object({
  ...params,
  body: object({
    title: string(),
    content: string(),
    image: string(),
  }).partial(),
});

export const deleteRecipeSchema = object({
  ...params,
});

export type CreateRecipeInput = TypeOf<typeof createRecipeSchema>["body"];
export type GetRecipeInput = TypeOf<typeof getRecipeSchema>["params"];
export type UpdateRecipeInput = TypeOf<typeof updateRecipeSchema>;
export type DeleteRecipeInput = TypeOf<typeof deleteRecipeSchema>["params"];

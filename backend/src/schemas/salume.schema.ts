import { object, string, TypeOf } from "zod";

const params = {
  params: object({
    salumeId: string(),
  }),
};

export const createSalumeSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    notes: string({
      required_error: "Notes are required",
    }),
    recipeId: string({
      required_error: "Recipe ID is required",
    }),
    state: string({
      required_error: "State is required",
    }),
  }),
});

// Cannot use this schema for file upload?
export const updateSalumeSchema = object({
  body: object({
    id: string({
      required_error: "ID is required",
    }),
    name: string({
      required_error: "Name is required",
    }),
    notes: string({
      required_error: "Notes are required",
    }),
    recipeId: string({
      required_error: "Recipe ID is required",
    }),
    state: string({
      required_error: "State is required",
    }),
    image: string(),
  }),
});

export const deleteSalumeSchema = object({
  ...params,
});

export type DeleteSalumeInput = TypeOf<typeof deleteSalumeSchema>["params"];

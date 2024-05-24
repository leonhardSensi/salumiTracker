import { number, object, string, TypeOf } from "zod";

const params = {
  params: object({
    cutId: string(),
  }),
};

export const createCutSchema = object({
  body: object({
    id: string(),
    name: string({
      required_error: "Name is required",
    }),
    quantity: number({
      required_error: "Quantity is required",
    }),
  }),
});

export const getCutSchema = object({
  ...params,
});

export type CreateCutInput = TypeOf<typeof createCutSchema>["body"];

export type GetCutInput = TypeOf<typeof getCutSchema>["params"];

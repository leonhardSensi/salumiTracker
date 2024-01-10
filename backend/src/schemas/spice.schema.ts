import { number, object, string, TypeOf } from "zod";

const params = {
  params: object({
    spiceId: string(),
  }),
};

export const createSpiceSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    quantity: number({
      required_error: "Quantity is required",
    }),
  }),
});

export const getSpiceSchema = object({
  ...params,
});

export type CreateSpiceInput = TypeOf<typeof createSpiceSchema>["body"];

export type GetSpiceInput = TypeOf<typeof getSpiceSchema>["params"];

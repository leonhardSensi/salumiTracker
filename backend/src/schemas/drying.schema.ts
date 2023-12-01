import { number, object, string, TypeOf } from "zod";

const params = {
  params: object({
    dryingId: string(),
  }),
};

export const createDryingSchema = object({
  body: object({
    state: string({
      required_error: "State is required",
    }),
    duration: number({
      required_error: "Duration is required",
    }),
  }),
});

export const getDryingSchema = object({
  ...params,
});

export type CreateCutInput = TypeOf<typeof createDryingSchema>["body"];

export type GetCutInput = TypeOf<typeof getDryingSchema>["params"];

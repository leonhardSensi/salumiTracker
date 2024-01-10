import { boolean, number, object, string, TypeOf } from "zod";

const params = {
  params: object({
    curingId: string(),
  }),
};

export const createCuringSchema = object({
  body: object({
    state: boolean({
      required_error: "State is required",
    }),
    duration: number({
      required_error: "Duration is required",
    }),
  }),
});

export const getCuringSchema = object({
  ...params,
});

export type CreateCutInput = TypeOf<typeof createCuringSchema>["body"];

export type GetCutInput = TypeOf<typeof getCuringSchema>["params"];

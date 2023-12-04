import { boolean, number, object, string, TypeOf } from "zod";

const params = {
  params: object({
    saltingId: string(),
  }),
};

export const createSaltingSchema = object({
  body: object({
    state: boolean({
      required_error: "State is required",
    }),
    duration: number({
      required_error: "Duration is required",
    }),
  }),
});

export const getSaltingSchema = object({
  ...params,
});

export type CreateCutInput = TypeOf<typeof createSaltingSchema>["body"];

export type GetCutInput = TypeOf<typeof getSaltingSchema>["params"];

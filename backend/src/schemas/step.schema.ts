import { number, object, string, TypeOf } from "zod";

const params = {
  params: object({
    stepId: string(),
  }),
};

export const createStepSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
    duration: number({
      required_error: "Duration is required",
    }),
    status: string({
      required_error: "Status is required",
    }),
    statusDuration: number({
      required_error: "Status duration is required",
    }),
  }),
});

export const getStepSchema = object({
  ...params,
});

export type CreateStepInput = TypeOf<typeof createStepSchema>["body"];

export type GetStepInput = TypeOf<typeof getStepSchema>["params"];

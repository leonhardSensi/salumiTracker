import { array, boolean, number, object, string, TypeOf } from "zod";

export const createRecipeSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    curing: object({
      state: boolean({ required_error: "Status is required" }),
      duration: number({ required_error: "Duration is required" }),
    }),
    salting: object({
      state: boolean({ required_error: "Status is required" }),
      duration: number({ required_error: "Duration is required" }),
    }),
    drying: object({
      state: boolean({ required_error: "Status is required" }),
      duration: number({ required_error: "Duration is required" }),
    }),
    // content: string({
    //   required_error: "Content is required",
    // }),
    // image: string({
    //   required_error: "Image is required",
    // }),
  }),
});

//Already changed but still causes errors

// export const createRecipeSchema = object({
//   body: object({
//     name: string({
//       required_error: "Name is required",
//     }),
//     meats: array(
//       object({
//         cut: string({
//           required_error: "Cut is required",
//         }),
//         quantity: string({
//           required_error: "Quantity is required",
//         }),
//       })
//     ),
//     spices: array(
//       object({
//         spice: string({
//           required_error: "Spice is required",
//         }),
//         quantity: string({
//           required_error: "Quantity is required",
//         }),
//       })
//     ),
//     steps: array(
//       object({
//         name: string({
//           required_error: "Name is required",
//         }),
//         description: string({
//           required_error: "Description is required",
//         }),
//         duration: string({
//           required_error: "Duration is required",
//         }),
//       })
//     ),
//   }),
// });

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
  // body: object({
  //   title: string(),
  //   content: string(),
  //   image: string(),
  // }).partial(),
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    curing: object({
      state: boolean({ required_error: "Status is required" }),
      duration: number({ required_error: "Duration is required" }),
    }),
    salting: object({
      state: boolean({ required_error: "Status is required" }),
      duration: number({ required_error: "Duration is required" }),
    }),
    drying: object({
      state: boolean({ required_error: "Status is required" }),
      duration: number({ required_error: "Duration is required" }),
    }),
    cuts: array(
      object({
        // id: string(),
        name: string({ required_error: "Name is required" }),
        quantity: number({ required_error: "Quantity is required" }),
      })
    ),
    spices: array(
      object({
        // id: string(),
        name: string({ required_error: "Name is required" }),
        quantity: number({ required_error: "Quantity is required" }),
      })
    ),
    steps: array(
      object({
        // id: string(),
        name: string({ required_error: "Name is required" }),
        duration: number({ required_error: "Quantity is required" }),
      })
    ),

    // content: string({
    //   required_error: "Content is required",
    // }),
    // image: string({
    //   required_error: "Image is required",
    // }),
  }),
});

export const deleteRecipeSchema = object({
  ...params,
});

export type CreateRecipeInput = TypeOf<typeof createRecipeSchema>["body"];
export type GetRecipeInput = TypeOf<typeof getRecipeSchema>["params"];
export type UpdateRecipeInput = TypeOf<typeof updateRecipeSchema>;
export type DeleteRecipeInput = TypeOf<typeof deleteRecipeSchema>["params"];

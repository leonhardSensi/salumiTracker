import {
  ICut,
  IItem,
  IItemToEdit,
  Irecipe,
  IrecipeResponse,
  IrecipeState,
  ISpice,
  IStep,
} from "../interfaces/interfaces";
const backend = process.env.BACKEND;

export class RecipeError extends Error {}

export async function getRecipes(): Promise<Irecipe[]> {
  const response = await fetch(`${backend}/api/recipes`, {
    method: "GET",
    credentials: "include",
  });
  const responseData: IrecipeResponse = await response.json();
  if (responseData.status === "error") {
    throw new RecipeError("Oh no, could not get all the recipes");
  } else if (responseData.data) {
    return responseData.data.recipes;
  }
  return [];
}

export async function getRecipe(
  recipeId?: string
): Promise<Irecipe | undefined> {
  if (recipeId) {
    const response = await fetch(`${backend}/api/recipes/${recipeId}`, {
      method: "GET",
      credentials: "include",
    });
    const responseData = await response.json();
    if (responseData.status === "error") {
      throw new RecipeError("Oh no, could not get this recipe");
    } else if (responseData.data) {
      return responseData.data.recipe;
    }
  } else {
    throw new RecipeError("Could not get recipe");
  }
}

export async function submitRecipe(
  name: string,
  curing: IrecipeState,
  salting: IrecipeState,
  drying: IrecipeState,
  cuts: IItem[],
  spices: IItem[],
  steps: IItem[]
) {
  if (cuts && spices && steps) {
    const submitCuts: ICut[] = [];
    cuts.forEach(
      (cut) =>
        cut.quantity &&
        submitCuts.push({ name: cut.name, quantity: cut.quantity })
    );
    let submitSpices: ISpice[] = [];
    spices.forEach(
      (spice) =>
        spice.quantity &&
        submitSpices.push({ name: spice.name, quantity: spice.quantity })
    );

    let submitSteps: IStep[] = [];
    steps.forEach((step) =>
      submitSteps.push({
        name: step.name,
        description: step.description,
        duration: step.duration,
        status: step.status,
        statusDuration: step.statusDuration,
      })
    );

    const response = await fetch(`${backend}/api/recipes`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: name,
        curing: curing,
        salting: salting,
        drying: drying,
        cuts: submitCuts,
        spices: submitSpices,
        steps: submitSteps,
      }),
    });
    return response;
  }
}

export const updateRecipe = async (
  id: string,
  name: string,
  curing: IrecipeState,
  salting: IrecipeState,
  drying: IrecipeState,
  cuts: IItemToEdit[],
  spices: IItemToEdit[],
  steps: IItemToEdit[]
) => {
  if (cuts && spices && steps) {
    const submitCuts: ICut[] = [];
    cuts.map(
      (cut) =>
        cut.quantity &&
        submitCuts.push({ id: cut.id, name: cut.name, quantity: cut.quantity })
    );
    let submitSpices: ISpice[] = [];
    spices.map(
      (spice) =>
        spice.quantity &&
        submitSpices.push({
          id: spice.id,
          name: spice.name,
          quantity: spice.quantity,
        })
    );

    let submitSteps: IStep[] = [];
    steps.map((step) =>
      submitSteps.push({
        id: step.id,
        name: step.name,
        description: step.description,
        duration: step.duration,
        status: step.status,
        statusDuration: step.statusDuration,
      })
    );

    try {
      const response = await fetch(`${backend}/api/recipes/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: name,
          curing: curing,
          salting: salting,
          drying: drying,
          cuts: submitCuts,
          spices: submitSpices,
          steps: submitSteps,
        }),
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export const deleteRecipe = async (id: string) => {
  const response = await fetch(`${backend}/api/recipes/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    credentials: "include",
  });
  console.log(response);

  return response;
};

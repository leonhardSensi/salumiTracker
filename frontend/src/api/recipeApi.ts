import {
  ICut,
  IItem,
  Irecipe,
  IrecipeResponse,
  IrecipeState,
  ISpice,
  IStep,
} from "@/interfaces/interfaces";

export class SalumiError extends Error {}

export async function getRecipes(): Promise<Irecipe[]> {
  const response = await fetch("http://localhost:8000/api/recipes", {
    method: "GET",
    credentials: "include",
  });
  const responseData: IrecipeResponse = await response.json();
  if (responseData.status === "error") {
    throw new SalumiError("Oh no, could not get all the recipes");
  } else if (responseData.data) {
    return responseData.data.recipes;
  }
  return [];
}

export async function getRecipe(recipeId: string): Promise<Irecipe> {
  const response = await fetch(
    `http://localhost:8000/api/recipes/${recipeId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const responseData = await response.json();
  if (responseData.status === "error") {
    throw new SalumiError("Oh no, could not get this recipe");
  } else {
    return responseData.data.recipe;
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
    steps.forEach(
      (step) =>
        step.description &&
        step.duration &&
        submitSteps.push({
          name: step.name,
          description: step.description,
          duration: step.duration,
        })
    );

    console.log(curing, salting, drying);

    const response = await fetch("http://localhost:8000/api/recipes", {
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
  cuts: IItem[],
  spices: IItem[],
  steps: IItem[]
) => {
  if (cuts && spices && steps) {
    const submitCuts: ICut[] = [];
    cuts.map(
      (cut) =>
        cut.quantity &&
        submitCuts.push({ name: cut.name, quantity: cut.quantity })
    );
    let submitSpices: ISpice[] = [];
    spices.map(
      (spice) =>
        spice.quantity &&
        submitSpices.push({ name: spice.name, quantity: spice.quantity })
    );

    let submitSteps: IStep[] = [];
    steps.map(
      (step) =>
        step.description &&
        step.duration &&
        submitSteps.push({
          name: step.name,
          description: step.description,
          duration: step.duration,
        })
    );
    const response = await fetch(`http://localhost:8000/api/recipes/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: name,
        cuts: submitCuts,
        spices: submitSpices,
        steps: submitSteps,
      }),
    });
    return response;
  }
};

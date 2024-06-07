import { ISalume } from "../interfaces/interfaces";
const backend = process.env.BACKEND;

export async function getSalumi(): Promise<ISalume[]> {
  const response = await fetch(`${backend}/api/salume`, {
    method: "GET",
    credentials: "include",
  });
  const responseData = await response.json();
  if (responseData.status === "error") {
    throw new Error("Oh no, could not get all the Salumi");
  } else if (responseData.data) {
    return responseData.data.salumi;
  }
  return [];
}

export async function getSalume(id: string): Promise<ISalume> {
  const response = await fetch(`${backend}/api/salume/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const responseData = await response.json();
  if (responseData.data) {
    return responseData.data.salume;
  } else {
    throw new Error("Oh no, could not find the requested Salume");
  }
  // if (responseData.status === "error") {
  //   throw new Error("Oh no, could not find the requested Salume");
  // } else if (responseData.data) {
  //   return responseData.data.salume;
  // }

  // id: "",
  // name: "",
  // recipe: "",
  // notes: "",
  // state: "",
  // created_at: "",
  // updated_at: "",
  // image: "",
  // rating: 0,
}

export async function submitSalume(
  name: string,
  recipeId: string,
  notes: string,
  state: string
) {
  const response = await fetch(`${backend}/api/salume`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      name,
      recipeId,
      notes,
      state,
    }),
  });
  return response;
}

export async function updateSalumeState(
  id: string,
  name: string,
  notes: string,
  recipeId: string,
  state: string
) {
  const response = await fetch(`${backend}/api/salume/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      id,
      name,
      notes,
      recipeId,
      state,
    }),
  });
  return response;
}

export async function addSalumeImage(
  id: string,
  name: string,
  notes: string,
  // recipeId: string,
  state: string,
  image?: File
) {
  if (image) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("notes", notes);
    // formData.append("recipeId", recipeId);
    formData.append("state", state);
    formData.append("image", image);

    const response = await fetch(`${backend}/api/salume/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });
    return response;
  }
}

export async function updateSalumeRating(id: string, rating: number) {
  const response = await fetch(`${backend}/api/salume/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      id,
      rating,
    }),
  });
  return response;
}

export async function deleteSalume(id: string) {
  const response = await fetch(`${backend}/api/salume/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    credentials: "include",
  });

  return response;
}

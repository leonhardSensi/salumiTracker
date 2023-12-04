import { IresponseData } from "@/interfaces/interfaces";

export class UserError extends Error {}

export async function getUser() {
  const response = await fetch("http://localhost:8000/api/users/me", {
    method: "GET",
    credentials: "include",
  });
  const responseData: IresponseData = await response.json();
  if (responseData.status === "error") {
    throw new UserError("Oh no, could not get the requested user information!");
  } else if (responseData.data) {
    return responseData.data.user;
  }
}

export async function login(email: string, password: string) {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return response;
}

export async function refresh(email: string, password: string) {
  const response = await fetch("http://localhost:8000/api/auth/refresh", {
    method: "GET",
    credentials: "include",
  });
  return response;
}

export async function logout() {
  const response = await fetch("http://localhost:8000/api/auth/logout", {
    method: "GET",
    credentials: "include",
  });
  return response;
}

export async function register(
  name: string,
  email: string,
  dateOfBirth: string,
  password: string,
  passwordConfirm: string
) {
  const response = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      dateOfBirth,
      password,
      passwordConfirm,
    }),
  });
  return response;
}

export async function updateUser(
  name: string,
  email: string,
  date_of_birth: string,
  password: string
) {
  console.log(date_of_birth);
  const response = await fetch("http://localhost:8000/api/users/update", {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      date_of_birth,
      password,
    }),
  });
  return response;
}

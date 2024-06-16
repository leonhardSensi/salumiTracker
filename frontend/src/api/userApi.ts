import { cookies } from "next/dist/client/components/headers";
import { IresponseData } from "../interfaces/interfaces";
import * as cookie from "js-cookie";

export class UserError extends Error {}

export async function getUser() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/users/me`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const responseData: IresponseData = await response.json();
  if (responseData.status === "error") {
    throw new UserError("Oh no, could not get the requested user information!");
  } else if (responseData.data) {
    return responseData.data.user;
  }
}

export async function login(email: string, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/login`,
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
  return response;
}

export async function refresh() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/refresh`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return response;
}

export async function logout() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/logout`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return response;
}

export async function register(
  name: string,
  email: string,
  dateOfBirth: string,
  password: string,
  passwordConfirm: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/register`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        dateOfBirth,
        password,
        passwordConfirm,
      }),
    }
  );
  return response;
}

export async function updateUser(
  name?: string,
  email?: string,
  date_of_birth?: string,
  password?: string,
  photo?: File
) {
  if (photo) {
    const formData = new FormData();
    formData.append("photo", photo);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/users/update`,
      {
        method: "PATCH",
        credentials: "include",
        body: formData,
      }
    );
    return response;
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/users/update`,
    {
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
        photo,
      }),
    }
  );
  return response;
}

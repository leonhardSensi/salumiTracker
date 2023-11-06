import { IresponseData } from "@/interfaces/interfaces";
import React from "react";

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

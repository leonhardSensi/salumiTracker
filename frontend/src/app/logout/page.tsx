"use client";
import { useEffect } from "react";

export default function Logout() {
  const logout = async () => {
    const response = await fetch("http://localhost:8000/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    if (data.status) {
      sessionStorage.clear();
      location.href = "/login";
    } else {
      location.href = "/dashboard";
    }
  };

  useEffect(() => {
    logout();
  }, []);
}

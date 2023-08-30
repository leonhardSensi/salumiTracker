"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      const response = await fetch("http://localhost:8000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (data.status) {
        sessionStorage.clear();
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
    };

    logout();
  }, []);
}

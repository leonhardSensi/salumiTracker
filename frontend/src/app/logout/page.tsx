"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutPage from "@/components/authentication/logoutPage";
import PublicLayout from "@/components/publicLayout/publicLayout";

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
      } else {
        router.push("/dashboard");
      }
    };
    logout();
  }, []);
  return (
    <PublicLayout>
      <LogoutPage />
    </PublicLayout>
  );
}

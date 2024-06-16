"use client";
import LogoutPage from "../../components/authentication/logoutPage";
import { PublicLayout } from "../../components/PublicLayout/publicLayout";
import { useQuery } from "@tanstack/react-query";
import { logout } from "../../api/userApi";
import { useEffect } from "react";

export default function Logout() {
  const {
    status,
    error: errorMessage,
    data: response,
  } = useQuery({
    queryKey: ["user"],
    queryFn: logout,
  });

  useEffect(() => {
    document.cookie =
      "logged_in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  return (
    <PublicLayout>
      <LogoutPage />
    </PublicLayout>
  );
}

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

  return (
    <PublicLayout>
      <LogoutPage />
    </PublicLayout>
  );
}

"use client";

import "../../app/globals.css";
import Navbar from "@/components/navigation/navbar";
import Sidebar from "@/components/navigation/sidebar";
import { getUser } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    status: statusUser,
    error: errorMessage,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-col w-full flex">
        <Navbar user={user} />
        {children}
      </div>
    </div>
  );
}

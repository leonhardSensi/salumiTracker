"use client";

import "../../app/globals.css";
import Navbar from "@/components/navigation/navbar";
import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "@/components/navigation/sidebar";
import {
  IresponseData,
  IprofileData,
  Iuser,
} from "../../interfaces/interfaces";
import { useRouter, usePathname } from "next/navigation";
import { UserError, getUser } from "@/api/userApi";
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

"use client";

import "../../app/globals.css";
import Navbar from "@/components/navigation/navbar";
import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "@/components/navigation/sidebar";
import { IresponseData, IprofileData } from "../../interfaces/interfaces";
import { useRouter, usePathname } from "next/navigation";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profileData, setProfileData] = useState<IprofileData>();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch("http://localhost:8000/api/users/me", {
        method: "GET",
        credentials: "include",
      });
      const data: IresponseData = await response.json();
      if (data.status) {
        setProfileData(data.data);
        sessionStorage.setItem("email", data.data.user.email);
        sessionStorage.setItem("name", data.data.user.name);
      } else {
        console.log("request failed");
        router.push("/login");
      }
    };
    if (document.cookie.includes("logged_in=true")) {
      getProfile();
    } else if (pathname !== "/login") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-col w-full flex">
        <Navbar person={profileData} />
        {children}
      </div>
    </div>
  );
}

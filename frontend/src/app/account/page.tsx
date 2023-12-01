"use client";

import { getUser } from "@/api/userApi";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Account() {
  const { data } = useQuery(["user"], getUser);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const setModalVisibility = (visibility: boolean) => {
    setIsModalOpen(visibility);
  };

  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      const modal = document.getElementById("crud-modal");
      // even if typecasting should be avoided, can i use it here?
      if (modal && !modal.contains(event.target as Node)) {
        setModalVisibility(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <PrivateLayout>
      <>
        <div className="ml-32">
          <div>
            <h1 className="text-black text-4xl my-16 h-fit">
              Account Settings
            </h1>
          </div>
          <div className="flex ml-16">
            <h2 className="text-black text-2xl h-fit">Salumi ID</h2>
            <div className="ml-16">
              <p className="text-black text-xl">
                {data ? data.email : "loading..."}
              </p>
              <Link
                className="text-blue-700 w-fit mt-4 text-xl hover:underline"
                href={"/account/manage"}
              >
                {"Manage Salumi ID >"}
              </Link>
            </div>
          </div>
        </div>
      </>
    </PrivateLayout>
  );
}

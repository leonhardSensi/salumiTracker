"use client";

import { getUser } from "@/api/userApi";
import SubmitButton from "@/components/generic/button/submitButton";
import UserInput from "@/components/generic/input/userInput";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Account() {
  const { data } = useQuery(["user"], getUser);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [name, setName] = useState(data ? data.name : "");
  const [email, setEmail] = useState(data ? data.email : "");

  const setModalVisibility = (visibility: boolean) => {
    setIsModalOpen(visibility);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    if (event.target.id === "name") {
      setName(event.target.value);
      console.log(name);
    } else if (event.target.id === "email") {
      setEmail(event.target.value);
      console.log(email);
    }
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

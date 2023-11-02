"use client";

import { getUser } from "@/api/userApi";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { QueryCache, useQuery } from "@tanstack/react-query";
import { Days_One } from "next/font/google";
import { useEffect, useState } from "react";

export default function Account() {
  const { data } = useQuery(["user"], getUser);

  // useEffect(() => {
  //   const email = sessionStorage.getItem("email");
  //   const name = sessionStorage.getItem("name");

  //   if (email && name) {
  //     setEmail(email);
  //     setName(name);
  //   }
  // }, []);

  return (
    <PrivateLayout>
      <div className="">
        <h1 className="text-black text-4xl m-16 h-fit">Account Details</h1>

        <p className="text-black text-xl ml-16">
          Name: {data ? data.name : "loading..."}
        </p>
        <p className="text-black text-xl ml-16">
          {" "}
          Email: {data ? data.email : "loading..."}
        </p>
        <p className="text-black text-xl ml-16">
          User since: {data ? data.created_at.slice(0, 10) : "loading..."}
        </p>
      </div>
    </PrivateLayout>
  );
}

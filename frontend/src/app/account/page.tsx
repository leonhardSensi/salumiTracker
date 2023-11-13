"use client";

import { getUser } from "@/api/userApi";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";

export default function Account() {
  const { data } = useQuery(["user"], getUser);

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

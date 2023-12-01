"use client";

import { getUser } from "@/api/userApi";
import ManageAccount from "@/components/authentication/manage";
import { useQuery } from "@tanstack/react-query";

export default function Manage() {
  const { data } = useQuery(["user"], getUser);

  return (
    <ManageAccount
      titles={["Name", "Date of birth"]}
      imgSrcs={["/account.svg", "/calendar.svg"]}
      data={[data ? data.name : "", data ? data.formattedDateOfBirth : ""]}
    />
  );
}

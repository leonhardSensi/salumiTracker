"use client";

import { getUser } from "@/api/userApi";
import ManageAccount from "@/components/authentication/manage";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";

export default function Security() {
  const { data } = useQuery(["user"], getUser);

  return (
    <ManageAccount
      titles={["Email", "Password"]}
      imgSrcs={["/email.svg", "/password.svg"]}
      data={[
        data ? data.email : "",
        data ? `Last updated: ${formatDate(data.updated_at)}` : "",
      ]}
    />
  );
}

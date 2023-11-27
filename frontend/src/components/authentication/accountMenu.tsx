"use client";

import { getUser } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AccountMenu() {
  const { data } = useQuery(["user"], getUser);

  const pathname = usePathname();

  const checkActive = (activeTab: string, startTab?: string) => {
    return pathname === `${activeTab}` || pathname === startTab;
  };

  return (
    <div className="flex flex-col">
      {data && (
        <div className="flex flex-col">
          <div className="flex">
            <div className="flex flex-col ml-16 w-full">
              <div className="text-black my-16 relative">
                <div className="cursor-pointer relative group border rounded-full bg-black mb-6 w-fit">
                  <Image
                    width={100}
                    height={100}
                    src={"/defaultProfile.svg"}
                    alt="profile picture"
                    className="border rounded-full profile-picture transition-opacity duration-300 ease-in-out group-hover:opacity-40"
                  />
                  <div className="overlay absolute inset-0 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <p className="text-white">Edit</p>
                  </div>
                </div>

                <p className="text-xl font-semibold mb-2">{data.name}</p>
                <p className="text-xl">{data.email}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-16">
            <Link
              className={`${
                checkActive(
                  "/account/manage/section/information",
                  "/account/manage"
                )
                  ? "text-blue-500 text-2xl"
                  : "text-black text-xl hover:text-blue-500"
              }`}
              href={"/account/manage/section/information"}
            >
              Personal Information
            </Link>
            <Link
              className={`${
                checkActive("/account/manage/section/security")
                  ? "text-blue-500 text-2xl "
                  : "text-black text-xl hover:text-blue-500"
              }`}
              href={"/account/manage/section/security"}
            >
              Sign-In and Security
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

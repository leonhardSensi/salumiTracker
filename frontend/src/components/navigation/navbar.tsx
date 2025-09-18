"use client";
import { Iuser } from "../../interfaces/interfaces";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "../../api/userApi";
import { useRecoilState } from "recoil";
import { updateUserData } from "../../atoms/userAtoms";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const { data: user } = useQuery(["user"], getUser);

  const [updatedUser, setUpdatedUser] = useRecoilState(updateUserData);
  const [userData, setUserData] = useState<Iuser | undefined>(user && user);

  const fetchUser = async () => {
    const data = await getUser();
    if (data) {
      setUserData(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [updatedUser]);

  return (
    <nav className="bg-wetSand bg-opacity-80 w-full z-20 text-eggshell">
      <div className="flex items-center justify-between px-8 h-24">
        <div className="flex space-x-4">
          <Link href="/home">
            <Image
              width={100}
              height={100}
              className="h-16 w-auto"
              src="/salami.svg"
              alt="Salumi Tracker Logo"
            />
          </Link>
          <div className="flex flex-col font-serif">
            <h1 className="text-4xl">SALUMI</h1>
            <h1 className="text-3xl">TRACKER</h1>
          </div>
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userData ? (
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl">Hi, {userData.name}</h1>

              <div className="relative w-[60px] h-[60px]">
                <Link href="/account">
                  <Image
                    width={60}
                    height={60}
                    src={`${process.env.NEXT_PUBLIC_BACKEND}/profilePictures/${userData.photo}`}
                    alt="profile picture"
                    className="border rounded-full object-cover"
                  />

                  <Image
                    width={20}
                    height={20}
                    src="/settings.svg"
                    alt="settings icon"
                    className="absolute bottom-1.5 -right-2 border border-white rounded-full bg-white"
                  />
                </Link>
              </div>

              <Link href="/logout">
                <Image
                  width={40}
                  height={40}
                  src="/logout.svg"
                  alt="logout icon"
                  className="invert"
                />
              </Link>
            </div>
          ) : (
            <h1 className="text-2xl">Failed to fetch Account</h1>
          )}
        </div>
      </div>
    </nav>
  );
}

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

  // const pathname = usePathname();
  // const [nav, setNav] = useState(false);
  const [updatedUser, setUpdatedUser] = useRecoilState(updateUserData);
  const [userData, setUserData] = useState<Iuser | undefined>(user && user);

  // const navItems = [
  //   { id: 1, text: "Home", href: "home" },
  //   { id: 2, text: "Dashboard", href: "dashboard" },
  //   { id: 3, text: "Recipes", href: "recipes" },
  //   { id: 4, text: "New Recipe", href: "add_recipe" },
  //   { id: 5, text: "Salumi", href: "salumi/completed" },
  //   { id: 6, text: "New Salume", href: "add_salume" },
  // ];

  const fetchUser = async () => {
    const data = await getUser();
    if (data) {
      setUserData(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [updatedUser]);

  // const handleNav = () => {
  //   setNav(!nav);
  // };

  // const checkActive = (tabId: string) => {
  //   return pathname === `/${tabId}`;
  // };

  return (
    <nav className="bg-wetSand bg-opacity-80 w-full z-20 text-eggshell">
      <div className="flex items-center justify-between px-8 h-24">
        <div className="flex space-x-4">
          <Link href="/">
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
        {/* <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 text-xl h-full"
          id="navbar-sticky"
        >
          <ul className="h-full flex flex-col md:p-0 font-medium border rounded-lg rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {navItems.map((navItem) => (
              <li key={`navTab-${navItem.text}`}>
                <Link
                  href={`/${navItem.href}`}
                  className={`${
                    checkActive(navItem.href)
                      ? "bg-wetSand text-eggshell"
                      : "text-stone"
                  } w-full h-full px-4 hover:bg-wetSand hover:text-eggshell transition-colors duration-200 flex items-center justify-center`}
                  aria-current="page"
                >
                  {navItem.text}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userData ? (
            <div className="flex items-center space-x-4">
              {/* <div className="relative group inline-block text-2xl w-fit">
                <button className="flex flex-row group-hover:bg-flesh group-hover:text-stone py-2 px-4 rounded-t-md transition-colors">
                  {<h1>Hi, {userData.name}</h1>}
                  <svg
                    className="group-hover:-rotate-180 w-4 h-6 ml-2 transition-all duration-300 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    }
                  </svg>
                </button>
                <div className="hidden group-hover:block absolute bg-flesh py-2 px-3 rounded-b-md shadow-lg z-20 ease-in-out transition-all duration-300 w-full">
                  <Link
                    className="block whitespace-nowrap py-1 px-2 text-lg text-nowrap text-stone hover:bg-wetSand hover:text-eggshell rounded-md"
                    href="/account"
                  >
                    My Account
                  </Link>
                  <Link
                    className="block py-1 px-2 text-lg text-stone hover:bg-wetSand hover:text-eggshell rounded-md"
                    href="/logout"
                  >
                    Logout
                  </Link>
                </div>
              </div> */}
              <h1 className="text-2xl">Hi, {userData.name}</h1>
              <Image
                width={60}
                height={60}
                src={`${process.env.NEXT_PUBLIC_BACKEND}/profilePictures/${userData.photo}`}
                alt="profile picture"
                className="border rounded-full"
              />
              <Link href={"/account"}>
                <Image
                  width={40}
                  height={40}
                  src={"/settings.svg"}
                  alt="settings icon"
                  className="invert"
                />
              </Link>
              <Link href={"/logout"}>
                <Image
                  width={40}
                  height={40}
                  src={"/logout.svg"}
                  alt="logout icon"
                  className="invert"
                />
              </Link>
            </div>
          ) : (
            <h1 className="text-2xl">Failed to fetch Account</h1>
          )}
        </div>
        {/* <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-sticky"
          aria-expanded="false"
          onClick={handleNav}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button> */}
      </div>
      {/* <div className={`${nav ? "block absolute w-full" : "hidden"} lg:hidden`}>
        <ul className="h-full flex flex-col md:p-0 font-medium border rounded-b-lg bg-white rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-lg">
          {navItems.map((navItem) => (
            <li key={`navTab-${navItem.text}`}>
              <Link
                href={`/${navItem.href}`}
                className={`${
                  checkActive(navItem.href)
                    ? "bg-salumeBlue text-salumeWhite"
                    : ""
                } text-black w-full h-full py-4 hover:bg-salumeBlue hover:text-salumeWhite transition-colors duration-200 flex items-center justify-center`}
                aria-current="page"
              >
                {navItem.text}
              </Link>
            </li>
          ))}
        </ul>
      </div> */}
    </nav>
  );
}

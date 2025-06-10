import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HomeIcon from "./Icons/homeIcon";
import DashboardIcon from "./Icons/dashboardIcon";
import RecipesIcon from "./Icons/recipesIcon";
import AddRecipeIcon from "./Icons/addRecipeIcon";
import AddSalume from "./Icons/addSalumeIcon";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { getUser } from "../../api/userApi";
import { updateUserData } from "../../atoms/userAtoms";
import { Iuser } from "../../interfaces/interfaces";

export default function Sidebar() {
  const pathname = usePathname();

  const checkActive = (tabId: string) => {
    return pathname === `/${tabId}`;
  };

  return (
    <aside className="w-96 bg-flesh flex flex-col items-center pt-2 pb-2 space-y-7 text-2xl">
      {/* <Link href="/home">
        <Image
          width={100}
          height={100}
          className="h-12 w-auto"
          src="/salami.svg"
          alt="Salumi Tracker Logo"
        />
      </Link> */}
      <div className="w-full pr-3 flex flex-col space-y-4 text-stone fill-stone mt-12">
        <Link href="/home" className="font-QuicksandMedium">
          <div
            id="home"
            className="w-full flex items-center space-x-3.5 group select-none cursor-pointer"
          >
            <div
              className={`w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden `}
            >
              <div
                className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 bg-wetSand ${
                  checkActive("home") ? "translate-y-0" : "translate-y-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className=" group-hover:bg-wetSand/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 group-hover:text-wetSand hover:text-wetSand ">
              <HomeIcon />
              <p className="font-QuicksandMedium">Home</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard" className="font-QuicksandMedium">
          <div
            id="dashboard"
            className="w-full flex items-center space-x-3.5 group select-none cursor-pointer"
          >
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 bg-wetSand ${
                  checkActive("dashboard")
                    ? "translate-y-0"
                    : "translate-y-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="group-hover:bg-wetSand/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 group-hover:text-wetSand hover:text-wetSand ">
              <DashboardIcon />
              <p className="font-QuicksandMedium">Dashboard</p>
            </div>
          </div>
        </Link>
        <Link href="/recipes" className="font-QuicksandMedium">
          <div
            id="recipies"
            className="w-full flex items-center space-x-3.5 group select-none cursor-pointer"
          >
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 bg-wetSand ${
                  checkActive("recipes") ? "translate-y-0" : "translate-y-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="group-hover:bg-wetSand/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 group-hover:text-wetSand hover:text-wetSand ">
              <RecipesIcon />
              <p className="font-QuicksandMedium">Recipes</p>
            </div>
          </div>
        </Link>

        <Link href="/add_recipe" className="font-QuicksandMedium">
          <div
            id="add_recipe"
            className="w-full flex items-center space-x-3.5 group select-none cursor-pointer"
          >
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 bg-wetSand ${
                  checkActive("add_recipe")
                    ? "translate-y-0"
                    : "translate-y-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="group-hover:bg-wetSand/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 group-hover:text-wetSand hover:text-wetSand ">
              <AddRecipeIcon />
              <p className="font-QuicksandMedium">Add Recipe</p>
            </div>
          </div>
        </Link>

        <Link href="/add_salume" className="font-QuicksandMedium">
          <div
            id="add_salume"
            className="w-full flex items-center space-x-3.5 group select-none cursor-pointer"
          >
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 bg-wetSand ${
                  checkActive("add_salume")
                    ? "translate-y-0"
                    : "translate-y-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="group-hover:bg-wetSand/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 group-hover:text-wetSand hover:text-wetSand ">
              <AddSalume />
              <p className="font-QuicksandMedium">Add Salume</p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}

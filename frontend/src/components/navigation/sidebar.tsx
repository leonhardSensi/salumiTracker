import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HomeIcon from "./Icons/homeIcon";
import DashboardIcon from "./Icons/dashboardIcon";
import RecipesIcon from "./Icons/recipesIcon";
import AddRecipeIcon from "./Icons/addRecipeIcon";
import AddSalume from "./Icons/addSalumeIcon";

export default function Sidebar() {
  const pathname = usePathname();

  const checkActive = (tabId: string) => {
    return pathname === `/${tabId}`;
  };

  return (
    <aside className="w-64 bg-gray-900 flex flex-col items-center pt-2 pb-2 space-y-7 min-h-screen">
      <Link href="/">
        <Image
          width={100}
          height={100}
          className="h-12 w-auto"
          src="/salami.svg"
          alt="Salumi Tracker Logo"
        />
      </Link>
      <div className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
        <Link href="/" className="font-QuicksandMedium">
          <div
            id="home"
            className="w-full flex items-center gap-x-1.5 group select-none cursor-pointer"
          >
            <div
              className={`w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden `}
            >
              <div
                className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 bg-red-600 ${
                  checkActive("") ? "translate-y-0" : "translate-y-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className=" group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 group-hover:text-white hover:text-white text-sm">
              <HomeIcon />
              <p className="font-QuicksandMedium">Home</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard" className="font-QuicksandMedium">
          <div
            id="dashboard"
            className="w-full flex items-center gap-x-1.5 group select-none cursor-pointer"
          >
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 bg-red-600 ${
                  checkActive("dashboard")
                    ? "translate-y-0"
                    : "translate-y-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 group-hover:text-white hover:text-white text-sm">
              <DashboardIcon />
              <p className="font-QuicksandMedium">Dashboard</p>
            </div>
          </div>
        </Link>
        <Link href="/recipes" className="font-QuicksandMedium">
          <div
            id="recipies"
            className="w-full flex items-center gap-x-1.5 group select-none cursor-pointer"
          >
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 bg-red-600 ${
                  checkActive("recipes") ? "translate-y-0" : "translate-y-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 group-hover:text-white hover:text-white text-sm">
              <RecipesIcon />
              <p className="font-QuicksandMedium">Recipes</p>
            </div>
          </div>
        </Link>

        <Link href="/add_recipe" className="font-QuicksandMedium">
          <div
            id="add_recipe"
            className="w-full flex items-center gap-x-1.5 group select-none cursor-pointer"
          >
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 bg-red-600 ${
                  checkActive("add_recipe")
                    ? "translate-y-0"
                    : "translate-y-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 group-hover:text-white hover:text-white text-sm">
              <AddRecipeIcon />
              <p className="font-QuicksandMedium">Add Recipe</p>
            </div>
          </div>
        </Link>

        <Link href="/add_salume" className="font-QuicksandMedium">
          <div
            id="add_salume"
            className="w-full flex items-center gap-x-1.5 group select-none cursor-pointer"
          >
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 bg-red-600 ${
                  checkActive("add_salume")
                    ? "translate-y-0"
                    : "translate-y-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 group-hover:text-white hover:text-white text-sm">
              <AddSalume />
              <p className="font-QuicksandMedium">Add Salume</p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}

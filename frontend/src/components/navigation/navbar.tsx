import { Iuser } from "@/interfaces/interfaces";
import Link from "next/link";

export default function Navbar(props: { user: Iuser | undefined }) {
  return (
    <nav className="bg-gray-900 h-16 w-full">
      <div className="mr-16">
        <div className="relative flex h-16">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl">Salumi Tracker</h1>
            <div className="relative group inline-block">
              <button className="flex flex-row group-hover:bg-white/10 py-2 px-4 rounded-t-md text-white hover:text-gray-300 transition-colors w-fit">
                {props.user && <h1>Hi, {props.user.name}</h1>}
                <svg
                  className="group-hover:rotate-180 w-2 h-4 ml-2 text-gray-400"
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
              <div className="w-full hidden group-hover:block absolute bg-white py-2 px-3 rounded-b-md shadow-lg">
                <Link
                  className="block py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md"
                  href="/account"
                >
                  My Settings
                </Link>
                <Link
                  className="block py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md"
                  href="/logout"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

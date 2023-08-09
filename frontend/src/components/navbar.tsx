import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-2">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start ">
            <div className="flex flex-shrink-0 items-center">
              <Link href={"/"}>
                <Image
                  width={100}
                  height={100}
                  className="h-8 w-auto"
                  src="/salami.svg"
                  alt="Salumi Tracker"
                />
              </Link>
            </div>
            <div className="ml-6 block">
              <div className="flex space-x-4">
                <Link
                  href="/login"
                  className="text-white hover:bg-gray-800  rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-white hover:bg-gray-800  rounded-md px-3 py-2 text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

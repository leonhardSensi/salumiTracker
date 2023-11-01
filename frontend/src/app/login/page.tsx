"use client";

import PublicLayout from "@/components/publicLayout/publicLayout";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserInput from "@/components/generic/input/userInput";
import SubmitButton from "@/components/generic/button/submitButton";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.currentTarget.value);
        break;
      case "password":
        setPassword(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (email && password) {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        router.push("/");
      } else {
        router.push("/login");
      }
    }
  };

  return (
    <PublicLayout>
      <div className="bg-white flex flex-col mx-auto">
        <section className="bg-white m-auto text-center">
          <h1 className="text-black text-5xl pt-24 mx-auto font-bold">
            Welcome back!
          </h1>
          <h3 className="text-2xl text-gray-400 leading-loose">
            Your salumi are waiting
          </h3>
        </section>
        <section className="bg-white">
          <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto h-full w-screen">
            <div className="w-screen bg-white rounded-lg shadow border max-w-md border-gray-700">
              <div className="p-8 space-y-4">
                <form
                  className="space-y-6"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-500"
                    >
                      Your email address
                    </label>
                    <UserInput
                      width={"w-full"}
                      height={""}
                      handleChange={handleChange}
                      type={"email"}
                      name={"email"}
                      id={"email"}
                      placeholder={"name@company.com"}
                      required={true}
                    />
                    {/* <input
                      onChange={handleChange}
                      type="email"
                      name="email"
                      id="email"
                      className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="name@company.com"
                      required={true}
                    /> */}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-500"
                    >
                      Password
                    </label>
                    <UserInput
                      width={"w-full"}
                      height={""}
                      handleChange={handleChange}
                      type={"password"}
                      name={"password"}
                      id={"password"}
                      placeholder={"••••••••"}
                      required={true}
                    />

                    {/* <input
                      onChange={handleChange}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      required={true}
                    /> */}
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="block text-sm font-medium text-blue-400 hover:underline"
                    >
                      I forgot my password
                    </Link>
                  </div>

                  {/* <button
                    type="submit"
                    className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                  >
                    Login
                  </button> */}
                  <SubmitButton text={"Login"} />
                  <div className="text-black">
                    <label htmlFor="terms" className=" text-black">
                      Don't have an account yet?{" "}
                      <Link
                        className="font-medium text-blue-400 hover:underline "
                        href="/register"
                      >
                        Register here
                      </Link>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

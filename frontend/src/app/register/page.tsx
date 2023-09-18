"use client";

import PublicLayout from "@/components/publicLayout/publicLayout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserInput from "@/components/generic/input/userInput";
import SubmitButton from "@/components/generic/button/submitButton";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirm-password":
        setPasswordConfirm(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (name && email && password && passwordConfirm) {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirm,
        }),
      });
      const data = await response.json();
      console.log("response data:", data);
      router.push("/");
    }
  };

  return (
    <PublicLayout>
      <div className="bg-white flex flex-row justify-center pt-24">
        <section className="bg-white flex flex-col items-center justify-center w-1/2">
          <div className="">
            <Image
              src="/salami.svg"
              width={200}
              height={200}
              alt="salami"
            ></Image>
            <h1 className="text-6xl font-bold text-black indent-28">
              Welcome to the
            </h1>
            <h1 className="text-6xl font-bold text-black indent-28 leading-relaxed">
              Salumi Tracker
            </h1>
            <h3 className="text-2xl text-gray-400 indent-28">
              The only and last tracker you'll ever need for your
            </h3>
            <h3 className="text-2xl text-gray-400 indent-28 leading-relaxed">
              cured meats
            </h3>
          </div>
        </section>
        <section className="bg-white flex flex-col items-center justify-center w-1/2">
          <div className="">
            <div className="w-full bg-white rounded-lg shadow dark:border border-gray-700">
              <div className="p-6 space-y-6 sm:p-8">
                <div className="text-center">
                  <p className="text-black">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-blue-400 hover:underline text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
                <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl text-center">
                  Create new account
                </h1>
                <form
                  className="space-y-6"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium  text-gray-500"
                    >
                      Your name
                    </label>
                    <UserInput
                      width={"w-full"}
                      handleChange={handleChange}
                      type={"name"}
                      name={"name"}
                      id={"name"}
                      placeholder={"Your name"}
                      required={true}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium  text-gray-500"
                    >
                      Your email address
                    </label>
                    <UserInput
                      width={"w-full"}
                      handleChange={handleChange}
                      type={"email"}
                      name={"email"}
                      id={"email"}
                      placeholder={"name@company.com"}
                      required={true}
                    />
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
                      handleChange={handleChange}
                      type={"password"}
                      name={"password"}
                      id={"password"}
                      placeholder={"••••••••"}
                      required={true}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-500"
                    >
                      Repeat password
                    </label>
                    <UserInput
                      width={"w-full"}
                      handleChange={handleChange}
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      required={true}
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                        required={true}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500"
                      >
                        By signing up, you agree to our{" "}
                        <Link
                          className="font-medium text-blue-400 hover:underline "
                          href="#"
                        >
                          Terms
                        </Link>
                        ,{" "}
                        <Link
                          className="font-medium text-blue-400 hover:underline "
                          href="#"
                        >
                          Data Policy{" "}
                        </Link>
                        and{" "}
                        <Link
                          className="font-medium text-blue-400 hover:underline "
                          href="#"
                        >
                          Cookies Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                  <SubmitButton text={"Get started"} />
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

"use client";

import PublicLayout from "@/components/publicLayout/publicLayout";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserInput from "@/components/generic/input/userInput";
import SubmitButton from "@/components/generic/button/submitButton";
import { useLoginMutation } from "@/mutations/userMutations";
import Error from "next/error";
import Modal from "@/components/generic/modal/modal";
import { render } from "react-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] =
    useState("");

  const router = useRouter();

  const loginUser = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidCredentialsMessage("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginCredentials = {
      email,
      password,
    };

    try {
      const result = await loginUser.mutateAsync(loginCredentials);
      if (result.status === 401) {
        setInvalidCredentialsMessage("Invalid email or password!");
      } else if (result.status === 200) {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <PublicLayout>
      <div className="flex flex-col mx-auto bg-login-bg bg-contain h-screen bg-no-repeat bg-top-left">
        <section className="text-center">
          <h1 className="text-black text-5xl pt-24 mx-auto font-bold">
            Welcome back!
          </h1>
          <h3 className="text-2xl text-gray-400 leading-loose">
            Your salumi are waiting
          </h3>
        </section>
        <section>
          <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto h-full w-screen">
            <div className="w-screen bg-white bg-opacity-90 rounded-lg shadow-xl max-w-md">
              <div className="p-8 space-y-4">
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                      autoComplete={"email"}
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
                      height={""}
                      handleChange={handleChange}
                      type={"password"}
                      name={"password"}
                      id={"password"}
                      placeholder={"••••••••"}
                      required={true}
                      autoComplete={"password"}
                    />
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="block text-sm font-medium text-blue-400 hover:underline"
                    >
                      I forgot my password
                    </Link>
                  </div>

                  <SubmitButton
                    disabled={invalidCredentialsMessage ? true : false}
                    addStyles={
                      invalidCredentialsMessage
                        ? "cursor-not-allowed opacity-75"
                        : ""
                    }
                    text={
                      invalidCredentialsMessage
                        ? invalidCredentialsMessage
                        : "Login"
                    }
                  />
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

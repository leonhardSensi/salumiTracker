"use client";

import { PublicLayout } from "../../components/PublicLayout/publicLayout";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserInput from "../../components/generic/input/userInput";
import SubmitButton from "../../components/generic/button/submitButton";
import { useLoginMutation } from "../../mutations/userMutations";

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
      if (result.status === 200) {
        router.push("/");
      } else {
        setInvalidCredentialsMessage("Invalid email or password!");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <PublicLayout>
      <div className="flex flex-col mx-auto bg-login-bg bg-contain h-screen bg-no-repeat bg-salumeBlue justify-center">
        <section>
          <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto h-full w-screen">
            <div className="w-screen bg-salumeWhite bg-opacity-90 rounded-lg shadow-xl max-w-md">
              <div>
                <section className="text-center">
                  <h1 className="text-black text-5xl pt-8 mx-auto font-bold ">
                    Welcome back!
                  </h1>
                  <div className="text-3xl text-black">
                    Your salumi are{" "}
                    <span className="text-salumeBlue inline-flex flex-col overflow-hidden h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] ">
                      <ul className="block leading-tight text-left animate-text-slide font-extrabold">
                        <li>salting</li>
                        <li>drying</li>
                        <li>curing</li>
                        <li>waiting</li>
                        <li aria-hidden="true">salting</li>
                      </ul>
                    </span>
                  </div>
                </section>
              </div>
              <div className="p-8 space-y-4">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-black"
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
                      className="block mb-2 text-sm font-medium text-black"
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
                      className="block text-sm font-medium text-blue-500 hover:underline"
                    >
                      I forgot my password
                    </Link>
                  </div>

                  <SubmitButton
                    disabled={invalidCredentialsMessage ? true : false}
                    addStyles={
                      invalidCredentialsMessage
                        ? "cursor-not-allowed bg-red-500"
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
                      No account yet?{" "}
                      <Link
                        className="font-medium text-blue-500 hover:underline "
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

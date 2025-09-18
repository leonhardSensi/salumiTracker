"use client";

import { PublicLayout } from "../../components/PublicLayout/publicLayout";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserInput from "../../components/generic/input/userInput";
import SubmitButton from "../../components/generic/button/submitButton";
import { useLoginMutation } from "../../mutations/userMutations";
import { motion } from "framer-motion";
import Image from "next/image";

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
    const loginCredentials = { email, password };
    try {
      const result = await loginUser.mutateAsync(loginCredentials);
      if (result.status === 200) {
        router.push("/home");
      } else if (result.status === 403) {
        setInvalidCredentialsMessage("You need to verify your email!");
      } else if (result.status === 401) {
        setInvalidCredentialsMessage("Invalid email or password!");
      }
    } catch (error: any) {
      setInvalidCredentialsMessage("Something went wrong. Try again!");
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-eggshell to-flesh text-stone">
        <motion.div
          className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl shadow-2xl bg-eggshell/90 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-flesh px-10 py-16">
            <Image
              src="/salami.svg"
              width={100}
              height={100}
              alt="salami"
              className="mb-8 drop-shadow-xl"
              priority
            />
            <h1 className="text-4xl font-serif font-bold text-wetSand mb-4 text-center">
              Welcome back!
            </h1>
            <p className="text-lg text-stone text-center mb-8">
              Log in to manage your salumi batches and track your progress.
            </p>
            <div className="text-2xl text-stone">
              Your salumi are{" "}
              <span className="text-wetSand inline-flex flex-col overflow-hidden h-[calc(theme(fontSize.2xl)*theme(lineHeight.tight))]">
                <ul className="block leading-tight text-left animate-text-slide font-extrabold">
                  <li>salting</li>
                  <li>drying</li>
                  <li>curing</li>
                  <li>waiting</li>
                  <li aria-hidden="true">salting</li>
                </ul>
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-16">
            <h2 className="text-3xl font-serif text-wetSand text-center mb-2">
              Login to your account
            </h2>
            <form
              className="space-y-6 w-full max-w-md mx-auto"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-stone"
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
                  className="block mb-2 text-sm font-medium text-stone"
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
              <div className="max-w-fit">
                <Link
                  href="/resetpassword"
                  id="forgot-password"
                  aria-label="forgot password"
                  className="block text-sm font-bold hover:underline"
                >
                  I forgot my password
                </Link>
              </div>
              <SubmitButton
                disabled={invalidCredentialsMessage ? true : false}
                addStyles={
                  invalidCredentialsMessage
                    ? "cursor-not-allowed bg-red-500 text-stone"
                    : ""
                }
                text={
                  invalidCredentialsMessage
                    ? invalidCredentialsMessage
                    : "Login"
                }
              />
              <div className="text-stone text-center">
                <span className="text-black">
                  No account yet?{" "}
                  <Link
                    className="font-extrabold hover:underline"
                    href="/register"
                  >
                    Register here
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}

"use client";

import { PublicLayout } from "../../components/PublicLayout/publicLayout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UserInput from "../../components/generic/input/userInput";
import SubmitButton from "../../components/generic/button/submitButton";
import { useRegisterMutation } from "../../mutations/userMutations";
import {
  inputMatch,
  validatePasswordLength,
} from "../../utils/inputValidation";
import { useRouter } from "next/navigation";
import ErrorMessage from "../../components/generic/error/errorMessage";
import { motion } from "framer-motion";

export default function Registration() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] =
    useState("");

  const createUser = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidCredentialsMessage("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerCredentials = {
      name,
      email,
      password,
      passwordConfirm,
    };
    try {
      const response = await createUser.mutateAsync(registerCredentials);
      if (response.status === 409) {
        setInvalidCredentialsMessage("Email already in use!");
      } else if (response.status === 201) {
        router.push("/verifyemail");
      }
    } catch (error) {}
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-eggshell to-flesh">
        <motion.div
          className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl shadow-2xl bg-eggshell/90 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Left: Welcome */}
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-flesh px-10 py-16">
            <Image
              src="/salami.svg"
              width={120}
              height={120}
              alt="salami"
              className="mb-8 drop-shadow-xl"
              priority
            />
            <h1 className="text-5xl font-serif font-bold text-wetSand mb-4 text-center">
              Welcome!
            </h1>
            <p className="text-lg text-stone text-center mb-8">
              Join Salumi Tracker and start your journey to perfect cured meats.
            </p>
            <Link
              href="/login"
              className="font-bold text-wetSand hover:underline text-lg"
            >
              Already have an account? Login here
            </Link>
          </div>
          {/* Right: Registration Form */}
          <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-16 text-stone">
            <h2 className="text-4xl font-serif text-wetSand text-center mb-2">
              Create new account
            </h2>
            <h3 className="text-xl text-center mb-8">
              Start tracking your salumi today!
            </h3>
            <form
              className="space-y-6 w-full max-w-md mx-auto"
              method="post"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
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
                <div className="flex mb-2">
                  <label
                    htmlFor="email"
                    className="w-fit text-sm font-medium mr-2"
                  >
                    Your email address
                  </label>
                  {invalidCredentialsMessage && (
                    <>
                      <Image
                        src={"/cross.svg"}
                        alt={"email in use"}
                        width={16}
                        height={16}
                        className="w-4 h-4 mr-2"
                      />
                      <ErrorMessage errorMessage={"Email is already in use!"} />
                    </>
                  )}
                </div>
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
                <div className="flex">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium mr-2"
                  >
                    Password
                  </label>
                  {!inputMatch(password, passwordConfirm) ? (
                    <>
                      <Image
                        src={"/cross.svg"}
                        alt={"password invalid"}
                        width={16}
                        height={16}
                        className="w-4 h-4 mr-2"
                      />
                      <ErrorMessage errorMessage={"Passwords must match!"} />
                    </>
                  ) : (
                    !validatePasswordLength(password) &&
                    password.length > 0 && (
                      <>
                        <Image
                          src={"/cross.svg"}
                          alt={"password invalid"}
                          width={16}
                          height={16}
                          className="w-4 h-4 mr-2"
                        />
                        <ErrorMessage
                          errorMessage={
                            "Password must have at least 8 characters!"
                          }
                        />
                      </>
                    )
                  )}
                </div>
                <UserInput
                  width={"w-full"}
                  handleChange={handleChange}
                  type={"password"}
                  name={"password"}
                  autoComplete="password"
                  id={"password"}
                  placeholder={"••••••••"}
                  required={true}
                />
              </div>
              <div>
                <div className="flex">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium mr-2"
                  >
                    Repeat password
                  </label>
                  {!inputMatch(password, passwordConfirm) ? (
                    <>
                      <Image
                        src={"/cross.svg"}
                        alt={"confirm password invalid"}
                        width={16}
                        height={16}
                        className="w-4 h-4 mr-2"
                      />
                      <ErrorMessage errorMessage={"Passwords must match!"} />
                    </>
                  ) : (
                    !validatePasswordLength(passwordConfirm) &&
                    passwordConfirm.length > 0 && (
                      <>
                        <Image
                          src={"/cross.svg"}
                          alt={"confirm password invalid"}
                          width={16}
                          height={16}
                          className="w-4 h-4 mr-2"
                        />
                        <ErrorMessage
                          errorMessage={
                            "Password must have at least 8 characters!"
                          }
                        />
                      </>
                    )
                  )}
                </div>
                <UserInput
                  width={"w-full"}
                  handleChange={handleChange}
                  type="password"
                  name="confirm-password"
                  autoComplete="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  required={true}
                />
              </div>
              <SubmitButton
                disabled={!inputMatch(password, passwordConfirm)}
                addStyles={
                  !inputMatch(password, passwordConfirm)
                    ? "cursor-not-allowed opacity-75"
                    : ""
                }
                text={"Get Started!"}
              />
            </form>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}

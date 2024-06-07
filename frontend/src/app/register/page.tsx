"use client";

import PublicLayout from "@/components/publicLayout/publicLayout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UserInput from "@/components/generic/input/userInput";
import SubmitButton from "@/components/generic/button/submitButton";
import { useRegisterMutation } from "@/mutations/userMutations";
import { inputMatch, validatePasswordLength } from "@/utils/inputValidation";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/generic/error/errorMessage";

export default function Registration() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] =
    useState("");

  const maxBirthday = new Date().toLocaleDateString("en-ca");

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
      case "dateOfBirth":
        setDateOfBirth(e.target.value);
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
      dateOfBirth,
      password,
      passwordConfirm,
    };
    try {
      const response = await createUser.mutateAsync(registerCredentials);
      console.log("REGISTER RESPONSE", response);
      if (response.status === 409) {
        setInvalidCredentialsMessage("Email already in use!");
      } else if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {}
  };

  return (
    <PublicLayout>
      <div className="text-black bg-register-bg bg-contain bg-no-repeat bg-right-top flex flex-row justify-center py-24 bg-salumeBlue h-screen">
        <section className="flex flex-col items-center justify-center w-1/2">
          <div className="">
            <Image
              src="/salami.svg"
              width={200}
              height={200}
              alt="salami"
            ></Image>
            <h1 className="text-6xl font-bold text-salumeWhite indent-28">
              Welcome to the
            </h1>
            <h1 className="text-6xl font-bold text-salumeWhite indent-28 leading-relaxed">
              Salumi Tracker
            </h1>
            <h3 className="text-2xl text-salumeWhite indent-28">
              The last and only tracker you will ever need for your
            </h3>
            <h3 className="text-2xl text-salumeWhite indent-28 leading-relaxed">
              cured meats
            </h3>
          </div>
        </section>
        <section className=" flex flex-col items-center justify-center w-1/2">
          <div className="">
            <div className="w-full bg-salumeWhite bg-opacity-90 rounded-lg shadow-xl">
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
                <h1 className="font-bold leading-tight tracking-tight text-2xl text-center">
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
                      className="block mb-2 text-sm font-medium "
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
                          {" "}
                          <Image
                            src={"/cross.svg"}
                            alt={"email in use"}
                            width={100}
                            height={100}
                            className={`w-4 h-4 mr-2`}
                          />
                          <ErrorMessage
                            errorMessage={"Email is already in use!"}
                          />
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
                    <label
                      htmlFor="dateOfBirth"
                      className="block mb-2 text-sm font-medium"
                    >
                      Your date of birth
                    </label>
                    <UserInput
                      width={"w-full"}
                      handleChange={handleChange}
                      type={"date"}
                      max={maxBirthday}
                      name={"dateOfBirth"}
                      id={"dateOfBirth"}
                      placeholder={""}
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
                            width={100}
                            height={100}
                            className={`w-4 h-4 mr-2 `}
                          />
                          <ErrorMessage
                            errorMessage={"Passwords must match!"}
                          />
                        </>
                      ) : (
                        !validatePasswordLength(password) &&
                        password.length > 0 && (
                          <>
                            <Image
                              src={"/cross.svg"}
                              alt={"password invalid"}
                              width={100}
                              height={100}
                              className={`w-4 h-4 mr-2 `}
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
                            width={100}
                            height={100}
                            className={`w-4 h-4 mr-2`}
                          />

                          <ErrorMessage
                            errorMessage={"Passwords must match!"}
                          />
                        </>
                      ) : (
                        !validatePasswordLength(passwordConfirm) &&
                        passwordConfirm.length > 0 && (
                          <>
                            <Image
                              src={"/cross.svg"}
                              alt={"confirm password invalid"}
                              width={100}
                              height={100}
                              className={`w-4 h-4 mr-2`}
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
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border rounded bg-salumeBlue border-salumeBlue"
                        required={true}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-light">
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
                  <SubmitButton
                    disabled={
                      !inputMatch(password, passwordConfirm) ? true : false
                    }
                    addStyles={
                      !inputMatch(password, passwordConfirm)
                        ? "cursor-not-allowed opacity-75"
                        : ""
                    }
                    text={"Get started!"}
                  />
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

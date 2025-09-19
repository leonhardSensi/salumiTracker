"use client";
import { ChangeEvent, useState } from "react";
import UserInput from "../../../components/generic/input/userInput";
import SubmitButton from "../../../components/generic/button/submitButton";
import { inputMatch } from "../../../utils/inputValidation";
import Image from "next/image";
import { validatePasswordLength } from "../../../utils/inputValidation";
import ErrorMessage from "../../../components/generic/error/errorMessage";
import { useParams } from "next/navigation";
import { resetPassword } from "../../../api/userApi";

export default function ResetPassword() {
  const { resetToken } = useParams() as { resetToken: string };
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirm-password") {
      setPasswordConfirm(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetPassword(resetToken, password, passwordConfirm);
  };

  return (
    <main className="min-h-screen bg-wetSand flex items-center justify-center px-6">
      <div className="bg-eggshell p-10 rounded-xl shadow-xl max-w-lg text-center">
        <h1 className="text-4xl font-serif mb-6 text-stone">Oh No!</h1>
        <p className="text-lg text-stone mb-4">
          Looks like you forgot your password.
        </p>
        <p className="text-stone mb-8">
          Don&apos;t worry, it happens to the best of us! Please check your
          email for a link to reset your password.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col items-center"
        >
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
                  <ErrorMessage errorMessage={"Passwords must match!"} />
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
                      errorMessage={"Password must have at least 8 characters!"}
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

                  <ErrorMessage errorMessage={"Passwords must match!"} />
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
                      errorMessage={"Password must have at least 8 characters!"}
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
          <SubmitButton addStyles="w-1/2" text={"Submit"} />
        </form>
      </div>
    </main>
  );
}

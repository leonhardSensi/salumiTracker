"use client";
import { ChangeEvent, useState } from "react";
import UserInput from "../../components/generic/input/userInput";
import SubmitButton from "../../components/generic/button/submitButton";
import { requestPasswordReset } from "../../api/userApi";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    requestPasswordReset(email);
  };

  return (
    <main className="min-h-screen bg-wetSand flex items-center justify-center px-6">
      <div className="bg-eggshell p-10 rounded-xl shadow-xl max-w-lg text-center">
        <h1 className="text-4xl font-serif mb-6 text-stone">Oh No!</h1>
        <p className="text-lg text-stone mb-4">
          Looks like you forgot your password.
        </p>
        <p className="text-stone mb-8">
          Don't worry, it happens to the best of us! Please check your email for
          a link to reset your password.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col items-center"
        >
          <UserInput
            handleChange={handleChange}
            type={"email"}
            name={"email"}
            id={"email"}
            placeholder={"Your email address"}
            required={false}
          />
          <SubmitButton addStyles="w-1/2" text={"Submit"} />
        </form>
      </div>
    </main>
  );
}

import { getUser } from "@/api/userApi";
import { useUpdateUserMutation } from "@/mutations/userMutations";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { text } from "stream/consumers";
import SubmitButton from "../../button/submitButton";
import UserInput from "../userInput";

export default function UpdatePassword() {
  const { data } = useQuery(["user"], getUser);

  const [name, setName] = useState(data ? data.name : "");
  const [email, setEmail] = useState(data ? data.email : "");
  const [password, setPassword] = useState("");

  const updateUser = useUpdateUserMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name,
      email,
      // password
    };
    updateUser.mutate(user);
    window.location.reload();
  };

  return (
    <form action="#" className="p-4" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-2 justify-center items-center">
        <div className="w-full">
          <label
            htmlFor="old-password"
            className="block mb-2 text-m font-medium text-black"
          >
            Old Password
          </label>
          <UserInput
            width={"w-full"}
            handleChange={handleChange}
            type={"password"}
            name={"old-password"}
            id={"old-password"}
            placeholder={"••••••••"}
            required={true}
            addStyle={"mb-4 w-full"}
          />

          <label
            htmlFor="password"
            className="block mb-2 text-m font-medium text-black"
          >
            New Password
          </label>
          <UserInput
            width={"w-full"}
            handleChange={handleChange}
            type={"password"}
            name={"password"}
            id={"password"}
            placeholder={"••••••••"}
            required={true}
            addStyle={"mb-4 w-full"}
          />

          <label
            htmlFor="confirm-password"
            className="block mb-2 text-m font-medium text-black"
          >
            Confirm New Password
          </label>
          <UserInput
            width={"w-full"}
            handleChange={handleChange}
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="••••••••"
            required={true}
            addStyle={"mb-4 w-full"}
          />
        </div>
        <div className="w-1/4">
          <SubmitButton text={"Save"} />
        </div>
      </div>
    </form>
  );
}

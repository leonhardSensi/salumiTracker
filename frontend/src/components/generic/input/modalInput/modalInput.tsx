import { getUser } from "@/api/userApi";
import { useUpdateUserMutation } from "@/mutations/userMutations";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SubmitButton from "../../button/submitButton";
import UserInput from "../userInput";

export default function ModalInput({ text }: { text?: string }) {
  const { data } = useQuery(["user"], getUser);

  const [name, setName] = useState(data ? data.name : "");
  const [email, setEmail] = useState(data ? data.email : "");

  const updateUser = useUpdateUserMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    data: string | undefined
  ) => {
    switch (data) {
      case "Name":
        setName(e.target.value);
        break;
      case "Email":
        setEmail(e.target.value);
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name,
      email,
    };
    updateUser.mutate(user);
    window.location.reload();
  };

  return (
    <form action="#" className="p-4" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-2 justify-center items-center">
        <div className="w-full">
          <label
            htmlFor="name"
            className="block mb-2 text-m font-medium text-black"
          >
            {text}
          </label>
          <UserInput
            handleChange={(e) => handleChange(e, text)}
            type={"name"}
            name={"name"}
            id={"name"}
            placeholder={`New ${text}`}
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

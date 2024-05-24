import { getUser } from "@/api/userApi";
import { useUpdateUserMutation } from "@/mutations/userMutations";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SubmitButton from "../../button/submitButton";
import UserInput from "../userInput";

export default function UpdateBirthday() {
  const { data } = useQuery(["user"], getUser);

  const maxBirthday = new Date().toLocaleDateString("en-ca");
  console.log(maxBirthday);

  const [name, setName] = useState(data ? data.name : "");
  const [email, setEmail] = useState(data ? data.email : "");
  const [dateOfBirth, setDateOfBirth] = useState(
    data ? data.date_of_birth : ""
  );
  const [password, setPassword] = useState("");

  const updateUser = useUpdateUserMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setDateOfBirth(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name,
      email,
      dateOfBirth,
      // password,
    };
    console.log("DATE OF BIRTH", user);
    updateUser.mutate(user);
    // window.location.reload();
  };

  return (
    <form action="#" className="p-4" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-2 justify-center items-center">
        <div className="w-full">
          <label
            htmlFor="dateOfBirth"
            className="block mb-2 text-m font-medium text-black"
          >
            Date of birth
          </label>
          <UserInput
            handleChange={handleChange}
            max={maxBirthday}
            type={"date"}
            name={"dateOfBirth"}
            id={"dateOfBirth"}
            placeholder={""}
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

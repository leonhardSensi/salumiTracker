import { getUser } from "@/api/userApi";
import {
  useLoginMutation,
  useUpdateUserMutation,
} from "@/mutations/userMutations";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { text } from "stream/consumers";
import SubmitButton from "../../button/submitButton";
import UserInput from "../userInput";

export default function UpdatePassword() {
  const { data } = useQuery(["user"], getUser);

  const [name, setName] = useState(data ? data.name : "");
  const [email, setEmail] = useState(data ? data.email : "");
  const [dateOfBirth, setDateOfBirth] = useState(
    data ? data.date_of_birth : ""
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const updateUser = useUpdateUserMutation();
  const loginUser = useLoginMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    data: string
  ) => {
    switch (data) {
      case "old-password":
        setOldPassword(e.target.value);
        break;
      case "new-password":
        setNewPassword(e.target.value);
        break;
      case "new-password-confirm":
        setNewPasswordConfirm(e.target.value);
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name,
      email,
      dateOfBirth,
      password: newPassword,
    };
    const validateUser = { email, password: oldPassword };
    loginUser.mutate(validateUser);
    if (loginUser.isSuccess) {
      updateUser.mutate(user);
      window.location.reload();
    } else {
      console.log(loginUser.status);
    }
  };

  console.log(oldPassword, newPassword, newPasswordConfirm);

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
            handleChange={(e) => handleChange(e, "old-password")}
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
            handleChange={(e) => handleChange(e, "new-password")}
            type={"password"}
            name={"new-password"}
            id={"new-password"}
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
            handleChange={(e) => handleChange(e, "new-password-confirm")}
            type="password"
            name="new-password-confirm"
            id="new-password-confirm"
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

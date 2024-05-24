import { getUser } from "@/api/userApi";
import { notificationState } from "@/atoms/notificationAtoms";
import {
  useLoginMutation,
  useUpdateUserMutation,
} from "@/mutations/userMutations";
import { inputMatch } from "@/utils/inputValidation";
import { useModal } from "@/utils/modalProvider";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilState } from "recoil";
import SubmitButton from "../../button/submitButton";
import UserInput from "../userInput";

export default function UpdatePassword() {
  const { data } = useQuery(["user"], getUser);
  const { isModalOpen, openModal, closeModal } = useModal();

  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);

  const [name, setName] = useState(data ? data.name : "");
  const [email, setEmail] = useState(data ? data.email : "");
  const [dateOfBirth, setDateOfBirth] = useState(
    data ? data.date_of_birth : ""
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [invalidCredentialsMessage, setInvalidCredentialsMessage] =
    useState("");

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
        setInvalidCredentialsMessage("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name,
      email,
      dateOfBirth,
      password: newPassword,
    };
    const validateUser = { email, password: oldPassword };
    const result = await loginUser.mutateAsync(validateUser);
    if (result.status === 401) {
      setInvalidCredentialsMessage("Incorrect password!");
    } else if (result.status === 200) {
      const response = await updateUser.mutateAsync(user);
      if (response.status === 200) {
        closeModal();
        setNotificationDetails({
          type: "passwordSubmit",
          message: "Password updated successfully!",
        });
      }
    }
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
            handleChange={(e) => handleChange(e, "old-password")}
            type={"password"}
            name={"old-password"}
            autoComplete="old-password"
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
            autoComplete="new-password"
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
            autoComplete="new-password-confirm"
            id="new-password-confirm"
            placeholder="••••••••"
            required={true}
            addStyle={"mb-4 w-full"}
          />
        </div>
        {/* <p className={`${!checkPasswordMatch() ? "text-red-500" : ""}`}>
          Passwords must match!
        </p> */}
        <div className="w-fit">
          <SubmitButton
            disabled={
              invalidCredentialsMessage
                ? true
                : !inputMatch(newPassword, newPasswordConfirm)
                ? true
                : false
            }
            addStyles={
              invalidCredentialsMessage
                ? "cursor-not-allowed opacity-75"
                : !inputMatch(newPassword, newPasswordConfirm)
                ? "cursor-not-allowed opacity-75"
                : ""
            }
            text={
              invalidCredentialsMessage
                ? invalidCredentialsMessage
                : !inputMatch(newPassword, newPasswordConfirm)
                ? "Passwords must match!"
                : "Save"
            }
          />
        </div>
      </div>
    </form>
  );
}

import { getUser } from "../../../../api/userApi";
import { modalData } from "../../../../atoms/modalAtoms";
import { useUpdateUserMutation } from "../../../../mutations/userMutations";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { useState } from "react";
import SubmitButton from "../../button/submitButton";
import UserInput from "../userInput";
import { notificationState } from "../../../../atoms/notificationAtoms";
import { useModal } from "../../../../utils/modalProvider";
import { updateUserData } from "../../../../atoms/userAtoms";

export default function UpdateAccountInfo() {
  const [updatedUser, setUpdatedUser] = useRecoilState(updateUserData);
  const maxBirthday = new Date().toLocaleDateString("en-ca");

  const { data: userData } = useQuery(["user"], getUser);
  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);

  const [name, setName] = useState(userData ? userData.name : "");
  const [email, setEmail] = useState(userData ? userData.email : "");
  const [modalDetails, setModalDetails] = useRecoilState(modalData);
  const { isModalOpen, openModal, closeModal } = useModal();

  const updateUser = useUpdateUserMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    console.log(modalDetails);
    switch (modalDetails.type) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (userData) {
      e.preventDefault();
      const user = {
        name,
        email,
      };
      const response = await updateUser.mutateAsync(user);
      if (response.status === 200) {
        closeModal();
        setNotificationDetails({
          type: "userUpdate",
          message: "Account information updated successfully!",
          duration: 3000,
          undo: false,
        });
        setUpdatedUser(user);
      }
    }
  };

  return (
    <form action="#" className="p-4" onSubmit={handleSubmit}>
      {modalDetails.info && modalDetails.inputType && (
        <div className="flex flex-col mb-2 justify-center items-center">
          <div className="w-full">
            <label
              htmlFor={modalDetails.info.title}
              className="block mb-2 text-m font-medium text-black"
            >
              {modalDetails.info.inputLabel}
            </label>
            <UserInput
              max={modalDetails.inputType === "date" ? maxBirthday : ""}
              handleChange={handleChange}
              type={modalDetails.inputType}
              name={modalDetails.info.title}
              id={modalDetails.info.title}
              placeholder={modalDetails.info.placeHolder}
              required={true}
              addStyle={"mb-4 w-full"}
            />
          </div>
          <div className="w-1/4">
            <SubmitButton text={"Save"} />
          </div>
        </div>
      )}{" "}
    </form>
  );
}

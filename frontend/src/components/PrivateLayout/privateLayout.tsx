"use client";

import "../../app/globals.css";
import Navbar from "@/components/navigation/navbar";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "@/utils/modalProvider";
import Modal from "../generic/modal/modal";
// import ModalInput from "../generic/input/modalInput/modalInput";
import UpdatePassword from "../generic/input/modalInput/updatePassword";
import UpdateBirthday from "../generic/input/modalInput/updateBirthday";
import UpdateEmail from "../generic/input/modalInput/updateEmail";
import UpdateAccountInfo from "../generic/input/modalInput/updateAccountInfo";
import ConfirmDelete from "../generic/input/modalInput/confirmDelete";
import ModalDetails from "../generic/modal/modalDetails";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { modalData } from "@/atoms/modalAtoms";
import { useRecoilState } from "recoil";
import NotificationBanner from "../generic/error/notificationBanner";
import { Iuser } from "@/interfaces/interfaces";

export const PrivateLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const [modalDetails, setModalDetails] = useRecoilState(modalData);
  const [isClient, setIsClient] = useState(false);

  // const {
  //   status: statusUser,
  //   error: errorMessage,
  //   data: user,
  // } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: getUser,
  // });

  useEffect(() => {
    setIsClient(true);
    if (!document.cookie) {
      router.push("/login");
    }
  }, [router]);

  const { isModalOpen } = useModal();

  return (
    <div>
      <div
        className={`flex flex-row h-screen font-Montserrat ${
          isModalOpen && "transition-all duration-100 blur-sm"
        }`}
      >
        {/* <Sidebar /> */}

        {isClient && document.cookie && (
          <div className="flex-col w-full flex bg-salumeBlue">
            <Navbar />
            {children}
            <NotificationBanner />
          </div>
        )}
      </div>
      <Modal>
        {/* {
          modalDetails.type === "password" ? (
            <UpdatePassword />
          ) : modalDetails.type === "dateOfBirth" ? (
            <UpdateBirthday />
          ) : modalDetails.type === "email" ? (
            <UpdateEmail />
          ) : modalDetails.type === "name" ? (
            <UpdateName />
          ) : modalDetails.type === "delete" ? (
            <ConfirmDelete />
          ) : (
            <ModalDetails />
          ) // <ModalInput text={handleText()} />
        } */}
        {modalDetails.type === "password" ? (
          <UpdatePassword />
        ) : modalDetails.type === "delete" ? (
          <ConfirmDelete />
        ) : modalDetails.type === "recipeSteps" ? (
          <ModalDetails />
        ) : (
          <UpdateAccountInfo />
        )}
      </Modal>
    </div>
  );
};

"use client";

import "../../app/globals.css";
import Navbar from "@/components/navigation/navbar";
import { getUser } from "@/api/userApi";
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

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [modalDetails, setModalDetails] = useRecoilState(modalData);

  // const pathname = usePathname();

  // const handleText = () => {
  //   switch (pathname) {
  //     case "/account/manage/section/security":
  //       if (sessionStorage.getItem("email")) {
  //         return "Email";
  //       } else if (sessionStorage.getItem("password")) {
  //         return "Password";
  //       }
  //     case "/account/manage/section/information":
  //       if (sessionStorage.getItem("name")) {
  //         return "Name";
  //       } else if (sessionStorage.getItem("dateOfBirth")) {
  //         return "Date of birth";
  //       }
  //     case "/account/manage":
  //       if (sessionStorage.getItem("name")) {
  //         return "Name";
  //       } else if (sessionStorage.getItem("dateOfBirth")) {
  //         return "Date of birth";
  //       }
  //     default:
  //       break;
  //   }
  // };

  const {
    status: statusUser,
    error: errorMessage,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (!document.cookie) {
      console.log("unauthorized");
      router.push("/login");
    }
  }, [document.cookie]);

  const { isModalOpen } = useModal();

  return (
    <div>
      <div
        className={`flex flex-row h-screen font-Montserrat ${
          isModalOpen && "transition-all duration-100 blur-sm"
        }`}
      >
        {/* <Sidebar /> */}
        <div className="flex-col w-full flex bg-salumeBlue">
          <Navbar user={user} />
          {children}
          <NotificationBanner />
        </div>
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
}

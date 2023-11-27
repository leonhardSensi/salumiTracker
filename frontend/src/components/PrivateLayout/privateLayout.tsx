"use client";

import "../../app/globals.css";
import Navbar from "@/components/navigation/navbar";
import Sidebar from "@/components/navigation/sidebar";
import { getUser } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "@/utils/modalProvider";
import Modal from "../generic/modal/modal";
import ModalInput from "../generic/input/modalInput/modalInput";
import { usePathname } from "next/navigation";
import UpdatePassword from "../generic/input/modalInput/updatePassword";
import UpdateBirthday from "../generic/input/modalInput/updateBirthday";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleText = () => {
    switch (pathname) {
      case "/account/manage/section/security":
        if (sessionStorage.getItem("email")) {
          return "Email";
        } else if (sessionStorage.getItem("password")) {
          return "Password";
        }
      case "/account/manage/section/information":
        if (sessionStorage.getItem("name")) {
          return "Name";
        } else if (sessionStorage.getItem("dateOfBirth")) {
          return "Date of birth";
        }
      case "/account/manage":
        if (sessionStorage.getItem("name")) {
          return "Name";
        } else if (sessionStorage.getItem("dateOfBirth")) {
          return "Date of birth";
        }
      default:
        break;
    }
  };
  const {
    status: statusUser,
    error: errorMessage,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { isModalOpen, closeModal } = useModal();

  return (
    // <ModalProvider>
    <div>
      <div className={`flex flex-row ${isModalOpen && "blur-sm"}`}>
        <Sidebar />
        <div className="flex-col w-full flex">
          <Navbar user={user} />
          {children}
        </div>
      </div>
      <Modal>
        {sessionStorage.getItem("password") ? (
          <UpdatePassword />
        ) : sessionStorage.getItem("dateOfBirth") ? (
          <UpdateBirthday />
        ) : (
          <ModalInput text={handleText()} />
        )}
      </Modal>
    </div>

    // </ModalProvider>
  );
}

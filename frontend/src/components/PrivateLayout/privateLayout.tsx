"use client";

import "../../app/globals.css";
import Navbar from "../navigation/navbar";
import { useModal } from "../../utils/modalProvider";
import Modal from "../generic/modal/modal";
// import ModalInput from "../generic/input/modalInput/modalInput";
import UpdatePassword from "../generic/input/modalInput/updatePassword";
import UpdateAccountInfo from "../generic/input/modalInput/updateAccountInfo";
import ConfirmDelete from "../generic/input/modalInput/confirmDelete";
import ModalDetails from "../generic/modal/modalDetails";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { modalData } from "../../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import NotificationBanner from "../generic/error/notificationBanner";
import Sidebar from "../navigation/sidebar";
import { Dropdown } from "../generic/input/dropdown/dropdown";

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
      console.log("No cookies found, redirecting...");
      router.push("/login");
    }
  }, [router]);

  const { isModalOpen } = useModal();

  return (
    <div>
      <div
        className={`flex flex-row overflow-hidden h-[100vh] font-Montserrat ${
          isModalOpen && "transition-all duration-100 blur-sm"
        }`}
      >
        {/* <Sidebar /> */}

        {isClient && document.cookie && (
          <div className="w-full flex flex-col">
            <Navbar />
            <div className="flex overflow-hidden bg-eggshell h-full">
              <Sidebar />
              {children}
              <NotificationBanner />
            </div>
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

"use client";

import { getUser } from "@/api/userApi";
import AccountMenu from "@/components/authentication/accountMenu";
import UserCard from "@/components/generic/card/userCard";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { ModalProvider, useModal } from "@/utils/modalProvider";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Modal from "../generic/modal/modal";

export default function ManageAccount() {
  //-----.-.....
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      const modal = document.getElementById("crud-modal");
      //   even if typecasting should be avoided, can i use it here?
      if (modal && !modal.contains(event.target as Node)) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);

  //-.--------
  const { data } = useQuery(["user"], getUser);

  return (
    <PrivateLayout>
      <div className={`flex ml-32 mt-16`}>
        <AccountMenu />
        <div className="grid grid-cols-2 gap-24 w-fit justify-items-start mx-32">
          <UserCard
            title={"Name"}
            details={data ? data.name : ""}
            imgSrc={"/account.svg"}
            isModalOpen={isModalOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
          <UserCard
            title={"Date of birth"}
            details={"03.04.1998"}
            imgSrc={"/calendar.svg"}
            isModalOpen={isModalOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
      </div>
      {/* <Modal
        setModalVisibility={setModalVisibility}
        handleChange={handleChange}
        imgSrc={"/account.svg"}
        title={"Name"}
        details={data && data.name}
        isModalVisible={isModalOpen}
        closeModal={closeModal}
        addStyle={""}
      /> */}
    </PrivateLayout>
  );
}

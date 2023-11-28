"use client";
import { getUser } from "@/api/userApi";
import AccountMenu from "@/components/authentication/accountMenu";
import UserCard from "@/components/generic/card/userCard";
import Modal from "@/components/generic/modal/modal";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { ModalProvider, useModal } from "@/utils/modalProvider";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Information() {
  const { data } = useQuery(["user"], getUser);
  const { isModalOpen, openModal, closeModal } = useModal();

  const setModalVisibility = (visibility: boolean) => {
    // console.log("vis", visibility);
    if (visibility) {
      openModal();
    } else if (!visibility) {
      closeModal();
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    if (event.target.id === "name") {
      //   setName(event.target.value);
    } else if (event.target.id === "email") {
      //   setEmail(event.target.value);
    }
  };

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

  return (
    <ModalProvider>
      <PrivateLayout>
        <div className={`flex ml-32 mt-16 ${isModalOpen && "blur-lg"}`}>
          <AccountMenu />
          <div className="grid grid-cols-2 gap-24 w-fit justify-items-start mx-16">
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
              details={data ? data.date_of_birth : ""}
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
    </ModalProvider>
  );
}

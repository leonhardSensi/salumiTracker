"use client";
import Image from "next/image";
import { IUserCardProps } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";
import UserInput from "../input/userInput";
import SubmitButton from "../button/submitButton";
import Modal from "../modal/modal";
import { ModalProvider, useModal } from "@/utils/modalProvider";

export default function UserCard({
  title,
  details,
  imgSrc,
}: // isModalOpen,
// openModal,
// closeModal,
IUserCardProps) {
  const { isModalOpen, openModal, closeModal } = useModal();

  console.log(title);

  const handleModalData = (id: string) => {
    switch (id) {
      case "Name":
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        sessionStorage.removeItem("dateOfBirth");

        sessionStorage.setItem("name", "name");
        break;
      case "Email":
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("password");
        sessionStorage.removeItem("dateOfBirth");

        sessionStorage.setItem("email", "email");
        break;

      case "Date of birth":
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        sessionStorage.removeItem("name");

        sessionStorage.setItem("dateOfBirth", "dateOfBirth");
        break;
      case "Password":
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("dateOfBirth");

        sessionStorage.setItem("password", "password");
        break;
      default:
        break;
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

  return (
    <>
      <div className="my-16 w-full bg-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer h-fit">
        <button
          onClick={() => {
            openModal();
            handleModalData(title);
          }}
          className="w-full"
        >
          <div className="flex">
            <div className="w-full p-8">
              <div className="mb-2">
                <h1 className="text-black font-bold text-xl text-left">
                  {title}
                </h1>
              </div>
              <p className="text-black text-left">{details}</p>
            </div>
            <Image
              width={60}
              height={60}
              src={imgSrc}
              alt="account"
              className="pr-8"
            />
          </div>
        </button>
      </div>
    </>
  );
}

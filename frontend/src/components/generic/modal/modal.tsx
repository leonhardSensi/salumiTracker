import { getUser, updateUser } from "@/api/userApi";
import { IModalProps } from "@/interfaces/interfaces";
import { useUpdateUserMutation } from "@/mutations/userMutations";
import formatDate from "@/utils/formatDate";
import { useModal } from "@/utils/modalProvider";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SubmitButton from "../button/submitButton";
import UserInput from "../input/userInput";

export default function Modal(
  // { isModalVisible, closeModal }: IModalProps,
  { children }: { children: React.ReactNode }
) {
  const { isModalOpen, closeModal } = useModal();

  const { data } = useQuery(["user"], getUser);

  const pathname = usePathname();

  const checkData = () => {
    if (data) {
      switch (pathname) {
        case "/account/manage/section/security":
          if (sessionStorage.getItem("email")) {
            return data?.email;
          } else if (sessionStorage.getItem("password")) {
            return "Last changed: 24 September 2023";
          }

        case "/account/manage/section/information":
          if (sessionStorage.getItem("name")) {
            return data?.name;
          } else if (sessionStorage.getItem("dateOfBirth")) {
            return formatDate(data.date_of_birth);
          }
        case "/account/manage":
          if (sessionStorage.getItem("name")) {
            return data?.name;
          } else if (sessionStorage.getItem("dateOfBirth")) {
            return formatDate(data.date_of_birth);
          }
        default:
          break;
      }
    }
  };

  const checkLabelData = () => {
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

  const checkImgSrc = () => {
    switch (pathname) {
      case "/account/manage/section/security":
        if (sessionStorage.getItem("email")) {
          return "/email.svg";
        } else if (sessionStorage.getItem("password")) {
          return "/password.svg";
        }
      case "/account/manage/section/information":
        if (sessionStorage.getItem("name")) {
          return "/defaultProfile.svg";
        } else if (sessionStorage.getItem("dateOfBirth")) {
          return "/calendar.svg";
        }
      case "/account/manage":
        if (sessionStorage.getItem("name")) {
          return "/account.svg";
        } else if (sessionStorage.getItem("dateOfBirth")) {
          return "/calendar.svg";
        }
      default:
        return "/default.png";
    }
  };

  return isModalOpen ? (
    <>
      <div className="fixed bg-gray-300 bg-opacity-50 w-full h-full z-40 flex overflow-y-auto overflow-x-hidden justify-center items-center m-auto max-h-full"></div>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`flex fixed overflow-y-auto overflow-x-hidden z-50 justify-center items-center m-auto w-1/3 h-fit md:inset-0 max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white border border-gray-600 rounded-xl">
            <div className="flex flex-col items-start justify-center p-4 md:p-5 border-b rounded-t border-gray-200">
              <button
                type="button"
                className="text-gray-600 bg-transparent rounded-full text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-100 hover:text-black"
                data-modal-toggle="crud-modal"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="flex justify-center w-full mb-2">
                <Image
                  src={checkImgSrc()}
                  alt={"icon"}
                  width={80}
                  height={80}
                  className={`${
                    sessionStorage.getItem("name") && "rounded-full"
                  }`}
                />
              </div>
              <div className="flex justify-center w-full mb-4">
                <h1 className="text-4xl font-semibold text-black">
                  {checkLabelData()}
                </h1>
              </div>
              <div className="flex justify-center w-full">
                <h3 className="text-2xl text-black">{checkData()}</h3>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div></div>
  );
}

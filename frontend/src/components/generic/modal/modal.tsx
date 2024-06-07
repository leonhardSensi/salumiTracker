import { modalData } from "../../../atoms/modalAtoms";
import { useModal } from "../../../utils/modalProvider";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";

export default function Modal({ children }: { children: React.ReactNode }) {
  const { isModalOpen, closeModal } = useModal();

  const [modalDetails, setModalDetails] = useRecoilState(modalData);

  const checkImgSrc = () => {
    switch (modalDetails.type) {
      case "name":
        return "/account.svg";
      case "email":
        return "/email.svg";
      case "dateOfBirth":
        return "/calendar.svg";
      case "password":
        return "/password.svg";
      case "success":
        return "/success.gif";
      default:
        return "";
    }
  };

  return isModalOpen ? (
    <>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`flex fixed overflow-y-auto overflow-x-hidden z-50 justify-center items-center m-auto w-1/3 h-fit inset-0 max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-salumeWhite border border-gray-600 rounded-xl">
            <div className="flex flex-col items-start justify-center p-4 md:p-5 border-b rounded-t border-gray-200">
              <button
                type="button"
                className="text-black bg-transparent rounded-full text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-salumeBlue hover:text-salumeWhite transition-all duration-200 ease-in-out"
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
                {checkImgSrc() && (
                  <Image
                    src={checkImgSrc()}
                    alt={"icon"}
                    width={80}
                    height={80}
                    className={`${
                      sessionStorage.getItem("name") && "rounded-full"
                    }`}
                  />
                )}
              </div>
              <div className="flex justify-center w-full mb-4">
                <h1 className="text-4xl font-semibold text-black">
                  {modalDetails.info?.title}
                </h1>
              </div>
              <div className="flex justify-center w-full">
                <h3 className="text-2xl text-black">
                  {modalDetails.info?.details}
                </h3>
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

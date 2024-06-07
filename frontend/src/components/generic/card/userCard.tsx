"use client";
import Image from "next/image";
import { IUserCardProps } from "../../../interfaces/interfaces";
import { useEffect } from "react";
import { useModal } from "../../../utils/modalProvider";
import { modalData } from "../../../atoms/modalAtoms";
import { useRecoilState } from "recoil";

export default function UserCard({ title, details, imgSrc }: IUserCardProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalDetails, setModalDetails] = useRecoilState(modalData);

  const handleModalData = (id: string) => {
    switch (id) {
      case "Name":
        setModalDetails({
          type: "name",
          inputType: "text",
          info: {
            image: "",
            title,
            details,
            inputLabel: "New name",
            placeHolder: "Your name",
            user: { name: "", email: "", dateOfBirth: "" },
            data: {},
            recipeSteps: [],
          },
        });
        break;
      case "Email":
        setModalDetails({
          type: "email",
          inputType: "email",
          info: {
            image: "",
            title,
            details,
            inputLabel: "New email address",
            placeHolder: "yourname@company.com",
            user: { name: "", email: "", dateOfBirth: "" },
            data: {},
            recipeSteps: [],
          },
        });
        break;

      case "Date of birth":
        setModalDetails({
          type: "dateOfBirth",
          inputType: "date",
          info: {
            image: "",
            title,
            details,
            inputLabel: "New date of birth",
            placeHolder: "",
            user: { name: "", email: "", dateOfBirth: "" },
            data: {},
            recipeSteps: [],
          },
        });
        break;
      case "Password":
        setModalDetails({
          type: "password",
          inputType: "password",
          info: {
            image: "",
            title,
            details,
            inputLabel: "",
            placeHolder: "",
            user: { name: "", email: "", dateOfBirth: "" },
            data: {},
            recipeSteps: [],
          },
        });
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
      <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer h-fit">
        <button
          onClick={() => {
            openModal();
            handleModalData(title);
          }}
          className="w-full"
        >
          <div className="flex items-center">
            <div className="w-full p-8">
              <div className="mb-2">
                <h1 className="text-black font-bold text-xl text-left">
                  {title}
                </h1>
              </div>
              <p className="text-black text-left">{details}</p>
            </div>
            <Image
              width={100}
              height={100}
              src={imgSrc}
              alt="usercard-picture"
              className="pr-8 items-center w-1/4 h-1/4"
            />
          </div>
        </button>
      </div>
    </>
  );
}

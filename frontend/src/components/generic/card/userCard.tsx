"use client";
import Image from "next/image";
import { IUserCardProps } from "../../../interfaces/interfaces";
import { useEffect } from "react";
import { useModal } from "../../../utils/modalProvider";
import { modalData } from "../../../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import { CircleUserRound, Mail, Lock } from "lucide-react";

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
            user: { name: "", email: "" },
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
            user: { name: "", email: "" },
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
            user: { name: "", email: "" },
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
      <div className="w-full bg-flesh rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer h-fit">
        <button
          onClick={() => {
            openModal();
            handleModalData(title);
          }}
          className="w-full"
        >
          <div className="flex items-center">
            <div className="w-full p-8">
              <div className="mb-2 flex items-center space-x-2">
                {title === "Name" && <CircleUserRound size={24} />}
                {title === "Email" && <Mail size={24} />}
                {title === "Password" && <Lock size={24} />}

                <h1 className="font-bold text-xl text-left">{title}</h1>
              </div>
              <p className="text-left">{details}</p>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}

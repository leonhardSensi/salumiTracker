"use client";

import AccountMenu from "@/components/authentication/accountMenu";
import UserCard from "@/components/generic/card/userCard";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { Iuser, IUserProps } from "@/interfaces/interfaces";
import { ModalProvider, useModal } from "@/utils/modalProvider";
import formatDate from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/userApi";
import { useRecoilState } from "recoil";
import { updateUserData } from "@/atoms/userAtoms";
import { useEffect, useState } from "react";

export default function ManageAccount() {
  const { data: userData } = useQuery(["user"], getUser);

  const { isModalOpen, openModal, closeModal } = useModal();
  const [user, setUser] = useState<Iuser | undefined>(userData);
  const [updatedUser, setUpdatedUser] = useRecoilState(updateUserData);

  const fetchUser = async () => {
    const data = await getUser();
    if (data) {
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [updatedUser]);

  return (
    <ModalProvider>
      <PrivateLayout>
        {userData && (
          <div className={`flex flex-col ml-32 mt-16`}>
            <AccountMenu user={user} />
            <div className="flex">
              <div className="flex flex-col ml-16 space-y-48">
                <p className="text-2xl text-salumeWhite">
                  Personal Information
                </p>
                <p className="text-2xl text-salumeWhite">
                  Sign-In and Security
                </p>
              </div>

              {user && (
                <div className="grid grid-cols-2 gap-24 w-fit justify-items-start mx-16">
                  <UserCard
                    title={"Name"}
                    details={user.name}
                    imgSrc={"/account.svg"}
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    closeModal={closeModal}
                  />
                  <UserCard
                    title={"Date of birth"}
                    details={user.date_of_birth}
                    imgSrc={"/calendar.svg"}
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    closeModal={closeModal}
                  />
                  <UserCard
                    title={"Email"}
                    details={user.email}
                    imgSrc={"/email.svg"}
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    closeModal={closeModal}
                  />
                  <UserCard
                    title={"Password"}
                    details={`Last updated: ${formatDate(user.updated_at)}`}
                    imgSrc={"/password.svg"}
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    closeModal={closeModal}
                  />
                </div>
              )}
            </div>
          </div>
        )}{" "}
      </PrivateLayout>
    </ModalProvider>
  );
}

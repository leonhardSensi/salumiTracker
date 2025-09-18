"use client";

import AccountMenu from "../../components/authentication/accountMenu";
import UserCard from "../../components/generic/card/userCard";
import { PrivateLayout } from "../PrivateLayout/privateLayout";
import { Iuser } from "../../interfaces/interfaces";
import { ModalProvider, useModal } from "../../utils/modalProvider";
import formatDate from "../../utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/userApi";
import { useRecoilState } from "recoil";
import { updateUserData } from "../../atoms/userAtoms";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
          <motion.div
            className="flex flex-col ml-32 mt-16 text-stone"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AccountMenu user={user} />
            </motion.div>
            <motion.div
              className="flex"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="flex flex-col ml-16 space-y-48"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-2xl">Personal Information</p>
                <p className="text-2xl">Sign-In and Security</p>
              </motion.div>

              {user && (
                <motion.div
                  className="grid grid-cols-2 gap-24 w-fit justify-items-start mx-16"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <UserCard
                    title={"Name"}
                    details={user.name}
                    imgSrc={"/account.svg"}
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
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </PrivateLayout>
    </ModalProvider>
  );
}

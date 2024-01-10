"use client";

import AccountMenu from "@/components/authentication/accountMenu";
import UserCard from "@/components/generic/card/userCard";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { IManageProps } from "@/interfaces/interfaces";
import { ModalProvider, useModal } from "@/utils/modalProvider";

export default function ManageAccount({ titles, imgSrcs, data }: IManageProps) {
  // const { data } = useQuery(["user"], getUser);
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <ModalProvider>
      <PrivateLayout>
        <div className={`flex ml-32 mt-16`}>
          <AccountMenu />
          <div className="grid grid-cols-2 gap-24 w-fit justify-items-start mx-16">
            <UserCard
              title={titles[0]}
              details={data[0]}
              imgSrc={imgSrcs[0]}
              isModalOpen={isModalOpen}
              openModal={openModal}
              closeModal={closeModal}
            />
            <UserCard
              title={titles[1]}
              details={data[1]}
              imgSrc={imgSrcs[1]}
              isModalOpen={isModalOpen}
              openModal={openModal}
              closeModal={closeModal}
            />
          </div>
        </div>
      </PrivateLayout>
    </ModalProvider>
  );
}

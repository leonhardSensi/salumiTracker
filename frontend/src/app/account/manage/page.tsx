"use client";

import ManageAccount from "@/components/authentication/manage";
import { ModalProvider } from "@/utils/modalProvider";

export default function Manage() {
  return (
    <ModalProvider>
      <ManageAccount />
      {/* <Modal
    //  isModalOpen={isModalOpen}
    //  closeModal={closeModal}
    // setModalVisibility={setModalVisibility}
    // handleChange={handleChange}
    // imgSrc={"/account.svg"}
    // addStyle={`${!isModalVisible && "hidden"}`}/>
  */}
    </ModalProvider>
  );
}

import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("dateOfBirth");
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

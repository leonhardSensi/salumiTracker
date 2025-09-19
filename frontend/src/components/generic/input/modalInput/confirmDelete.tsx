import { modalData } from "../../../../atoms/modalAtoms";
import { notificationState } from "../../../../atoms/notificationAtoms";
import { useDeleteRecipeMutation } from "../../../../mutations/recipeMutations";
import { useDeleteSalumeMutation } from "../../../../mutations/salumeMutation";
import { useModal } from "../../../../utils/modalProvider";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import GenericButton from "../../button/genericButton";
import SubmitButton from "../../button/submitButton";

export default function ConfirmDelete() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const modalDetails = useRecoilValue(modalData);
  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);

  const deleteRecipe = useDeleteRecipeMutation();
  const deleteSalume = useDeleteSalumeMutation();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        modalDetails.subject === "recipe" &&
        modalDetails.info &&
        modalDetails.info.data.id
      ) {
        const response = await deleteRecipe.mutateAsync(
          modalDetails.info.data.id
        );
        closeModal();
        if (response.status === 204) {
          setNotificationDetails({
            type: "delete",
            message: "Recipe deleted successfully!",
            duration: 3000,
            undo: false,
          });
        }
      } else if (
        modalDetails.subject === "salume" &&
        modalDetails.info &&
        modalDetails.info.data.id
      ) {
        const response = await deleteSalume.mutateAsync(
          modalDetails.info.data.id
        );
        closeModal();
        if (response.status === 204) {
          setNotificationDetails({
            type: "delete",
            message: "Salume deleted successfully!",
            duration: 3000,
            undo: false,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action="#" className="p-4" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-2 justify-center items-center">
        <div className="w-full text-center mb-8 text-salumeBlue text-xl">
          <p>
            Are you sure you want to delete{" "}
            {modalDetails.info && modalDetails.info.data.name}?
          </p>
          <p> All associated salumi will be removed as well!</p>
        </div>
        <div className="w-full flex justify-around">
          <GenericButton text={"Cancel"} onClick={closeModal} />
          <SubmitButton text={"Confirm"} />
        </div>
      </div>
    </form>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import Image from "next/image";
import Link from "next/link";
import {
  IDashboardSalumeState,
  ISalumeWithDuration,
} from "../../interfaces/interfaces";
import { useRecoilState } from "recoil";
import {
  curingState,
  saltingState,
  dryingState,
  completedState,
} from "../../atoms/salumiAtoms";
import { useUpdateSalumeStateMutation } from "../../mutations/salumeMutation";
import { notificationState } from "../../atoms/notificationAtoms";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "../../utils/modalProvider";
import { modalData } from "../../atoms/modalAtoms";

const bannerVariants = {
  hidden: { y: -80, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 32,
      duration: 0.5,
    },
  },
  exit: {
    y: -80,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.35, ease: "easeInOut" as const },
  },
};

export default function SalumePreview({
  salume,
  duration,
}: ISalumeWithDuration) {
  const [isActive, setIsActive] = useState(false);
  const updateSalumeState = useUpdateSalumeStateMutation();

  const [curing, setCuring] =
    useRecoilState<IDashboardSalumeState[]>(curingState);
  const [salting, setSalting] =
    useRecoilState<IDashboardSalumeState[]>(saltingState);
  const [drying, setDrying] =
    useRecoilState<IDashboardSalumeState[]>(dryingState);

  // Fix type issue here
  const [completed, setCompleted] = useRecoilState<IDashboardSalumeState[]>(
    completedState as any
  );

  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);
  const [revertInProgress, setRevertInProgress] = useState(false);

  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalDetails, setModalDetails] = useRecoilState(modalData);

  const [{ isDragging }, drag] = useDrag({
    type: "salume",
    item: { salume: salume },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Save previous state for revert
  const [prevState, setPrevState] = useState<string | null>(null);

  const handleModalData = () => {
    openModal();
    setModalDetails({
      type: "confirm",
      inputType: "number",
      info: {
        image: "",
        title: `Do you want to add a final weight for ${salume.name}?`,
        details: `This will help you track the progress across multiple batches.`,
        inputLabel: "New email address",
        placeHolder: "yourname@company.com",
        user: { name: "", email: "" },
        data: {},
        recipeSteps: [],
      },
    });
  };

  const handleCheckBoxChange = async () => {
    if (salume.state !== "completed") {
      const prev = salume.state; // capture previous state

      // Mark as completed
      updateSalumeState.mutate({
        id: salume.id,
        name: salume.name,
        notes: salume.notes,
        recipeId: salume.recipe.id,
        state: "completed",
        rating: 0,
      });

      setCompleted([
        ...completed,
        {
          salume: { ...salume, state: "completed" },
          duration: duration,
        },
      ]);

      setNotificationDetails({
        type: "completed",
        message: `Marked "${salume.name}" as completed.`,
        duration: 5000,
        undo: true,
        undoLabel: "Undo",
        onUndo: () => {
          updateSalumeState.mutate({
            id: salume.id,
            name: salume.name,
            notes: salume.notes,
            recipeId: salume.recipe.id,
            state: prev,
            rating: 0,
          });
          setCompleted(
            completed.filter((item) => item.salume.id !== salume.id)
          );
          if (prev === "curing") {
            setCuring((prevArr) => [
              ...prevArr,
              { salume: { ...salume, state: prev }, duration },
            ]);
          } else if (prev === "salting") {
            setSalting((prevArr) => [
              ...prevArr,
              { salume: { ...salume, state: prev }, duration },
            ]);
          } else if (prev === "drying") {
            setDrying((prevArr) => [
              ...prevArr,
              { salume: { ...salume, state: prev }, duration },
            ]);
          }
        },
      });
      setIsActive(!isActive);
    }
  };

  return (
    salume && (
      <>
        <li
          key={`salume-${salume.id}`}
          className={`flex w-full pr-2 items-center ${
            isDragging ? "hidden" : ""
          }`}
          ref={drag}
        >
          {salume ? (
            <>
              {isActive ? (
                <></>
              ) : (
                <>
                  <Image
                    src="/drag.svg"
                    width={30}
                    height={30}
                    alt="drag"
                    className=""
                  />
                  <div className="flex justify-between ml-4 w-full space-x-8 items-center">
                    <Link href={`/salumi/${salume.id}`}>
                      <li className="text-black text-4xl font-serif">
                        {salume.name}
                      </li>
                    </Link>

                    {duration > 0 ? (
                      <li>{duration.toString()} days left</li>
                    ) : duration === 0 ? (
                      salume.state === "completed" ? (
                        <li className="text-stone">Just now</li>
                      ) : (
                        <li className="text-stone">Ready</li>
                      )
                    ) : (
                      <li className="text-red-300">
                        {duration.toString().slice(1)} days ago
                      </li>
                    )}

                    <div>
                      <Image
                        src={"/checkbox.svg"}
                        alt={"checkbox"}
                        width={40}
                        height={40}
                        className={`${
                          salume.state !== "completed" && "saturate-0"
                        }`}
                        onClick={handleCheckBoxChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <li className="text-black text-4xl font-Satisfy">Loading...</li>
          )}
        </li>
      </>
    )
  );
}

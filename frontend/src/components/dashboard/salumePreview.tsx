"use client";
import { useEffect, useState } from "react";
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
import { Check, Eye } from "lucide-react";

export default function SalumePreview({
  salume,
  duration,
}: ISalumeWithDuration) {
  const [isActive, setIsActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const updateSalumeState = useUpdateSalumeStateMutation();

  const [curing, setCuring] =
    useRecoilState<IDashboardSalumeState[]>(curingState);
  const [salting, setSalting] =
    useRecoilState<IDashboardSalumeState[]>(saltingState);
  const [drying, setDrying] =
    useRecoilState<IDashboardSalumeState[]>(dryingState);

  const [completed, setCompleted] = useRecoilState<IDashboardSalumeState[]>(
    completedState as any
  );

  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);

  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalDetails, setModalDetails] = useRecoilState(modalData);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ salume, duration })
    );
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
  };

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
      const prev = salume.state;

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

  const isOverdue = duration < 0;

  return (
    salume && (
      <li
        key={`salume-${salume.id}`}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="group relative bg-eggshell backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 cursor-move border border-wetSand/30 list-none"
        style={{
          opacity: isDragging ? 0.4 : 1,
        }}
      >
        {salume && !isActive && (
          <div className="relative flex items-center gap-3">
            {/* Drag handle */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-wetSand opacity-40 group-hover:opacity-100 transition-opacity"
            >
              <Image
                src="/drag.svg"
                width={24}
                height={24}
                alt="drag"
                className="select-none pointer-events-none"
              />
            </motion.div>
            <div className="flex justify-between w-full items-center">
              {/* Salumi name */}
              <div className="flex items-center space-x-4 max-w-fit">
                <Link href={`/salumi/${salume.id}`}>
                  <Eye
                    size={32}
                    className="text-stone hover:text-wetSand transition-colors"
                  />
                </Link>

                <h3 className="text-stone text-xl font-serif">{salume.name}</h3>
              </div>
              <div className="flex items-center gap-4">
                {/* Time info */}
                <span
                  className={`text-sm font-medium whitespace-nowrap ${
                    isOverdue ? "text-red-500" : "text-stone"
                  }`}
                >
                  {duration > 0
                    ? `${duration} days left`
                    : duration === 0
                    ? salume.state === "completed"
                      ? "Just now"
                      : "Ready"
                    : `${Math.abs(duration)} days ago`}
                </span>

                {/* Complete checkbox */}
                <motion.button
                  whileHover={{ scale: 1.1, color: "#DEB992" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCheckBoxChange}
                  className="w-8 h-8 rounded-lg border-2 border-wetSand flex items-center justify-center hover:bg-wetSand hover:border-wetSand transition-colors group/check"
                >
                  <Check
                    size={16}
                    className="text-wetSand group-hover/check:text-white transition-colors"
                  />
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </li>
    )
  );
  //       )}
  //     </li>
  //   )
  // );
}

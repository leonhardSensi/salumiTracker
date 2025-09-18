import { getRecipe } from "../../api/recipeApi";
import {
  IItem,
  Irecipe,
  IRecipeProps,
  RenderRecipeProps,
} from "../../interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import UserInput from "../generic/input/userInput";
import { useModal } from "../../utils/modalProvider";
import { useRecoilState } from "recoil";
import { modalData } from "../../atoms/modalAtoms";
import { motion } from "framer-motion";
import React from "react";

export default function RenderRecipe({
  recipe,
  setStartWeight,
}: RenderRecipeProps) {
  const {
    status: statusRecipe,
    error: errorRecipe,
    data: currentRecipe,
  } = useQuery({
    queryKey: ["recipe", recipe.id],
    queryFn: () => getRecipe(recipe.id),
  });

  const [userInputs, setUserInputs] = useState<IAdaptCut[]>([]);
  let wakeLock: {
    addEventListener: (arg0: string, arg1: () => void) => void;
    release: () => any;
  } | null = null;

  // Function that attempts to request a wake lock.
  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => {
        console.log("Wake Lock was released");
      });
      console.log("Wake Lock is active");
    } catch (err) {
      console.error(err);
    }
  };

  // Function that attempts to release the wake lock.
  const releaseWakeLock = async () => {
    if (!wakeLock) {
      return;
    }
    try {
      await wakeLock.release();
      wakeLock = null;
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkbox = e.target;
    if (checkbox.checked === true) {
      requestWakeLock();
    } else if (checkbox.checked === false) {
      releaseWakeLock();
    }
  };

  interface IAdaptCut {
    name: string;
    quantity: string;
  }
  // const [invertedSteps, setInvertedSteps] = useState([]);
  const [modalDetails, setModalDetails] = useRecoilState(modalData);

  const { openModal, closeModal, isModalOpen } = useModal();

  // ------------------------------------------ OLD FUNCTION USING INDEX ------------------------------------------
  // useEffect(() => {
  //   setInvertedSteps(currentRecipe?.steps.reverse());
  // }, [currentRecipe]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
    name: string
  ) => {
    const quantity = e.target.value;

    const updatedInputs = [...userInputs];
    const existingInputIndex = updatedInputs.findIndex(
      (input) => input.name === name
    );

    if (existingInputIndex !== -1) {
      updatedInputs[existingInputIndex] = { name, quantity };
    } else {
      updatedInputs.push({ name, quantity });
    }

    setUserInputs(updatedInputs);

    const updatedStartWeight = updatedInputs.reduce(
      (sum, input) => sum + (Number(input.quantity) || 0),
      0
    );
    setStartWeight(updatedStartWeight);
  };

  // ------------------------------------------ ------------------------ ------------------------------------------

  // const handleInputChange = (
  //   e: React.ChangeEvent<
  //     HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
  //   >,
  //   cut: string
  // ) => {
  //   const inputQuantity = e.target.value;
  //   currentRecipe?.cuts.forEach((cut) => {
  //     setUserInputs([
  //       ...userInputs,
  //       { name: cut.name, quantity: inputQuantity },
  //     ]);
  //   });
  // };

  // useEffect(() => {
  //   currentRecipe?.cuts.forEach((cut) => {
  //     ingredientRatio(cut.quantity, props.cutQuantity);
  //   });
  // }, [props.cutQuantity]);

  // useEffect(() => {
  //   getTotalWeight(userInputs);
  // }, [userInputs]);

  const getTotalWeight = (cuts: IAdaptCut[] | IItem[]) => {
    let total = 0;
    cuts.forEach((cut) => {
      total += Number(cut.quantity);
    });
    return total;
  };

  const adaptSpices = (spiceQuantity: number) => {
    if (currentRecipe) {
      const originalTotal = getTotalWeight(currentRecipe.cuts);
      const total = getTotalWeight(userInputs);
      const ratio = total / originalTotal;
      return Math.floor((spiceQuantity *= ratio));
    }
  };

  const handleClick = () => {
    if (currentRecipe) {
      setModalDetails({
        type: "recipeSteps",
        inputType: "",
        info: {
          image: "",
          title: "Step by step",
          details: "",
          inputLabel: "",
          placeHolder: "",
          user: {
            name: "",
            email: "",
            dateOfBirth: "",
          },
          data: {},
          recipeSteps: currentRecipe.steps,
        },
      });
      openModal();
    }
  };

  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      const modal = document.getElementById("crud-modal");
      // even if typecasting should be avoided, can i use it here?
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

  // Add state for step deck
  const [stepIndex, setStepIndex] = useState(0);

  // Navigation handlers
  const prevStep = () =>
    setStepIndex((i) =>
      currentRecipe && currentRecipe.steps.length
        ? (i - 1 + currentRecipe.steps.length) % currentRecipe.steps.length
        : 0
    );
  const nextStep = () =>
    setStepIndex((i) =>
      currentRecipe && currentRecipe.steps.length
        ? (i + 1) % currentRecipe.steps.length
        : 0
    );

  return (
    <div className="flex flex-col items-center justify-center my-16 w-full">
      <h1 className="text-6xl my-12 font-serif text-wetSand drop-shadow">
        {currentRecipe?.title}
      </h1>
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl shadow-2xl bg-eggshell/90 overflow-hidden border border-wetSand">
        {/* Cuts Input */}
        <div className="flex flex-col w-full md:w-1/2 items-start px-12 py-12 border-b md:border-b-0 md:border-r border-wetSand bg-flesh/60">
          <h2 className="text-3xl mb-8 font-bold text-wetSand font-serif">
            Available quantity
          </h2>
          {currentRecipe &&
            currentRecipe?.cuts.map((cut) => (
              <div className="mb-6 w-full" key={`cut-${cut.id}`}>
                <label className="block text-lg font-semibold text-wetSand mb-2">
                  {cut.name}
                </label>
                <UserInput
                  handleChange={(e) => handleInputChange(e, cut.name)}
                  name="cutQuantity"
                  type="number"
                  id="cutQuantity"
                  placeholder="2000"
                  step="1"
                  defaultValue=""
                  min={0}
                  required={false}
                  width="w-full"
                  addStyle="rounded-xl border-wetSand border px-4 py-2 bg-eggshell"
                />
              </div>
            ))}
        </div>
        {/* Ingredients */}
        <div className="flex flex-col w-full md:w-1/2 items-end px-12 py-12 bg-eggshell">
          <h2 className="text-3xl mb-8 font-bold text-wetSand font-serif">
            Ingredients
          </h2>
          <div className="mb-4 w-full">
            <div className="mb-8 flex flex-col items-end">
              <h3 className="text-2xl font-semibold text-wetSand mb-2">Cuts</h3>
              <ul className="w-full">
                {userInputs?.map((cut, index) => (
                  <li
                    key={`cut-${index}`}
                    className={`text-lg p-2 flex justify-between items-center rounded-lg mb-2 ${
                      index % 2 === 0
                        ? "bg-flesh/40 border border-wetSand"
                        : "bg-eggshell"
                    }`}
                  >
                    <span className="font-bold text-wetSand">
                      {cut.quantity}g
                    </span>
                    <span className="ml-4">{cut.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-end">
              <h3 className="text-2xl font-semibold text-wetSand mb-2">
                Spices
              </h3>
              <ul className="w-full">
                {currentRecipe?.spices.map((spice, index) => (
                  <li
                    key={`spice-${index}`}
                    className={`text-lg p-2 flex justify-between items-center rounded-lg mb-2 ${
                      index % 2 === 0
                        ? "bg-flesh/40 border border-wetSand"
                        : "bg-eggshell"
                    }`}
                  >
                    <span className="font-bold text-wetSand">
                      {spice.quantity && adaptSpices(spice.quantity)}g
                    </span>
                    <span className="ml-4">{spice.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Steps Section */}
      <div className="w-full max-w-2xl flex flex-col items-center border-t-4 border-wetSand mt-12 pt-8">
        <div className="flex items-center mb-6 relative z-20">
          <h2 className="text-3xl font-bold text-wetSand font-serif">Steps</h2>
        </div>
        <div className="relative w-full flex justify-center items-center min-h-[420px]">
          {currentRecipe?.steps.map((step, i) => {
            // Deck logic
            let pos = i - stepIndex;
            if (pos < -Math.floor(currentRecipe.steps.length / 2))
              pos += currentRecipe.steps.length;
            if (pos > Math.floor(currentRecipe.steps.length / 2))
              pos -= currentRecipe.steps.length;

            const isActive = pos === 0;
            const scale = isActive ? 1 : 0.92;
            const y = pos * 30;
            const z = 100 - Math.abs(pos);
            const opacity = Math.abs(pos) > 2 ? 0 : 1;

            return (
              <motion.div
                key={step.id}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  zIndex: z,
                  opacity,
                  pointerEvents: isActive ? "auto" : "none",
                }}
                className={`absolute w-full max-w-2xl p-0 flex flex-col items-center ${
                  isActive ? "ring-4 ring-wetSand" : ""
                }`}
                animate={{
                  scale,
                  y,
                  boxShadow: isActive
                    ? "0 12px 48px 0 rgba(0,0,0,0.18)"
                    : "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  className={`relative w-full h-full bg-gradient-to-br from-flesh to-eggshell rounded-3xl shadow-2xl border border-wetSand transition-all duration-300 ${
                    isActive
                      ? "scale-105"
                      : "opacity-80 blur-[1px] grayscale-[0.2]"
                  }`}
                >
                  <div className="flex flex-col items-center px-12 py-8">
                    <h4 className="text-2xl font-serif font-bold underline mb-2 text-wetSand">
                      {step.name}
                    </h4>
                    <p className="mb-2 text-sm text-wetSand/70">
                      Step {i + 1}/{currentRecipe.steps.length}
                    </p>
                    <div className="flex h-fit mt-4">
                      <span className="pr-1">{"•"}</span>
                      <div className="flex flex-col items-start justify-start">
                        <h5 className="text-lg font-semibold">Duration:</h5>
                        <p>
                          {step.duration ? step.duration : step.statusDuration}{" "}
                          {step.duration ? "minutes" : "days"}
                        </p>
                      </div>
                    </div>
                    <div className="flex h-fit mt-4 w-full">
                      <span className="pr-1">{"•"}</span>
                      <div className="flex flex-col items-start justify-start w-full">
                        <h5 className="text-lg font-semibold">Description:</h5>
                        <div
                          className="max-h-40 overflow-y-auto w-full break-words pr-2"
                          style={{ wordBreak: "break-word" }}
                        >
                          <p>{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-center gap-8 mt-6 relative z-20">
          <button
            type="button"
            onClick={prevStep}
            className="bg-wetSand text-eggshell px-4 py-2 rounded-full shadow hover:scale-105 transition"
            aria-label="Previous step"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-wetSand text-eggshell px-4 py-2 rounded-full shadow hover:scale-105 transition"
            aria-label="Next step"
          >
            ↓
          </button>
        </div>
        <div className="mt-4 flex gap-2 relative z-20">
          {currentRecipe?.steps.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === stepIndex
                  ? "bg-wetSand"
                  : "bg-eggshell border border-wetSand"
              } inline-block`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

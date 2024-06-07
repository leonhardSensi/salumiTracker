import { getRecipe } from "../../api/recipeApi";
import { IItem, Irecipe, IRecipeProps } from "../../interfaces/interfaces";
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

export default function RenderRecipe({ recipe }: IRecipeProps) {
  const {
    status: statusRecipe,
    error: errorRecipe,
    data: currentRecipe,
  } = useQuery({
    queryKey: ["recipe", recipe.id],
    queryFn: () => getRecipe(recipe.id),
  });

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
  const [userInputs, setUserInputs] = useState<IAdaptCut[]>([]);
  const [modalDetails, setModalDetails] = useRecoilState(modalData);

  const { openModal, closeModal, isModalOpen } = useModal();

  // ------------------------------------------ OLD FUNCTION USING INDEX ------------------------------------------
  // useEffect(() => {
  //   setInvertedSteps(currentRecipe?.steps.reverse());
  // }, [currentRecipe]);

  console.log(userInputs);

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
      // Update existing input
      updatedInputs[existingInputIndex] = { name, quantity };
    } else {
      // Add new input
      updatedInputs.push({ name, quantity });
    }
    setUserInputs(updatedInputs);
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

  return (
    <div className="text-salumeWhite flex flex-col justify-center items-center my-16">
      <h1 className="text-6xl my-12 font-Satisfy text-salumeWhite">
        {currentRecipe?.title}
      </h1>
      <div className="flex justify-between w-full font-Montserrat">
        <div className="flex flex-col w-1/2 items-start border-salumeWhite border-double border-r-8">
          <h2 className="text-3xl mb-8 font-bold">Available quantity</h2>
          {currentRecipe &&
            currentRecipe?.cuts.map((cut) => (
              <div className="mb-4" key={`cut-${cut.id}`}>
                <label>{cut.name}</label>
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
                ></UserInput>
              </div>
            ))}
        </div>
        <div className="flex w-1/2 flex-col items-end">
          <h2 className="text-3xl mb-8 font-bold">Ingredients</h2>

          <div className="mb-4 w-3/4">
            <div className="mb-4 flex flex-col items-end">
              <h3 className="text-3xl">Cuts</h3>
              <ul className="w-full">
                {userInputs?.map((cut, index) => {
                  return (
                    <li
                      key={`cut-${index}`}
                      className={`text-xl p-2 flex justify-between text-black ${
                        index % 2 !== 1 &&
                        "border rounded-lg border-salumeBlue bg-salumeWhite bg-opacity-30"
                      }`}
                    >
                      <p>{cut.quantity}g </p>
                      <p>{cut.name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col items-end">
              <h3 className="text-3xl">Spices</h3>
              <ul className="w-full">
                {currentRecipe?.spices.map((spice, index) => {
                  return (
                    <li
                      key={`spice-${index}`}
                      className={`text-xl p-2 flex justify-between text-black ${
                        index % 2 !== 1 &&
                        "border rounded-lg border-salumeBlue bg-salumeWhite bg-opacity-30"
                      }`}
                    >
                      <p>{spice.quantity && adaptSpices(spice.quantity)}g </p>
                      <p>{spice.name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-8 border-double border-t-8 border-t-salumeWhite mt-4">
        <div className="flex flex-col w-full items-start justify-center space-y-4">
          <div className="flex">
            <h2 className="text-3xl font-bold mt-4">Steps</h2>
            <div className="mt-4 ml-4">
              <p
                className="bg-salumeWhite border-salumeWhite rounded-full p-2 text-md cursor-pointer text-salumeBlue hover:bg-opacity-80 hover:shadow-lg transition-all"
                onClick={handleClick}
              >
                Step by step
              </p>
            </div>
          </div>
          <div className="">
            {/* <label className="flex cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={(e) => handleToggleChange(e)}
              />
              <div className="relative w-11 h-6 bg-salumeWhite peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-salumeBlue after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-salumeWhite peer-checked:bg-opacity-50"></div>
              <span className="ms-3 text-sm font-medium text-salumeWhite">
                Prevent screen from sleep
              </span>
            </label> */}
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                id="switch"
                type="checkbox"
                className="peer sr-only"
                onChange={(e) => handleToggleChange(e)}
              />
              <label htmlFor="switch" className="hidden"></label>
              <div className="peer h-6 w-11 rounded-full border border-salumeWhite bg-salumeBlue after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-salumeWhite after:transition-all after:content-[''] peer-checked:bg-salumeWhite peer-checked:after:translate-x-full peer-checked:after:bg-salumeBlue"></div>
              <span className="ms-3 text-sm font-medium text-salumeWhite">
                Prevent screen from sleep
              </span>
            </label>
          </div>
        </div>
        <ul>
          {currentRecipe?.steps.map((step, index) => {
            return (
              <li key={`step-${step.id}`}>
                <div
                  className="border-salumeWhite shadow-lg rounded-lg p-8"
                  key={`step-${index}`}
                >
                  <div className="flex flex-col justify-start text-salumeWhite">
                    <h4 className="text-2xl underline font-semibold">
                      {step.name}
                    </h4>
                    <p>
                      Step {index + 1}/{currentRecipe.steps.length}
                    </p>
                    <div className="flex h-fit mt-8">
                      <p className="pr-1">{"•"}</p>
                      <div className="flex flex-col items-start justify-start">
                        <h5 className="text-xl ">Duration: </h5>
                        <p>
                          {step.duration ? step.duration : step.statusDuration}{" "}
                          {step.duration ? "minutes" : "days"}
                        </p>
                      </div>
                    </div>
                    <div className="flex h-fit mt-8">
                      <p className="pr-1">{"•"}</p>
                      <div className="flex flex-col items-start justify-start">
                        <h5 className="text-xl">Description: </h5>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

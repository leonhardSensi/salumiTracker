import { IItemProps } from "@/interfaces/interfaces";
import UserInput from "./userInput";
import Image from "next/image";

export default function Step({
  handleChange,
  stepNum,
  items,
  remove,
  currentItem,
}: IItemProps) {
  return (
    <>
      <div className="flex items-center w-full">
        <label htmlFor="stepName" className="text-gray-900 text-xl">
          Step {stepNum}
        </label>
        <Image
          className={
            items.length > 1 ? "h-5 w-5 cursor-pointer ml-2" : " hidden"
          }
          src={"/x-button.svg"}
          width={100}
          height={100}
          onClick={remove}
          alt="delete"
        />
      </div>
      <UserInput
        width={"w-1/2"}
        addStyle={"mt-1 mb-4"}
        name="step"
        handleChange={handleChange}
        type="text"
        id="step"
        placeholder="Preparation"
        required={true}
        defaultValue={currentItem && currentItem.name}
      />
      <label htmlFor="stepDescription" className="text-gray-900 text-xl">
        Step description
      </label>
      <textarea
        name="stepDescription"
        onChange={handleChange}
        id="stepDescription"
        placeholder="Cut all the meats in small pieces and add all the spices"
        className="w-full h-32 text-white mt-1 mb-4 border text-l rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
        required={true}
        defaultValue={currentItem && currentItem.description}
      />
      <label htmlFor="stepDuration" className="text-gray-900 text-xl">
        Duration (minutes)
      </label>
      <UserInput
        width={"w-1/4"}
        addStyle={"mt-1 mb-4"}
        name="stepDuration"
        handleChange={handleChange}
        type="number"
        id="stepDuration"
        placeholder="20"
        step="0.5"
        min={0}
        required={true}
        defaultValue={currentItem && currentItem.duration}
      />
    </>
  );
}

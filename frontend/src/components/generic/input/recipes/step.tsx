import { IStepProps } from "../../../../interfaces/interfaces";
import UserInput from "../userInput";
import Image from "next/image";
import { handleCurrentItem } from "../../../../utils/typeChecker";
import { Dropdown } from "../dropdown/dropdown";
import { CircleX } from "lucide-react";

export default function Step({
  handleChange,
  stepNum,
  items,
  remove,
  currentItem,
  statusArr,
  handleSelect,
  currentId,
  dropdownText,
  stepStatus,
}: IStepProps) {
  return (
    <div className="border-wetSand border-opacity-50 border rounded-xl p-2">
      <label htmlFor="step" className="text-xl mr-12">
        Title
      </label>

      <UserInput
        width={"w-1/2"}
        addStyle={"mb-4"}
        name="step"
        handleChange={handleChange}
        type="text"
        id="step"
        placeholder="Preparation"
        required={true}
        defaultValue={currentItem && currentItem.name}
      />

      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-4">
          {statusArr && statusArr.length > 0 && (
            <div className="relative group w-fit">
              {/* <label className="text-xl">Status</label> */}
              <Dropdown
                dropDownOptions={statusArr}
                disabled={statusArr?.length === 0}
                handleSelect={handleSelect}
                currentId={currentId}
                dropdownText={dropdownText}
              />
            </div>
          )}

          <label htmlFor="stepDuration" className="text-xl mb-4">
            Duration
            <br />
            (minutes)
          </label>
          <UserInput
            width={"w-24"}
            addStyle={"mb-8"}
            name="stepDuration"
            handleChange={handleChange}
            type="number"
            id="stepDuration"
            placeholder="20"
            step="1"
            min={0}
            required={true}
            defaultValue={handleCurrentItem(currentItem, "duration")}
            disabled={stepStatus ? true : false}
          />
        </div>
        <CircleX
          className={
            items.length > 1
              ? "cursor-pointer text-stone hover:text-red-600"
              : "hidden"
          }
          size={30}
          onClick={remove}
        />
        {/* <Image
          className={items.length > 1 ? "cursor-pointer ml-2 mb-2" : " hidden"}
          src={"/delete.svg"}
          width={30}
          height={30}
          onClick={remove}
          alt="delete"
        /> */}
      </div>
      <label htmlFor="stepDescription" className="text-xl mb-4">
        Step description
      </label>
      <textarea
        name="stepDescription"
        onChange={handleChange}
        id="stepDescription"
        placeholder="Cut all the meats in small pieces and add all the spices"
        className="w-full h-32 text-black mb-4 border text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-100 border-gray-300 placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500"
        required={true}
        defaultValue={handleCurrentItem(currentItem, "description")}
      />
      {/* <div className="relative group mb-2 w-fit">
        <label className="text-xl mb-4">Status</label>
        <Dropdown
          dropDownOptions={statusArr}
          disabled={statusArr?.length === 0}
          handleSelect={handleSelect}
          currentId={currentId}
          dropdownText={dropdownText}
        />
      </div> */}
      {/* <label htmlFor="stepDuration" className="text-xl mb-4">
        Duration (minutes)
      </label>
      <UserInput
        width={"w-1/4"}
        addStyle={"mb-8"}
        name="stepDuration"
        handleChange={handleChange}
        type="number"
        id="stepDuration"
        placeholder="20"
        step="1"
        min={0}
        required={true}
        defaultValue={handleCurrentItem(currentItem, "duration")}
        disabled={stepStatus ? true : false}
      /> */}
    </div>
  );
}

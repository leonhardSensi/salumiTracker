import { IItemProps } from "@/interfaces/interfaces";
import React from "react";
import UserInput from "./userInput";
import Image from "next/image";

export default function Cut({
  handleChange,
  items,
  remove,
  currentItem,
}: IItemProps) {
  const handleCurrentItem = (data: string) => {
    if (currentItem) {
      switch (data) {
        case "name":
          return currentItem.name;
        case "quantity":
          if ("quantity" in currentItem) {
            return JSON.stringify(currentItem.quantity);
          }
          break;
        case "description":
          if ("description" in currentItem) {
            return currentItem.description;
          }
          break;
        case "duration":
          if ("duration" in currentItem) {
            return JSON.stringify(currentItem.duration);
          }
          break;
        default:
          break;
      }
    }
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <label htmlFor="cut" className="text-gray-900 text-xl">
          Cut
        </label>
        <UserInput
          width={"w-full"}
          height={""}
          addStyle={"mt-1 mb-4"}
          name="cut"
          handleChange={handleChange}
          type="text"
          id="cut"
          placeholder="Pork Belly"
          required={true}
          defaultValue={handleCurrentItem("name")}
        />
      </div>
      <div className="flex flex-col ml-4 w-fit">
        <label htmlFor="cutQuantity" className="text-gray-900 text-xl">
          Quantity (g)
        </label>
        <UserInput
          width={"w-3/4"}
          addStyle={"mt-1 mb-4"}
          name="cutQuantity"
          handleChange={handleChange}
          type="number"
          id="cutQuantity"
          placeholder="2000"
          step="0.1"
          min={0}
          required={true}
          defaultValue={handleCurrentItem("quantity")}
        />
      </div>
      <div className="w-8">
        <Image
          className={items.length > 1 ? "mt-10 cursor-pointer" : "hidden"}
          src={"/x-button.svg"}
          width={100}
          height={100}
          onClick={remove}
          alt="delete"
        />
      </div>
    </>
  );
}

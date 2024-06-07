import UserInput from "../userInput";
import { IItemProps } from "../../../../interfaces/interfaces";
import Image from "next/image";
import { handleCurrentItem } from "../../../../utils/typeChecker";

export default function Spice({
  handleChange,
  items,
  remove,
  currentItem,
}: IItemProps) {
  return (
    <>
      <div className="flex flex-col w-full text-salumeWhite">
        <label htmlFor="spice" className="text-xl">
          Spice
        </label>
        <UserInput
          width={"w-full"}
          addStyle={"mt-1 mb-4"}
          name="spice"
          handleChange={handleChange}
          type="text"
          id="spice"
          placeholder="Salt"
          required={true}
          defaultValue={handleCurrentItem(currentItem, "name")}
        />
      </div>
      <div className="flex flex-col ml-4 w-fit text-salumeWhite">
        <label htmlFor="spiceQuantity" className="text-xl">
          Quantity (g)
        </label>
        <UserInput
          width={"w-3/4"}
          addStyle={"mt-1 mb-4"}
          name="spiceQuantity"
          handleChange={handleChange}
          type="number"
          id="spiceQuantity"
          placeholder="40"
          step="1"
          min={0}
          required={true}
          defaultValue={handleCurrentItem(currentItem, "quantity")}
        />
      </div>
      <div className="w-12">
        <Image
          className={
            items.length > 1 ? "mt-10 cursor-pointer invert" : " hidden"
          }
          src={"/delete.svg"}
          width={100}
          height={100}
          onClick={remove}
          alt="delete"
        />
      </div>
    </>
  );
}

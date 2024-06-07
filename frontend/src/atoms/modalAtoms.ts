import { IModalDetails } from "../interfaces/atomInterfaces";
import { atom } from "recoil";

const modalData = atom({
  key: "modalData",
  default: {} as Partial<IModalDetails>,
});

export { modalData };

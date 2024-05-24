import { IModalDetails, IUpdateUserData } from "@/interfaces/atomInterfaces";
import { atom } from "recoil";

const updateUserData = atom({
  key: "updateUserData",
  default: {} as IUpdateUserData,
});

export { updateUserData };

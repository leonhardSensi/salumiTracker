import { INotification } from "../interfaces/interfaces";
import { atom } from "recoil";

const notificationState = atom({
  key: "notification",
  default: {} as INotification,
});

export { notificationState };

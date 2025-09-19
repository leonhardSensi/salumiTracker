import {
  ICompletedSalume,
  ISalume,
  IDashboardSalumeState,
} from "../interfaces/interfaces";
import { atom } from "recoil";

const curingState = atom({
  key: "curing",
  default: [] as IDashboardSalumeState[],
});

const dryingState = atom({
  key: "drying",
  default: [] as IDashboardSalumeState[],
});

const saltingState = atom({
  key: "salting",
  default: [] as IDashboardSalumeState[],
});

const completedState = atom<ISalume[]>({
  key: "completed",
  default: [],
});

export { curingState, dryingState, saltingState, completedState };

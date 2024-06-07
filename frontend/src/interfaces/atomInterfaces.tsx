import { StringMappingType } from "typescript";
import { IItem } from "./interfaces";

export interface IModalDetails {
  type: string;
  inputType: string;
  subject: string;
  info: IModalDetailsInfo;
}

interface IModalDetailsInfo {
  image: string;
  title: string;
  details: string;
  inputLabel: string;
  placeHolder: string;
  user: Partial<IUpdateUserData>;
  data: Partial<IModalDetailsInfoData>;
  recipeSteps: IItem[];
}

// interface IRecipeStep {
//   id: string;
//   description: string;
//   duration: number;
//   created_at: string;
//   name: string;
//   status: string;
//   statusDuration: number;
//   updated_at: string;
// }

interface IModalDetailsInfoData {
  name: string;
  duration: number;
  statusDuration: number;
  description: number;
  created_at: string;
  updated_at: string;
  id: string;
  status: string;
}

export interface IUpdateUserData {
  name: string;
  email: string;
  dateOfBirth: string;
}

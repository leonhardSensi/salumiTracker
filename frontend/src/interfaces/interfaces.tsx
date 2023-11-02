import { ChangeEventHandler } from "react";
import { StringMappingType } from "typescript";

// RECIPES
export interface Irecipe {
  content: string;
  created_at: string;
  id: string;
  image: string;
  title: string;
  updated_at: string;
  cuts: ICut[];
  spices: ISpice[];
  steps: IStep[];
}

export interface ICut {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  quantity: number;
}

export interface ISpice {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  quantity: number;
}

export interface IStep {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  description: string;
  duration: number;
}

export interface IrecipeData {
  recipes: Irecipe[];
}

export interface IrecipeResponse {
  status: string;
  data?: IrecipeData;
  results?: number;
  message?: string;
}

// USERS

export interface IresponseData {
  status: string;
  data: IprofileData;
}

export interface IuserData {
  data: Iuser;
}

export interface IprofileData {
  user: Iuser;
}

export interface Iuser {
  created_at: string;
  email: string;
  id: string;
  name: string;
  role: string;
  updated_at: string;
}

// UPLOAD

export interface IimageFileProp {
  image: File;
}

// SALUMI

export interface Isalume {
  state: string;
  name: string;
  date: Date;
  image: string;
  daysLeft: number;
}

export interface IsalumiProps {
  salumi: Isalume[];
  status?: string;
}

// CARD COMPONENT

export interface ICardProps {
  details: Isalume[] | Irecipe;
  image: string;
  imageSize: IImageSize;
  children?: React.ReactNode;
  link: string;
}

export interface ICardDetailsProps {
  details: Isalume[] | Irecipe;
  image: string;
  imageSize: IImageSize;
  children?: React.ReactNode;
}

interface IImageSize {
  width: number;
  height: number;
}

// USER INPUT
export interface IUserInput {
  width?: string;
  height?: string;
  step?: string;
  min?: number;
  addStyle?: string;
  // handleChange: ChangeEventHandler;
  handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
  >;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  required: boolean;
  defaultValue?: string;
}

export interface ISubmitButtonProps {
  text: string;
}

export interface ILinkButtonProps {
  text: string;
  href: string;
  width?: string;
  height?: string;
}

export interface IGenericButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  addStyles?: string;
}

export interface IItem {
  id: number;
  name: string;
  quantity?: number;
  description?: string;
  duration?: number;
}

// export interface ICutProps {
//   name: string;
//   quantity: number;
// }

// export interface ISpiceProps {
//   name: string;
//   quantity: number;
// }

// export interface IStepProps {
//   name: string;
//   description: string;
//   duration: number;
// }

export interface IItemProps {
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  stepNum?: number;
  items: IItem[];
  remove: React.MouseEventHandler<HTMLImageElement>;
  currentItem?: ICut | ISpice | IStep;
}

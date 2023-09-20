import { ChangeEventHandler } from "react";

// RECIPES
export interface Irecipe {
  content: string;
  created_at: string;
  id: string;
  image: string;
  title: string;
  updated_at: string;
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
  addStyle?: string;
  handleChange: ChangeEventHandler;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  required: boolean;
}

export interface ISubmitButton {
  text: string;
}

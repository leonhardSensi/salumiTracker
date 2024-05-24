import { StringMappingType } from "typescript";

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
  data: IModalDetailsInfoData | IUpdateUserData;
}

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

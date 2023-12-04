import { ChangeEventHandler } from "react";

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
  position?: number;
  id?: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  quantity: number;
}

export interface ISpice {
  position?: number;
  id?: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  quantity: number;
}

export interface IStep {
  position?: number;
  id?: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  description: string;
  duration: number;
}

export interface IrecipeToCreate {
  title: string;
  curing: IrecipeState;
  salting: IrecipeState;
  drying: IrecipeState;
  cuts: IItem[];
  spices: IItem[];
  steps: IItem[];
}

export interface IrecipeState {
  state: boolean;
  duration: number;
}

export interface IrecipeToUpdate {
  id: string;
  title: string;
  cuts: IItem[];
  spices: IItem[];
  steps: IItem[];
}

export interface IuserToUpdate {
  name: string;
  email: string;
  dateOfBirth: string;
  password: string;
}

export interface IloginCredentials {
  email: string;
  password: string;
}

export interface IregisterCredentials {
  name: string;
  email: string;
  dateOfBirth: string;
  password: string;
  passwordConfirm: string;
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
  date_of_birth: string;
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

export interface IUserCardProps {
  title: string;
  details: string;
  imgSrc: string;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export interface IModalProps {
  isModalVisible: boolean;
  closeModal: () => void;
  // setModalVisibility: (visibility: boolean) => void;
  // handleChange: (
  //   event: React.ChangeEvent<
  //     HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
  //   >
  // ) => void;
  imgSrc: string;
  title?: string;
  details?: string;
  addStyle: string;
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
  autoComplete?: string;
  disabled?: boolean;
}

export interface ISubmitButtonProps {
  text: string;
  addStyles?: string;
  disabled?: boolean;
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
  items: IItem[] | ICut[] | ISpice[] | IStep[];
  remove: React.MouseEventHandler<HTMLImageElement>;
  currentItem?: IItem;
}

export interface IManageProps {
  titles: string[];
  imgSrcs: string[];
  data: string[];
}

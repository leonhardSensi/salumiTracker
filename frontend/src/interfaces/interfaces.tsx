import { ChangeEventHandler } from "react";

// RECIPES
export interface Irecipe {
  content: string;
  created_at: string;
  id: string;
  image: string;
  title: string;
  updated_at: string;
  curing: IRecipeStatus;
  salting: IRecipeStatus;
  drying: IRecipeStatus;
  cuts: IItem[];
  spices: IItem[];
  steps: IItem[];
}

export interface IRecipeProps {
  recipe: Irecipe;
}

export interface IEditRecipe {
  content: string;
  created_at: string;
  id: string;
  image: string;
  title: string;
  updated_at: string;
  curing: IRecipeStatus;
  salting: IRecipeStatus;
  drying: IRecipeStatus;
  cuts: IItem[];
  spices: IItem[];
  steps: IItem[];
}

export interface IEditRecipeProps {
  recipeToEdit: IEditRecipe;
}

export interface IRecipeStatus {
  id: string;
  created_at: string;
  updated_at: string;
  state: boolean;
  duration: number;
}

export interface ICut {
  position?: number;
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  quantity: number;
}

export interface ISpice {
  position?: number;
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  quantity: number;
}

export interface IStep {
  position?: number;
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  description?: string;
  duration?: number;
  status?: string;
  statusDuration?: number;
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
  curing: IrecipeState;
  salting: IrecipeState;
  drying: IrecipeState;
  cuts: IItemToEdit[];
  spices: IItemToEdit[];
  steps: IItemToEdit[];
}

export interface IuserToUpdate {
  name?: string;
  email?: string;
  dateOfBirth?: string;
  photo?: File;
  password?: string;
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
  user: Iuser | undefined;
}

export interface Iuser {
  created_at: string;
  email: string;
  date_of_birth: string;
  id: string;
  photo: string;
  name: string;
  role: string;
  updated_at: string;
}

export interface IUserProps {
  userData: Iuser;
}

// UPLOAD

export interface IimageFileProp {
  image: File;
}

// SALUMI

// export interface Isalume {
//   state: string;
//   name: string;
//   date: Date;
//   image: string;
//   daysLeft: number;
// }

export interface ISalumeToCreate {
  name: string;
  recipeId: string;
  notes: string;
  state: string;
}

export interface ISalumeToUpdate {
  id: string;
  name: string;
  notes: string;
  recipeId: string;
  state: string;
  image?: File;
  rating: number;
}

export interface ISalume {
  id: string;
  name: string;
  recipe: ISalumeRecipe;
  notes: string;
  state: string;
  created_at: string;
  updated_at: string;
  image?: string;
  rating: number;
}

export interface ICompletedSalume {
  salume: ISalume;
  duration: number;
}

export interface ISalumeRecipe {
  id: string;
}

export interface ISalumeProps {
  salume: ISalume;
}

export interface ISalumiProps {
  salumi: ISalumeWithDuration[] | IDashboardSalumeState[];
  status: string;
}

export interface ISalumeWithDuration {
  salume: ISalume | IStateSalume;
  duration: number;
}

export interface IStateSalume {
  id: string;
  name: string;
  recipe: ISalumeRecipe;
  notes: string;
  state: string;
  created_at: string;
  updated_at: string;
}

export interface IDashboardSalumeState {
  salume: IStateSalume;
  duration: number;
}

export interface ICompletedSalume {
  id: string;
  name: string;
  recipe: ISalumeRecipe;
  notes: string;
  state: string;
  created_at: string;
  updated_at: string;
  image: string;
  rating: number;
}

export interface ICompletedSalumeState {
  salume: ICompletedSalume;
  duration: number;
}

// CARD COMPONENT

export interface ICardProps {
  details:
    | ISalume[]
    | Irecipe
    | ISalumeWithDuration[]
    | IDashboardSalumeState[];
  image: string;
  imageSize: IImageSize;
  children?: React.ReactNode;
  link: string;
  addStyles: string;
  status: string;
  // onClick: React.MouseEventHandler<HTMLDivElement>;
}

export interface ICardDetailsProps {
  details:
    | ISalume[]
    | Irecipe
    | ISalumeWithDuration[]
    | IDashboardSalumeState[];
  image: string;
  imageSize: IImageSize;
  children?: React.ReactNode;
  status: string;
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
  min?: number | string;
  max?: number | string;
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
  checked?: boolean;
  value?: string;
  onClick?: React.MouseEventHandler<
    HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
  >;
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
  disabled?: boolean;
}

export interface IItem {
  id?: string;
  listId: number;
  name: string;
  quantity?: number;
  description?: string;
  duration?: number;
  created_at?: string;
  updated_at?: string;
  status?: string;
  statusDuration?: number;
}

export interface IItemToEdit {
  id?: string;
  listId: number;
  name: string;
  quantity?: number;
  description?: string;
  duration?: number;
  created_at?: string;
  updated_at?: string;
  status?: string;
  statusDuration?: number;
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

export interface ISalumeState {
  state: boolean;
  duration: number;
}

export interface IItemProps {
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  stepNum?: number;
  items: IItem[] | ICut[] | ISpice[] | IStep[];
  remove: React.MouseEventHandler<HTMLImageElement>;
  currentItem?: IItem;
  statusArr?: string[];
  handleSelect?: (value: string, id?: number) => void;
  currentId?: number;
  text?: string;
  stepStatus?: string | undefined;
}

export interface IManageProps {
  titles: string[];
  imgSrcs: string[];
  data: Iuser;
}

export interface IDropDown {
  dropDownOptions: string[] | undefined;
  disabled: boolean;
  handleSelect: (value: string, id?: number) => void;
  currentId: number;
  dropdownText: string;
}

export interface IStepProps {
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  stepNum: number;
  items: IItem[] | ICut[] | ISpice[] | IStep[];
  remove: React.MouseEventHandler<HTMLImageElement>;
  currentItem?: IItem;
  statusArr: string[] | undefined;
  handleSelect: (value: string, id?: number) => void;
  currentId: number;
  dropdownText: string;
  stepStatus: string | undefined;
}

export interface IErrorMessage {
  errorMessage: string;
}

export interface INotification {
  type: string | null;
  message: string | null;
}

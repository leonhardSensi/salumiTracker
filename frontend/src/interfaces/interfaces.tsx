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
  data: IrecipeData;
  results: number;
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

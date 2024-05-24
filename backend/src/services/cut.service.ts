import { Recipe } from "../entities/recipe.entity";
import { Cut } from "../entities/cuts.entity";
import { AppDataSource } from "../utils/data-source";

const cutRepository = AppDataSource.getRepository(Cut);

export const createCut = async (input: Partial<Cut>) => {
  console.log("INPUT", input);
  return await cutRepository.save(cutRepository.create({ ...input }));
};

export const getCut = async (cutId: string) => {
  return await cutRepository.findOneBy({ id: cutId });
};

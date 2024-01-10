import { Recipe } from "../entities/recipe.entity";
import { Drying } from "../entities/drying.entity";
import { AppDataSource } from "../utils/data-source";

const dryingRepository = AppDataSource.getRepository(Drying);

export const createDrying = async (input: Partial<Drying>) => {
  return await dryingRepository.save(dryingRepository.create({ ...input }));
};

export const getDrying = async (dryingId: string) => {
  return await dryingRepository.findOneBy({ id: dryingId });
};

import { Recipe } from "../entities/recipe.entity";
import { Cut } from "../entities/cuts.entity";
import { AppDataSource } from "../utils/data-source";
import { Curing } from "../entities/curing.entity";

const curingRepository = AppDataSource.getRepository(Curing);

export const createCuring = async (input: Partial<Curing>) => {
  return await curingRepository.save(curingRepository.create({ ...input }));
};

export const getCuring = async (curingId: string) => {
  return await curingRepository.findOneBy({ id: curingId });
};

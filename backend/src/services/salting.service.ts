import { AppDataSource } from "../utils/data-source";
import { Salting } from "../entities/salting.entity";

const saltingRepository = AppDataSource.getRepository(Salting);

export const createSalting = async (input: Partial<Salting>) => {
  return await saltingRepository.save(saltingRepository.create({ ...input }));
};

export const getSalting = async (saltingId: string) => {
  return await saltingRepository.findOneBy({ id: saltingId });
};

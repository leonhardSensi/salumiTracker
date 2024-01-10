import { Spice } from "../entities/spice.entity";
import { AppDataSource } from "../utils/data-source";

const spiceRepository = AppDataSource.getRepository(Spice);

export const createSpice = async (input: Partial<Spice>) => {
  return await spiceRepository.save(spiceRepository.create({ ...input }));
};

export const getSpice = async (spiceId: string) => {
  return await spiceRepository.findOneBy({ id: spiceId });
};

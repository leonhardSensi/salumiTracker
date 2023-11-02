import { Step } from "../entities/step.entity";
import { AppDataSource } from "../utils/data-source";

const stepRepository = AppDataSource.getRepository(Step);

export const createStep = async (input: Partial<Step>) => {
  return await stepRepository.save(stepRepository.create({ ...input }));
};

export const getStep = async (stepId: string) => {
  return await stepRepository.findOneBy({ id: stepId });
};

import { Salume } from "../entities/salumi.entity";
import { AppDataSource } from "../utils/data-source";
import { User } from "../entities/user.entity";
import { Recipe } from "../entities/recipe.entity";
import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from "typeorm";

const postRepository = AppDataSource.getRepository(Salume);

export const createSalume = async (
  input: Partial<Salume>,
  user: User,
  recipe: Recipe
) => {
  return await postRepository.save(
    postRepository.create({ ...input, user, recipe })
  );
};

export const getSalume = async (salumeId: string) => {
  return await postRepository.findOne({
    where: { id: salumeId },
    // relations: ["recipes"],
  });
  // return await postRepository
  //   .createQueryBuilder("salumi")
  //   .leftJoinAndSelect("salumi.recipe", "recipe")
  //   .where("salumi.id = :salumeId", { salumeId })
  //   .getMany();
};

export const findSalumi = async (
  // where: FindOptionsWhere<Salume> = {},
  // userId: string,
  // select: FindOptionsSelect<Salume> = {},
  // relations: FindOptionsRelations<Salume> = {}
  userId: string
) => {
  // console.log("THIS IS THE USER ID");
  // return await postRepository.find({
  //   // where: { userId: userId },
  //   // relations: ["users"],
  //   where,
  //   select,
  //   relations,
  // });

  return await postRepository
    .createQueryBuilder("salumi")
    .leftJoinAndSelect("salumi.recipe", "recipe")
    // .leftJoinAndSelect("salumi.user", "user")
    .where("salumi.userId = :userId", { userId })
    .select([
      "salumi.id",
      // "salumi.userId",
      "salumi.created_at",
      "salumi.updated_at",
      "salumi.name",
      "salumi.notes",
      "salumi.state",
      "salumi.recipeId",
      "recipe.id",
      "salumi.image",
      "salumi.rating",
      "salumi.startWeight",
      "salumi.finalWeight",
    ])

    .getMany();
};

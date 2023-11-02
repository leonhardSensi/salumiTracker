import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Relation,
  RelationOptions,
} from "typeorm";
import { Recipe } from "../entities/recipe.entity";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../utils/data-source";

const postRepository = AppDataSource.getRepository(Recipe);

export const createRecipe = async (
  input: Partial<Recipe>,
  user: User,
  recipe?: Recipe
) => {
  input.cuts?.map(async (cut) => {
    recipe && recipe.addCut(cut);
  });
  return await postRepository.save(postRepository.create({ ...input, user }));
};

export const getRecipe = async (recipeId: string) => {
  return await postRepository.findOne({
    where: { id: recipeId },
    relations: ["cuts", "spices", "steps"],
  });
};

export const findRecipes = async (
  where: FindOptionsWhere<Recipe> = {},
  select: FindOptionsSelect<Recipe> = {},
  relations: FindOptionsRelations<Recipe> = {}
) => {
  return await postRepository.find({
    where,
    select,
    relations,
  });
};

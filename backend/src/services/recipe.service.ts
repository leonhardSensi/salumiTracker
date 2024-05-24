import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from "typeorm";
import { Recipe } from "../entities/recipe.entity";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../utils/data-source";

const postRepository = AppDataSource.getRepository(Recipe);

export const createRecipe = async (input: Partial<Recipe>, user: User) => {
  return await postRepository.save(postRepository.create({ ...input, user }));
};

export const getRecipe = async (recipeId: string) => {
  return await postRepository.findOne({
    where: { id: recipeId },
    relations: ["curing", "salting", "drying", "cuts", "spices", "steps"],
  });
};

// OLD FUNCTION FETCHING ALL RECIPES
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

export const findRecipesByUser = async (userId: string) => {
  return await postRepository
    .createQueryBuilder("recipes")
    .where("recipes.userId = :userId", { userId })
    .getMany();
};

export const updateRecipe = async (
  input: Partial<Recipe>,
  // user: User,
  recipe: Recipe
) => {
  // input.cuts?.map(async (cut) => {
  //   recipe && recipe.addCut(cut);
  // });
  // return await postRepository.update(input, recipe.id);
};

// export const updateSingleRecipe = async (
//   recipeId: string,
//   updatedRecipe: Recipe
// ) => {
//   const recipe = await postRepository.findOne({
//     where: { id: recipeId },
//     relations: ["curing", "salting", "drying", "cuts", "spices", "steps"],
//   });
//   if (!recipe) {
//     throw new Error(`Recipe with ${recipeId} not found!`);
//   }

//   const { title, curing, salting, drying, cuts, spices, steps } = updatedRecipe;

//   if (title) {
//     recipe.title = title
//   }
//   if (curing) {
//     recipe.curing = {};

//   }
// };

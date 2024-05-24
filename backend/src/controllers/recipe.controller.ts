import { NextFunction, Request, Response } from "express";
import {
  CreateRecipeInput,
  DeleteRecipeInput,
  GetRecipeInput,
  UpdateRecipeInput,
} from "../schemas/recipe.schema";
import {
  createRecipe,
  findRecipes,
  findRecipesByUser,
  getRecipe,
  updateRecipe,
} from "../services/recipe.service";
import { findUserById } from "../services/user.service";
import AppError from "../utils/appError";
import multer from "multer";
import sharp from "sharp";
import { Recipe } from "../entities/recipe.entity";
import { Cut } from "../entities/cuts.entity";
import { getRepository } from "typeorm";
import { AppDataSource } from "../utils/data-source";

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5000000, files: 1 },
});

export const uploadRecipeImage = upload.single("image");

export const resizeRecipeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    if (!file) return next();

    const user = res.locals.user;

    const fileName = `user-${user.id}-${Date.now()}.jpeg`;
    await sharp(req.file?.buffer)
      .resize(800, 450)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`${__dirname}/../../public/recipes/${fileName}`);

    req.body.image = fileName;

    next();
  } catch (err: any) {
    next(err);
  }
};

export const createRecipeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(res);
    const user = await findUserById(res.locals.user.id as string);

    const recipe = await createRecipe(req.body, user!);
    // const recipe = new Recipe();
    // recipe.id = req.body.id;
    // recipe.title = req.body.title;
    // recipe.cuts = req.body.cuts.map((cut: Cut) => {
    //   const newCut = new Cut();
    //   newCut.name = cut.name;
    //   newCut.quantity = cut.quantity;
    //   return newCut;
    // });

    await createRecipe(recipe, user!);

    res.status(201).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "Recipe with that title already exist",
      });
    }
    next(err);
  }
};

export const getRecipeHandler = async (
  req: Request<GetRecipeInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe = await getRecipe(req.params.recipeId);

    if (!recipe) {
      return next(new AppError(404, "Recipe with that ID not found"));
    }

    res.status(200).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getRecipesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);
    if (user) {
      const recipes = await findRecipesByUser(user.id);
      console.log(recipes);
      res.status(200).json({
        status: "success",
        nbrResults: recipes.length,
        data: {
          recipes,
        },
      });
    }
    // const recipes = await findRecipes({}, {}, {});
  } catch (err: any) {
    next(err);
  }
};

export const updateRecipeHandler = async (
  req: Request<UpdateRecipeInput["params"], {}, UpdateRecipeInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingRecipe = await getRecipe(req.params.recipeId);

    if (!existingRecipe) {
      return next(new AppError(404, "Recipe with that ID not found"));
    }

    Object.assign(existingRecipe, req.body);

    await existingRecipe.save();
    // await updateRecipe(existingRecipe, existingRecipe);

    res.status(200).json({
      status: "success",
      data: {
        recipe: existingRecipe,
      },
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const deleteRecipeHandler = async (
  req: Request<DeleteRecipeInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe = await getRecipe(req.params.recipeId);

    if (!recipe) {
      return next(new AppError(404, "Recipe with that ID not found"));
    }

    await recipe.remove();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

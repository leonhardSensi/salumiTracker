import { NextFunction, Request, Response } from "express";
// import { Cut } from "../entities/cuts.entity";
// import { Recipe } from "../entities/recipe.entity";
// import { GetCutInput } from "../schemas/cut.schema";
import { createCut, getCut } from "../services/cut.service";
// import { findRecipeById } from "../services/recipe.service";
import AppError from "../utils/appError";

export const createCutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const recipe = await findRecipeById(res.recipe.id as string);
    // console.log(res.recipe);
    const cut = await createCut(req.body);

    res.status(201).json({
      status: "success",
      data: {
        cut,
      },
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "Cut with that title already exist",
      });
    }
    next(err);
  }
};

export const getCutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cut = await getCut(req.params.cutId);

    if (!cut) {
      return next(new AppError(404, "Cut with that ID not found!"));
    }
    res.status(200).json({
      status: "success",
      data: {
        cut,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

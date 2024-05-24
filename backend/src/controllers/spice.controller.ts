import { NextFunction, Request, Response } from "express";
import { createSpice, getSpice } from "../services/spice.service";
import AppError from "../utils/appError";

export const createSpiceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const recipe = await findRecipeById(res.recipe.id as string);
    // console.log(res.recipe);
    const spice = await createSpice(req.body);

    res.status(201).json({
      status: "success",
      data: {
        spice,
      },
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "Spice with that title already exist",
      });
    }
    next(err);
  }
};

export const getSpiceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spice = await getSpice(req.params.spiceId);

    if (!spice) {
      return next(new AppError(404, "Spice with that ID not found!"));
    }
    res.status(200).json({
      status: "success",
      data: {
        spice,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

import { NextFunction, Request, Response } from "express";
import { createDrying, getDrying } from "../services/drying.service";
// import { Recipe } from "../entities/recipe.entity";
// import { findRecipeById } from "../services/recipe.service";
import AppError from "../utils/appError";

export const createDryingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const drying = await createDrying(req.body);

    res.status(201).json({
      status: "success",
      data: {
        drying,
      },
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "Drying status with that title already exist",
      });
    }
    next(err);
  }
};

export const getDryingHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const drying = await getDrying(req.params.dryingId);

    if (!drying) {
      return next(new AppError(404, "Drying status with that ID not found!"));
    }
    res.status(200).json({
      status: "success",
      data: {
        drying,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

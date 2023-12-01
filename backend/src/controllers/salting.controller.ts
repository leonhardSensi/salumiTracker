import { NextFunction } from "express";
import { createCuring, getCuring } from "../services/curing.service";
import { createSalting, getSalting } from "../services/salting.service";
// import { Recipe } from "../entities/recipe.entity";
// import { findRecipeById } from "../services/recipe.service";
import AppError from "../utils/appError";

export const createSaltingHandler = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const salting = await createSalting(req.body);

    res.status(201).json({
      status: "success",
      data: {
        salting,
      },
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "Salting status with that title already exist",
      });
    }
    next(err);
  }
};

export const getSaltingHandler = async (
  req: any, //Request<GetSaltingInput>,
  res: any, //Response,
  next: NextFunction
) => {
  try {
    const salting = await getSalting(req.params.saltingId);

    if (!salting) {
      return next(new AppError(404, "Salting status with that ID not found!"));
    }
    res.status(200).json({
      status: "success",
      data: {
        salting,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

import { NextFunction } from "express";
import { createCuring, getCuring } from "../services/curing.service";
// import { Recipe } from "../entities/recipe.entity";
// import { findRecipeById } from "../services/recipe.service";
import AppError from "../utils/appError";

export const createCuringHandler = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
    const curing = await createCuring(req.body);

    res.status(201).json({
      status: "success",
      data: {
        curing,
      },
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "Curing status with that title already exist",
      });
    }
    next(err);
  }
};

export const getCuringHandler = async (
  req: any, //Request<GetCuringInput>,
  res: any, //Response,
  next: NextFunction
) => {
  try {
    const curing = await getCuring(req.params.curingId);

    if (!curing) {
      return next(new AppError(404, "Curing status with that ID not found!"));
    }
    res.status(200).json({
      status: "success",
      data: {
        curing,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

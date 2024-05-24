import { NextFunction, Request, Response } from "express";
import { createStep, getStep } from "../services/step.service";
import AppError from "../utils/appError";

export const createStepHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const step = await createStep(req.body);

    res.status(201).json({
      status: "success",
      data: {
        step,
      },
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "Step with that title already exist",
      });
    }
    next(err);
  }
};

export const getStepHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const step = await getStep(req.params.stepId);

    if (!step) {
      return next(new AppError(404, "Step with that ID not found!"));
    }
    res.status(200).json({
      status: "success",
      data: {
        step,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

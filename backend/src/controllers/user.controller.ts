import { NextFunction, Request, Response } from "express";
import { UpdateUserInput } from "../schemas/user.schema";

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    res.status(200).status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateUserHandler = async (
  req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("hello");
    const user = await res.locals.user;

    Object.assign(user, req.body);

    const updatedUser = await user.save();

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

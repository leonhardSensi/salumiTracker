import { NextFunction, Request, Response } from "express";
import { UpdateUserInput } from "../schemas/user.schema";
const bcrypt = require("bcryptjs");

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
  req: Request<UpdateUserInput["params"], UpdateUserInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await res.locals.user;

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    Object.assign(user, req.body, { password: hashedPassword });

    const updatedUser = await user.save();
    // updatedUser.password =
    console.log("UPDATED USER", updatedUser);

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

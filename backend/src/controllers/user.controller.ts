import { NextFunction, Request, Response } from "express";
import { UpdateUserInput } from "../schemas/user.schema";
import AppError from "../utils/appError";
const bcrypt = require("bcryptjs");

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return next(new AppError(404, "User not found"));
    }

    res.status(200).json({
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
  console.log("UPDATED USER", req.body.photo);
  console.log("res locals user", res.locals.user);

  try {
    const user = await res.locals.user;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      Object.assign(user, req.body, { password: hashedPassword });
    } else if (req.body.notifications) {
      user.notifications = req.body.notifications;
    } else {
      Object.assign(user, req.body);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const updateUserNotificationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await res.locals.user;
    const { notifications } = req.body;
    if (!["day", "week", "month", "never"].includes(notifications)) {
      return res.status(400).json({ message: "Invalid notification setting" });
    }
    user.notifications = notifications;
    await user.save();
    res.status(200).json({ status: "success", data: { notifications } });
  } catch (err) {
    next(err);
  }
};

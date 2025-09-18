import { findUserById } from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import {
  createSalume,
  findSalumi,
  getSalume,
} from "../services/salume.service";
import AppError from "../utils/appError";
import { getRecipe } from "../services/recipe.service";
import { uploadPostImageDisk } from "../upload/single-upload-disk";
import { DeleteSalumeInput } from "../schemas/salume.schema";

export const createSalumeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const user = await findUserById(res.locals.user.id as string);
    const recipe = await getRecipe(req.body.recipeId);

    const salume = await createSalume(req.body, user!, recipe!);

    await createSalume(salume, user!, recipe!);

    res.status(201).json({
      status: "success",
      data: {
        salume,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getSalumeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salume = await getSalume(req.params.salumeId);

    if (!salume) {
      return next(new AppError(404, "Salume with that ID not found."));
    }

    console.log("This is the salume", salume);

    res.status(200).json({
      status: "success",
      data: {
        salume,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getSalumiHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);
    if (user) {
      const salumi = await findSalumi(user.id);
      if (!salumi) {
        return next(new AppError(404, "No salumi found."));
      }

      res.status(200).json({
        status: "success",
        nbrResults: salumi.length,
        data: {
          salumi,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

// export const updateSalumeStateHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const existingSalume = await getSalume(req.params.salumeId);
//     if (!existingSalume) {
//       return next(new AppError(404, "Salume with that ID not found"));
//     }
//     console.log(req.body);
//     Object.assign(existingSalume, req.body);

//     await existingSalume.save();

//     res.status(200).json({
//       status: "success",
//       data: {
//         salume: existingSalume,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const deleteSalumeHandler = async (
  req: Request<DeleteSalumeInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const salume = await getRecipe(req.params.salumeId);

    if (!salume) {
      return next(new AppError(404, "Recipe with that ID not found"));
    }

    await salume.remove();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSalumeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salume = await getSalume(req.params.salumeId);
    if (!salume) {
      return next(new AppError(404, "Salume with that ID not found"));
    }

    // Extract and assign finalWeight if present
    if (req.body.finalWeight !== undefined) {
      salume.finalWeight = Number(req.body.finalWeight);
    }

    // Assign all other fields from req.body
    Object.assign(salume, req.body);

    await salume.save();

    res.status(200).json({
      status: "success",
      data: {
        salume,
      },
    });
  } catch (err) {
    next(err);
  }
};

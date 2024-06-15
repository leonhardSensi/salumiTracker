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

export const updateSalumeStateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingSalume = await getSalume(req.params.salumeId);
    if (!existingSalume) {
      return next(new AppError(404, "Salume with that ID not found"));
    }
    console.log(req.body);
    Object.assign(existingSalume, req.body);

    await existingSalume.save();

    res.status(200).json({
      status: "success",
      data: {
        salume: existingSalume,
      },
    });
  } catch (err) {
    next(err);
  }
};

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

// export const updateSalumeStateHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Call multer middleware to handle file upload
//     uploadPostImageDisk(req, res, async (err: any) => {
//       if (err) {
//         return next(err);
//       }

//       console.log("BODY", req.body);

//       const existingSalume = await getSalume(req.params.salumeId);
//       if (!existingSalume) {
//         return next(new AppError(404, "Salume with that ID not found"));
//       }

//       console.log("existing", existingSalume);

//       // Assign properties from req.body
//       Object.assign(existingSalume, req.body);

//       // If an image was uploaded, assign the filename to the salume object
//       if (req.body.image) {
//         existingSalume.image = req.body.image;
//       }

//       // Save the updated salume object
//       await existingSalume.save();

//       res.status(200).json({
//         status: "success",
//         data: {
//           salume: existingSalume,
//         },
//       });
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

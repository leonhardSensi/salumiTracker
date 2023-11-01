import express from "express";
import {
  createRecipeHandler,
  deleteRecipeHandler,
  getRecipeHandler,
  getRecipesHandler,
  resizeRecipeImage,
  updateRecipeHandler,
  uploadRecipeImage,
} from "../controllers/recipe.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createRecipeSchema,
  deleteRecipeSchema,
  getRecipeSchema,
  updateRecipeSchema,
} from "../schemas/recipe.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);
router
  .route("/")
  .post(
    uploadRecipeImage,
    resizeRecipeImage,
    validate(createRecipeSchema),
    createRecipeHandler
  )
  .get(getRecipesHandler);

router
  .route("/:recipeId")
  .get(validate(getRecipeSchema), getRecipeHandler)
  .patch(validate(updateRecipeSchema), updateRecipeHandler)
  .delete(validate(deleteRecipeSchema), deleteRecipeHandler);

export default router;

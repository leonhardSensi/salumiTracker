import express from "express";
import {
  getMeHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { updateUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get("/me", getMeHandler);

// how can i validate this properly? I keep getting an error when having the same looking schema from updateRecipeSchema
router.route("/update").patch(
  // validate(updateUserSchema),
  updateUserHandler
);

export default router;

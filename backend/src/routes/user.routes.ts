import express from "express";
import {
  getMeHandler,
  updateUserHandler,
  updateUserNotificationHandler,
} from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { uploadProfilePictureDisk } from "../upload/single-upload-disk";

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get("/me", getMeHandler);
router.patch("/me/notifications", requireUser, updateUserNotificationHandler);

// how can i validate this properly? I keep getting an error when having the same looking schema from updateRecipeSchema
router.route("/update").patch(
  uploadProfilePictureDisk,
  // validate(updateUserSchema),
  updateUserHandler
);

router.route("/update/image").patch((req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: "success",
  });
});

export default router;

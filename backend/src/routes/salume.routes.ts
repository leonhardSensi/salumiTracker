import express from "express";
import {
  createSalumeHandler,
  deleteSalumeHandler,
  getSalumeHandler,
  getSalumiHandler,
  updateSalumeHandler,
} from "../controllers/salume.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createSalumeSchema,
  deleteSalumeSchema,
  updateSalumeSchema,
} from "../schemas/salume.schema";
import { uploadPostImageDisk } from "../upload/single-upload-disk";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/")
  .post(validate(createSalumeSchema), createSalumeHandler)
  .get(getSalumiHandler);
router
  .route("/:salumeId")
  .patch(uploadPostImageDisk, updateSalumeHandler)
  .get(getSalumeHandler)
  .delete(validate(deleteSalumeSchema), deleteSalumeHandler);

export default router;

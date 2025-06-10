import express from "express";
import {
  forgotPasswordHandler,
  loginUserHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
  resetPasswordHandler,
  verifyEmailHandler,
  // verifyEmailHandler,
} from "../controllers/auth.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createUserSchema,
  loginUserSchema,
  verifyEmailSchema,
} from "../schemas/user.schema";

const router = express.Router();

// Register user
router.post("/register", validate(createUserSchema), registerUserHandler);

// Login user
router.post("/login", validate(loginUserSchema), loginUserHandler);

// Logout user
router.get("/logout", deserializeUser, requireUser, logoutHandler);

// Refresh access token
router.get("/refresh", refreshAccessTokenHandler);

// Verify Email Address
router.get(
  "/verifyemail/:verificationCode",
  validate(verifyEmailSchema),
  verifyEmailHandler
);

router.post("/resetpassword", forgotPasswordHandler);
router.patch("/resetpassword/:resetToken", resetPasswordHandler);

export default router;

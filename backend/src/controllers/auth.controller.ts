import { CookieOptions, NextFunction, Request, Response } from "express";
import config from "config";
import crypto from "crypto";
import {
  CreateUserInput,
  LoginUserInput,
  VerifyEmailInput,
} from "../schemas/user.schema";
import {
  createUser,
  findUser,
  findUserByEmail,
  findUserById,
  signTokens,
} from "../services/user.service";
import AppError from "../utils/appError";
import redisClient from "../utils/connectRedis";
import { signJwt, verifyJwt } from "../utils/jwt";
import { User } from "../entities/user.entity";
import Email from "../utils/email";
import { MoreThan } from "typeorm";

const cookiesOptions: CookieOptions = {
  sameSite: "none",
  secure: true,
  // apply domain .salumitracker.com only in production and localhost in development
  domain:
    config.get<string>("origin") === "http://localhost:3000"
      ? "localhost"
      : ".salumitracker.com",
  httpOnly: true,
};

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  // expires: new Date(Date.now() + 86400000),
  // maxAge: Date.now() + 86400000, //24
  expires: new Date(
    Date.now() + config.get<number>("accessTokenExpiresIn") * 60 * 1000
  ),
  maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  // expires: new Date(Date.now() + 86400000),
  // maxAge: Date.now() + 86400000, //24
  expires: new Date(
    Date.now() + config.get<number>("refreshTokenExpiresIn") * 60 * 1000
  ),
  maxAge: config.get<number>("refreshTokenExpiresIn") * 60 * 1000,
};

export const registerUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email } = req.body;

    const newUser = await createUser({
      name,
      email: email.toLowerCase(),
      password,
    });

    // await newUser.save();

    const { hashedVerificationCode, verificationCode } =
      User.createVerificationCode();
    newUser.verificationCode = hashedVerificationCode;
    await newUser.save();

    // Send Verification Email
    const redirectUrl = `${config.get<string>(
      "origin"
    )}/verifyemail/${verificationCode}`;

    try {
      await new Email(newUser, redirectUrl).sendVerificationCode();

      res.status(201).json({
        status: "success",
        message:
          "An email with a verification code has been sent to your email",
      });
    } catch (error) {
      newUser.verificationCode = null;
      console.error("Email send error:", error);
      // await newUser.save();
      return res.status(500).json({
        status: "error",
        message: "There was an error sending email, please try again",
      });
    }
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "User with that email already exist",
      });
    }
    next(err);
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail({ email });

    // 1. Check if user exist
    if (!user) {
      return next(new AppError(401, "Invalid email or password"));
    }

    // 2.Check if user is verified
    if (!user.verified) {
      return next(
        new AppError(
          403,
          "You are not verified, check your email to verify your account"
        )
      );
    }

    //3. Check if password is valid
    if (!(await User.comparePasswords(password, user.password))) {
      return next(new AppError(401, "Invalid email or password"));
    }
    // if (!(await User.comparePasswords(password, user.password))) {
    //   return res
    //     .status(401)
    //     .json({ status: "error", message: "Invalid email or password." });
    // }

    // 4. Sign Access and Refresh Tokens
    const { access_token, refresh_token } = await signTokens(user);

    // 5. Add Cookies
    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // 6. Send response
    res.status(200).json({
      status: "success",
      access_token,
    });
  } catch (err: any) {
    next(err);
  }
};

export const verifyEmailHandler = async (
  req: Request<VerifyEmailInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const verificationCode = crypto
      .createHash("sha256")
      .update(req.params.verificationCode)
      .digest("hex");

    const user = await findUser({ verificationCode });
    console.log("USER found for verification", user);
    if (!user) {
      return next(new AppError(401, "Could not verify email"));
    }

    user.verified = true;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Email verified successfully",
    });
  } catch (err: any) {
    next(err);
  }
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    const message = "Could not refresh access token";

    if (!refresh_token) {
      return next(new AppError(403, message));
    }

    // Validate refresh token
    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      "refreshTokenPublicKey"
    );

    if (!decoded) {
      return next(new AppError(403, message));
    }

    // Check if user has a valid session
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(403, message));
    }

    // Check if user still exist
    const user = await findUserById(JSON.parse(session).id);

    if (!user) {
      return next(new AppError(403, message));
    }

    // Sign new access token
    const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
      expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
    });

    // 4. Add Cookies
    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // 5. Send response
    res.status(200).json({
      status: "success",
      access_token,
    });
  } catch (err: any) {
    console.log("REFRESH ERROR", err);
    next(err);
  }
};

const logout = (res: Response) => {
  res.cookie("access_token", "", { ...accessTokenCookieOptions, maxAge: 0 });
  res.cookie("refresh_token", "", { ...refreshTokenCookieOptions, maxAge: 0 });
  res.cookie("logged_in", "", {
    ...accessTokenCookieOptions,
    httpOnly: false,
    maxAge: 0,
  });
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    await redisClient.del(user.id);
    logout(res);

    res.status(200).json({
      status: "success",
    });
  } catch (err: any) {
    next(err);
  }
};

export const forgotPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    console.log("EMAIL", email);
    const user = await findUserByEmail({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetToken = hashedResetToken;
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    const resetUrl = `${config.get<string>(
      "origin"
    )}/resetpassword/${resetToken}`;
    await new Email(user, resetUrl).sendPasswordResetToken();

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to email",
    });
  } catch (err) {
    next(err);
  }
};

export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, passwordConfirm } = req.body;
    const { resetToken } = req.params;

    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ status: "fail", message: "Passwords do not match" });
    }

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await User.findOne({
      where: {
        passwordResetToken: hashedResetToken,
        passwordResetExpires: MoreThan(new Date()),
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "Token is invalid or has expired" });
    }

    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    user.verified = true;
    await user.save();

    res
      .status(200)
      .json({ status: "success", message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};

// require("dotenv").config();
// import express, { Response } from "express";
// import config from "config";
// import validateEnv from "./utils/validateEnv";
// import { AppDataSource } from "./utils/data-source";
// import redisClient from "./utils/connectRedis";

// AppDataSource.initialize()
//   .then(async () => {
//     // VALIDATE ENV
//     validateEnv();

//     const app = express();

//     // MIDDLEWARE

//     // 1. Body parser

//     // 2. Logger

//     // 3. Cookie Parser

//     // 4. Cors

//     // ROUTES

//     // HEALTH CHECKER
//     app.get("/", async (_, res: Response) => {
//       const message = await redisClient.get("try");
//       res.status(200).json({
//         status: "success",
//         message,
//       });
//     });

//     // UNHANDLED ROUTE

//     // GLOBAL ERROR HANDLER

//     const port = config.get<number>("port");
//     app.listen(port);

//     console.log(`Server started on port: ${port}`);
//   })
//   .catch((error) => console.log(error));
require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import config from "config";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AppDataSource } from "./utils/data-source";
import AppError from "./utils/appError";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import recipeRouter from "./routes/recipe.routes";
import salumeRouter from "./routes/salume.routes";
import validateEnv from "./utils/validateEnv";
import cluster from "cluster";
import os from "os";
import path from "path";
import Email from "./utils/email";
import { findUserById, getAllUsers } from "./services/user.service";
import { calcRemainingDuration } from "./utils/salumeDuration";

const schedule = require("node-schedule");

schedule.scheduleJob("*/30 * * * * *", async () => {
  const allUsers = await getAllUsers();

  await Promise.all(
    allUsers.map(async (user) => {
      const salumiToNotifyArr = await calcRemainingDuration(user.id);
      if (user && salumiToNotifyArr.length > 0) {
        const emailInstance = new Email(
          {
            name: user.name,
            email: user.email,
          },
          "",
          salumiToNotifyArr
          // {
          //   salume: salume.name,
          //   daysRemaining: duration,
          //   totalSalumi: salumi.length.toString(),
          // },
        );
        // UNCOMMENT TO SEND NOTIFICATIONS
        try {
          // await emailInstance.salumeReminder();
          console.log("Email sent to", user.email);
        } catch (error) {
          console.error(error);
        }
      }
    })
  );
});

// import nodemailer from 'nodemailer';
// (async function () {
//   const credentials = await nodemailer.createTestAccount();
//   console.log(credentials);
// })();

const numCpus = os.cpus().length;
AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv();

    const app = express();

    // TEMPLATE ENGINE
    app.set("view engine", "pug");
    app.set("views", `${__dirname}/views`);

    // MIDDLEWARE

    // 1. Body parser
    app.use(express.json({ limit: "10kb" }));

    // 2. Logger
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

    // 3. Cookie Parser
    app.use(cookieParser());

    // 4. Cors
    // app.use(
    //   cors({
    //     origin: config.get<string>("origin"),
    //     credentials: true,
    //   })
    // );
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    // ROUTES
    app.use("/api/auth", authRouter);
    app.use("/api/users", userRouter);
    app.use("/api/recipes", recipeRouter);
    app.use("/api/salume", salumeRouter);

    app.use(express.static("public"));

    // HEALTH CHECKER
    app.get("/api/healthChecker", async (_, res: Response) => {
      // const message = await redisClient.get('try');

      res.status(200).json({
        status: "success",
        message: "Welcome to Node.js, we are happy to see you",
      });
    });

    // UNHANDLED ROUTE
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    // GLOBAL ERROR HANDLER
    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || "error";
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    const port = config.get<number>("port") || 4000;
    // run on multiple cpu cores

    // if (cluster.isPrimary) {
    //   for (let i = 0; i < numCpus; i++) {
    //     cluster.fork();
    //   }

    //   cluster.on("exit", (worker, code, signal) => {
    //     console.log(`Worker pid: ${worker.process.pid} died`);
    //     cluster.fork();
    //   });
    // } else {
    app.listen(port);
    console.log(`Server started with pid: ${process.pid} on port: ${port}`);
    // }
  })
  .catch((error) => console.log(error));

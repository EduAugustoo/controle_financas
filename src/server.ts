import { AppError } from "@errors/AppError";
import "@shared/container";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import createConnection from "./database";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

createConnection();
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Cookie"],
  })
);
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is running!"));

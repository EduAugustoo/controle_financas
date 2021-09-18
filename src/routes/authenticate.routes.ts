import { AuthenticateUserController } from "@modules/auth/useCases/authenticateUser/AuthenticateUserController";
import { RenewRefreshTokenController } from "@modules/auth/useCases/renewRefreshToken/RenewRefreshTokenController";
import { SignOutController } from "@modules/auth/useCases/signOut/SignOutController";
import { Router } from "express";

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();
const renewRefreshTokenController = new RenewRefreshTokenController();
const signOutController = new SignOutController();

authenticateRoutes.post("/session", authenticateUserController.handle);
authenticateRoutes.post("/session/signout", signOutController.handle);
authenticateRoutes.post(
  "/session/refreshToken",
  renewRefreshTokenController.handle
);

export { authenticateRoutes };

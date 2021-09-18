import { UserRepository } from "@modules/account/repositories/implementations/UserRepository";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { RefreshTokenRepository } from "@modules/auth/repositories/implementations/RefreshTokenRepository";
import { IRefreshTokenRepository } from "@modules/auth/repositories/IRefreshTokenRepository";
import { IMovementRepository } from "@modules/movement/repositories/IMovementRepository";
import { MovementRepository } from "@modules/movement/repositories/implementations/MovementRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IMovementRepository>(
  "MovementRepository",
  MovementRepository
);

container.registerSingleton<IRefreshTokenRepository>(
  "RefreshTokenRepository",
  RefreshTokenRepository
);

import { config } from "@config/index";
import { AppError } from "@errors/AppError";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { IRefreshTokenRepository } from "@modules/auth/repositories/IRefreshTokenRepository";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

interface IResponse {
  token: string;
  expiresAt: Date;
}

@injectable()
class CreateRefreshTokenUseCase {
  constructor(
    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository,
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("Usuário inexistente!");
    }

    const token = uuidV4();
    const expiresAt = new Date(Date.now() + config.refreshToken.duration);
    await this.refreshTokenRepository.create({
      token,
      expiresAt,
      user,
      valid: true,
    });

    return { token, expiresAt };
  }
}

export { CreateRefreshTokenUseCase };

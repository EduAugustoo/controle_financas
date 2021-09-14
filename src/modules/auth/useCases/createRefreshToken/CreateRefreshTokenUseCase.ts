import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { config } from "../../../../config";
import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../../account/repositories/IUserRepository";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";

interface IResponse {
  token: string;
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

    return { token };
  }
}

export { CreateRefreshTokenUseCase };

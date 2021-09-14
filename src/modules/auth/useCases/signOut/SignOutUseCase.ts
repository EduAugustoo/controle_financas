import { inject, injectable } from "tsyringe";

import { TokenError } from "../../../../errors/TokenError";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";

@injectable()
class SignOutUseCase {
  constructor(
    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(refreshToken: string): Promise<void> {
    try {
      await this.refreshTokenRepository.invalidateAllRefreshTokens(
        refreshToken
      );
    } catch (error) {
      throw new TokenError("Token inválido!");
    }
  }
}

export { SignOutUseCase };

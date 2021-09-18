import { TokenError } from "@errors/TokenError";
import { IRefreshTokenRepository } from "@modules/auth/repositories/IRefreshTokenRepository";
import { inject, injectable } from "tsyringe";

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

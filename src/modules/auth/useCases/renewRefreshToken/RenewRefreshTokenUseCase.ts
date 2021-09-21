import { config } from "@config/index";
import { TokenError } from "@errors/TokenError";
import { Token } from "@modules/auth/entities/Token";
import { IRefreshTokenRepository } from "@modules/auth/repositories/IRefreshTokenRepository";
import { CreateRefreshTokenUseCase } from "@modules/auth/useCases/createRefreshToken/CreateRefreshTokenUseCase";
import { sign } from "jsonwebtoken";
import { container, inject, injectable } from "tsyringe";

interface IResponse {
  token: string;
  tokenExpiration: Date;
  refreshToken: string;
  refreshTokenExpiration: Date;
}

@injectable()
class RenewRefreshTokenUseCase {
  constructor(
    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(token: string): Promise<IResponse> {
    try {
      const refreshTokenObject = await this.refreshTokenRepository.findByToken(
        token
      );

      if (!this.isRefreshTokenValid(refreshTokenObject)) {
        throw new TokenError("Token expirado!");
      }

      await this.refreshTokenRepository.invalidateRefreshToken(token);

      const createRefreshTokenUseCase = container.resolve(
        CreateRefreshTokenUseCase
      );

      const { token: refreshToken, expiresAt: refreshTokenExpiration } =
        await createRefreshTokenUseCase.execute(refreshTokenObject.user.id);

      const accessToken = sign(
        {
          id: refreshTokenObject.user.id,
          username: refreshTokenObject.user.username,
          name: refreshTokenObject.user.name,
        },
        "d958038874dbbd625b6548ec9bc7cee5",
        {
          subject: refreshTokenObject.user.id,
          expiresIn: "15m",
        }
      );

      const tokenExpiration = new Date(Date.now() + config.token.duration);

      const tokenReturn: IResponse = {
        refreshToken,
        refreshTokenExpiration,
        token: accessToken,
        tokenExpiration,
      };

      return tokenReturn;
    } catch (error) {
      throw new TokenError("Problema com o token!");
    }
  }

  isRefreshTokenValid(refreshToken: Token): boolean {
    return (
      refreshToken &&
      refreshToken.valid &&
      refreshToken.expiresAt.valueOf() >= Date.now()
    );
  }
}

export { RenewRefreshTokenUseCase };

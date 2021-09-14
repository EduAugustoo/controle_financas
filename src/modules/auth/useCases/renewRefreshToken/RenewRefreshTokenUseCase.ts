import { sign } from "jsonwebtoken";
import { container, inject, injectable } from "tsyringe";

import { TokenError } from "../../../../errors/TokenError";
import { Token } from "../../entities/Token";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";
import { CreateRefreshTokenUseCase } from "../createRefreshToken/CreateRefreshTokenUseCase";

interface IResponse {
  token: string;
  refreshToken: string;
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

      const { token: refreshToken } = await createRefreshTokenUseCase.execute(
        refreshTokenObject.user.id
      );

      const accesToken = sign(
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

      const tokenReturn: IResponse = {
        refreshToken,
        token: accesToken,
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

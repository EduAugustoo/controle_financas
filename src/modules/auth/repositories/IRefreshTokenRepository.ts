import { IRefreshTokenDTO } from "@modules/auth/dtos/IRefreshTokenDTO";
import { Token } from "@modules/auth/entities/Token";

interface IRefreshTokenRepository {
  create(refreshToken: IRefreshTokenDTO): Promise<void>;
  findByToken(token: string): Promise<Token>;
  invalidateRefreshToken(token: string): Promise<void>;
  invalidateAllRefreshTokens(token: string): Promise<void>;
}

export { IRefreshTokenRepository };

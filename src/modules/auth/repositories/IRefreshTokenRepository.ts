import { IRefreshTokenDTO } from "../dtos/IRefreshTokenDTO";
import { Token } from "../entities/Token";

interface IRefreshTokenRepository {
  create(refreshToken: IRefreshTokenDTO): Promise<void>;
  findByToken(token: string): Promise<Token>;
  invalidateRefreshToken(token: string): Promise<void>;
  invalidateAllRefreshTokens(token: string): Promise<void>;
}

export { IRefreshTokenRepository };

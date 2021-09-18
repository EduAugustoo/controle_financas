import { IRefreshTokenDTO } from "@modules/auth/dtos/IRefreshTokenDTO";
import { Token } from "@modules/auth/entities/Token";
import { IRefreshTokenRepository } from "@modules/auth/repositories/IRefreshTokenRepository";
import { getRepository, Repository } from "typeorm";

class RefreshTokenRepository implements IRefreshTokenRepository {
  private repository: Repository<Token>;

  constructor() {
    this.repository = getRepository(Token);
  }

  async create(data: IRefreshTokenDTO): Promise<void> {
    const refreshToken = this.repository.create({
      token: data.token,
      expiresAt: data.expiresAt,
      user: data.user,
      valid: data.valid,
    });

    await this.repository.save(refreshToken);
  }

  async findByToken(token: string): Promise<Token> {
    return this.repository.findOne({ token });
  }

  async invalidateRefreshToken(token: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(Token)
      .set({ valid: false })
      .where("token = :token", { token })
      .execute();
  }

  async invalidateAllRefreshTokens(token: string): Promise<void> {
    const refreshToken = await this.repository.findOne({ token });
    await this.repository
      .createQueryBuilder()
      .update(Token)
      .set({ valid: false })
      .where("user = :user", { user: refreshToken.user.id })
      .execute();
  }
}

export { RefreshTokenRepository };

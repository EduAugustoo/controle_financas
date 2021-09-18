import { User } from "@modules/account/entities/User";

interface IRefreshTokenDTO {
  token: string;
  expiresAt: Date;
  user: User;
  valid: boolean;
}

export { IRefreshTokenDTO };

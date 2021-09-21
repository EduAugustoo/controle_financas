import { config } from "@config/index";
import { AppError } from "@errors/AppError";
import { UserRepository } from "@modules/account/repositories/implementations/UserRepository";
import { CreateRefreshTokenUseCase } from "@modules/auth/useCases/createRefreshToken/CreateRefreshTokenUseCase";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { container, inject, injectable } from "tsyringe";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  token: string;
  tokenExpiration: Date;
  refreshToken: string;
  refreshTokenExpiration: Date;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new AppError("Usuário ou senha inválidos!");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Usuário ou senha inválidos!");
    }

    const token = sign(
      { id: user.id, name: user.name, username: user.username },
      "d958038874dbbd625b6548ec9bc7cee5",
      {
        subject: user.id,
        expiresIn: "15m",
      }
    );

    const tokenExpiration = new Date(Date.now() + config.token.duration);

    const createRefreshTokenUseCase = container.resolve(
      CreateRefreshTokenUseCase
    );

    const { token: refreshToken, expiresAt: refreshTokenExpiration } =
      await createRefreshTokenUseCase.execute(user.id);

    const tokenReturn: IResponse = {
      refreshToken,
      refreshTokenExpiration,
      token,
      tokenExpiration,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };

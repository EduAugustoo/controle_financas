import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { container, inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { UserRepository } from "../../../account/repositories/implementations/UserRepository";
import { CreateRefreshTokenUseCase } from "../createRefreshToken/CreateRefreshTokenUseCase";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
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
        expiresIn: "15s",
      }
    );

    const createRefreshTokenUseCase = container.resolve(
      CreateRefreshTokenUseCase
    );

    const { token: refreshToken } = await createRefreshTokenUseCase.execute(
      user.id
    );

    const tokenReturn: IResponse = {
      refreshToken,
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };

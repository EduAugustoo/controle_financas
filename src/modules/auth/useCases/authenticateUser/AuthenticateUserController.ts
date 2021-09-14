import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUserUserCase = container.resolve(AuthenticateUserUseCase);
    const data = await authenticateUserUserCase.execute({
      username,
      password,
    });

    return response.json({
      token: data.token,
      refreshToken: data.refreshToken,
    });
  }
}

export { AuthenticateUserController };

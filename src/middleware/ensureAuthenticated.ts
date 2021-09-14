import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { TokenError } from "../errors/TokenError";
import { UserRepository } from "../modules/account/repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token está faltando!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "d958038874dbbd625b6548ec9bc7cee5"
    ) as IPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário inexistente!");
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new TokenError("Token inválido!");
    } else {
      throw new TokenError("Problema com o token!");
    }
  }
};

export { ensureAuthenticated };

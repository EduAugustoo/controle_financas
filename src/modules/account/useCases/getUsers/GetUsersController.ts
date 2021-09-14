import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUsersUseCase } from "./GetUsersUseCase";

class GetUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getUsersUseCase = container.resolve(GetUsersUseCase);
    const users = await getUsersUseCase.execute();
    return response.status(200).json(users);
  }
}

export { GetUsersController };

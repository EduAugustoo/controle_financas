import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserUseCase } from "./GetUserUseCase";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.params;
    const getUserUseCase = container.resolve(GetUserUseCase);
    const user = await getUserUseCase.execute(user_id);
    return response.status(200).json(user);
  }
}

export { GetUserController };

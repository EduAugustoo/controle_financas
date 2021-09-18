import { AppError } from "@errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMovementUseCase } from "./CreateMovementUseCase";

class CreateMovementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, value } = request.body;
    const { id } = request.params;
    const { id: userId } = request.user;
    if (userId !== id) {
      throw new AppError("Não é permitido criar despesa para outro usuário!");
    }
    const createMovementUseCase = container.resolve(CreateMovementUseCase);
    const movement = await createMovementUseCase.execute({
      name,
      description,
      value,
      userId,
    });

    return response.status(201).json(movement);
  }
}

export { CreateMovementController };

import { AppError } from "@errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { EditMovementUseCase } from "./EditMovementUseCase";

class EditMovementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, value } = request.body;
    const { user } = request;
    const { id, mid } = request.params;
    if (user.id !== id) {
      throw new AppError("Não é permitido editar a despesa de outro usuário!");
    }
    const editMovementUseCase = container.resolve(EditMovementUseCase);
    await editMovementUseCase.execute({ id: mid, name, description, value });
    return response.status(200).send();
  }
}

export { EditMovementController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { DeleteMovementUseCase } from "./DeleteMovementUseCase";

class DeleteMovementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { id, mid } = request.params;
    if (user.id !== id) {
      throw new AppError("Não é permitido excluir a despesa de outro usuário!");
    }
    const deleteMovementUseCase = container.resolve(DeleteMovementUseCase);
    await deleteMovementUseCase.execute(mid);
    return response.status(200).send();
  }
}

export { DeleteMovementController };

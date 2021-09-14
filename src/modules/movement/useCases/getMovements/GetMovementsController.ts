import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetMovementsUseCase } from "./GetMovementsUseCase";

class GetMovementsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getMovementsUseCase = container.resolve(GetMovementsUseCase);
    const movements = await getMovementsUseCase.execute(id);
    return response.status(200).json(movements);
  }
}

export { GetMovementsController };

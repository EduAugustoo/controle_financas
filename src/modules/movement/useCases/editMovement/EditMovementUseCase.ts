import { inject, injectable } from "tsyringe";

import { IMovementDTO } from "../../dtos/IMovementDTO";
import { IMovementRepository } from "../../repositories/IMovementRepository";

@injectable()
class EditMovementUseCase {
  constructor(
    @inject("MovementRepository")
    private movementRepository: IMovementRepository
  ) {}

  async execute(data: IMovementDTO): Promise<void> {
    await this.movementRepository.edit(data);
  }
}

export { EditMovementUseCase };

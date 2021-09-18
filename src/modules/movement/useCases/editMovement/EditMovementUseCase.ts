import { IMovementDTO } from "@modules/movement/dtos/IMovementDTO";
import { IMovementRepository } from "@modules/movement/repositories/IMovementRepository";
import { inject, injectable } from "tsyringe";

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

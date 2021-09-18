import { IMovementRepository } from "@modules/movement/repositories/IMovementRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteMovementUseCase {
  constructor(
    @inject("MovementRepository")
    private movementRepository: IMovementRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.movementRepository.deleteById(id);
  }
}

export { DeleteMovementUseCase };

import { inject, injectable } from "tsyringe";

import { IMovementRepository } from "../../repositories/IMovementRepository";

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

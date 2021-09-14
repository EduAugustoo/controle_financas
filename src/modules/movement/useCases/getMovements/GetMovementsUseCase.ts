import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../../account/repositories/IUserRepository";
import { Movement } from "../../entities/Movement";
import { IMovementRepository } from "../../repositories/IMovementRepository";

@injectable()
class GetMovementsUseCase {
  constructor(
    @inject("MovementRepository")
    private movementRepository: IMovementRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<Movement[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("Usuário inexistente!");
    }

    const movements = await this.movementRepository.getByUserId(userId);
    return movements;
  }
}

export { GetMovementsUseCase };

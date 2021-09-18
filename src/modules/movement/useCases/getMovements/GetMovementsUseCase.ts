import { AppError } from "@errors/AppError";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { Movement } from "@modules/movement/entities/Movement";
import { IMovementRepository } from "@modules/movement/repositories/IMovementRepository";
import { inject, injectable } from "tsyringe";

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

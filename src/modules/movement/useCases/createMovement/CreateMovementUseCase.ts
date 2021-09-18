import { AppError } from "@errors/AppError";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { Movement } from "@modules/movement/entities/Movement";
import { IMovementRepository } from "@modules/movement/repositories/IMovementRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
  value: number;
  userId: string;
}

@injectable()
class CreateMovementUseCase {
  constructor(
    @inject("MovementRepository")
    private movementRepository: IMovementRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    description,
    value,
    userId,
  }: IRequest): Promise<Movement> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("Usuário inexistente!");
    }

    const movement = await this.movementRepository.create({
      name,
      description,
      value,
      user,
    });

    return movement;
  }
}

export { CreateMovementUseCase };

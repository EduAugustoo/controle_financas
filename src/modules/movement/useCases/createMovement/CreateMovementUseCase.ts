import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../../account/repositories/IUserRepository";
import { Movement } from "../../entities/Movement";
import { IMovementRepository } from "../../repositories/IMovementRepository";

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

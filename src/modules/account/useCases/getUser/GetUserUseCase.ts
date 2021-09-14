import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class GetUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(user_id: string): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário inexistente!");
    }

    return user;
  }
}

export { GetUserUseCase };

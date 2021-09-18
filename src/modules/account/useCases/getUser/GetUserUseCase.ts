import { AppError } from "@errors/AppError";
import { User } from "@modules/account/entities/User";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

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

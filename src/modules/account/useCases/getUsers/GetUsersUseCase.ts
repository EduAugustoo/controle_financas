import { User } from "@modules/account/entities/User";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetUsersUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.getAll();
    return users;
  }
}

export { GetUsersUseCase };

import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ name, username, password }: ICreateUserDTO): Promise<void> {
    const user = await this.userRepository.findByUsername(username);
    if (user) {
      throw new AppError("Usuário já existe!");
    }

    const passwordHash = await hash(
      password,
      Math.floor(Math.random() * (10 - 1) + 1)
    );

    await this.userRepository.create({
      name,
      username,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };

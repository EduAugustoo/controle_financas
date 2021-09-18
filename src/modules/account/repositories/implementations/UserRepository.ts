import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/entities/User";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name: data.name,
      username: data.username,
      password: data.password,
    });

    await this.repository.save(user);
  }

  async getAll(): Promise<User[]> {
    const users = await this.repository.find({
      relations: ["movements"],
    });
    return users;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne(
      { username },
      { select: ["id", "name", "username", "password"] }
    );
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UserRepository };

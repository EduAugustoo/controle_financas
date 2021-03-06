import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  getAll(): Promise<User[]>;
  findByUsername(username: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUserRepository };

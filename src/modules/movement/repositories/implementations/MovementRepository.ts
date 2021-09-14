import { getRepository, Repository } from "typeorm";

import { IMovementDTO } from "../../dtos/IMovementDTO";
import { Movement } from "../../entities/Movement";
import { IMovementRepository } from "../IMovementRepository";

class MovementRepository implements IMovementRepository {
  private repository: Repository<Movement>;

  constructor() {
    this.repository = getRepository(Movement);
  }

  async create(data: IMovementDTO): Promise<Movement> {
    const movement = this.repository.create({
      name: data.name,
      description: data.description,
      value: data.value,
    });

    movement.user = Promise.resolve(data.user);

    await this.repository.save(movement);
    return movement;
  }

  async edit(data: IMovementDTO): Promise<void> {
    const movement = this.repository.create({
      id: data.id,
      name: data.name,
      description: data.description,
      value: data.value,
    });

    await this.repository.save(movement);
  }

  async getByUserId(user_id: string): Promise<Movement[]> {
    const movements = await this.repository.find({
      where: { user: user_id },
      order: { createdAt: "DESC" },
    });

    return movements;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { MovementRepository };

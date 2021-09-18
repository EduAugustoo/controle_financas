import { IMovementDTO } from "@modules/movement/dtos/IMovementDTO";
import { Movement } from "@modules/movement/entities/Movement";

interface IMovementRepository {
  create(data: IMovementDTO): Promise<Movement>;
  edit(data: IMovementDTO): Promise<void>;
  deleteById(id: string): Promise<void>;
  getByUserId(user_id: string): Promise<Movement[]>;
}

export { IMovementRepository };

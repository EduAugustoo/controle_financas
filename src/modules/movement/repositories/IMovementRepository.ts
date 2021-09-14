import { IMovementDTO } from "../dtos/IMovementDTO";
import { Movement } from "../entities/Movement";

interface IMovementRepository {
  create(data: IMovementDTO): Promise<Movement>;
  edit(data: IMovementDTO): Promise<void>;
  deleteById(id: string): Promise<void>;
  getByUserId(user_id: string): Promise<Movement[]>;
}

export { IMovementRepository };

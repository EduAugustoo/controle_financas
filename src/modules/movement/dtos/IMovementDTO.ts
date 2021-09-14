import { User } from "../../account/entities/User";

interface IMovementDTO {
  id?: string;
  name: string;
  description: string;
  value: number;
  user?: User;
}

export { IMovementDTO };

import { User } from "@modules/account/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("movement")
class Movement {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @ManyToOne(() => User, (user) => user.movements)
  @JoinColumn({ name: "user" })
  user: Promise<User>;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Movement };

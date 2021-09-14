import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Movement } from "../../movement/entities/Movement";

@Entity("user")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Movement, (movement) => movement.user)
  movements: Promise<Movement[]>;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };

import { User } from "@modules/account/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("token")
class Token {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: "user", referencedColumnName: "id" })
  user: User;

  @Column()
  token: string;

  @Column()
  valid: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @CreateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "expires_at" })
  expiresAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Token };

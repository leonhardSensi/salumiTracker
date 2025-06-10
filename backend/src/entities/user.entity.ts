import crypto from "crypto";
import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcryptjs";
import Model from "./model.entity";
import { Recipe } from "./recipe.entity";
import { Salume } from "./salumi.entity";

export enum RoleEnumType {
  USER = "user",
  ADMIN = "admin",
}

@Entity("users")
export class User extends Model {
  @Column()
  name: string;

  @Index("email_index")
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType.USER;

  @Column({
    default: "default.png",
  })
  photo: string;

  @Column({
    default: false,
  })
  verified: boolean;

  @Index("verificationCode_index")
  @Column({
    type: "text",
    nullable: true,
  })
  verificationCode!: string | null;

  @Column({ type: "text", nullable: true })
  passwordResetToken: string | null;

  @Column({ type: "timestamp", nullable: true })
  passwordResetExpires: Date | null;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];

  @OneToMany(() => Salume, (salume) => salume.user)
  salumi: Salume[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith("$2")) {
      // avoid double-hashing
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  static createVerificationCode() {
    const verificationCode = crypto.randomBytes(32).toString("hex");

    const hashedVerificationCode = crypto
      .createHash("sha256")
      .update(verificationCode)
      .digest("hex");

    return { verificationCode, hashedVerificationCode };
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
      verified: undefined,
      verificationCode: undefined,
    };
  }
}

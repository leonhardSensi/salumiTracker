import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { User } from "./user.entity";

@Entity("recipes")
export class Recipe extends Model {
  @Column({
    unique: true,
  })
  title: string;

  @Column()
  content: string;

  @Column({
    default: "default-recipe.png",
  })
  image: string;

  @ManyToOne(() => User, (user) => user.recipes)
  @JoinColumn()
  user: User;
}

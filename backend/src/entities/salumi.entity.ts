import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Recipe } from "./recipe.entity";
import { User } from "./user.entity";

@Entity("salumi")
export class Salume extends Model {
  @Column()
  name: string;

  @Column()
  notes: string;

  @Column()
  state: string;

  @Column({
    default: "",
  })
  image: string;

  @Column({
    default: 0,
  })
  rating: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.salumi, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "recipeId" })
  recipe: Recipe;

  @ManyToOne(() => User, (user) => user.salumi)
  @JoinColumn({ name: "userId" })
  user: User;
}

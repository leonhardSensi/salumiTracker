import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import Model from "./model.entity";
import { Recipe } from "./recipe.entity";

@Entity("salting")
export class Salting extends Model {
  @Column()
  state: string;

  @Column()
  duration: number;

  @OneToOne(() => Recipe, (recipe) => recipe.salting)
  @JoinColumn({ name: "recipeId" })
  recipe: Recipe;
}

import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Recipe } from "./recipe.entity";

@Entity("spices")
export class Spice extends Model {
  @Column()
  name: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.spices)
  @JoinColumn({ name: "recipeId" })
  recipe: Recipe;
}

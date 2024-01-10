import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import Model from "./model.entity";
import { Recipe } from "./recipe.entity";

@Entity("drying")
export class Drying extends Model {
  @Column()
  state: boolean;

  @Column()
  duration: number;

  @OneToOne(() => Recipe, (recipe) => recipe.drying)
  @JoinColumn({ name: "recipeId" })
  recipe: Recipe;
}

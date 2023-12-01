import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import Model from "./model.entity";
import { Recipe } from "./recipe.entity";

@Entity("curing")
export class Curing extends Model {
  @Column()
  state: string;

  @Column()
  duration: number;

  @OneToOne(() => Recipe, (recipe) => recipe.curing)
  @JoinColumn({ name: "recipeId" })
  recipe: Recipe;
}

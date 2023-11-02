import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Recipe } from "./recipe.entity";

@Entity("steps")
export class Step extends Model {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps)
  @JoinColumn({ name: "recipeId" })
  recipe: Recipe;
}

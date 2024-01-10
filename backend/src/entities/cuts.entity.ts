import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Recipe } from "./recipe.entity";

@Entity("cuts")
export class Cut extends Model {
  @Column()
  name: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.cuts)
  @JoinColumn({ name: "recipeId" })
  recipe: Recipe;
}

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

  @Column({ default: "" })
  status: string;

  @Column({ default: 0 })
  statusDuration: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps, { onDelete: "CASCADE" })
  @JoinColumn({ name: "recipeId" })
  recipe: Recipe;
}

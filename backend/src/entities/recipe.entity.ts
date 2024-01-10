import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Curing } from "./curing.entity";
import { Cut } from "./cuts.entity";
import { Drying } from "./drying.entity";
import Model from "./model.entity";
import { Salting } from "./salting.entity";
import { Spice } from "./spice.entity";
import { Step } from "./step.entity";
import { User } from "./user.entity";

@Entity("recipes")
export class Recipe extends Model {
  @Column({
    unique: true,
  })
  title: string;

  // @Column()
  // content: string;

  // @Column({
  //   default: "default-recipe.png",
  // })
  // image: string;

  // @OneToOne(() => Curing)
  // @JoinColumn()
  // curing: Curing;

  // @OneToOne(() => Salting)
  // @JoinColumn()
  // salting: Salting;

  // @OneToOne(() => Drying)
  // @JoinColumn()
  // drying: Drying;

  @OneToOne(() => Curing, (curing) => curing.recipe, { cascade: true })
  curing: Curing;

  @OneToOne(() => Salting, (salting) => salting.recipe, { cascade: true })
  salting: Salting;

  @OneToOne(() => Drying, (drying) => drying.recipe, { cascade: true })
  drying: Drying;

  @ManyToOne(() => User, (user) => user.recipes)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Cut, (cut) => cut.recipe, {
    cascade: true,
  })
  @JoinColumn({ name: "recipeId" })
  cuts: Cut[];

  @OneToMany(() => Spice, (spice) => spice.recipe, {
    cascade: true,
  })
  @JoinColumn({ name: "recipeId" })
  spices: Spice[];

  @OneToMany(() => Step, (step) => step.recipe, {
    cascade: true,
  })
  @JoinColumn({ name: "recipeId" })
  steps: Step[];

  addStep(step: Step) {
    if (this.steps === null) {
      this.steps = new Array<Step>();
    }
    this.steps.push(step);
  }

  addSpice(spice: Spice) {
    if (this.spices === null) {
      this.spices = new Array<Spice>();
    }
    this.spices.push(spice);
  }

  addCut(cut: Cut) {
    if (this.cuts == null) {
      this.cuts = new Array<Cut>();
    }
    this.cuts.push(cut);
  }
}

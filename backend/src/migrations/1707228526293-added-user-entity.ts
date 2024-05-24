import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1707228526293 implements MigrationInterface {
    name = 'addedUserEntity1707228526293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cuts" DROP CONSTRAINT "FK_5e5aa5eaf56a2871656c4cf270d"`);
        await queryRunner.query(`ALTER TABLE "curing" DROP CONSTRAINT "FK_7007fca691d19d043d0e1e242b8"`);
        await queryRunner.query(`ALTER TABLE "cuts" ADD CONSTRAINT "FK_5e5aa5eaf56a2871656c4cf270d" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "curing" ADD CONSTRAINT "FK_7007fca691d19d043d0e1e242b8" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "curing" DROP CONSTRAINT "FK_7007fca691d19d043d0e1e242b8"`);
        await queryRunner.query(`ALTER TABLE "cuts" DROP CONSTRAINT "FK_5e5aa5eaf56a2871656c4cf270d"`);
        await queryRunner.query(`ALTER TABLE "curing" ADD CONSTRAINT "FK_7007fca691d19d043d0e1e242b8" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cuts" ADD CONSTRAINT "FK_5e5aa5eaf56a2871656c4cf270d" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

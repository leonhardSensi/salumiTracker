import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1701438382769 implements MigrationInterface {
    name = 'addedUserEntity1701438382769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "curing" ADD "recipeId" uuid`);
        await queryRunner.query(`ALTER TABLE "curing" ADD CONSTRAINT "UQ_7007fca691d19d043d0e1e242b8" UNIQUE ("recipeId")`);
        await queryRunner.query(`ALTER TABLE "drying" ADD "recipeId" uuid`);
        await queryRunner.query(`ALTER TABLE "drying" ADD CONSTRAINT "UQ_259b3823a147acc2b7bc62d39ef" UNIQUE ("recipeId")`);
        await queryRunner.query(`ALTER TABLE "salting" ADD "recipeId" uuid`);
        await queryRunner.query(`ALTER TABLE "salting" ADD CONSTRAINT "UQ_f6a51f4f5d5ab69a58f8c88f333" UNIQUE ("recipeId")`);
        await queryRunner.query(`ALTER TABLE "curing" ADD CONSTRAINT "FK_7007fca691d19d043d0e1e242b8" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drying" ADD CONSTRAINT "FK_259b3823a147acc2b7bc62d39ef" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "salting" ADD CONSTRAINT "FK_f6a51f4f5d5ab69a58f8c88f333" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salting" DROP CONSTRAINT "FK_f6a51f4f5d5ab69a58f8c88f333"`);
        await queryRunner.query(`ALTER TABLE "drying" DROP CONSTRAINT "FK_259b3823a147acc2b7bc62d39ef"`);
        await queryRunner.query(`ALTER TABLE "curing" DROP CONSTRAINT "FK_7007fca691d19d043d0e1e242b8"`);
        await queryRunner.query(`ALTER TABLE "salting" DROP CONSTRAINT "UQ_f6a51f4f5d5ab69a58f8c88f333"`);
        await queryRunner.query(`ALTER TABLE "salting" DROP COLUMN "recipeId"`);
        await queryRunner.query(`ALTER TABLE "drying" DROP CONSTRAINT "UQ_259b3823a147acc2b7bc62d39ef"`);
        await queryRunner.query(`ALTER TABLE "drying" DROP COLUMN "recipeId"`);
        await queryRunner.query(`ALTER TABLE "curing" DROP CONSTRAINT "UQ_7007fca691d19d043d0e1e242b8"`);
        await queryRunner.query(`ALTER TABLE "curing" DROP COLUMN "recipeId"`);
    }

}

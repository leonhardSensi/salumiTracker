import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1707228566029 implements MigrationInterface {
    name = 'addedUserEntity1707228566029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salting" DROP CONSTRAINT "FK_f6a51f4f5d5ab69a58f8c88f333"`);
        await queryRunner.query(`ALTER TABLE "spices" DROP CONSTRAINT "FK_ae3d5016d16d78075961a9d6d13"`);
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954"`);
        await queryRunner.query(`ALTER TABLE "drying" DROP CONSTRAINT "FK_259b3823a147acc2b7bc62d39ef"`);
        await queryRunner.query(`ALTER TABLE "salting" ADD CONSTRAINT "FK_f6a51f4f5d5ab69a58f8c88f333" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spices" ADD CONSTRAINT "FK_ae3d5016d16d78075961a9d6d13" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drying" ADD CONSTRAINT "FK_259b3823a147acc2b7bc62d39ef" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drying" DROP CONSTRAINT "FK_259b3823a147acc2b7bc62d39ef"`);
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954"`);
        await queryRunner.query(`ALTER TABLE "spices" DROP CONSTRAINT "FK_ae3d5016d16d78075961a9d6d13"`);
        await queryRunner.query(`ALTER TABLE "salting" DROP CONSTRAINT "FK_f6a51f4f5d5ab69a58f8c88f333"`);
        await queryRunner.query(`ALTER TABLE "drying" ADD CONSTRAINT "FK_259b3823a147acc2b7bc62d39ef" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "spices" ADD CONSTRAINT "FK_ae3d5016d16d78075961a9d6d13" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "salting" ADD CONSTRAINT "FK_f6a51f4f5d5ab69a58f8c88f333" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

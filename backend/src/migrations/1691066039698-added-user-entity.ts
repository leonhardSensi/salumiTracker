import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1691066039698 implements MigrationInterface {
    name = 'addedUserEntity1691066039698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "image" SET DEFAULT 'default-recipe.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "image" SET DEFAULT 'default-rec9ipe.png'`);
    }

}

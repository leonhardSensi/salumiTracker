import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1708511850763 implements MigrationInterface {
    name = 'addedUserEntity1708511850763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" ADD "rating" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" DROP COLUMN "rating"`);
    }

}

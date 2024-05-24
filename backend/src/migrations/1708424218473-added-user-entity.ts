import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1708424218473 implements MigrationInterface {
    name = 'addedUserEntity1708424218473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" ADD "image" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" DROP COLUMN "image"`);
    }

}

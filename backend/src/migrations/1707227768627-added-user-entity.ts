import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1707227768627 implements MigrationInterface {
    name = 'addedUserEntity1707227768627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" ADD "notes" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" DROP COLUMN "notes"`);
    }

}

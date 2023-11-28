import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1701169928291 implements MigrationInterface {
    name = 'addedUserEntity1701169928291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "date_of_birth" character varying NOT NULL DEFAULT 'missing date of birth'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_of_birth"`);
    }

}

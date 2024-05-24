import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1707830845687 implements MigrationInterface {
    name = 'addedUserEntity1707830845687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" ADD "state" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" DROP COLUMN "state"`);
    }

}

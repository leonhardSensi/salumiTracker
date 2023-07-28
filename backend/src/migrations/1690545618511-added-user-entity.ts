import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1690545618511 implements MigrationInterface {
    name = 'addedUserEntity1690545618511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verified" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verified" SET DEFAULT false`);
    }

}

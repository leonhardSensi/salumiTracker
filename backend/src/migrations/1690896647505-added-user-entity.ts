import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserEntity1690896647505 implements MigrationInterface {
    name = 'AddedUserEntity1690896647505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verified" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verified" SET DEFAULT false`);
    }

}

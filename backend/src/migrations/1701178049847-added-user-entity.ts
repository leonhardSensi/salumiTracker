import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1701178049847 implements MigrationInterface {
    name = 'addedUserEntity1701178049847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_of_birth" SET DEFAULT '1970-01-01'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_of_birth" SET DEFAULT 'missing date of birth'`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1714997616600 implements MigrationInterface {
    name = 'addedUserEntity1714997616600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "UQ_aebbaa1cd38e2e5996d58477535"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "UQ_aebbaa1cd38e2e5996d58477535" UNIQUE ("title")`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1701708337246 implements MigrationInterface {
    name = 'addedUserEntity1701708337246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "curing" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "curing" ADD "state" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salting" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "salting" ADD "state" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drying" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "drying" ADD "state" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drying" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "drying" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salting" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "salting" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "curing" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "curing" ADD "state" character varying NOT NULL`);
    }

}

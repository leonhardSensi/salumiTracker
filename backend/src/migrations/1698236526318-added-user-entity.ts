import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1698236526318 implements MigrationInterface {
    name = 'addedUserEntity1698236526318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "steps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "duration" integer NOT NULL, "recipeId" uuid, CONSTRAINT "PK_65f86ac8996204d11f915f66a5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954"`);
        await queryRunner.query(`DROP TABLE "steps"`);
    }

}

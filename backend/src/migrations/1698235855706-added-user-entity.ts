import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1698235855706 implements MigrationInterface {
    name = 'addedUserEntity1698235855706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "spices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "recipeId" uuid, CONSTRAINT "PK_8a4dd1fb2e2efc979b7872071ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "spices" ADD CONSTRAINT "FK_ae3d5016d16d78075961a9d6d13" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spices" DROP CONSTRAINT "FK_ae3d5016d16d78075961a9d6d13"`);
        await queryRunner.query(`DROP TABLE "spices"`);
    }

}

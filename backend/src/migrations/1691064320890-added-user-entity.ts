import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1691064320890 implements MigrationInterface {
  name = "addedUserEntity1691064320890";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "content" character varying NOT NULL, "image" character varying NOT NULL DEFAULT 'default-rec9ipe.png', "userId" uuid, CONSTRAINT "UQ_aebbaa1cd38e2e5996d58477535" UNIQUE ("title"), CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cuts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" number NOT NULL, recipeId uuid)`
    );

    await queryRunner.query(
      `CREATE TABLE "spices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" number NOT NULL, recipeId uuid)`
    );

    await queryRunner.query(
      `CREATE TABLE "steps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, description character varying NOT NULL, "duration" number NOT NULL, recipeId uuid)`
    );

    await queryRunner.query(
      `ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cuts" ADD FOREIGN KEY ("recipeId") REFERENCES  "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await queryRunner.query(
      `ALTER TABLE "spices" ADD FOREIGN KEY ("recipeId") REFERENCES  "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await queryRunner.query(
      `ALTER TABLE "steps" ADD FOREIGN KEY ("recipeId") REFERENCES  "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`
    );
    await queryRunner.query(`DROP TABLE "recipes"`);
  }
}

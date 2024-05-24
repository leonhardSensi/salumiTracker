import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1715600397800 implements MigrationInterface {
    name = 'addedUserEntity1715600397800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" DROP CONSTRAINT "FK_1c3b4de9e35eace5499a4994759"`);
        await queryRunner.query(`ALTER TABLE "salumi" ADD CONSTRAINT "FK_1c3b4de9e35eace5499a4994759" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" DROP CONSTRAINT "FK_1c3b4de9e35eace5499a4994759"`);
        await queryRunner.query(`ALTER TABLE "salumi" ADD CONSTRAINT "FK_1c3b4de9e35eace5499a4994759" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

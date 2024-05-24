import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1707143418371 implements MigrationInterface {
    name = 'addedUserEntity1707143418371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" DROP CONSTRAINT "FK_16dec1953ce71260ea9dd7570f3"`);
        await queryRunner.query(`ALTER TABLE "salumi" RENAME COLUMN "salumeId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "salumi" ADD CONSTRAINT "FK_c1b69bc84cb239a566942b8350b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salumi" DROP CONSTRAINT "FK_c1b69bc84cb239a566942b8350b"`);
        await queryRunner.query(`ALTER TABLE "salumi" RENAME COLUMN "userId" TO "salumeId"`);
        await queryRunner.query(`ALTER TABLE "salumi" ADD CONSTRAINT "FK_16dec1953ce71260ea9dd7570f3" FOREIGN KEY ("salumeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

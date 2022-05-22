import {MigrationInterface, QueryRunner} from "typeorm";

export class addedCommentEntity1653141451952 implements MigrationInterface {
    name = 'addedCommentEntity1653141451952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Comments" (
                "id" integer NOT NULL,
                "text" character varying NOT NULL,
                "user_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
                CONSTRAINT "PK_91e576c94d7d4f888c471fb43de" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "Events"
            ADD "description" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "Events"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()'
        `);
        await queryRunner.query(`
            ALTER TABLE "Comments"
            ADD CONSTRAINT "FK_22ec3485cde8dfcd915922addc1" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Comments" DROP CONSTRAINT "FK_22ec3485cde8dfcd915922addc1"
        `);
        await queryRunner.query(`
            ALTER TABLE "Events" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "Events" DROP COLUMN "description"
        `);
        await queryRunner.query(`
            DROP TABLE "Comments"
        `);
    }

}

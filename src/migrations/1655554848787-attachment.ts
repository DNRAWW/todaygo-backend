import {MigrationInterface, QueryRunner} from "typeorm";

export class attachment1655554848787 implements MigrationInterface {
    name = 'attachment1655554848787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "attachments" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "path" character varying NOT NULL,
                CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT 'NOW()'
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT 'NOW()'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-06-18 10:07:52.154753'
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-06-18 10:07:52.154753'
        `);
        await queryRunner.query(`
            DROP TABLE "attachments"
        `);
    }

}

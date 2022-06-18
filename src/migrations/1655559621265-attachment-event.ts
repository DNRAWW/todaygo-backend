import {MigrationInterface, QueryRunner} from "typeorm";

export class attachmentEvent1655559621265 implements MigrationInterface {
    name = 'attachmentEvent1655559621265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "events"
            ADD "attachment_id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ADD CONSTRAINT "UQ_922458ff7bf5bd984acc59f2bc7" UNIQUE ("attachment_id")
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
        await queryRunner.query(`
            ALTER TABLE "events"
            ADD CONSTRAINT "FK_922458ff7bf5bd984acc59f2bc7" FOREIGN KEY ("attachment_id") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "events" DROP CONSTRAINT "FK_922458ff7bf5bd984acc59f2bc7"
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-06-18 12:50:45.483457'
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-06-18 12:50:45.483457'
        `);
        await queryRunner.query(`
            ALTER TABLE "events" DROP CONSTRAINT "UQ_922458ff7bf5bd984acc59f2bc7"
        `);
        await queryRunner.query(`
            ALTER TABLE "events" DROP COLUMN "attachment_id"
        `);
    }

}

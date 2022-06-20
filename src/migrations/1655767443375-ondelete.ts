import {MigrationInterface, QueryRunner} from "typeorm";

export class ondelete1655767443375 implements MigrationInterface {
    name = 'ondelete1655767443375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event_participants" DROP CONSTRAINT "FK_b5349807aae71193d0cc0f52e35"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants" DROP CONSTRAINT "FK_c017c8d595115459d755628627a"
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
            ALTER TABLE "event_participants"
            ADD CONSTRAINT "FK_b5349807aae71193d0cc0f52e35" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants"
            ADD CONSTRAINT "FK_c017c8d595115459d755628627a" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "event_participants" DROP CONSTRAINT "FK_c017c8d595115459d755628627a"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants" DROP CONSTRAINT "FK_b5349807aae71193d0cc0f52e35"
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-06-20 16:23:53.433964'
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-06-20 16:23:53.433964'
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants"
            ADD CONSTRAINT "FK_c017c8d595115459d755628627a" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants"
            ADD CONSTRAINT "FK_b5349807aae71193d0cc0f52e35" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class idField1653820583676 implements MigrationInterface {
    name = 'idField1653820583676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "events" DROP CONSTRAINT "FK_14c9ce53a2c2a1c781b8390123e"
        `);
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "users_id_seq" OWNED BY "users"."id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"users_id_seq"')
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_461f657582347f3ef6fe6f61ca8"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants" DROP CONSTRAINT "FK_c017c8d595115459d755628627a"
        `);
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "people_id_seq" OWNED BY "people"."id"
        `);
        await queryRunner.query(`
            ALTER TABLE "people"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"people_id_seq"')
        `);
        await queryRunner.query(`
            ALTER TABLE "event_comments" DROP CONSTRAINT "FK_c77b36c1831ae89d3fd70ddd773"
        `);
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "comments_id_seq" OWNED BY "comments"."id"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"comments_id_seq"')
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT 'NOW()'
        `);
        await queryRunner.query(`
            ALTER TABLE "event_comments" DROP CONSTRAINT "FK_2872e03140f7eb6b76899b2ca69"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants" DROP CONSTRAINT "FK_b5349807aae71193d0cc0f52e35"
        `);
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "events_id_seq" OWNED BY "events"."id"
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"events_id_seq"')
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT 'NOW()'
        `);
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "event_comments_id_seq" OWNED BY "event_comments"."id"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_comments"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"event_comments_id_seq"')
        `);
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "event_participants_id_seq" OWNED BY "event_participants"."id"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"event_participants_id_seq"')
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_461f657582347f3ef6fe6f61ca8" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ADD CONSTRAINT "FK_14c9ce53a2c2a1c781b8390123e" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "event_comments"
            ADD CONSTRAINT "FK_2872e03140f7eb6b76899b2ca69" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "event_comments"
            ADD CONSTRAINT "FK_c77b36c1831ae89d3fd70ddd773" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants"
            ADD CONSTRAINT "FK_b5349807aae71193d0cc0f52e35" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants"
            ADD CONSTRAINT "FK_c017c8d595115459d755628627a" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "event_comments" DROP CONSTRAINT "FK_c77b36c1831ae89d3fd70ddd773"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_comments" DROP CONSTRAINT "FK_2872e03140f7eb6b76899b2ca69"
        `);
        await queryRunner.query(`
            ALTER TABLE "events" DROP CONSTRAINT "FK_14c9ce53a2c2a1c781b8390123e"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_461f657582347f3ef6fe6f61ca8"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "event_participants_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_comments"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "event_comments_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-29 10:28:27.150445'
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "events_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants"
            ADD CONSTRAINT "FK_b5349807aae71193d0cc0f52e35" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "event_comments"
            ADD CONSTRAINT "FK_2872e03140f7eb6b76899b2ca69" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-29 10:28:27.150445'
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "comments_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_comments"
            ADD CONSTRAINT "FK_c77b36c1831ae89d3fd70ddd773" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "people"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "people_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "event_participants"
            ADD CONSTRAINT "FK_c017c8d595115459d755628627a" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_461f657582347f3ef6fe6f61ca8" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "users_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ADD CONSTRAINT "FK_14c9ce53a2c2a1c781b8390123e" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}

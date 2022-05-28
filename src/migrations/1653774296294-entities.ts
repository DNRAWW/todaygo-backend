import {MigrationInterface, QueryRunner} from "typeorm";

export class entities1653774296294 implements MigrationInterface {
    name = 'entities1653774296294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" integer NOT NULL,
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                "person_id" integer NOT NULL,
                CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "people" (
                "id" integer NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "sur_name" character varying,
                "visable_name" character varying NOT NULL,
                "org_name" character varying,
                "date_of_birth" TIMESTAMP NOT NULL,
                "role" character varying NOT NULL,
                "full_name" character varying NOT NULL,
                CONSTRAINT "UQ_ab9d0eae408360e59efc4bc2805" UNIQUE ("visable_name"),
                CONSTRAINT "UQ_51106a5a42b63c84031ff676800" UNIQUE ("org_name"),
                CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" integer NOT NULL,
                "text" character varying NOT NULL,
                "person_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
                CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."events_tags_enum" AS ENUM('CULTURAL', 'EDUCATIONAL', 'ENTERTAINMENT')
        `);
        await queryRunner.query(`
            CREATE TABLE "events" (
                "id" integer NOT NULL,
                "name" character varying NOT NULL,
                "organizer_id" integer NOT NULL,
                "max_number_of_participants" integer NOT NULL,
                "tags" "public"."events_tags_enum" array NOT NULL,
                "description" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
                "price" integer NOT NULL,
                "address" character varying NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "number_of_participants" integer NOT NULL DEFAULT '0',
                "duration" integer NOT NULL,
                CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "event_comments" (
                "id" integer NOT NULL,
                "event_id" integer NOT NULL,
                "comment_id" integer NOT NULL,
                CONSTRAINT "PK_261532ab6a0aeb468c436fa1679" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "event_participants" (
                "id" integer NOT NULL,
                "event_id" integer NOT NULL,
                "person_id" integer NOT NULL,
                CONSTRAINT "PK_b65ffd558d76fd51baffe81d42b" PRIMARY KEY ("id")
            )
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
            DROP TABLE "event_participants"
        `);
        await queryRunner.query(`
            DROP TABLE "event_comments"
        `);
        await queryRunner.query(`
            DROP TABLE "events"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."events_tags_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "comments"
        `);
        await queryRunner.query(`
            DROP TABLE "people"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}

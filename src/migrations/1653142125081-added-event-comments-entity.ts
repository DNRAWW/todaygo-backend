import {MigrationInterface, QueryRunner} from "typeorm";

export class addedEventCommentsEntity1653142125081 implements MigrationInterface {
    name = 'addedEventCommentsEntity1653142125081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "eventComments" (
                "id" integer NOT NULL,
                "event_id" integer NOT NULL,
                "comment_id" integer NOT NULL,
                CONSTRAINT "PK_f83ec9b19390ab8d4db709f124f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "Comments"
            ALTER COLUMN "created_at"
            SET DEFAULT 'NOW()'
        `);
        await queryRunner.query(`
            ALTER TABLE "Events"
            ALTER COLUMN "created_at"
            SET DEFAULT 'NOW()'
        `);
        await queryRunner.query(`
            ALTER TABLE "eventComments"
            ADD CONSTRAINT "FK_ffe11b4794baed66708de3c59b5" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "eventComments"
            ADD CONSTRAINT "FK_b72c9a4117fd659b9926871cde4" FOREIGN KEY ("comment_id") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "eventComments" DROP CONSTRAINT "FK_b72c9a4117fd659b9926871cde4"
        `);
        await queryRunner.query(`
            ALTER TABLE "eventComments" DROP CONSTRAINT "FK_ffe11b4794baed66708de3c59b5"
        `);
        await queryRunner.query(`
            ALTER TABLE "Events"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-21 14:06:51.096085'
        `);
        await queryRunner.query(`
            ALTER TABLE "Comments"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-21 14:06:51.096085'
        `);
        await queryRunner.query(`
            DROP TABLE "eventComments"
        `);
    }

}

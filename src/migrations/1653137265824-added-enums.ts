import {MigrationInterface, QueryRunner} from "typeorm";

export class addedEnums1653137265824 implements MigrationInterface {
    name = 'addedEnums1653137265824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "role"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."Users_role_enum" AS ENUM('REGULAR_USER', 'ORGANIZER', 'ADMIN')
        `);
        await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "role" "public"."Users_role_enum" NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "Events" DROP COLUMN "tags"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."Events_tags_enum" AS ENUM('CULTURAL', 'EDUCATIONAL', 'ENTERTAINMENT')
        `);
        await queryRunner.query(`
            ALTER TABLE "Events"
            ADD "tags" "public"."Events_tags_enum" array NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Events" DROP COLUMN "tags"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."Events_tags_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "Events"
            ADD "tags" character varying array NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "role"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."Users_role_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "role" character varying NOT NULL
        `);
    }

}

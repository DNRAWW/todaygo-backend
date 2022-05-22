import {MigrationInterface, QueryRunner} from "typeorm";

export class addedVisableAndOrganizerNameToUser1653149835725 implements MigrationInterface {
    name = 'addedVisableAndOrganizerNameToUser1653149835725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "org_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "Users"
            ADD CONSTRAINT "UQ_afc63b3b116a4b454260d7bdce0" UNIQUE ("org_name")
        `);
        await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "visable_name"
            SET NOT NULL
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Events"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-21 16:14:02.639742'
        `);
        await queryRunner.query(`
            ALTER TABLE "Comments"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-21 16:14:02.639742'
        `);
        await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "visable_name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "Users" DROP CONSTRAINT "UQ_afc63b3b116a4b454260d7bdce0"
        `);
        await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "org_name"
        `);
    }

}

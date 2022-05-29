import {MigrationInterface, QueryRunner} from "typeorm";

export class changedEventDateField1653827071114 implements MigrationInterface {
    name = 'changedEventDateField1653827071114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT 'NOW()'
        `);
        await queryRunner.query(`
            ALTER TABLE "events" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ADD "date" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT 'NOW()'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-29 12:00:23.656237'
        `);
        await queryRunner.query(`
            ALTER TABLE "events" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ADD "date" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-05-29 12:00:23.656237'
        `);
    }

}

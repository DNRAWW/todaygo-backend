import {MigrationInterface, QueryRunner} from "typeorm";

export class deletedCity1666335683491 implements MigrationInterface {
    name = 'deletedCity1666335683491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_5ed72dcd00d6e5a88c6a6ba3d18" UNIQUE ("person_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT 'NOW()'
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18"
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-10-21 06:58:55.658585'
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-10-21 06:58:55.658585'
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_5ed72dcd00d6e5a88c6a6ba3d18"
        `);
    }

}

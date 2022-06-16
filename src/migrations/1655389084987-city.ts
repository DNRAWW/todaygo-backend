import {MigrationInterface, QueryRunner} from "typeorm";

export class city1655389084987 implements MigrationInterface {
    name = 'city1655389084987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cities" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ADD "city_id" integer NOT NULL
        `);
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
            SET DEFAULT 'NOW()'
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ADD CONSTRAINT "FK_53a3ffaa30453fb76c0822c2362" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "events" DROP CONSTRAINT "FK_53a3ffaa30453fb76c0822c2362"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18"
        `);
        await queryRunner.query(`
            ALTER TABLE "events"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-06-16 14:17:57.756433'
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-06-16 14:17:57.756433'
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_5ed72dcd00d6e5a88c6a6ba3d18"
        `);
        await queryRunner.query(`
            ALTER TABLE "events" DROP COLUMN "city_id"
        `);
        await queryRunner.query(`
            DROP TABLE "cities"
        `);
    }

}

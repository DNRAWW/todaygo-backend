import {MigrationInterface, QueryRunner} from "typeorm";

export class addedEventEntity1653137136751 implements MigrationInterface {
    name = 'addedEventEntity1653137136751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Events" (
                "id" integer NOT NULL,
                "name" character varying NOT NULL,
                "organizer_id" integer NOT NULL,
                "max_number_of_participants" integer NOT NULL,
                "tags" character varying array NOT NULL,
                CONSTRAINT "PK_efc6f7ffffa26a4d4fe5f383a0b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "Events"
            ADD CONSTRAINT "FK_a0a371e3d49773af343ab348e70" FOREIGN KEY ("organizer_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Events" DROP CONSTRAINT "FK_a0a371e3d49773af343ab348e70"
        `);
        await queryRunner.query(`
            DROP TABLE "Events"
        `);
    }

}

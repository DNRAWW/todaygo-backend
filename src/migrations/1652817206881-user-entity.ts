import {MigrationInterface, QueryRunner} from "typeorm";

export class userEntity1652817206881 implements MigrationInterface {
    name = 'userEntity1652817206881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Users" (
                "id" integer NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "sur_name" character varying NOT NULL,
                "date_of_birth" TIMESTAMP NOT NULL,
                "role" character varying NOT NULL,
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                "full_name" character varying NOT NULL,
                CONSTRAINT "UQ_03599a389e75563b8314f74278b" UNIQUE ("login"),
                CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "Users"
        `);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class adminSeed1654452585580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO people (first_name, last_name, sur_name, visable_name, date_of_birth, role, full_name) VALUES
            ('Костя', 'Могучев', 'Андреевич', 'dnraww', '2002-02-27', 'ADMIN', 'Могучев Константин Андреевич');
            
            INSERT INTO users (login, password, person_id) VALUES ('admin', '$2b$04$g.NG/Aw1nqoOQmp61xZCg.hL6NIwDgc/34iBu3ZKBficI4SYSx6.K', 1);

            INSERT INTO people (first_name, last_name, sur_name, visable_name, date_of_birth, role, full_name) VALUES
            ('Костя', 'Могучев', 'Андреевич', 'einMann', '2002-02-27', 'ORGANIZER', 'Могучев Константин Андреевич');
            
            INSERT INTO users (login, password, person_id) VALUES ('organizer', '$2b$04$g.NG/Aw1nqoOQmp61xZCg.hL6NIwDgc/34iBu3ZKBficI4SYSx6.K', 2);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

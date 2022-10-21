import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedEvent1655559656802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO attachments (name, path) VALUES ('default.png', 'static/default.png');

        INSERT INTO events (name, tags, max_number_of_participants, price, address, date, duration, description, organizer_id, attachment_id) VALUES
        ('Очень крутое мероприятие', '{EDUCATIONAL}', 123, 10000, 'Пр. Луночарского дом 53', '2022-06-25T15:00:00', 3600, 'Очень крутое мероприятие, приходите все', 1, 1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

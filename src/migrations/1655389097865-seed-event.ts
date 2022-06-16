import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedEvent1655389097865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO cities (name) VALUES ('Санкт-Петербург');
        INSERT INTO cities (name) VALUES ('Москва');
        INSERT INTO cities (name) VALUES ('Екатеринбург');


        INSERT INTO events (name, tags, max_number_of_participants, price, address, date, duration, description, organizer_id, city_id) VALUES
        ('Очень крутое мероприятие', '{EDUCATIONAL}', 123, 10000, 'Пр. Луночарского дом 53', '2022-06-25T15:00:00', 3600, 'Очень крутое мероприятие, приходите все', 1, 1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

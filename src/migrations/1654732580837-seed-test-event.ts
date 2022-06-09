import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedTestEvent1654732580837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO events (name, tags, max_number_of_participants, price, address, date, duration, description, organizer_id) VALUES
        ('Очень крутое мероприятие', '{EDUCATIONAL}', 123, 10000, 'Пр. Луночарского дом 53', '2022-06-15', 3600, 'Очень крутое мероприятие, приходите все', 1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

import {SnakeNamingStrategy} from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from "@nestjs/config"

export function getOrmConfig(): TypeOrmModuleOptions {
    const config = new ConfigService();

    return {
        type: 'postgres',
        host: config.get<string>("POSTGRES_HOST"),
        port: config.get<number>("POSTGRES_PORT"),
        username: config.get<string>("POSTGRES_USER"),
        password: config.get<string>("POSTGRES_PASSWORD"),
        database: config.get<string>("POSTGRES_DB"),
        entities: ['./dist/entities/**/*.entity.js'],
        migrations: ['./dist/migrations/**/*.js'],
        migrationsTableName: 'migrations',
        namingStrategy: new SnakeNamingStrategy(),
        logging: 'all',
        cli: {
            migrationsDir: 'src/migrations',
        },
        migrationsRun: true,
    };
}
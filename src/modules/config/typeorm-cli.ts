import { getOrmConfig } from "./typeorm";


export default [{
    name: 'migrations:generate',
    ...getOrmConfig(),
    entities: ['src/modules/**/entities/**/*.entity.ts'],
}, {
    name: 'migrations:create-run-revert',
    ...getOrmConfig(),
    migrations: ['src/migrations/**/*.ts'],
}];
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { getConfig } from './src/config/configuration';

dotenv.config();

const {
  database: { host, port, password, user, dbName },
} = getConfig();

export default new DataSource({
  type: 'postgres',
  host,
  port,
  username: user,
  password,
  database: dbName,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/**/migrations/*.ts'],
  subscribers: ['src/**/subscribers/*.ts'],
});

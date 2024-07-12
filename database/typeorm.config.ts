import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  type: 'postgres',
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
  migrations: [process.cwd() + '/database/migrations/*{.ts,.js}'],
  migrationsTableName: '__migrations_typeorm',
  synchronize: false,
  ssl: process.env.DB_SSL === 'true' ? true : false,
});

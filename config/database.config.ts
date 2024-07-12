import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  type: process.env.DB_TYPE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../database/migrations/*.{.ts,.js}'],
  migrationsTableName: '__migrations_typeorm',
  synchronize: false,
  autoLoadEntities: true,
  ssl: process.env.DB_SSL === 'true' ? true : false,
}));

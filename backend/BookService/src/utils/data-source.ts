import { DataSource } from 'typeorm';
import { Book } from '../entities/Book';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1',
  database: process.env.DB_NAME || 'books',
  entities: ['src/entities/*.ts'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING ==='false',
  
});


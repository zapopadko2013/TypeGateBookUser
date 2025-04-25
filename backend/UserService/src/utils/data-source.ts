import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1',
  database: process.env.DB_NAME || 'users',
  entities: [User], 
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING ==='false',

 
});


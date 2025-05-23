import { config } from 'dotenv';
import { Book } from './entities/Book';

config();

export = {


  type: 'postgres',

  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1',
  database: process.env.DB_NAME || 'books',
  entities: [Book],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
 
};


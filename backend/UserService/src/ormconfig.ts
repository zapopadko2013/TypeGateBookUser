import { config } from 'dotenv';
import { User } from './entities/User';

config();


export = {
  type: 'postgres',

  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1',
  database: process.env.DB_NAME || 'users',
  entities: [User], 
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',


};


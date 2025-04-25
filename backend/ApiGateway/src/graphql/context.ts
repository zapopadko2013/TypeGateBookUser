import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { Request } from 'express';
import { User } from './modules/users/user';

config();

const ACCESS_SECRET = process.env.ACCESS_SECRET!;

export const context = ({ req }: { req: Request }) => {

  
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
   
  
    try {
      const user = jwt.verify(token, ACCESS_SECRET) as User;
      
     

      return { user };
    } catch (err) {
      return { user: null };
    }
  };
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';



config();

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const generateTokens = (user: { id: number; email: string }) => {

 
  const access = jwt.sign(user, ACCESS_SECRET, { expiresIn: '15m' });
  const refresh = jwt.sign(user, REFRESH_SECRET, { expiresIn: '7d' });

 
  return { access, refresh };
};

export const verifyRefreshToken = (token: string): { id: number; email: string } | null => {
  try {
    return jwt.verify(token, REFRESH_SECRET) as { id: number; email: string };
  } catch (err) {
    return null;
  }
};

export const verifyAccess = (token: string) => jwt.verify(token, ACCESS_SECRET);
export const verifyRefresh = (token: string) => jwt.verify(token, REFRESH_SECRET);
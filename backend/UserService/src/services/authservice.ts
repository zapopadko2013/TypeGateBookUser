import { AppDataSource } from '../utils/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import { generateTokens,verifyRefreshToken } from '../utils/jwt';
import { GraphQLError } from 'graphql';

export const authService = {
    async register(data: { name: string; email: string; password: string })  {
    const repo = AppDataSource.getRepository(User);
  
    const exists = await repo.findOneBy({ email: data.email });
    

    if (exists) {
      return { error: 'Email already in use' }; 
    }
  
    const hash = await bcrypt.hash(data.password, 10);
  
    // 1. создаём пользователя
    const newUser = repo.create({
      name: data.name,
      email: data.email,
      password: hash,
      created_at: new Date(),
      updated_at: new Date(),
    });
  
    // 2. сохраняем и получаем объект с id
    const savedUser = await repo.save(newUser);
  
    // 3. генерируем токены с использованием id
    const tokens = generateTokens({ id: savedUser.id, email: savedUser.email });
  
    // 4. возвращаем корректную структуру
   
   return { ...savedUser, ...tokens };
  },

  async login(data: { email: string; password: string }) {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ email: data.email });
    if (!user) return { error: 'Invalid credentials' };

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) return { error: 'Invalid credentials' };

    const tokens = generateTokens({ id: user.id, email: user.email });
    return { user, ...tokens };
  },

  async me(userId: number) {
    const repo = AppDataSource.getRepository(User);

    if (!userId) {
      throw new Error('User ID is required');
    }
   

    const user = await repo.findOneBy({ id: userId });
    
    return user;
  },

   ///////

   

   async refresh(refreshToken: string){
    try {

      
      const user = verifyRefreshToken(refreshToken);
     
      if (!user) throw new Error('Invalid refresh token');
     
    
      return generateTokens({ id: user.id, email: user.email }); // возвращает новый access и refresh
    } catch {
      throw new Error('Invalid refresh token');
    }
  },

  async logout(refreshToken: string)  {
    // Здесь ты можешь удалить refreshToken из БД или занести в blacklist
    return { success: true };
  },

   ///////


};
import { IResolvers } from '@graphql-tools/utils';
import { sendToQueue } from '../../../rabbit/sendToQueue';
import { User } from './user';
import { config } from 'dotenv';

config();


const QueueUser = process.env.RABBITMQ_USER!;


interface Context {
  user?: User | null;
}

type RegisterResult = {
    id?: number;
    name?: string;
    email?: string;
    access?: string;
    refresh?: string;
    error?: string;
  };

export const userResolvers: IResolvers<any, Context> = {
  Query: {
  

   me: async(_: unknown, __: unknown, context: Context) => {
  
   

    const result = await sendToQueue(QueueUser, { oper: 'me', body: {  id: context.user?.id } }) as RegisterResult;
  
    if (result.error) {
      throw new Error(result.error);
    }
  
    return result;
  

   }
    ,


  },
  Mutation: {

  

   register: async (_: unknown, { input }: { input: any }) => {
    
   

    const result = await sendToQueue(QueueUser, {
        oper: 'register',
        body: input,
      }) as RegisterResult;
  
    if (result.error) {
      throw new Error(result.error);
    }
  
    return result;
  },

   

   login: async(_: unknown, { input }: { input: any }) => {
    
    

    const result = await sendToQueue(QueueUser, { oper: 'login', body: input }) as RegisterResult;
  
    if (result.error) {
      throw new Error(result.error);
    }
  
    return result;
  },


  

   refresh: async(_: unknown, { refreshToken }: { refreshToken: string }) => {

    const result = await sendToQueue(QueueUser, { oper: 'refresh', body: { refreshToken } }) as RegisterResult;
  
    if (result.error) {
      throw new Error(result.error);
    }
  
    return result;
  },

   


    logout: (_: unknown, { refreshToken }: { refreshToken: string }) =>
      sendToQueue(QueueUser, { oper: 'logout', body: { refreshToken } }),
  },
};
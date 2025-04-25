import { IResolvers } from '@graphql-tools/utils';
import { sendToQueue } from '../../../rabbit/sendToQueue';
import { ServiceResponse } from '../../../types/serviceresponse';
import { GraphQLError } from 'graphql';
import { config } from 'dotenv';

config();

const QueueBook = process.env.RABBITMQ_BOOK!;
const QueueUser = process.env.RABBITMQ_USER!;

type Book = {
  id?: number;
  title?: string;
  description?: string;
  author_id?: number;
  created_at?: string;
  updated_at?: string;
  author?: {
    id: number;
    name: string;
  };
};


export const bookResolvers: IResolvers = {
  Query: {
   // getBooksList: async() => await sendToQueue(QueueBook, { oper: 'getBooks', body: {} }),
   getBooksList: async() => 
    {
     const result = await sendToQueue('books', { oper: 'getBooks', body: {} });
     console.log('Books List Result:', result);
     return result;
   },
    getBookById: async(_: unknown, { id }: { id: number }) =>
      await sendToQueue(QueueBook, { oper: 'getBook', body: { id } }),
  },

  Mutation: {

    createBook: async (_: unknown, { input }: { input: any }) => {
      const result = await sendToQueue(QueueBook, {
        oper: 'createBook',
        body: input,
      }) as ServiceResponse<Book>;

      if (result.error) {
        throw new GraphQLError(result.error);
      }

      return result;
    },

    updateBook: async (_: unknown, { id, input }: { id: number; input: any }) => {
      const result = await sendToQueue(QueueBook, {
        oper: 'updateBook',
        body: { id, ...input },
      }) as ServiceResponse<Book>;

      if (result.error) {
        throw new GraphQLError(result.error);
      }

      return result;
    },
  

   
  },

  Book: {
    author: async (book: { author_id: number }) => {
      return await sendToQueue(QueueUser, { oper: 'me', body: { id: book.author_id } });
    },
  },
};

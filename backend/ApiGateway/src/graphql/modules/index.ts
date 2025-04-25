import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './users/schema';
import { userResolvers } from './users/resolvers';
import { bookTypeDefs } from './books/schema';
import { bookResolvers } from './books/resolvers';

export const typeDefs = mergeTypeDefs([userTypeDefs, bookTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, bookResolvers]);
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';
import {  userResolvers } from './modules/users/resolvers';
import {  bookResolvers } from './modules/books/resolvers';
import { userTypeDefs } from './modules/users/schema';
import { bookTypeDefs } from './modules/books/schema';

const typeDefs = mergeTypeDefs([
  `
  type Query
  type Mutation
  `,
  userTypeDefs,
  bookTypeDefs,
]);

const resolvers = mergeResolvers([
  {
    Query: {},
    Mutation: {},
  },
  userResolvers,
  bookResolvers,
]);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
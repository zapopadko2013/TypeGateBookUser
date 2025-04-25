import { gql } from 'apollo-server';

export const bookTypeDefs = gql`
  type Book {
    id: Int!
    title: String!
    description: String
    author: User
    created_at: String
    updated_at: String
  }

  input CreateBookInput {
    title: String!
    description: String
    author_id: Int!
  }

  input UpdateBookInput {
    title: String
    description: String
    author_id: Int
  }

  extend type Query {
    getBooksList: [Book!]!
    getBookById(id: Int!): Book
  }

  extend type Mutation {
    createBook(input: CreateBookInput!): Book
    updateBook(id: Int!, input: UpdateBookInput!): Book
  }
`;
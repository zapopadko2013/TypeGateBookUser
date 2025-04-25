import { gql } from 'apollo-server';

export const userTypeDefs = gql`

type AuthPayload {
  id: Int!
  name: String!
  email: String!
  created_at: String
  updated_at: String
  access: String!
  refresh: String!
} 



  type User {
    id: Int!
    name: String!
    email: String!
    created_at: String
    updated_at: String
  }

  type Tokens {
    access: String!
    refresh: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload
    login(input: LoginInput!): Tokens
    refresh(refreshToken: String!): Tokens
    logout(refreshToken: String!): Boolean
  }
`;
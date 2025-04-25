import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { schema } from './graphql/schema';
import { context } from './graphql/context';

config(); // загрузка .env

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  schema,
  context,
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Gateway GraphQL running at ${url}`);
});

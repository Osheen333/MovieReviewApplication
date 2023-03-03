// node-graphql/src/index.js

const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('./schema');
const resolvers = require('./graphql/resolvers/index');

const port = process.env.PORT || 9090;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({req}) => ({req}),
});

server.listen({port}, () =>
  console.log(`Server runs at: http://localhost:${port}`)
);

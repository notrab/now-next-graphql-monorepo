const { ApolloServer, gql } = require('apollo-server-micro')

const typeDefs = gql`
  type User {
    id: ID!
    name: String
  }

  type Query {
    users: [User!]!
  }
`

const resolvers = {
  Query: {
    users: () => [
      {
        id: 1,
        name: 'Jamie Barton',
      },
      {
        id: 2,
        name: 'Sophie Barton',
      },
      {
        id: 3,
        name: 'Felicity Barton',
      },
      {
        id: 4,
        name: 'Bethany Barton',
      },
    ],
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

module.exports = server.createHandler()

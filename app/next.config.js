require('dotenv').config()

module.exports = {
  target: 'serverless',
  env: {
    GRAPHQL_ENDPOINT: 'http://localhost:3000/graphql',
  },
}

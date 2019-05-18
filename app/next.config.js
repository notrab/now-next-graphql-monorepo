require('dotenv').config()

module.exports = {
  target: 'serverless',
  env: {
    GRAPHQL_ENDPOINT: 'http://localhost:4000',
  },
}

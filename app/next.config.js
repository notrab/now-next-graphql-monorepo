require('dotenv').config()

module.exports = {
  target: 'serverless',
  env: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
}

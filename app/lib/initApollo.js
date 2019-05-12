import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

function create(initialState, { getToken }) {
  const httpLink = createHttpLink({
    uri: 'https://graphql.emlakim.com/' || process.env.GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
    fetch: !process.browser && fetch,
  })

  const authLink = setContext((_, { headers }) => {
    const token = getToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo(initialState, options) {
  if (!process.browser) {
    return create(initialState, options)
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}

import query from '../graphql/query/currentUser.graphql'

const checkLoggedIn = client =>
  client
    .query({
      query,
    })
    .then(({ data }) => ({ loggedInUser: data }))
    .catch(() => ({ loggedInUser: {} }))

export default checkLoggedIn

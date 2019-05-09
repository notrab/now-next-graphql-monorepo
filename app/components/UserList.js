import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const allUsersQuery = gql`
  query allUsers {
    users {
      id
      name
    }
  }
`

export default function UserList() {
  return (
    <Query query={allUsersQuery}>
      {({ loading, error, data: { users } }) => {
        if (error) return <p>Something went wrong loading users</p>
        if (loading) return <p>Loading users...</p>

        return (
          <div>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </div>
        )
      }}
    </Query>
  )
}

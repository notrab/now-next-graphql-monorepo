import React from 'react'
import { ApolloConsumer } from 'react-apollo'

import { clearCookies } from '../../lib/cookies'
import redirect from '../../lib/redirect'

const Logout = () => (
  <ApolloConsumer>
    {client => {
      const handleLogout = async () => {
        await clearCookies(document)

        await client.cache.reset()

        redirect({}, '/')
      }

      return <button onClick={handleLogout}>Logout</button>
    }}
  </ApolloConsumer>
)

export default Logout

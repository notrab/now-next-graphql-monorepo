import React from 'react'
import Link from 'next/link'
import { Query } from 'react-apollo'

import Logout from './Logout'
import CURRENT_USER_QUERY from '../../graphql/query/currentUser.graphql'

const Header = () => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data }) => {
      const loggedInUser = data && data.me
      const loggedIn = !!loggedInUser
      const needsVerified = loggedIn && !loggedInUser.verified

      return (
        <React.Fragment>
          {needsVerified && <p>You must verify your account</p>}
          <header>
            <Link href="/">
              <a>App name</a>
            </Link>

            <Nav loggedIn={loggedIn} loggedInUser={loggedInUser} />
          </header>
        </React.Fragment>
      )
    }}
  </Query>
)

const Nav = ({ loggedIn, loggedInUser }) => {
  if (loggedIn)
    return (
      <ul>
        <li>Hello {loggedInUser.name}</li>
        <li>
          <Link href="/myaccount">
            <a>My Account</a>
          </Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    )

  return (
    <ul>
      <li>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
      <li>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </li>
    </ul>
  )
}

export default Header

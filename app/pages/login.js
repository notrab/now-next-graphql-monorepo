import React from 'react'

import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

import Page from '../components/shared/Page'
import LoginForm from '../components/auth/LoginForm'

const LoginPage = () => (
  <Page>
    <LoginForm />
  </Page>
)

LoginPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient)

  if (loggedInUser.me) {
    redirect(context, '/myaccount')
  }

  return {}
}

export default LoginPage

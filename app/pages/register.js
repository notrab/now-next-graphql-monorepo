import React from 'react'

import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

import Page from '../components/shared/Page'
import RegisterForm from '../components/auth/RegisterForm'

const RegisterPage = () => (
  <Page>
    <RegisterForm />
  </Page>
)

RegisterPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient)

  if (loggedInUser.me) {
    redirect(context, '/myaccount')
  }

  return {}
}

export default RegisterPage

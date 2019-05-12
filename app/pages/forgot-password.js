import React from 'react'

import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

import Page from '../components/shared/Page'
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'

const ForgotPasswordPage = () => (
  <Page>
    <ForgotPasswordForm />
  </Page>
)

ForgotPasswordPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient)

  if (loggedInUser.me) {
    redirect(context, '/myaccount')
  }

  return {}
}

export default ForgotPasswordPage

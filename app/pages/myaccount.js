import React from 'react'

import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from '../lib/redirect'

import Page from '../components/shared/Page'
import EditUserForm from '../components/user/EditUserForm'

const MyAccountPage = ({ loggedInUser }) => (
  <Page>
    <EditUserForm initialValues={loggedInUser.me} />
  </Page>
)

MyAccountPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient)

  if (!loggedInUser.me) {
    redirect(context, '/login')
  }

  return { loggedInUser }
}

export default MyAccountPage

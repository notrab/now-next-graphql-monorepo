import React from 'react'

import Page from '../components/shared/Page'

const UserPage = ({ query }) => (
  <Page>
    <h1>{JSON.stringify(query)}</h1>
  </Page>
)

UserPage.getInitialProps = async ({ query }) => {
  return { query }
}

export default UserPage

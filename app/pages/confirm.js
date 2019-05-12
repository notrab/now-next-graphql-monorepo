import React from 'react'

import CONFIRM_EMAIL_MUTATION from '../graphql/mutation/confirmEmail.graphql'

import Page from '../components/shared/Page'

const ConfirmEmailPage = ({ verified }) => (
  <Page>{verified ? <Success /> : <Error />}</Page>
)

const Success = () => <p>Your email has been verified</p>
const Error = () => <p>Sorry, expired or invalid confirmation email</p>

ConfirmEmailPage.getInitialProps = async ({ query, apolloClient }) => {
  let verified

  const { token } = query

  if (!token) return { verified: false }

  try {
    const {
      data: { confirmEmail },
    } = await apolloClient.mutate({
      mutation: CONFIRM_EMAIL_MUTATION,
      variables: { token },
    })

    verified = confirmEmail.verified
  } catch (err) {
    verified = false
  }

  return { verified }
}

export default ConfirmEmailPage

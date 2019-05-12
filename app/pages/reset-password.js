import React from 'react'

import CHECK_RESET_TOKEN_IS_VALID from '../graphql/query/checkResetPasswordTokenIsValid.graphql'

import Page from '../components/shared/Page'
import ResetPasswordForm from '../components/auth/ResetPasswordForm'

const Error = () => <p>Sorry, expired or invalid reset token.</p>

const ResetPasswordPage = ({ valid, token }) => (
  <Page>
    {valid ? <ResetPasswordForm initialValues={{ token }} /> : <Error />}
  </Page>
)

ResetPasswordPage.getInitialProps = async ({ query, apolloClient }) => {
  let valid

  const { token } = query

  if (!token) return { valid: false }

  try {
    const {
      data: { checkResetTokenValidity },
    } = await apolloClient.query({
      query: CHECK_RESET_TOKEN_IS_VALID,
      variables: { token },
    })

    valid = checkResetTokenValidity
  } catch (err) {
    valid = false
  }

  return { valid, token }
}

export default ResetPasswordPage

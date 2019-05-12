import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Form } from 'react-final-form'

import validation from '../../validation/auth/forgot-password'
import FORGOT_PASSWORD_MUTATION from '../../graphql/mutation/forgotPassword.graphql'

import Input from '../shared/Input'

const ForgotPasswordForm = ({ initialValues }) => {
  const [requested, setRequested] = useState(false)

  const onCompleted = () => setRequested(true)

  const onError = error => {
    console.log(error)
  }

  return (
    <Mutation
      mutation={FORGOT_PASSWORD_MUTATION}
      onCompleted={onCompleted}
      onError={onError}
    >
      {(mutate, { error, loading }) => {
        const onSubmit = ({ email }) => {
          const variables = { email }

          mutate({ variables })
        }

        if (requested) return <p>Check your email for a new password.</p>

        return (
          <Form
            initialValues={initialValues}
            validate={validation}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                {error && <span>Unable to request new password</span>}

                <div>
                  <Input name="email" type="email" label="Email" />
                </div>

                <div>
                  <button type="submit" disabled={loading || submitting}>
                    {submitting ? 'Requesting...' : 'Request new password'}
                  </button>
                </div>
              </form>
            )}
          </Form>
        )
      }}
    </Mutation>
  )
}

export default ForgotPasswordForm

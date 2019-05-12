import React, { useState } from 'react'

import { Mutation } from 'react-apollo'
import { Form } from 'react-final-form'

import validation from '../../validation/user/reset-password'
import RESET_PASSWORD_MUTATION from '../../graphql/mutation/resetPassword.graphql'

import Input from '../shared/Input'

const ForgotPasswordForm = ({ initialValues }) => {
  const [changed, setChanged] = useState(false)

  const onCompleted = () => setChanged(true)

  const onError = error => {
    console.log(error)
  }

  return (
    <Mutation
      mutation={RESET_PASSWORD_MUTATION}
      onCompleted={onCompleted}
      onError={onError}
    >
      {(mutate, { error, loading }) => {
        const onSubmit = ({ token, password, confirmPassword }) => {
          const variables = { token, password, confirmPassword }

          mutate({ variables })
        }

        if (changed) return <p>Your password has been reset.</p>

        return (
          <Form
            initialValues={initialValues}
            validate={validation}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, submitting, values }) => (
              <form onSubmit={handleSubmit}>
                {error && <span>Unable to reset password</span>}

                <div>
                  <Input name="password" type="password" label="New password" />
                </div>

                {values.password && (
                  <div>
                    <Input
                      name="confirmPassword"
                      type="password"
                      label="Confirm password"
                    />
                  </div>
                )}

                <div>
                  <button type="submit" disabled={loading || submitting}>
                    {submitting ? 'Resetting password...' : 'Change password'}
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

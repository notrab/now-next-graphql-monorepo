import React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import { Form } from 'react-final-form'

import redirect from '../../lib/redirect'
import { storeCookies } from '../../lib/cookies'
import validation from '../../validation/auth/register'
import REGISTER_MUTATION from '../../graphql/mutation/register.graphql'

import Input from '../shared/Input'

const RegisterForm = ({ initialValues, client }) => {
  const onCompleted = ({ signup }) => {
    storeCookies(document, signup.token)

    client.cache.reset().then(() => {
      redirect({}, '/')
    })
  }

  const onError = error => {
    console.log(error)
  }

  return (
    <Mutation
      mutation={REGISTER_MUTATION}
      onCompleted={onCompleted}
      onError={onError}
    >
      {(register, { error, loading }) => {
        const onSubmit = ({ name, email, password }) => {
          const variables = { name, email, password }

          register({ variables })
        }

        return (
          <Form
            initialValues={initialValues}
            validate={validation}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                {error && <span>Unable to sign you up</span>}

                <div>
                  <Input name="name" label="Name" />
                </div>

                <div>
                  <Input name="email" type="email" label="Email" />
                </div>

                <div>
                  <Input name="password" type="password" label="Password" />
                </div>

                <div>
                  <button type="submit" disabled={loading || submitting}>
                    {submitting ? 'Create your account...' : 'Create account'}
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

export default withApollo(RegisterForm)

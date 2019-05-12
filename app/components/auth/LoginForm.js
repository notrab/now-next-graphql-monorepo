import React from 'react'
import Link from 'next/link'
import { Mutation, withApollo } from 'react-apollo'
import { Form } from 'react-final-form'

import redirect from '../../lib/redirect'
import { storeCookies } from '../../lib/cookies'
import validation from '../../validation/auth/login'
import AUTHENTICATE_MUTATION from '../../graphql/mutation/authenticate.graphql'

import Input from '../shared/Input'

const LoginForm = ({ initialValues, client }) => {
  const onCompleted = ({ authenticate }) => {
    storeCookies(document, authenticate.token)

    client.cache.reset().then(() => {
      redirect({}, '/myaccount')
    })
  }

  const onError = error => {
    console.log(error)
  }

  return (
    <Mutation
      mutation={AUTHENTICATE_MUTATION}
      onCompleted={onCompleted}
      onError={onError}
    >
      {(authenticate, { error, loading }) => {
        const onSubmit = ({ email, password }) => {
          const variables = { email, password }

          authenticate({ variables })
        }

        return (
          <Form
            initialValues={initialValues}
            validate={validation}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                {error && <span>Incorrect login provided</span>}

                <div>
                  <Input name="email" type="email" label="Email" />
                </div>

                <div>
                  <Input name="password" type="password" label="Password" />
                </div>

                <div>
                  <button type="submit" disabled={loading || submitting}>
                    {submitting ? 'Logging you in...' : 'Login'}
                  </button>
                </div>

                <div>
                  <Link href="/forgot-password">
                    <a>Forgot password?</a>
                  </Link>
                </div>
              </form>
            )}
          </Form>
        )
      }}
    </Mutation>
  )
}

export default withApollo(LoginForm)

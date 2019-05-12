import React from 'react'
import { Mutation } from 'react-apollo'
import { Form } from 'react-final-form'

import validation from '../../validation/user/update-user'
import UPDATE_USER_MUTATION from '../../graphql/mutation/updateUser.graphql'

import Input from '../shared/Input'

const EditUserForm = ({ initialValues }) => {
  const onCompleted = () => {
    console.log('Updated')
  }

  const onError = error => {
    console.log(error)
  }

  return (
    <Mutation
      mutation={UPDATE_USER_MUTATION}
      onCompleted={onCompleted}
      onError={onError}
    >
      {(mutate, { error, loading }) => {
        const onSubmit = ({ name, email, newPassword, currentPassword }) => {
          const variables = { name, email, newPassword, currentPassword }

          mutate({ variables })
        }

        return (
          <Form
            initialValues={initialValues}
            validate={validation}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, submitting, pristine, values }) => {
              const changingPassword = values.newPassword

              return (
                <form onSubmit={handleSubmit}>
                  {error && <span>Unable to update your account</span>}

                  <div>
                    <Input name="name" label="Name" />
                  </div>

                  <div>
                    <Input name="email" type="email" label="Email" />
                  </div>

                  <div>
                    <Input
                      name="newPassword"
                      type="password"
                      label="New password"
                    />
                  </div>

                  {changingPassword && (
                    <div>
                      <Input
                        name="currentPassword"
                        type="password"
                        label="Current password"
                      />
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={loading || submitting || pristine}
                    >
                      {submitting ? 'Saving changes...' : 'Save'}
                    </button>
                  </div>
                </form>
              )
            }}
          </Form>
        )
      }}
    </Mutation>
  )
}

export default EditUserForm

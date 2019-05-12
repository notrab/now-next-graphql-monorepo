const validation = ({ email, password }) => {
  const errors = {}

  if (!email) errors.email = 'Required'
  if (!password) errors.password = 'Required'

  return errors
}

export default validation

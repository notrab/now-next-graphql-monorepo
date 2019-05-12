const validation = ({ name, email, password }) => {
  const errors = {}

  if (!name) errors.name = 'Required'
  if (!email) errors.email = 'Required'
  if (!password) errors.password = 'Required'

  return errors
}

export default validation

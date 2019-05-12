const validation = ({ email }) => {
  const errors = {}

  if (!email) errors.email = 'Required'

  return errors
}

export default validation

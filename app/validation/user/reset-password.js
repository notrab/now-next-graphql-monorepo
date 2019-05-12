const validation = ({ password, confirmPassword }) => {
  const errors = {}

  if (!password) errors.password = 'Required'

  if (password && !confirmPassword) {
    errors.confirmPassword = 'You must confirm your new password'
  }

  if (password && confirmPassword) {
    if (password !== confirmPassword) {
      errors.confirmPassword = `Passwords don't match`
    }
  }

  return errors
}

export default validation

const validation = ({ name, email, newPassword, currentPassword }) => {
  const errors = {}

  if (!name) errors.name = 'Required'
  if (!email) errors.name = 'Required'

  if (newPassword && !currentPassword) {
    errors.currentPassword = 'Required to change your current password'
  }

  return errors
}

export default validation

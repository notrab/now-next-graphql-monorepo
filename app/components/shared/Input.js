import React from 'react'
import { Field } from 'react-final-form'

const Input = ({ name, label, parse, format, hideError, ...props }) => (
  <Field name={name} parse={parse} format={format}>
    {({ input, meta }) => {
      const error = meta.error && meta.touched

      return (
        <div>
          {label && <label htmlFor={name}>{label}</label>}

          <input {...input} {...props} />

          {!hideError && error && <span>{meta.error}</span>}
        </div>
      )
    }}
  </Field>
)

export default Input

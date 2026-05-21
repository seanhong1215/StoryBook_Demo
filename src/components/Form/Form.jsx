import { cloneElement, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Button } from '../Button/Button'
import './Form.css'

const FormContext = createContext(null)

const getEventValue = (event, valuePropName) => {
  if (event && event.target) {
    return valuePropName === 'checked' ? event.target.checked : event.target.value
  }

  return event
}

const validateField = async (value, rules = []) => {
  for (const rule of rules) {
    if (rule.required && (value === undefined || value === null || value === '')) {
      return rule.message || 'This field is required.'
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      return rule.message || 'This field format is invalid.'
    }

    if (rule.validator) {
      const result = await rule.validator(value)
      if (result) return result
    }
  }

  return undefined
}

export const Form = ({
  initialValues = {},
  onFinish,
  onFinishFailed,
  layout = 'vertical',
  children,
  className = '',
  ...props
}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [fields, setFields] = useState({})

  const registerField = (name, config) => {
    setFields((current) => ({ ...current, [name]: config }))

    return () => {
      setFields((current) => {
        const next = { ...current }
        delete next[name]
        return next
      })
    }
  }

  const setFieldValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const validateFields = async () => {
    const nextErrors = {}

    for (const [name, field] of Object.entries(fields)) {
      const error = await validateField(values[name], field.rules)
      if (error) {
        nextErrors[name] = error
      }
    }

    setErrors(nextErrors)
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = await validateFields()

    if (Object.keys(nextErrors).length > 0) {
      onFinishFailed?.({ values, errors: nextErrors })
      return
    }

    onFinish?.(values)
  }

  const contextValue = useMemo(() => ({
    values,
    errors,
    registerField,
    setFieldValue,
  }), [values, errors])

  return (
    <FormContext.Provider value={contextValue}>
      <form
        className={['form', `form--${layout}`, className].filter(Boolean).join(' ')}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

export const FormItem = ({
  name,
  label,
  rules = [],
  valuePropName = 'value',
  getValueFromEvent,
  children,
  extra,
}) => {
  const form = useContext(FormContext)
  const error = name ? form?.errors[name] : undefined
  const value = name ? form?.values[name] : undefined

  useEffect(() => {
    if (!name || !form) return undefined
    return form.registerField(name, { rules })
  }, [form, name, rules])

  const child = name && form && children
    ? cloneElement(children, {
      [valuePropName]: value ?? (valuePropName === 'checked' ? false : ''),
      status: error ? 'error' : children.props.status,
      onChange: (...args) => {
        const nextValue = getValueFromEvent
          ? getValueFromEvent(...args)
          : getEventValue(args[0], valuePropName)

        form.setFieldValue(name, nextValue)
        children.props.onChange?.(...args)
      },
    })
    : children

  return (
    <div className={['form-item', error ? 'form-item--error' : ''].filter(Boolean).join(' ')}>
      {label && <label className="form-item__label">{label}</label>}
      <div className="form-item__control">{child}</div>
      {error && <div className="form-item__message">{error}</div>}
      {extra && !error && <div className="form-item__extra">{extra}</div>}
    </div>
  )
}

Form.Item = FormItem
Form.Submit = Button

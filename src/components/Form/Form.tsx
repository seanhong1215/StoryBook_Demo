import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { FormEvent, FormHTMLAttributes, ReactElement, ReactNode } from 'react'
import { Button } from '../Button/Button'
import './Form.css'

export type FormValues = Record<string, unknown>

export interface FormRule {
  /** Value must be non-empty. */
  required?: boolean
  /** Value must match this pattern. */
  pattern?: RegExp
  /** Error message when the rule fails. */
  message?: string
  /** Custom validator returning an error message, or undefined when valid. */
  validator?: (value: unknown) => string | undefined | Promise<string | undefined>
}

interface FieldConfig {
  rules: FormRule[]
}

interface FormContextValue {
  values: FormValues
  errors: Record<string, string | undefined>
  registerField: (name: string, config: FieldConfig) => () => void
  setFieldValue: (name: string, value: unknown) => void
}

const FormContext = createContext<FormContextValue | null>(null)

const getEventValue = (event: unknown, valuePropName: string): unknown => {
  if (event && typeof event === 'object' && 'target' in event) {
    const target = (event as { target: HTMLInputElement }).target
    return valuePropName === 'checked' ? target.checked : target.value
  }

  return event
}

const validateField = async (value: unknown, rules: FormRule[] = []) => {
  for (const rule of rules) {
    if (rule.required && (value === undefined || value === null || value === '')) {
      return rule.message || 'This field is required.'
    }

    if (rule.pattern && value && !rule.pattern.test(String(value))) {
      return rule.message || 'This field format is invalid.'
    }

    if (rule.validator) {
      const result = await rule.validator(value)
      if (result) return result
    }
  }

  return undefined
}

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Initial field values keyed by field name. */
  initialValues?: FormValues
  /** Called with the values when submit passes validation. */
  onFinish?: (values: FormValues) => void
  /** Called with values and errors when submit fails validation. */
  onFinishFailed?: (info: { values: FormValues; errors: Record<string, string> }) => void
  /** Label and control arrangement. */
  layout?: 'vertical' | 'horizontal'
  children?: ReactNode
}

const FormBase = ({
  initialValues = {},
  onFinish,
  onFinishFailed,
  layout = 'vertical',
  children,
  className = '',
  ...props
}: FormProps) => {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [fields, setFields] = useState<Record<string, FieldConfig>>({})

  const registerField = useCallback((name: string, config: FieldConfig) => {
    setFields((current) => ({ ...current, [name]: config }))

    return () => {
      setFields((current) => {
        const next = { ...current }
        delete next[name]
        return next
      })
    }
  }, [])

  const setFieldValue = useCallback((name: string, value: unknown) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }, [])

  const validateFields = async () => {
    const nextErrors: Record<string, string> = {}

    for (const [name, field] of Object.entries(fields)) {
      const error = await validateField(values[name], field.rules)
      if (error) {
        nextErrors[name] = error
      }
    }

    setErrors(nextErrors)
    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
  }), [values, errors, registerField, setFieldValue])

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

interface FieldElementProps {
  status?: 'error' | 'warning'
  onChange?: (...args: unknown[]) => void
  [prop: string]: unknown
}

export interface FormItemProps {
  /** Field name; connects the child control to the form state. */
  name?: string
  /** Field label. */
  label?: ReactNode
  /** Validation rules applied on submit. */
  rules?: FormRule[]
  /** Child prop receiving the field value (e.g. 'checked' for Checkbox). */
  valuePropName?: string
  /** Derives the field value from the child's onChange arguments. */
  getValueFromEvent?: (...args: unknown[]) => unknown
  /** A single form control element. */
  children?: ReactElement<FieldElementProps>
  /** Helper text shown when there is no error. */
  extra?: ReactNode
}

export const FormItem = ({
  name,
  label,
  rules = [],
  valuePropName = 'value',
  getValueFromEvent,
  children,
  extra,
}: FormItemProps) => {
  const form = useContext(FormContext)
  const rulesRef = useRef(rules)
  const error = name ? form?.errors[name] : undefined
  const value = name ? form?.values[name] : undefined
  const registerField = form?.registerField

  useEffect(() => {
    rulesRef.current = rules
  }, [rules])

  useEffect(() => {
    if (!name || !registerField) return undefined
    return registerField(name, {
      get rules() {
        return rulesRef.current
      },
    })
  }, [name, registerField])

  const child = name && form && children
    ? cloneElement(children, {
      [valuePropName]: value ?? (valuePropName === 'checked' ? false : ''),
      status: error ? 'error' as const : children.props.status,
      onChange: (...args: unknown[]) => {
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

// eslint-disable-next-line react-refresh/only-export-components -- compound component 靜態屬性（Form.Item / Form.Submit）
export const Form = Object.assign(FormBase, {
  Item: FormItem,
  Submit: Button,
})

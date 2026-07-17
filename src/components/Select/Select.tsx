import type { ReactNode, SelectHTMLAttributes } from 'react'
import './Select.css'

export interface SelectOption {
  /** Visible option label. */
  label: ReactNode
  /** Submitted option value. */
  value: string | number
  /** Disables this option. */
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Control height and padding density. */
  size?: 'sm' | 'md' | 'lg'
  /** Validation status styling. */
  status?: 'error' | 'warning'
  /** Options rendered when no children are provided. */
  options?: SelectOption[]
  /** Placeholder shown as a disabled first option. */
  placeholder?: ReactNode
  /** Custom option elements; takes precedence over options. */
  children?: ReactNode
}

export const Select = ({
  size = 'md',
  status,
  options = [],
  placeholder = 'Select an option',
  value,
  defaultValue,
  disabled = false,
  className = '',
  children,
  ...props
}: SelectProps) => {
  const classes = [
    'select',
    `select--${size}`,
    status ? `select--${status}` : '',
    disabled ? 'select--disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      <select
        className="select__control"
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children || options.map((option) => (
          <option
            value={option.value}
            disabled={option.disabled}
            key={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </span>
  )
}

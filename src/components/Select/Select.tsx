import { forwardRef } from 'react'
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

/** ref 指向內層的原生 `<select>`，而非外層 wrapper。 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
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
}, ref) => {
  const classes = [
    'mds-select',
    `mds-select--${size}`,
    status ? `mds-select--${status}` : '',
    disabled ? 'mds-select--disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      <select
        ref={ref}
        className="mds-select__control"
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
})

Select.displayName = 'Select'

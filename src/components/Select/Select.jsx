import './Select.css'

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
}) => {
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

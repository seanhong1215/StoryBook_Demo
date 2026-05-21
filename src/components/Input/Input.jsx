import './Input.css'

export const Input = ({
  size = 'md',
  status,
  prefix,
  suffix,
  allowClear = false,
  value,
  defaultValue,
  disabled = false,
  className = '',
  onChange,
  ...props
}) => {
  const hasControls = prefix || suffix || allowClear
  const classes = [
    'input',
    `input--${size}`,
    status ? `input--${status}` : '',
    disabled ? 'input--disabled' : '',
    hasControls ? 'input--with-controls' : '',
    className,
  ].filter(Boolean).join(' ')

  const clearValue = () => {
    if (onChange) {
      onChange({ target: { value: '' } })
    }
  }

  return (
    <span className={classes}>
      {prefix && <span className="input__addon input__addon--prefix">{prefix}</span>}
      <input
        className="input__control"
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />
      {allowClear && value && !disabled && (
        <button
          className="input__clear"
          type="button"
          aria-label="Clear input"
          onClick={clearValue}
        >
          x
        </button>
      )}
      {suffix && <span className="input__addon input__addon--suffix">{suffix}</span>}
    </span>
  )
}

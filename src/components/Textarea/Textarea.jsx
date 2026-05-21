import './Textarea.css'

export const Textarea = ({
  size = 'md',
  status,
  rows = 4,
  showCount = false,
  maxLength,
  value,
  defaultValue,
  disabled = false,
  className = '',
  ...props
}) => {
  const countValue = value ?? defaultValue ?? ''
  const classes = [
    'textarea',
    `textarea--${size}`,
    status ? `textarea--${status}` : '',
    disabled ? 'textarea--disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      <textarea
        className="textarea__control"
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        maxLength={maxLength}
        {...props}
      />
      {showCount && (
        <span className="textarea__count">
          {String(countValue).length}{maxLength ? ` / ${maxLength}` : ''}
        </span>
      )}
    </span>
  )
}

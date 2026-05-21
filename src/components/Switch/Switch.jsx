import './Switch.css'

export const Switch = ({
  checked,
  defaultChecked,
  disabled = false,
  loading = false,
  size = 'md',
  checkedChildren,
  unCheckedChildren,
  className = '',
  ...props
}) => {
  const classes = [
    'switch',
    `switch--${size}`,
    loading ? 'switch--loading' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      <input
        className="switch__input"
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled || loading}
        {...props}
      />
      <span className="switch__track">
        <span className="switch__label switch__label--checked">{checkedChildren}</span>
        <span className="switch__label switch__label--unchecked">{unCheckedChildren}</span>
        <span className="switch__handle" />
      </span>
    </label>
  )
}

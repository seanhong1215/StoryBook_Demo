import { useEffect, useRef } from 'react'
import './Checkbox.css'

export const Checkbox = ({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const inputRef = useRef(null)
  const classes = [
    'checkbox',
    disabled ? 'checkbox--disabled' : '',
    indeterminate ? 'checkbox--indeterminate' : '',
    className,
  ].filter(Boolean).join(' ')

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <label className={classes}>
      <input
        ref={inputRef}
        className="checkbox__input"
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        {...props}
      />
      <span className="checkbox__box" aria-hidden="true" />
      {children && <span className="checkbox__label">{children}</span>}
    </label>
  )
}

import { forwardRef } from 'react'
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'
import './Input.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Input height and horizontal padding. */
  size?: 'sm' | 'md' | 'lg'
  /** Validation status styling. */
  status?: 'error' | 'warning'
  /** Addon rendered before the control. */
  prefix?: ReactNode
  /** Addon rendered after the control. */
  suffix?: ReactNode
  /** Shows a clear button when the input has a value. */
  allowClear?: boolean
}

/**
 * ref 指向內層的原生 `<input>`（而非外層 wrapper），
 * 這樣 react-hook-form 的 register() 與 focus() 才能正常運作。
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
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
}, ref) => {
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
      onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <span className={classes}>
      {prefix && <span className="input__addon input__addon--prefix">{prefix}</span>}
      <input
        ref={ref}
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
})

Input.displayName = 'Input'

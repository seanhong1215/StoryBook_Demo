import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import './Checkbox.css'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Shows the mixed state for partially selected groups. */
  indeterminate?: boolean
  /** Checkbox label. */
  children?: ReactNode
}

/**
 * ref 指向內層的原生 `<input type="checkbox">`。
 * 內部另有 inputRef 供 indeterminate 使用，兩者用 useImperativeHandle 合併。
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  className = '',
  children,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [])
  const classes = [
    'mds-checkbox',
    disabled ? 'mds-checkbox--disabled' : '',
    indeterminate ? 'mds-checkbox--indeterminate' : '',
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
        className="mds-checkbox__input"
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        {...props}
      />
      <span className="mds-checkbox__box" aria-hidden="true" />
      {children && <span className="mds-checkbox__label">{children}</span>}
    </label>
  )
})

Checkbox.displayName = 'Checkbox'

import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import './Switch.css'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Shows a pending state and prevents interaction. */
  loading?: boolean
  /** Track height and handle size. */
  size?: 'sm' | 'md' | 'lg'
  /** Label shown inside the track when checked. */
  checkedChildren?: ReactNode
  /** Label shown inside the track when unchecked. */
  unCheckedChildren?: ReactNode
}

/** ref 指向內層的原生 `<input type="checkbox">`，而非外層 label。 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  checked,
  defaultChecked,
  disabled = false,
  loading = false,
  size = 'md',
  checkedChildren,
  unCheckedChildren,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'mds-switch',
    `mds-switch--${size}`,
    loading ? 'mds-switch--loading' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      <input
        ref={ref}
        className="mds-switch__input"
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled || loading}
        {...props}
      />
      <span className="mds-switch__track">
        <span className="mds-switch__label mds-switch__label--checked">{checkedChildren}</span>
        <span className="mds-switch__label mds-switch__label--unchecked">{unCheckedChildren}</span>
        <span className="mds-switch__handle" />
      </span>
    </label>
  )
})

Switch.displayName = 'Switch'

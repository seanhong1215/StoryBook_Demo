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
}: SwitchProps) => {
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

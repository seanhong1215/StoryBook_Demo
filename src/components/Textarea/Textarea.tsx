import type { TextareaHTMLAttributes } from 'react'
import './Textarea.css'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Control height and padding density. */
  size?: 'sm' | 'md' | 'lg'
  /** Validation status styling. */
  status?: 'error' | 'warning'
  /** Shows the character count under the control. */
  showCount?: boolean
}

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
}: TextareaProps) => {
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

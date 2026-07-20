import { forwardRef } from 'react'
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

/** ref 指向內層的原生 `<textarea>`，而非外層 wrapper。 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
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
}, ref) => {
  const countValue = value ?? defaultValue ?? ''
  const classes = [
    'mds-textarea',
    `mds-textarea--${size}`,
    status ? `mds-textarea--${status}` : '',
    disabled ? 'mds-textarea--disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      <textarea
        ref={ref}
        className="mds-textarea__control"
        // status="error" 只是 class，螢幕閱讀器讀不到；自動補 aria-invalid
        aria-invalid={status === 'error' ? true : undefined}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        maxLength={maxLength}
        {...props}
      />
      {showCount && (
        <span className="mds-textarea__count">
          {String(countValue).length}{maxLength ? ` / ${maxLength}` : ''}
        </span>
      )}
    </span>
  )
})

Textarea.displayName = 'Textarea'

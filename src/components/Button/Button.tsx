import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'link'
type NativeButtonType = 'button' | 'submit' | 'reset'

const isNativeType = (t?: string): t is NativeButtonType =>
  t === 'button' || t === 'submit' || t === 'reset'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Legacy alias: accepts a variant, or a native type ('button' | 'submit' | 'reset'). Prefer variant + htmlType. */
  type?: ButtonVariant | NativeButtonType
  /** Native button type. */
  htmlType?: NativeButtonType
  /** Visual style and intent. */
  variant?: ButtonVariant
  /** Button height and horizontal padding. */
  size?: 'sm' | 'md' | 'lg'
  /** Shows progress and prevents interaction. */
  loading?: boolean
  /** Expands the button to fill the parent width. */
  fullWidth?: boolean
  /** Legacy alias of fullWidth. */
  block?: boolean
  /** Icon rendered before the label. */
  leftIcon?: ReactNode
  /** Icon rendered after the label. */
  rightIcon?: ReactNode
  /** Button label. */
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  type,
  htmlType = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  block = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  onClick,
  ...props
}, ref) => {
  const visualType = isNativeType(type) ? variant : (type || variant)
  const buttonType = isNativeType(type) ? type : htmlType

  const classes = [
    'btn',
    `btn--${visualType}`,
    `btn--${size}`,
    fullWidth || block ? 'btn--full' : '',
    loading ? 'btn--loading' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type={buttonType}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
      <span className="btn__label">{children}</span>
      {!loading && rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
    </button>
  )
})

Button.displayName = 'Button'

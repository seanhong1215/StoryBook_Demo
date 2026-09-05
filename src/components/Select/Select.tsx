import { forwardRef } from 'react'
import type { ReactNode, SelectHTMLAttributes } from 'react'
import { useLocale } from '../../config/context'
import './Select.css'

export interface SelectOption {
  /** Visible option label. */
  label: ReactNode
  /** Submitted option value. */
  value: string | number
  /** Disables this option. */
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Control height and padding density. */
  size?: 'sm' | 'md' | 'lg'
  /** Validation status styling. */
  status?: 'error' | 'warning'
  /** Options rendered when no children are provided. */
  options?: SelectOption[]
  /**
   * Prompt shown when nothing is selected. Pass `null` to render no prompt and
   * let the first option be selected by default.
   */
  placeholder?: ReactNode
  /** Custom option elements; takes precedence over options. */
  children?: ReactNode
}

/** ref 指向內層的原生 `<select>`，而非外層 wrapper。 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  size = 'md',
  status,
  options = [],
  placeholder,
  value,
  defaultValue,
  disabled = false,
  className = '',
  children,
  ...props
}, ref) => {
  const locale = useLocale()
  // placeholder={null} 是「不要 prompt」的意思，不能被 locale 預設值蓋掉
  const prompt = placeholder === undefined ? locale.select.placeholder : placeholder

  const classes = [
    'mds-select',
    `mds-select--${size}`,
    status ? `mds-select--${status}` : '',
    disabled ? 'mds-select--disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  const isControlled = value !== undefined

  /*
   * 非受控且沒指定 defaultValue 時，明確把起始值設成空字串。
   *
   * 少了這行，瀏覽器會跳過 disabled 的 placeholder option 自動選第一個真實選項，
   * 造成兩個問題：placeholder 永遠不會顯示，而且 value 永遠非空，
   * 讓 required 驗證（原生或 react-hook-form）永遠不會觸發。
   *
   * 受控時不能同時給 value 與 defaultValue，React 會警告，因此下面分開展開。
   */
  const uncontrolledDefault = defaultValue ?? (prompt ? '' : undefined)

  return (
    <span className={classes}>
      <select
        ref={ref}
        className="mds-select__control"
        // status="error" 只是 class，螢幕閱讀器讀不到；自動補 aria-invalid
        aria-invalid={status === 'error' ? true : undefined}
        {...(isControlled ? { value } : { defaultValue: uncontrolledDefault })}
        disabled={disabled}
        {...props}
      >
        {prompt && (
          // hidden 讓 placeholder 不出現在展開清單裡，但被選中時仍會顯示在收合的控制項上
          <option value="" disabled hidden>
            {prompt}
          </option>
        )}
        {children || options.map((option) => (
          <option
            value={option.value}
            disabled={option.disabled}
            key={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </span>
  )
})

Select.displayName = 'Select'

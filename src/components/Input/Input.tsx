import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
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
  /** Accessible label of the clear button. */
  clearLabel?: string
}

const isEmpty = (value: InputProps['value']) => (
  value === undefined || value === null || value === ''
)

/**
 * ref 指向內層的原生 `<input>`（而非外層 wrapper），
 * 這樣 react-hook-form 的 register() 與 focus() 才能正常運作。
 * 內部另有 inputRef 供 allowClear 使用，兩者用 useImperativeHandle 合併。
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  status,
  prefix,
  suffix,
  allowClear = false,
  clearLabel = 'Clear input',
  value,
  defaultValue,
  disabled = false,
  className = '',
  onChange,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [])

  /*
   * 非受控時 value 永遠是 undefined，光看 prop 無法知道欄位裡有沒有字，
   * 清除鈕會永遠不出現。這裡自己記一份「目前有沒有值」。
   */
  const isControlled = value !== undefined
  const [uncontrolledHasValue, setUncontrolledHasValue] = useState(() => !isEmpty(defaultValue))
  const hasValue = isControlled ? !isEmpty(value) : uncontrolledHasValue

  const hasControls = prefix || suffix || allowClear
  const classes = [
    'mds-input',
    `mds-input--${size}`,
    status ? `mds-input--${status}` : '',
    disabled ? 'mds-input--disabled' : '',
    hasControls ? 'mds-input--with-controls' : '',
    className,
  ].filter(Boolean).join(' ')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledHasValue(event.target.value !== '')
    onChange?.(event)
  }

  const clearValue = () => {
    const input = inputRef.current
    if (!input) return

    /*
     * 不能用 onChange({ target: { value: '' } }) 造一個假事件：target 不是真的
     * DOM 節點，name / validity / form 全都拿不到，react-hook-form 的 register()
     * 會直接壞掉，而且非受控時輸入框裡的字根本不會消失。
     *
     * 改成寫進真的 DOM 再送出真的 input 事件（React 監聽的是它，onChange 會拿到
     * 正常的合成事件）。必須用 prototype 上的 setter —— React 在節點上覆寫過
     * value setter，直接 input.value = '' 會連它的 value tracker 一起更新，
     * React 就會判定「值沒變」而不觸發 onChange。
     */
    const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
    nativeSetter?.call(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))

    // 清完把焦點還給輸入框，使用者可以直接接著打字
    input.focus()
  }

  return (
    <span className={classes}>
      {prefix && <span className="mds-input__addon mds-input__addon--prefix">{prefix}</span>}
      <input
        ref={inputRef}
        className="mds-input__control"
        /*
         * status="error" 是視覺狀態，但螢幕閱讀器讀不到 class。
         * 這裡自動補上 aria-invalid，避免每個使用端都要記得自己加。
         * 使用端可傳 aria-invalid 覆寫（{...props} 在後面）。
         */
        aria-invalid={status === 'error' ? true : undefined}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        {...props}
      />
      {allowClear && hasValue && !disabled && (
        <button
          className="mds-input__clear"
          type="button"
          aria-label={clearLabel}
          onClick={clearValue}
        >
          <Icon name="close" size={14} />
        </button>
      )}
      {suffix && <span className="mds-input__addon mds-input__addon--suffix">{suffix}</span>}
    </span>
  )
})

Input.displayName = 'Input'

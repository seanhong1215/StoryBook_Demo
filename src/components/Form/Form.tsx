import {
  cloneElement,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import type { FormEvent, FormHTMLAttributes, ReactElement, ReactNode } from 'react'
import { Button } from '../Button/Button'
import { FormStore, FormValidationError } from './store'
import type { FormInstance, FormRule, FormValues } from './store'
import './Form.css'

export type { FormValues, FormRule, FormInstance } from './store'

/** 什麼時候驗證。預設只在送出時驗，已經出錯的欄位改動時會立刻重驗。 */
export type ValidateTrigger = 'onChange' | 'onBlur' | 'onSubmit'

interface FormContextValue {
  store: FormStore
  validateTrigger: ValidateTrigger
}

const FormContext = createContext<FormContextValue | null>(null)

/*
 * 沒有 Form 祖先的 FormItem 用這一份。hook 不能有條件地呼叫，
 * 但沒接上表單時也不該真的寫入任何狀態 —— 這個 store 只被讀，不被寫。
 */
const DETACHED_STORE = new FormStore()

// useState 的 lazy initializer 是「每個元件實例只建立一次」的標準寫法；
// 用 ref 在 render 期間賦值會被 react-hooks/refs 擋下來
const useFormStore = () => {
  const [store] = useState(() => new FormStore())
  return store
}

const getEventValue = (event: unknown, valuePropName: string): unknown => {
  if (event && typeof event === 'object' && 'target' in event) {
    const target = (event as { target: HTMLInputElement }).target
    return valuePropName === 'checked' ? target.checked : target.value
  }

  return event
}

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Form instance from `Form.useForm()`; omit to let Form manage its own. */
  form?: FormInstance
  /** Initial field values keyed by field name. Applied once, on mount. */
  initialValues?: FormValues
  /** Called with the values when submit passes validation. */
  onFinish?: (values: FormValues) => void
  /** Called with values and errors when submit fails validation. */
  onFinishFailed?: (info: { values: FormValues; errors: Record<string, string> }) => void
  /** Label and control arrangement. */
  layout?: 'vertical' | 'horizontal'
  /** When fields validate. Individual items can override it. */
  validateTrigger?: ValidateTrigger
  children?: ReactNode
}

const FormBase = forwardRef<HTMLFormElement, FormProps>(({
  form,
  initialValues,
  onFinish,
  onFinishFailed,
  layout = 'vertical',
  validateTrigger = 'onSubmit',
  children,
  className = '',
  ...props
}, ref) => {
  const internalStore = useFormStore()
  // form 是公開的 FormInstance 介面，唯一的實作就是 FormStore
  const store = (form as FormStore | undefined) ?? internalStore

  // initialValues 只在掛載時套用一次；之後由 resetFields() 使用
  useState(() => store.setInitialValues(initialValues ?? {}))

  const formRef = useRef<HTMLFormElement>(null)
  useImperativeHandle(ref, () => formRef.current as HTMLFormElement, [])

  // store.submit() 走原生 requestSubmit()，因此 store 需要拿到 <form> 節點
  useEffect(() => {
    store.attachElement(formRef.current)
    return () => store.attachElement(null)
  }, [store])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      /*
       * 驗證必須先獨立求值，不能寫成 onFinish?.(await store.validateFields())——
       * a?.(b) 在 a 是 nullish 時整個運算式短路，參數不會被求值，
       * 沒傳 onFinish 的表單就會完全跳過驗證。
       */
      const values = await store.validateFields()
      onFinish?.(values)
    } catch (error) {
      if (error instanceof FormValidationError) {
        onFinishFailed?.({ values: error.values, errors: error.errors })
        return
      }
      throw error
    }
  }

  /*
   * context 只帶 store（identity 永遠不變）與設定，不帶值 ——
   * 值一旦進 context，每次按鍵都會讓所有 FormItem 重繪。
   */
  const contextValue = useMemo(() => ({ store, validateTrigger }), [store, validateTrigger])

  return (
    <FormContext.Provider value={contextValue}>
      <form
        ref={formRef}
        className={['mds-form', `mds-form--${layout}`, className].filter(Boolean).join(' ')}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
})

FormBase.displayName = 'Form'

interface FieldElementProps {
  status?: 'error' | 'warning'
  onChange?: (...args: unknown[]) => void
  onBlur?: (...args: unknown[]) => void
  [prop: string]: unknown
}

export interface FormItemProps {
  /** Field name; connects the child control to the form state. */
  name?: string
  /** Field label. */
  label?: ReactNode
  /** Validation rules applied on submit. */
  rules?: FormRule[]
  /** Child prop receiving the field value (e.g. 'checked' for Checkbox). */
  valuePropName?: string
  /** Derives the field value from the child's onChange arguments. */
  getValueFromEvent?: (...args: unknown[]) => unknown
  /** Overrides the form-level validate trigger for this field. */
  validateTrigger?: ValidateTrigger
  /** A single form control element. */
  children?: ReactElement<FieldElementProps>
  /** Helper text shown when there is no error. */
  extra?: ReactNode
}

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(({
  name,
  label,
  rules = [],
  valuePropName = 'value',
  getValueFromEvent,
  validateTrigger,
  children,
  extra,
}, ref) => {
  const context = useContext(FormContext)
  const store = context?.store ?? DETACHED_STORE
  const connected = Boolean(context) && Boolean(name)
  const trigger = validateTrigger ?? context?.validateTrigger ?? 'onSubmit'

  /*
   * 只訂閱自己這一欄。同一個表單裡其他欄位改動時，這個元件不會重繪 ——
   * 這是把值放在 store 而不是 context 的主要理由。
   */
  const subscribe = useCallback((listener: () => void) => store.subscribe(name, listener), [store, name])
  const getSnapshot = useCallback(() => store.getFieldSnapshot(name), [store, name])
  const { value, error } = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const rulesRef = useRef(rules)

  /*
   * label 必須真的關聯到控制項，否則螢幕閱讀器讀不出欄位名稱
   * （axe 的 label / select-name 規則會判為 critical）。
   * 子元素若自帶 id 就沿用，否則用 useId 產生一個穩定 id。
   */
  const generatedId = useId()
  const childId = (children?.props.id as string | undefined) ?? `${generatedId}-control`
  const errorId = `${generatedId}-error`
  const extraId = `${generatedId}-extra`
  const showExtra = Boolean(extra) && !error
  const describedBy = [error ? errorId : '', showExtra ? extraId : ''].filter(Boolean).join(' ')

  useEffect(() => {
    rulesRef.current = rules
  }, [rules])

  useEffect(() => {
    if (!connected || !name) return undefined
    return store.registerField(name, { getRules: () => rulesRef.current })
  }, [connected, name, store])

  // a11y 相關的 props 不依賴 name / form，未接上 Form 時也要套用
  const a11yProps = children
    ? {
      id: childId,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': describedBy || undefined,
    }
    : {}

  const child = children
    ? cloneElement(children, connected && name
      ? {
        ...a11yProps,
        [valuePropName]: value ?? (valuePropName === 'checked' ? false : ''),
        status: error ? 'error' as const : children.props.status,
        onChange: (...args: unknown[]) => {
          const nextValue = getValueFromEvent
            ? getValueFromEvent(...args)
            : getEventValue(args[0], valuePropName)

          store.setFieldValue(name, nextValue, { validate: trigger === 'onChange' })
          children.props.onChange?.(...args)
        },
        ...(trigger === 'onBlur' ? {
          onBlur: (...args: unknown[]) => {
            void store.validateField(name)
            children.props.onBlur?.(...args)
          },
        } : {}),
      }
      : a11yProps)
    : children

  return (
    <div ref={ref} className={['mds-form-item', error ? 'mds-form-item--error' : ''].filter(Boolean).join(' ')}>
      {label && (
        <label className="mds-form-item__label" htmlFor={childId}>{label}</label>
      )}
      <div className="mds-form-item__control">{child}</div>
      {error && (
        <div className="mds-form-item__message" id={errorId} role="alert">{error}</div>
      )}
      {showExtra && (
        <div className="mds-form-item__extra" id={extraId}>{extra}</div>
      )}
    </div>
  )
})

FormItem.displayName = 'FormItem'

/**
 * 取得一個表單實例，用來從外部讀值、寫值、重設或觸發驗證。
 *
 * ```tsx
 * const form = Form.useForm()
 * <Form form={form} onFinish={…}>…</Form>
 * form.resetFields()
 * ```
 */
const useForm = (): FormInstance => useFormStore()

// eslint-disable-next-line react-refresh/only-export-components -- compound component 靜態屬性（Form.Item / Form.Submit / Form.useForm）
export const Form = Object.assign(FormBase, {
  Item: FormItem,
  Submit: Button,
  useForm,
})

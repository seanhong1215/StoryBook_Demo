export type FormValues = Record<string, unknown>

export interface FormRule {
  /** Value must be non-empty. */
  required?: boolean
  /** Value must match this pattern. */
  pattern?: RegExp
  /** Error message when the rule fails. */
  message?: string
  /** Custom validator returning an error message, or undefined when valid. */
  validator?: (value: unknown) => string | undefined | Promise<string | undefined>
}

/** 單一欄位的訂閱快照。 */
export interface FieldSnapshot {
  value: unknown
  error?: string
}

/** 沒接上 Form 的 FormItem 共用這一份，避免每次 render 產生新物件。 */
const EMPTY_SNAPSHOT: FieldSnapshot = { value: undefined, error: undefined }

export const validateValue = async (value: unknown, rules: FormRule[] = []) => {
  for (const rule of rules) {
    if (rule.required && (value === undefined || value === null || value === '')) {
      return rule.message || 'This field is required.'
    }

    if (rule.pattern && value && !rule.pattern.test(String(value))) {
      return rule.message || 'This field format is invalid.'
    }

    if (rule.validator) {
      const result = await rule.validator(value)
      if (result) return result
    }
  }

  return undefined
}

/** `validateFields()` 驗證失敗時丟出，帶著當下的值與所有錯誤。 */
export class FormValidationError extends Error {
  readonly values: FormValues
  readonly errors: Record<string, string>

  constructor(values: FormValues, errors: Record<string, string>) {
    super('Form validation failed')
    this.name = 'FormValidationError'
    this.values = values
    this.errors = errors
  }
}

/** `Form.useForm()` 回傳的操作介面。 */
export interface FormInstance {
  /** 目前所有欄位的值。 */
  getFieldsValue: () => FormValues
  getFieldValue: (name: string) => unknown
  /** 合併寫入多個欄位。 */
  setFieldsValue: (values: FormValues) => void
  setFieldValue: (name: string, value: unknown) => void
  /** 還原成 initialValues 並清掉所有錯誤。 */
  resetFields: () => void
  /** 驗證全部欄位；失敗時 reject 一個 FormValidationError。 */
  validateFields: () => Promise<FormValues>
  getFieldError: (name: string) => string | undefined
  /** 等同使用者按下送出，會走完整的驗證與 onFinish / onFinishFailed。 */
  submit: () => void
}

interface RegisteredField {
  getRules: () => FormRule[]
}

/**
 * 表單狀態。
 *
 * 刻意放在 React state 之外：值若進 context，每一次按鍵都會讓所有 FormItem
 * 重繪 —— 30 個欄位的表單打字就會卡。這裡改成外部 store + 逐欄位訂閱
 * （FormItem 用 useSyncExternalStore 只訂自己那一欄），
 * 打字時只有那一個欄位重繪。
 *
 * context 帶的是 store 本身，identity 永遠不變，所以 context 也不會造成重繪。
 */
export class FormStore implements FormInstance {
  private values: FormValues = {}
  private initialValues: FormValues = {}
  private errors: Record<string, string | undefined> = {}
  private fields = new Map<string, RegisteredField>()
  private listeners = new Map<string, Set<() => void>>()
  private snapshots = new Map<string, FieldSnapshot>()
  private formElement: HTMLFormElement | null = null

  /** initialValues 只在建立時套用一次，之後由 resetFields 使用。 */
  setInitialValues(values: FormValues) {
    this.initialValues = values
    this.values = { ...values }
  }

  attachElement(element: HTMLFormElement | null) {
    this.formElement = element
  }

  subscribe(name: string | undefined, listener: () => void) {
    if (!name) return () => {}

    const set = this.listeners.get(name) ?? new Set<() => void>()
    this.listeners.set(name, set)
    set.add(listener)

    return () => {
      set.delete(listener)
    }
  }

  /**
   * 回傳的物件在該欄位真的變動前保持同一個 identity ——
   * useSyncExternalStore 會用 Object.is 比對，每次都給新物件會無限重繪。
   */
  getFieldSnapshot(name: string | undefined): FieldSnapshot {
    if (!name) return EMPTY_SNAPSHOT

    const cached = this.snapshots.get(name)
    const value = this.values[name]
    const error = this.errors[name]
    if (cached && cached.value === value && cached.error === error) return cached

    const next: FieldSnapshot = { value, error }
    this.snapshots.set(name, next)
    return next
  }

  registerField(name: string, field: RegisteredField) {
    this.fields.set(name, field)
    return () => {
      this.fields.delete(name)
    }
  }

  private notify(name: string) {
    this.listeners.get(name)?.forEach((listener) => listener())
  }

  private notifyAll() {
    this.listeners.forEach((set) => set.forEach((listener) => listener()))
  }

  private setError(name: string, error: string | undefined) {
    if (this.errors[name] === error) return
    this.errors[name] = error
    this.notify(name)
  }

  /** 驗證單一欄位並寫入錯誤，回傳錯誤訊息（無誤時為 undefined）。 */
  async validateField(name: string) {
    const field = this.fields.get(name)
    if (!field) return undefined

    const error = await validateValue(this.values[name], field.getRules())
    this.setError(name, error)
    return error
  }

  getFieldsValue() {
    return { ...this.values }
  }

  getFieldValue(name: string) {
    return this.values[name]
  }

  getFieldError(name: string) {
    return this.errors[name]
  }

  setFieldValue(name: string, value: unknown, options?: { validate?: boolean }) {
    this.values[name] = value

    /*
     * 已經有錯誤的欄位，改動時立刻重驗 —— 使用者修好了就該馬上看到錯誤消失，
     * 而不是等到再送出一次。沒有錯誤的欄位則不打擾，除非明確要求（onChange 觸發）。
     */
    const shouldValidate = options?.validate || this.errors[name] !== undefined

    this.notify(name)
    if (shouldValidate) void this.validateField(name)
  }

  setFieldsValue(values: FormValues) {
    Object.entries(values).forEach(([name, value]) => {
      this.values[name] = value
    })
    this.notifyAll()
  }

  resetFields() {
    this.values = { ...this.initialValues }
    this.errors = {}
    this.notifyAll()
  }

  async validateFields() {
    const errors: Record<string, string> = {}

    for (const [name, field] of this.fields) {
      const error = await validateValue(this.values[name], field.getRules())
      if (error) errors[name] = error
    }

    this.errors = errors
    this.notifyAll()

    if (Object.keys(errors).length > 0) {
      throw new FormValidationError(this.getFieldsValue(), errors)
    }

    return this.getFieldsValue()
  }

  /*
   * 走原生的 requestSubmit()，而不是自己呼叫 onFinish ——
   * 這樣程式觸發的送出與使用者按按鈕走的是同一條路徑（含原生 submit 事件），
   * 不會出現「按鈕可以但程式呼叫不行」這種難查的差異。
   */
  submit() {
    this.formElement?.requestSubmit()
  }
}

import { forwardRef, useEffect, useId, useImperativeHandle } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useConfig } from '../../config/context'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import './Modal.css'

export interface ModalProps {
  /** Shows the dialog. */
  open?: boolean
  /** Header title. */
  title?: ReactNode
  /** Body content. */
  children?: ReactNode
  /** Custom footer; pass null to hide the default OK/Cancel footer. */
  footer?: ReactNode
  /** Dialog width in pixels or any CSS width value. */
  width?: number | string
  /** Shows the close button in the header. */
  closable?: boolean
  /** Clicking the mask closes the dialog. */
  maskClosable?: boolean
  /** Label of the default OK button. */
  okText?: ReactNode
  /** Label of the default Cancel button. */
  cancelText?: ReactNode
  /** Shows a loading state on the default OK button. */
  confirmLoading?: boolean
  className?: string
  /** Called when the default OK button is clicked. */
  onOk?: () => void
  /** Called on cancel: close button, mask click, or Escape. */
  onCancel?: () => void
}

/**
 * ref 指向 dialog 面板本身（`<section class="mds-modal">`）。
 * 內部另有 useFocusTrap 的 containerRef，兩者用 useImperativeHandle 合併。
 */
export const Modal = forwardRef<HTMLElement, ModalProps>(({
  open = false,
  title,
  children,
  footer,
  width = 520,
  closable = true,
  maskClosable = true,
  okText,
  cancelText,
  confirmLoading = false,
  className = '',
  onOk,
  onCancel,
}, ref) => {
  const { locale, getPopupContainer } = useConfig()
  const titleId = useId()
  /*
   * aria-modal="true" 只是宣告，不會真的擋住 Tab —— 沒有 trap 的話焦點會跑到
   * 對話框後面的頁面。trap 同時負責開啟時把焦點移進面板、關閉時還原。
   */
  const containerRef = useFocusTrap<HTMLElement>({ active: open })
  useImperativeHandle(ref, () => containerRef.current as HTMLElement, [containerRef])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onCancel])

  if (!open) return null

  const content = (
    <div className="mds-modal-root" role="presentation">
      <div
        className="mds-modal-mask"
        onClick={maskClosable ? onCancel : undefined}
      />
      <section
        ref={containerRef}
        className={['mds-modal', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        // 開啟時焦點先落在面板本身，螢幕閱讀器才會朗讀對話框名稱而不是第一個按鈕
        tabIndex={-1}
        style={{ width }}
      >
        {(title || closable) && (
          <header className="mds-modal__header">
            {title && <h2 className="mds-modal__title" id={titleId}>{title}</h2>}
            {closable && (
              <button
                className="mds-modal__close"
                type="button"
                aria-label={locale.modal.close}
                onClick={onCancel}
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </header>
        )}
        <div className="mds-modal__body">{children}</div>
        <footer className="mds-modal__footer">
          {footer === undefined ? (
            <>
              <Button variant="secondary" onClick={onCancel}>{cancelText ?? locale.modal.cancel}</Button>
              <Button type="primary" loading={confirmLoading} onClick={onOk}>{okText ?? locale.modal.ok}</Button>
            </>
          ) : footer}
        </footer>
      </section>
    </div>
  )

  /*
   * 跟 Tooltip / Dropdown 走同一條規則：ConfigProvider 有給 getPopupContainer
   * 就掛在那個節點下。掛回 document.body 的話，非 global 模式的
   * ConfigProvider（主題屬性只寫在 wrapper div 上）就傳不到對話框，
   * 對話框會拿到 <html> 上的產品線色而不是它所屬區塊的。
   */
  return createPortal(content, getPopupContainer?.() ?? document.body)
})

Modal.displayName = 'Modal'

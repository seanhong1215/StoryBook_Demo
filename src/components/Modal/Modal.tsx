import { forwardRef, useEffect, useId, useImperativeHandle } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
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
  okText = 'OK',
  cancelText = 'Cancel',
  confirmLoading = false,
  className = '',
  onOk,
  onCancel,
}, ref) => {
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
                aria-label="Close modal"
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
              <Button variant="secondary" onClick={onCancel}>{cancelText}</Button>
              <Button type="primary" loading={confirmLoading} onClick={onOk}>{okText}</Button>
            </>
          ) : footer}
        </footer>
      </section>
    </div>
  )

  return createPortal(content, document.body)
})

Modal.displayName = 'Modal'

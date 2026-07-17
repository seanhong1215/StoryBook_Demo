import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../Button/Button'
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

export const Modal = ({
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
}: ModalProps) => {
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
    <div className="modal-root" role="presentation">
      <div
        className="modal-mask"
        onClick={maskClosable ? onCancel : undefined}
      />
      <section
        className={['modal', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        style={{ width }}
      >
        {(title || closable) && (
          <header className="modal__header">
            {title && <h2 className="modal__title" id="modal-title">{title}</h2>}
            {closable && (
              <button
                className="modal__close"
                type="button"
                aria-label="Close modal"
                onClick={onCancel}
              >
                x
              </button>
            )}
          </header>
        )}
        <div className="modal__body">{children}</div>
        <footer className="modal__footer">
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
}

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../Button/Button'
import './Modal.css'

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
}) => {
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
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

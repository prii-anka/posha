import './Modal.css'

function Modal({ isOpen, onClose, onConfirm, title, message, type = 'info', confirmText = 'OK', cancelText = 'Cancel', showCancel = false }) {
  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="modal-icon success" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )
      case 'error':
        return (
          <svg className="modal-icon error" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="modal-icon warning" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )
      case 'question':
        return (
          <svg className="modal-icon question" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )
      default:
        return (
          <svg className="modal-icon info" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        )
    }
  }

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {getIcon()}

          {title && <h2 className="modal-title">{title}</h2>}

          <p className="modal-message">{message}</p>

          <div className="modal-actions">
            {showCancel && (
              <button className="modal-button modal-button-cancel" onClick={onClose}>
                {cancelText}
              </button>
            )}
            <button className="modal-button modal-button-confirm" onClick={handleConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

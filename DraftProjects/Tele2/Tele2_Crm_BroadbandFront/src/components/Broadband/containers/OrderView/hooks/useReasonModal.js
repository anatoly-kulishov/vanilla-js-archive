import { useState, useCallback } from 'react'
import { Modal } from 'antd'

export const useReasonModal = () => {
  const [isVisible, setVisibility] = useState(false)
  const [title, setTitle] = useState(null)
  const [operation, setOperation] = useState(null)

  const openConfirmModal = (title, onOkCallback) => {
    Modal.confirm({
      title,
      zIndex: 1002,
      okType: 'danger',
      okText: 'Ок',
      cancelText: 'Отмена',
      onOk: onOkCallback
    })
  }

  const openReasonModal = useCallback((title, operation) => {
    setTitle(title)
    setVisibility(true)
    setOperation(operation)
  }, [setTitle, setVisibility])

  const closeModal = useCallback(() => {
    setVisibility(false)
  }, [setVisibility])

  return {
    isVisible,
    title,
    operation,
    closeModal,
    openReasonModal,
    openConfirmModal
  }
}

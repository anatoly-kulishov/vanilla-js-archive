import React from 'react'
import { Popconfirm } from 'antd'

export default function Confirm (props) {
  const { children, isSubmitDisabled, title, onConfirmHandle } = props
  return (
    <Popconfirm
      placement='topRight'
      disabled={isSubmitDisabled}
      title={title}
      onConfirm={onConfirmHandle}
      okText='Да'
      cancelText='Отмена'
    >
      {children}
    </Popconfirm>
  )
}

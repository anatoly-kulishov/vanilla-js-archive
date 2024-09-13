import React from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'
import ManualInfo from './ManualInfo'

const ManualInfoModal = props => {
  const { isOpen, onClose } = props

  return (
    <StyledModal
      visible={isOpen}
      onCancel={onClose}
      footer={false}
      title={<Title>Информация по оформлению заказа</Title>}
      width={1059}
    >
      <ManualInfo />
    </StyledModal>
  )
}

export default ManualInfoModal

const StyledModal = styled(Modal)`
  top: 130px;

  .ant-modal-body {
    padding: 0px;
  }
`

const Title = styled.h3`
  font-weight: bold;
`

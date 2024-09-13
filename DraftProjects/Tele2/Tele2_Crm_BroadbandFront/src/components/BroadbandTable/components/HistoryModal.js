import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal } from 'antd'

import { HistoryTable } from './HistoryTable'

const bodyStyle = { padding: 0 }
export function HistoryModal (props) {
  const { orderId, isVisible, history, setVisibility } = props

  const handleCancel = useCallback(() => setVisibility(false), [setVisibility])
  return (
    <Modal
      title={<ModalTitle>{`Заявка ${orderId ?? ''}`}</ModalTitle>}
      visible={isVisible}
      width='70%'
      onCancel={handleCancel}
      footer={null}
      bodyStyle={bodyStyle}
      centered
    >
      <HistoryTable history={history} />
    </Modal>
  )
}

HistoryModal.propTypes = {
  orderId: PropTypes.number,
  isVisible: PropTypes.bool,
  history: PropTypes.arrayOf(PropTypes.object),
  setVisibility: PropTypes.func.isRequired
}

const ModalTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`

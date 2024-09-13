import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import styled from 'styled-components'
import MnpHistoryStatement from '../HistoryStatement'

const HistoryStatementModal = ({ isVisible, onCancel }) => {
  HistoryStatementModal.propTypes = {
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func
  }

  return (
    <HistoryModal
      title='История заявления'
      visible={isVisible}
      onCancel={onCancel}
      width={1600}
      destroyOnClose
      footer={null}
    >
      <MnpHistoryStatement isVisible={isVisible} />
    </HistoryModal>
  )
}

export default HistoryStatementModal

const HistoryModal = styled(Modal)`
  top: 140px;
  .ant-modal-content {
    min-height: 600px;
  }
`

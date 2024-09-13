import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { bool, func } from 'prop-types'
import styled from 'styled-components'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import CommentHistoryTable from './CommentHistoryTable'

const propTypes = { open: bool, onCancel: func }

const CommentHistoryModal = ({ open, onCancel }) => {
  const { getOrderCommentHistory, orderState, orderCommentHistory } = useBroadbandContext()

  useEffect(() => {
    if (open && orderState.OrderId) {
      getOrderCommentHistory(orderState.OrderId)
    }
  }, [open])

  return (
    <StyledModal
      title='История изменения комментария'
      zIndex='1002'
      width='85%'
      centered
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <CommentHistoryTable data={orderCommentHistory.data} isLoading={orderCommentHistory.isLoading} />
    </StyledModal>
  )
}

CommentHistoryModal.propTypes = propTypes

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 8px 16px;
  }
`

export default CommentHistoryModal

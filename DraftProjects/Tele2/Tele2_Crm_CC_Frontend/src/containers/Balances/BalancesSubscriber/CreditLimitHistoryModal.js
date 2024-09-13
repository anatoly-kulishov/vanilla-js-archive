/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal } from 'antd'
import CreditLimitHistoryTable from 'components/CreditLimitHistoryTable'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { CREDIT_LIMIT_HISTORY_MODAL } from 'constants/logModalNames'

export default function CreditLimitHistoryModal ({
  isCreditLimitHistoryModalVisible,
  onCancel,
  history,
  isLoading
}) {
  CreditLimitHistoryModal.propTypes = {
    isCreditLimitHistoryModalVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    history: PropTypes.array,
    isLoading: PropTypes.bool
  }

  useEffect(() => {
    if (isCreditLimitHistoryModalVisible) {
      logIfEnabled({ type: MODAL_OPEN, log: CREDIT_LIMIT_HISTORY_MODAL })
    }
  }, [isCreditLimitHistoryModalVisible])

  const onClose = () => {
    onCancel()
    logIfEnabled({ type: MODAL_CLOSE, log: CREDIT_LIMIT_HISTORY_MODAL })
  }

  return (
    <CreditLimitModal
      title='История изменения кредитного лимита'
      visible={isCreditLimitHistoryModalVisible}
      width={900}
      onCancel={onClose}
      footer={null}
      zIndex={999}
    >
      <CreditLimitHistoryTable
        history={history}
        isLoading={isLoading}
      />
    </CreditLimitModal>
  )
}

const CreditLimitModal = styled(Modal)`
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-body {
    padding: 0;
  }
`

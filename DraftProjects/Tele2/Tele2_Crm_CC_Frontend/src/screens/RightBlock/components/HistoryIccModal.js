/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import { Modal, Table, Spin } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import LoadingSpinner from 'components/LoadingSpinner'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { HISTORY_ICC_MODAL } from 'constants/logModalNames'

const columns = [
  {
    title: '№',
    dataIndex: 'Number'
  },
  {
    title: 'ICC',
    dataIndex: 'Icc'
  },
  {
    title: 'Статус',
    dataIndex: 'UsiStatus'
  },
  {
    title: 'Начало',
    dataIndex: 'DateFrom',
    render: text => (text ? moment(text).format('DD.MM.YYYY HH:mm') : '')
  },
  {
    title: 'Конец',
    dataIndex: 'DateTo',
    render: text => (text ? moment(text).format('DD.MM.YYYY HH:mm') : '')
  },
  {
    title: 'Создал',
    dataIndex: 'CreatedBy'
  }
]

const HistoryIccModal = props => {
  const { replacementSimCard, handleVisibleHistoryIccModal, getHistoryChangeSim, personalAccount } = props
  const { isVisibleHistoryIccModal, historyChangeSim, getHistoryLoading } = replacementSimCard

  useEffect(() => {
    if (isVisibleHistoryIccModal) {
      getHistoryChangeSim({
        msisdn: personalAccount.Msisdn
      })
      logIfEnabled({ type: MODAL_OPEN, log: HISTORY_ICC_MODAL })
    }
  }, [isVisibleHistoryIccModal])

  const handleCloseModal = () => {
    handleVisibleHistoryIccModal()
    logIfEnabled({ type: MODAL_CLOSE, log: HISTORY_ICC_MODAL })
  }

  return (
    <StyledModal
      title='История изменений ICC абонента'
      visible={isVisibleHistoryIccModal}
      onCancel={handleCloseModal}
      footer={null}
      width={1000}
    >
      <Spin spinning={getHistoryLoading} indicator={<LoadingSpinner spin />}>
        <Table dataSource={historyChangeSim} columns={columns} pagination={false} />
      </Spin>
    </StyledModal>
  )
}

HistoryIccModal.propTypes = {
  replacementSimCard: PropTypes.object,
  handleVisibleHistoryIccModal: PropTypes.func,
  getHistoryChangeSim: PropTypes.func,
  personalAccount: PropTypes.object
}

export default HistoryIccModal

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0px;
  }
`

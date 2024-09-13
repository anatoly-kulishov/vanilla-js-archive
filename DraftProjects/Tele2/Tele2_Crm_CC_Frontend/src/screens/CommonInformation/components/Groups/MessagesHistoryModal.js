/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { Table, Modal } from 'antd'

import LoadingSpinner from 'components/LoadingSpinner'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { MESSAGES_HISTORY_MODAL } from 'constants/logModalNames'

const { Column } = Table

const MessagesHistoryModal = ({
  isHistoryMessageToggled,
  toggleMessageHistory,
  groupsSubscribers: {
    subscriberMessages,
    isSubscriberMessagesLoading
  }
}) => {
  const messages = subscriberMessages && subscriberMessages.Messages

  const handleCloseModal = () => {
    toggleMessageHistory(false)
    logIfEnabled({ type: MODAL_CLOSE, log: MESSAGES_HISTORY_MODAL })
  }

  useEffect(() => {
    if (isHistoryMessageToggled) {
      logIfEnabled({ type: MODAL_OPEN, log: MESSAGES_HISTORY_MODAL })
    }
  }, [isHistoryMessageToggled])

  return (
    <StyledModal
      width={900}
      visible={isHistoryMessageToggled}
      onCancel={handleCloseModal}
      title='История SMS-нотификаций'
      bodyStyle={{ padding: '0' }}
      footer={null}
    >
      <StyledTable
        rowKey='Key'
        dataSource={messages}
        pagination={false}
        size='small'
        loading={{
          spinning: isSubscriberMessagesLoading,
          indicator: <LoadingSpinner />
        }}
        scroll={{ y: 600 }} // eslint-disable-line
      >
        <Column
          dataIndex='TransactionDate'
          title='Дата'
          width='170px'
          render={value => (value ? moment(value).format('DD.MM.YYYY HH:mm') : '')}
        />
        <Column
          dataIndex='MessageText'
          title='Текст сообщения'
          align='justify'
        />
      </StyledTable>
    </StyledModal>
  )
}

export default MessagesHistoryModal

MessagesHistoryModal.propTypes = {
  isHistoryMessageToggled: PropTypes.bool,
  toggleMessageHistory: PropTypes.func,
  groupsSubscribers: PropTypes.object
}

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 14px 24px 10px 14px;
  }
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
`

const StyledTable = styled(Table)`
  font-size: 14px;
  overflow: auto;
  height: 100%;
  /* max-height: calc(100vh - 247px); */

  .ant-table-thead > tr th:first-child,
  .ant-table-tbody > tr td:first-child {
    padding-left: 14px !important;
  }
  .ant-table-expanded-row.ant-table-expanded-row-level-1 {
    background: white;
  }
  .ant-table-body {
    margin: 0 !important;
  }
  .ant-table-thead > tr {
    background-color: #ecf9ff;
  }
`

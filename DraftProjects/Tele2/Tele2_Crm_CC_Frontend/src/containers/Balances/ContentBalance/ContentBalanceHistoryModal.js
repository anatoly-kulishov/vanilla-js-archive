/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { Modal, Table } from 'antd'
import { stringSorter, isoDateSorter } from 'utils/helpers'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { CONTENT_BALANCE_HISTORY_MODAL } from 'constants/logModalNames'

const Column = Table.Column

const formatIsoDate = (value) => value ? moment(value).format('DD.MM.YYYY HH:mm') : ''

function ContentBalanceHistoryModal ({
  isContentBalanceHistoryModalVisible,
  onCancel,
  history,
  isLoading
}) {
  ContentBalanceHistoryModal.propTypes = {
    isContentBalanceHistoryModalVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    history: PropTypes.array,
    isLoading: PropTypes.bool
  }

  const handleCloseModal = () => {
    onCancel()
    logIfEnabled({ type: MODAL_CLOSE, log: CONTENT_BALANCE_HISTORY_MODAL })
  }

  useEffect(() => {
    if (isContentBalanceHistoryModalVisible) {
      logIfEnabled({ type: MODAL_OPEN, log: CONTENT_BALANCE_HISTORY_MODAL })
    }
  }, [isContentBalanceHistoryModalVisible])

  return (
    <ContenBalanceModal
      title='История изменения контентного баланса'
      visible={isContentBalanceHistoryModalVisible}
      width={900}
      onCancel={handleCloseModal}
      footer={null}
      zIndex={999}
    >
      <StyledTable
        loading={isLoading}
        rowKey='Key'
        dataSource={history}
        scroll={{ y: 600 }} // eslint-disable-line
        pagination={{ pageSize: 9 }}
        showSorterTooltip={false}
      >
        <Column
          dataIndex='startDate'
          title='Дата начала действия баланса'
          render={formatIsoDate}
          sorter={(cur, next) => isoDateSorter(cur.CreateDate, next.CreateDate)}
        />
        <Column
          dataIndex='closeDate'
          title='Дата окончания действия баланса'
          render={formatIsoDate}
          sorter={(cur, next) => isoDateSorter(cur.CreateDate, next.CreateDate)}
        />
        <Column
          dataIndex='user'
          title='Пользователь'
          sorter={(cur, next) => stringSorter(cur.PhoneNumIpApn, next.PhoneNumIpApn)}
        />
        <Column
          dataIndex='activeName'
          title='Статус'
        />
      </StyledTable>
    </ContenBalanceModal>
  )
}

export default ContentBalanceHistoryModal

const ContenBalanceModal = styled(Modal)`
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-body {
    padding: 0;
  }
`
const StyledTable = styled(Table)`
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
`

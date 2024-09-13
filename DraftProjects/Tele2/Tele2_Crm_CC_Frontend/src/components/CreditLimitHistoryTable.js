/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DownCircleOutlined } from '@ant-design/icons'
import LoadingSpinner from 'components/LoadingSpinner'
import { Table, Spin, Popover } from 'antd'
import { stringSorter, isoDateSorter } from 'utils/helpers'

const Column = Table.Column

const formatIsoDate = (value) => value ? moment(value).format('DD.MM.YYYY HH:mm') : ''

const renderChangingReason = (record, value) => (
  <Popover placement='bottom' title={'Причина изменения - расширенный'} content={record} trigger='click'>
    <MessageIcon />
  </Popover>
)

export default function CreditLimitHistoryTable ({ history, isLoading }) {
  CreditLimitHistoryTable.propTypes = {
    history: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool
  }
  return (
    <Spin spinning={isLoading} indicator={<LoadingSpinner spin />} >
      <StyledTable
        rowKey='Key'
        dataSource={history}
        scroll={{ y: 600 }} // eslint-disable-line
        pagination={{ pageSize: 9 }}
        showSorterTooltip={false}
      >
        <Column
          dataIndex='createDate'
          title='Дата создания'
          width='10%'
          render={formatIsoDate}
          sorter={(cur, next) => isoDateSorter(cur.CreateDate, next.CreateDate)}
        />
        <Column
          dataIndex='level'
          title='Значение лимита'
          width='5%'
          sorter={(cur, next) => stringSorter(cur.CscNameShort, next.CscNameShort)}
        />
        <Column
          dataIndex='creditLimitCahngeTechReason'
          title='Причина изменения (ПР)'
          width='30%'
          sorter={(cur, next) => stringSorter(cur.PhoneNumIpApn, next.PhoneNumIpApn)}
        />
        <Column
          dataIndex='creditLimitCahngeTechReasonDescription'
          title='ПР - расширенный'
          width='5%'
          sorter={(cur, next) => stringSorter(cur.PhoneNumIpApn, next.PhoneNumIpApn)}
          render={(record, value) => renderChangingReason(record, value)}
        />
      </StyledTable>
    </Spin>
  )
}

const StyledTable = styled(Table)`
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
`

const MessageIcon = styled(DownCircleOutlined)`
  font-size: 22px;
  cursor: pointer;
`

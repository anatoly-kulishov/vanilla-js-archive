import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import moment from 'moment'

import Tag from 'components/Tag'
import { Table } from 'antd'
import GroupIcon from './GroupIcon'
import LongValueWrapper from './LongValueWrapper'

const { Column } = Table

const ProgramTable = ({ list }) => {
  return (
    <Wrapper
      locale={{ emptyText: 'Нет данных о группах абонента' }}
      rowKey='Key'
      dataSource={list}
      pagination={false}
      size='small'
    >
      <Column
        dataIndex='DiscountName'
        title='Наименование скидки'
        render={value => value && <LongValueWrapper placement='topLeft' value={value} />}
      />
      <Column
        dataIndex='DiscountAmount'
        title='Скидка'
        align='center'
        render={(value, record) => value && <GroupIcon icon='percentage' record={record} count={value} />}
      />
      <Column
        dataIndex='DiscountPeriodName'
        title='Статус скидки'
        render={(value, record) => <Tag color={record.DiscountPeriodFieldColor}>{value}</Tag>}
      />
      <Column
        dataIndex='DiscountDate'
        title='Дата скидки'
        render={value => (value ? moment(value).format('DD.MM.YYYY HH:mm') : '')}
      />
    </Wrapper>
  )
}

export default ProgramTable

ProgramTable.propTypes = {
  list: PropTypes.object
}

const Wrapper = styled(Table)`
  font-size: 14px;
  overflow: auto;
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

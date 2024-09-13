/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useMemo } from 'react'
import { func, arrayOf } from 'prop-types'
import styled from 'styled-components'
import { Table } from 'antd'
import { stringSorter, isoDateSorter } from 'utils/helpers'
import promoRightsPropType from 'constants/propTypes/promo/promoRightsPropType'
import { formatDate } from 'screens/Finance/helpers/format'
import PromoAction from 'components/PromoActions'

const PromoHistoryTable = ({ promoHistory, promoRights, handlePromo }) => {
  PromoHistoryTable.propTypes = {
    promoHistory: arrayOf(),
    promoRights: promoRightsPropType,
    handlePromo: func
  }

  const getRowClassname = record => {
    if (record.IsCancel) {
      return 'red-row'
    } else {
      return 'green-row'
    }
  }

  const columns = useMemo(() => [
    {
      title: 'Промокод',
      dataIndex: 'PromocodeValue',
      key: 'PromocodeValue',
      sorter: (cur, next) => stringSorter(cur.PromocodeValue, next.PromocodeValue),
      render: value => <Cell title={value}>{value}</Cell>
    },
    {
      title: 'Тип промокода',
      dataIndex: 'PromocodeTypeName',
      key: 'PromocodeTypeName',
      width: '30%',
      sorter: (cur, next) => stringSorter(cur.PromocodeTypeName, next.PromocodeTypeName),
      render: value => <Cell title={value}>{value}</Cell>
    },
    {
      title: 'Тип компенсации',
      dataIndex: 'ServiceTypeName',
      key: 'ServiceTypeName',
      sorter: (cur, next) => stringSorter(cur.PaydTypeName, next.PaydTypeName),
      render: value => <Cell title={value}>{value}</Cell>
    },
    {
      title: 'Дата предоставления',
      dataIndex: 'TransactionDate',
      key: 'TransactionDate',
      sorter: (cur, next) => isoDateSorter(cur.TransactionDate, next.TransactionDate),
      render: TransactionDate => (
        <Cell title={TransactionDate ? formatDate(TransactionDate) : ''}>
          {TransactionDate ? formatDate(TransactionDate) : ''}
        </Cell>
      )
    },
    {
      title: 'Автор предоставления',
      dataIndex: 'UserName',
      key: 'UserName',
      sorter: (cur, next) => stringSorter(cur.UserName, next.UserName),
      render: value => <Cell title={value}>{value}</Cell>
    },
    {
      title: 'Статус компенсации',
      dataIndex: 'IsCancel',
      key: 'IsCancel',
      sorter: (cur, next) => stringSorter(cur.IsCancel, next.IsCancel),
      render: value => {
        const title = value ? 'Отменена' : 'Предоставлена'
        return <Cell title={title}>{title}</Cell>
      }
    },
    (promoRights.isActivateRight || promoRights.isCancelRight || promoRights.isAllCancelRight) && {
      render: (record) => {
        return <PromoAction isCompensationActions promo={record} promoRights={promoRights} handlePromo={handlePromo} />
      }
    }
  ], [promoHistory])

  return (
    <StyledTable
      columns={columns}
      scroll={{ y: 400 }} // eslint-disable-line
      dataSource={promoHistory}
      pagination={false}
      showSorterTooltip={false}
      rowClassName={record => getRowClassname(record)}
      bordered
      size='small'
    />
  )
}

const StyledTable = styled(Table)`
  .ant-table-row.ant-table-row-level-0.red-row {
    background: rgba(245, 34, 45, 0.15);
  }
  .ant-table-row.ant-table-row-level-0.green-row {
    background: rgba(82, 196, 26, 0.2);
  }
`

const Cell = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default PromoHistoryTable

/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Tooltip } from 'antd'
import styled from 'styled-components'
import { MassProblemListProps } from 'constants/massProblems'
import moment from 'moment'

const columns = [
  {
    render: record => {
      const operation = record.DetailHistory[0].Operation
      const operationHandling = record.DetailHistory.filter(item => item.Operation === 'Обращение')
      if (operation === 'SMS оповещение' || operation === 'Изменение') {
        return <div>{operation}: {record.HandlingId}</div>
      }
      if (operationHandling?.length) {
        let formatIsoDate = value => (value ? moment(value).format('DD.MM.YYYY HH:mm') : '')
        return (
          <TableRow>
            <TableCell>{`Линия обслуживания: ${operationHandling[0].LineTypeName}`}</TableCell>
            <TableCell width='26%'>{formatIsoDate(operationHandling[0].Timestamp)}</TableCell>
            <TableCell>{operationHandling[0].Changes}</TableCell>
            <TableCell width='24%'>{operationHandling[0].UserName}</TableCell>
          </TableRow>
        )
      }
    }
  }
]

const OrderHistoryDescription = ({ historyOrderIdsData, handleOpenModal }) => {
  const [expandedRowKeys, setRowKeys] = useState([])

  const { historyOrderIds, isLoading } = historyOrderIdsData

  const historyOrdersData = useMemo(
    () => historyOrderIds?.History.filter(item => item.DetailHistory.length),
    [historyOrderIds?.History]
  )

  const onExpandedRowsChange = nextRowKeys => {
    setRowKeys(nextRowKeys)
  }

  useEffect(() => {
    const defaultExpanded = []
    historyOrdersData?.map((order, index) => {
      order.DetailHistory.find(item => {
        if (item.Operation === 'SMS оповещение' || item.Operation === 'Изменение') {
          defaultExpanded.push(index)
          return true
        }
      })
      if (order.DetailHistory.length === 1 && order.DetailHistory[0].Operation !== 'Обращение') {
        defaultExpanded.push(index)
      }
    })

    if (historyOrdersData?.length === 1) {
      setRowKeys([0])
    } else {
      setRowKeys(defaultExpanded)
    }
  }, [historyOrdersData?.length])

  const expandedRowRender = record => {
    const columnsRowRender = [
      {
        dataIndex: 'Operation',
        key: 'Operation',
        width: '25%',
        render: (value, record) => {
          switch (record.Operation) {
            case 'Обращение':
              return (
                <Tooltip title={record.ChangesDescription}>
                  <div>{`Линия обслуживания: ${record.LineTypeName}`}</div>
                </Tooltip>
              )
            case 'SMS оповещение':
              return (
                <Tooltip
                  title={
                    <Fragment>
                      <div>Описание</div>
                      <div>{record.ChangesDescription}</div>
                      <div>Текст отправленного SMS</div>
                      <div>{record.SMSText}</div>
                    </Fragment>
                  }
                >
                  <div>{record.Operation}</div>
                </Tooltip>
              )
            case 'SMS из обращения':
              return (
                <Tooltip
                  title={
                    <Fragment>
                      <div>{record.SmsTemplateName}</div>
                      <div>{record.SmsText}</div>
                    </Fragment>
                  }
                >
                  <div>{record.Operation}</div>
                </Tooltip>
              )
            default:
              return (
                <Tooltip title={record.ChangesDescription}>
                  <div>{record.Operation}</div>
                </Tooltip>
              )
          }
        }
      },
      {
        dataIndex: 'Timestamp',
        key: 'Timestamp',
        width: '25%',
        render: value => {
          let formatIsoDate = value => (value ? moment(value).format('DD.MM.YYYY HH:mm') : '')
          return <div>{formatIsoDate(value)}</div>
        }
      },
      {
        dataIndex: 'Changes',
        key: 'Changes',
        width: '25%',
        render: (value, record) => record.Operation === 'SMS из обращения' ? '' : value
      },
      {
        dataIndex: 'UserName',
        key: 'UserName',
        width: '25%'
      }
    ]
    const dataSource = record.DetailHistory.filter(item => item.Operation !== 'Обращение')
    return (
      <StyledTable
        columns={columnsRowRender}
        loading={isLoading}
        dataSource={dataSource}
        showHeader={false}
        pagination={false}
        rowClassName={record => {
          switch (record.Operation) {
            case 'SMS оповещение':
              return 'sms'
            case 'Изменение':
              return 'change'
            case 'SMS из обращения':
              return 'sms-handling'
          }
        }}
        onRow={record => {
          return {
            onClick: () => handleOpenModal(record)
          }
        }}
      />
    )
  }

  return (
    <HandlingTable
      dataSource={historyOrdersData}
      loading={isLoading}
      columns={columns}
      showHeader={false}
      pagination={false}
      rowKey={(record, index) => index}
      expandable={{
        expandedRowKeys,
        onExpandedRowsChange,
        expandedRowRender,
        rowExpandable: (record) => {
          let operation = record.DetailHistory.find(item => item.Operation === 'Обращение')
          if (record.DetailHistory.length === 1 && operation) {
            return false
          } else return true
        }
      }}
      rowClassName={record => {
        let operation = record.DetailHistory.find(item => item.Operation === 'Обращение')
        if (operation) return 'handling'
      }}
      onRow={record => {
        let operation = record.DetailHistory.find(item => item.Operation === 'Обращение')
        if (operation) {
          return {
            onClick: () => handleOpenModal(operation)
          }
        }
      }}
    />
  )
}

export default OrderHistoryDescription

OrderHistoryDescription.propTypes = {
  historyOrderIdsData: PropTypes.instanceOf(MassProblemListProps),
  handleOpenModal: PropTypes.func
}

const StyledTable = styled(Table)`
  .sms {
    background-color: #ecf9ff;
  }

  .change {
    background-color: #4de37f58;
  }

  .sms-handling {
    background-color: #ff63633a;
  }
`
const TableRow = styled.div`
  display: flex;
`
const TableCell = styled.div`
  width: ${props => props.width ? props.width : '25%'};
`
const HandlingTable = styled(Table)`
  .handling {
    background-color: #fffbe6;
  }
`

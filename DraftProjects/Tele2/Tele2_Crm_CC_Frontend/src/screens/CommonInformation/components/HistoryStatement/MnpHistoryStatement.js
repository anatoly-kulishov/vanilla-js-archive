/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react-perf/jsx-no-new-array-as-prop */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { Fragment, useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Table, Row, Col } from 'antd'
import moment from 'moment'

import FormModal from 'containers/Questionary/components/FormModal'
import OrderHistoryDescription from './components/OrderHistoryDescription'
import HistoryStatementFilters from './components/HistoryStatementFilters'
import QuestionaryHistoryFooter from 'screens/History/components/QuestionaryHistoryFooter'

const MnpHistoryStatement = ({
  getHistoryOrderIdList,
  getClosedOrders,
  getQuestionProtocol,
  fetchQuestionsHistory,
  mnpOrder,
  closedOrdersData,
  historyOrderIdsDataList,
  isGetQuestionProtocolLoading,
  isQuestionsHistoryLoading,
  questionsHistory,
  questionProtocolData,
  isVisible
}) => {
  MnpHistoryStatement.propTypes = {
    getHistoryOrderIdList: PropTypes.func,
    getClosedOrders: PropTypes.func,
    getQuestionProtocol: PropTypes.func,
    fetchQuestionsHistory: PropTypes.func,
    mnpOrder: PropTypes.obj,
    closedOrdersData: PropTypes.obj,
    historyOrderIdsDataList: PropTypes.array,
    isGetQuestionProtocolLoading: PropTypes.bool,
    isQuestionsHistoryLoading: PropTypes.bool,
    questionsHistory: PropTypes.obj,
    isVisible: PropTypes.bool,
    questionProtocolData: PropTypes.obj
  }
  const questionaryName = questionsHistory?.QuestionaryName
  const controls = questionProtocolData?.Questions ?? []
  const createdFio = questionProtocolData?.CreatedFIO
  const createdOn = questionProtocolData?.CreatedOn

  const location = useLocation()
  const isMnpHistory = location.pathname.includes('history/mnp')

  const columns = [
    {
      render: record => {
        let formatIsoDate = value => (value ? moment(value).format('DD.MM.YYYY HH:mm') : '')
        return (
          <Row gutter={16} style={{ width: '70%' }}>
            <Col span={8}>
              <RowTitle>Номер заявки: {record.OrderId}</RowTitle>
            </Col>
            <Col span={8}>
              <RowTitle>Дата создания: {formatIsoDate(record.OrderDate)}</RowTitle>
            </Col>
            <Col span={8}>
              <RowTitle>Дата отмены: {formatIsoDate(record.CancellationDate)}</RowTitle>
            </Col>
          </Row>
        )
      }
    }
  ]

  const [rangeValue, setRangeValue] = useState({
    datePeriodStart: moment().subtract(7, 'day'),
    datePeriodFinish: moment()
  })

  const [eventTypeName, setEventTypeName] = useState(null)
  const [selectedOrders, setOrders] = useState(undefined)
  const [expandedRowKeys, setExpandedRowKeys] = useState([])
  const [isModalVisible, setModalVisible] = useState(false)

  const handleDatePeriodChange = params => {
    setRangeValue({
      ...rangeValue,
      ...params
    })
    setOrders('Все заявки')
  }

  const dataSource = useMemo(() => {
    const { isClosedOrdersLoading, isClosedOrdersError, closedOrders } = closedOrdersData
    let newArray = []
    const orderItem = newArray.find(item => item.OrderId === mnpOrder?.OrderId)
    const closedOrderItem = closedOrders?.find(item => item.OrderId === mnpOrder?.OrderId)

    if (mnpOrder?.OrderId && !orderItem && !closedOrderItem) {
      newArray.push({
        OrderId: mnpOrder.OrderId,
        OrderDate: mnpOrder.OrderDate,
        CancellationDate: mnpOrder.CancellationDate
      })
    }

    if (!isClosedOrdersLoading && !isClosedOrdersError && closedOrders) {
      closedOrders.forEach(item => newArray.push(item))
    }

    return newArray.filter(item =>
      selectedOrders?.includes('Все заявки') ? true : selectedOrders?.includes(item.OrderId)
    )
  }, [closedOrdersData?.closedOrders, selectedOrders])

  useEffect(() => {
    if ((isVisible || isMnpHistory) && mnpOrder?.OrderId) {
      const { OrderId, OrderDate } = mnpOrder
      setOrders(OrderId)
      getHistoryOrderIdList([
        {
          Operation: eventTypeName,
          DateFrom: rangeValue.datePeriodStart.format('YYYY.MM.DD'),
          DateTo: rangeValue.datePeriodFinish.format('YYYY.MM.DD'),
          OrderDate: moment(OrderDate).toISOString(),
          OrderId
        }
      ])
    }
    if (isVisible || isMnpHistory) {
      getClosedOrders({
        DateFrom: rangeValue.datePeriodStart.format('YYYY.MM.DD'),
        DateTo: rangeValue.datePeriodFinish.format('YYYY.MM.DD')
      })
    }
  }, [isVisible, isMnpHistory])

  const onExpand = (expanded, record) => {
    if (expanded) {
      getHistoryOrderIdList([
        {
          Operation: eventTypeName,
          DateFrom: rangeValue.datePeriodStart.format('YYYY.MM.DD'),
          DateTo: rangeValue.datePeriodFinish.format('YYYY.MM.DD'),
          OrderDate: moment(record.OrderDate).toISOString(),
          OrderId: record.OrderId
        }
      ])
    }
  }

  const onExpandedRowsChange = nextRowKeys => {
    setExpandedRowKeys(nextRowKeys)
  }

  useEffect(() => {
    if (dataSource?.length === 1) {
      const orderId = dataSource[0].OrderId
      setExpandedRowKeys([orderId])
    } else {
      setExpandedRowKeys([])
    }
  }, [dataSource?.length])

  const handleOpenModal = record => {
    const { ProtocolId, DocumentId, Operation } = record

    if (DocumentId && Operation === 'Обращение') {
      getQuestionProtocol({ ProtocolId })
      fetchQuestionsHistory({ questionaryHistoryId: DocumentId })
      setModalVisible(true)
    }
  }

  const handleSearch = () => {
    getClosedOrders({
      DateFrom: rangeValue.datePeriodStart.format('YYYY.MM.DD'),
      DateTo: rangeValue.datePeriodFinish.format('YYYY.MM.DD')
    })

    if (expandedRowKeys.length !== 0) {
      const orders = dataSource.filter(item => expandedRowKeys.find(rowKey => rowKey === item.OrderId))

      const params = orders.map(order => ({
        Operation: eventTypeName,
        DateFrom: rangeValue.datePeriodStart.format('YYYY.MM.DD'),
        DateTo: rangeValue.datePeriodFinish.format('YYYY.MM.DD'),
        OrderDate: moment(order.OrderDate).toISOString(),
        OrderId: order.OrderId
      }))
      getHistoryOrderIdList(params)
    }
  }

  const orderIds = useMemo(() => {
    const closedOrders = []
    closedOrdersData?.closedOrders?.map(item => {
      closedOrders.push(item.OrderId)
    })
    closedOrders?.push('Все заявки')
    return closedOrders
  }, [closedOrdersData?.closedOrders, isVisible, isMnpHistory])

  const onChangeOrder = value => {
    if (selectedOrders.includes('Все заявки') && value.length > 1) {
      const newValue = value.filter(item => item !== 'Все заявки')
      setOrders(newValue)
    } else setOrders(value)
  }

  return (
    <Fragment>
      <HistoryStatementFilters
        setEventTypeName={setEventTypeName}
        eventTypeName={eventTypeName}
        handleDatePeriodChange={handleDatePeriodChange}
        rangeValue={rangeValue}
        handleSearch={handleSearch}
        selectedOrders={selectedOrders}
        onChangeOrder={onChangeOrder}
        orderIds={orderIds}
        isMnpHistory={isMnpHistory}
      />
      <StyledTable
        dataSource={dataSource}
        showHeader={false}
        columns={columns}
        loading={closedOrdersData?.isClosedOrdersLoading}
        pagination={false}
        rowKey={record => record.OrderId}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange,
          onExpand,
          expandedRowRender: record => {
            const historyOrderIdsData = historyOrderIdsDataList[record.OrderId] || {}
            return (
              <OrderHistoryDescription
                isMnpHistory={isMnpHistory}
                handleOpenModal={handleOpenModal}
                historyOrderIdsData={historyOrderIdsData}
              />
            )
          }
        }}
        title={() => (
          <Wrapper>
            <span style={{ width: '100px' }} />
            <HeaderTable style={{ width: 'calc((100% - 100px) * 0.24)' }}>Событие</HeaderTable>
            <HeaderTable style={{ width: 'calc((100% - 100px) * 0.26)' }}>Дата</HeaderTable>
            <HeaderTable style={{ width: 'calc((100% - 100px) * 0.25)' }}>Статус</HeaderTable>
            <HeaderTable>Пользователь</HeaderTable>
          </Wrapper>
        )}
      />
      <FormModal
        onCancel={() => setModalVisible(false)}
        dataSource={controls}
        title={questionaryName}
        hasInitialValues
        footer={<QuestionaryHistoryFooter createdFio={createdFio} createdOn={createdOn} />}
        isVisible={isModalVisible}
        isEditable={false}
        isLoading={isGetQuestionProtocolLoading || isQuestionsHistoryLoading}
      />
    </Fragment>
  )
}

export default MnpHistoryStatement

const Wrapper = styled.div`
  display: flex;
`

const HeaderTable = styled.span`
  padding: 0 16px;
`

const StyledTable = styled(Table)`
  .ant-table-title {
    background-color: #ecf9ff;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 1px;
  }
`
const RowTitle = styled.div`
  font-weight: bold;
`

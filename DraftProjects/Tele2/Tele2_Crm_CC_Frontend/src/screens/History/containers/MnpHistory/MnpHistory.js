import React, { Fragment, useCallback, useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import FiltersWrapper from '../../components/FiltersWrapper'
import useHistoryContext from '../../HistoryContext/useHistoryContext'

import FormModal from 'containers/Questionary/components/FormModal'
import QuestionaryHistoryFooter from 'screens/History/components/QuestionaryHistoryFooter'

import MnpHistoryFilter from './MnpHistoryFilters'
import MnpHistoryTable from './MnpHistoryTable'

export default function MnpHistory ({
  questionsHistory,
  mnpHistory,
  isMnpHistoryLoading,
  fetchMnpHistory,
  fetchQuestionsHistory,
  personalAccountState: { personalAccount, isPersonalAccountLoading },
  getQuestionProtocol,
  questionProtocolData,
  isQuestionsHistoryLoading,
  isGetQuestionProtocolLoading,
  mnpOrder,
  closedOrdersData,
  getClosedOrders
}) {
  MnpHistory.propTypes = {
    mnpHistory: PropTypes.array,
    isMnpHistoryLoading: PropTypes.bool,
    questionsHistory: PropTypes.array,
    fetchMnpHistory: PropTypes.func,
    fetchQuestionsHistory: PropTypes.func,
    personalAccountState: PropTypes.object,
    getQuestionProtocol: PropTypes.func,
    questionProtocolData: PropTypes.object,
    isQuestionsHistoryLoading: PropTypes.bool,
    isGetQuestionProtocolLoading: PropTypes.bool,
    mnpOrder: PropTypes.object,
    closedOrdersData: PropTypes.object,
    getClosedOrders: PropTypes.func
  }
  const {
    filters,
    methods: { updateHistoryFilterValue }
  } = useHistoryContext()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { Msisdn } = personalAccount
  const { mnpOrderId, datePeriodStart, datePeriodFinish } = filters

  const controls = questionProtocolData.CreatedFIO
    ? questionProtocolData.Questions
    : questionsHistory.Questions
  const questionaryName = questionsHistory?.QuestionaryName ?? ''
  const createdFio = questionProtocolData.CreatedFIO
    ? questionProtocolData.CreatedFIO
    : questionsHistory.CreatedFIO
  const createdOn = questionProtocolData.CreatedFIO
    ? questionProtocolData.CreatedOn
    : questionsHistory.CreatedOn

  useEffect(() => {
    if (mnpOrder?.OrderId) {
      updateHistoryFilterValue({ mnpOrderId: mnpOrder?.OrderId })
    }
  }, [mnpOrder?.OrderId])

  const updateMnpHistory = useCallback(() => {
    fetchMnpHistory({
      Msisdn,
      DateFrom: datePeriodStart.startOf('day').utc().format(),
      DateTo: datePeriodFinish.endOf('day').utc().format(),
      Orders: mnpOrderId
    })
  })

  const handleFiltersClear = useCallback(() => {
    updateHistoryFilterValue({
      mnpOrderId: [],
      datePeriodStart: moment().subtract(7, 'days'),
      datePeriodFinish: moment()
    })
  })

  const handleOpenModal = useCallback(record => {
    fetchQuestionsHistory({ questionaryHistoryId: record.DocumentId })
    getQuestionProtocol({ ProtocolId: record.ProtocolId })
    setIsModalVisible(true)
  })
  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false)
  })

  useEffect(() => {
    updateMnpHistory()
  }, [])

  const orderIds = useMemo(() => {
    const closedOrders = []
    closedOrdersData?.closedOrders?.map(item => {
      closedOrders.push(item.OrderId)
    })
    return closedOrders
  }, [closedOrdersData?.closedOrders])

  const onFocus = useCallback(() => {
    getClosedOrders({
      DateFrom: datePeriodStart.format('YYYY.MM.DD'),
      DateTo: datePeriodFinish.format('YYYY.MM.DD')
    })
  })

  return (
    <Fragment>
      <FiltersWrapper>
        <MnpHistoryFilter
          filters={filters}
          onSubmit={updateMnpHistory}
          onClear={handleFiltersClear}
          onFilterChange={updateHistoryFilterValue}
          mnpOrder={mnpOrder}
          orderIds={orderIds}
          onFocus={onFocus}
        />
      </FiltersWrapper>
      <MnpHistoryTable
        dataSource={mnpHistory}
        isLoading={isPersonalAccountLoading || isMnpHistoryLoading}
        onItemClick={handleOpenModal}
      />
      <FormModal
        onCancel={handleCloseModal}
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

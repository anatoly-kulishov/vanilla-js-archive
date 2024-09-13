/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import InteractionsFilter from './InteractionsFilters'
import InteractionsGrid from './InteractionsGrid'
import InteractionModalContent from './InteractionModalContent'

import { Button, Spin, Modal } from 'antd'
import LoadingSpinner from 'components/LoadingSpinner'

import FiltersWrapper from '../../components/FiltersWrapper'
import { initialHistoryState, dayStartTime, dayEndTime } from '../../HistoryContext/constants'
import useHistoryContext from '../../HistoryContext/useHistoryContext'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { HISTORY_INTERACTION_MODAL } from 'constants/logModalNames'

const LoadIcon = <LoadingSpinner spin />

export default function Interactions ({
  personalAccount,
  isPersonalAccountLoading,
  historyInteractions,
  historyInteractionsLoading,
  fetchHistoryInteraction,
  fetchLinkedInteractions,
  onClickRemove,
  linkedInteractions,
  isLinkedInteractionsLoading
}) {
  Interactions.propTypes = {
    personalAccount: PropTypes.objectOf(
      PropTypes.shape({
        Msisdn: PropTypes.string,
        BillingBranchId: PropTypes.number
      })
    ),
    isPersonalAccountLoading: PropTypes.bool,
    historyInteractions: PropTypes.object,
    historyInteractionsLoading: PropTypes.bool,
    fetchHistoryInteraction: PropTypes.func,
    fetchLinkedInteractions: PropTypes.func,
    linkedInteractions: PropTypes.array,
    isLinkedInteractionsLoading: PropTypes.bool,

    onClickRemove: PropTypes.func.isRequired
  }

  const { filters, methods } = useHistoryContext()
  const { updateHistoryFilterValue } = methods

  const [isInteractionModalVisible, setIsInteractionModalVisible] = useState(false)
  const [interactionRecord, setInteractionRecord] = useState(null)

  const updateInteractions = () => {
    const {
      interactionReason,
      interactionShowBy,
      interactionCategory,
      datePeriodStart,
      datePeriodFinish
    } = filters

    fetchHistoryInteraction({
      reasonId: interactionReason,
      categoryId: interactionCategory,
      msisdn: personalAccount.Msisdn,
      email: personalAccount.Email,
      clientViewType: interactionShowBy,
      beginDate: moment.utc(datePeriodStart).set(dayStartTime).format(),
      endDate: moment.utc(datePeriodFinish).set(dayEndTime).format(),
      clientId: personalAccount.ClientId,
      branchId: personalAccount.BillingBranchId
    })
  }

  const handleFiltersClear = () => {
    const {
      interactionReason,
      interactionCategory,
      datePeriodStart,
      datePeriodFinish
    } = initialHistoryState.filters

    const isAnonCard = personalAccount.ClientId ? 2 : 0
    updateHistoryFilterValue({
      interactionReason,
      interactionCategory,
      datePeriodStart,
      datePeriodFinish,
      interactionShowBy: isAnonCard
    })
  }

  const onOpenInteraction = record => {
    setInteractionRecord(record)
    setIsInteractionModalVisible(true)
    logIfEnabled({ type: MODAL_OPEN, log: HISTORY_INTERACTION_MODAL })
  }

  const onCloseInteraction = () => {
    setIsInteractionModalVisible(false)
    setInteractionRecord(null)
    logIfEnabled({ type: MODAL_CLOSE, log: HISTORY_INTERACTION_MODAL })
  }

  useEffect(() => {
    updateInteractions()
  }, [])

  return (
    <Fragment>
      <FiltersWrapper>
        <InteractionsFilter
          filters={filters}
          msisdn={personalAccount.Msisdn}
          onClear={handleFiltersClear}
          onSubmit={updateInteractions}
          onFilterChange={updateHistoryFilterValue}
          onClickRemove={onClickRemove}
        />
      </FiltersWrapper>
      <Spin indicator={LoadIcon} spinning={isPersonalAccountLoading || historyInteractionsLoading}>
        <InteractionsGrid
          history={historyInteractions}
          onOpenInteraction={onOpenInteraction}
          fetchLinkedInteractions={fetchLinkedInteractions}
          linkedInteractions={linkedInteractions}
          isLinkedInteractionsLoading={isLinkedInteractionsLoading}
        />
      </Spin>
      <StyledModal
        title='Причина обращения'
        visible={isInteractionModalVisible}
        onCancel={onCloseInteraction}
        footer={
          <Button type='primary' onClick={onCloseInteraction}>
            Закрыть
          </Button>
        }
      >
        {interactionRecord && <InteractionModalContent interaction={interactionRecord} />}
      </StyledModal>
    </Fragment>
  )
}

const StyledModal = styled(Modal)`
    top: 25%;
    
  .ant-modal-header {
    padding: 14px 24px 10px 24px;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-footer {
    text-align: center;
    font-family: T2HalvarBreit_ExtraBold;
  }
`

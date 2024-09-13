/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

import TicketFilter from './TicketFilter'
import TicketGrid from './TicketGrid'

import { Select } from 'antd'

import FiltersWrapper from '../../components/FiltersWrapper'
import useHistoryContext from '../../HistoryContext/useHistoryContext'
import { initialHistoryState } from '../../HistoryContext/constants'

const { Option } = Select

export default function Tickets ({
  historyTicketsState,
  queryParamsState,
  fetchTicketGridDataByFilters,
  fetchTicketGridDataByTicket,
  personalAccount,

  fetchLeftBlockValues,
  fetchRightBlockValues,
  fetchTicketComments,
  fetchTicketStatuses,
  fetchTicketsReasonsCategories,
  fetchTicketFiles,
  handleVisibleTicketInfoModal
}) {
  Tickets.propTypes = {
    historyTicketsState: PropTypes.object,
    queryParamsState: PropTypes.object,
    personalAccount: PropTypes.object,
    fetchTicketGridDataByFilters: PropTypes.func,
    fetchTicketGridDataByTicket: PropTypes.func,
    fetchLeftBlockValues: PropTypes.func,
    fetchRightBlockValues: PropTypes.func,
    fetchTicketComments: PropTypes.func,
    fetchTicketStatuses: PropTypes.func,
    fetchTicketsReasonsCategories: PropTypes.func,
    fetchTicketFiles: PropTypes.func,
    handleVisibleTicketInfoModal: PropTypes.func
  }

  const { filters, methods } = useHistoryContext()
  const { updateHistoryFilterValue } = methods

  const { ClientCategory } = personalAccount
  const isB2B = ClientCategory === 'B2B'

  const updateTickets = initialPayload => {
    const {
      queryParams: { msisdn: queryParamsMsisdn }
    } = queryParamsState

    const {
      ticketStatus,
      ticketCategory,
      ticketsDatePeriodStart,
      ticketsDatePeriodFinish,
      ticketReason,
      ticketNumber,
      ticketSearchForAllSubscribers
    } = filters

    const { Msisdn: personalAccountMsisdn } = personalAccount
    const PersonalAccountId = isB2B ? personalAccount?.ParentClientInfo?.PersonalAccountId : personalAccount?.PersonalAccountId
    const msisdn = queryParamsMsisdn || personalAccountMsisdn

    let payload = {
      AbonentNumber: ticketSearchForAllSubscribers ? null : msisdn,
      statusOfIncident: ticketStatus ? ticketStatus.key : null,
      UmbServiceRequestReason: ticketReason ? ticketReason.key : null,
      UmbCategoryReason: ticketCategory ? ticketCategory.key : null,
      RegisteredOnStart: ticketsDatePeriodStart.format('YYYY-MM-DD'),
      RegisteredOnEnd: ticketsDatePeriodFinish.format('YYYY-MM-DD'),
      PersonalAccountNumber: ticketSearchForAllSubscribers ? PersonalAccountId : null
    }

    if (initialPayload) {
      payload = { ...payload, ...initialPayload }
    }

    if (ticketNumber) {
      fetchTicketGridDataByTicket({ Number: ticketNumber, AbonentNumber: msisdn })
    } else {
      fetchTicketGridDataByFilters(payload)
    }
  }

  const handleFiltersClear = () => {
    const {
      ticketReason,
      ticketStatus,
      ticketNumber,
      ticketCategory,
      ticketsDatePeriodStart,
      ticketsDatePeriodFinish,
      serviceName
    } = initialHistoryState.filters
    updateHistoryFilterValue({
      ticketReason,
      ticketStatus,
      ticketNumber,
      ticketCategory,
      ticketsDatePeriodStart,
      ticketsDatePeriodFinish,
      serviceName,
      ticketSearchForAllSubscribers: isB2B
    })
  }

  const renderStatusOptions = () => {
    const { ticketStatuses, ticketStatusesError, isTicketStatusesLoading } = historyTicketsState

    if (ticketStatuses && !isTicketStatusesLoading && !ticketStatusesError) {
      return ticketStatuses.BpmIncidentStatus.map(incident => (
        <Option key={incident.id} value={incident.statusName}>
          {incident.statusName}
        </Option>
      ))
    } else {
      return null
    }
  }

  const renderReasonOptions = () => {
    const { ticketsReasonsCategories, isServiceListLoading } = historyTicketsState

    if (ticketsReasonsCategories && !isServiceListLoading) {
      return ticketsReasonsCategories.length
        ? ticketsReasonsCategories.map(item => (
          <Option key={item.reasonId} value={item.reasonName}>
            {item.reasonName}
          </Option>
        ))
        : null
    } else {
      return null
    }
  }

  const renderCategoryOptions = () => {
    const { ticketsReasonsCategories, isTicketsReasonsCategoriesLoading, ticketsReasonsCategoriesError } =
      historyTicketsState

    const { ticketReason } = filters

    if (ticketsReasonsCategories && !isTicketsReasonsCategoriesLoading && !ticketsReasonsCategoriesError) {
      if (!ticketReason) {
        // fix for antd allowClear (returns undefined). THANKS ANTD.
        return []
      }
      const ticketReasonKey = ticketReason.key
      let reasonCategories
      if (ticketsReasonsCategories.length && ticketReasonKey) {
        reasonCategories = ticketsReasonsCategories.find(item => item.reasonId === Number(ticketReasonKey))
      }
      return (
        reasonCategories &&
        reasonCategories.categories.map(option => (
          <Option key={option.categoryId} value={option.categoryName}>
            {option.categoryName}
          </Option>
        ))
      )
    }
    return null
  }

  const openModalInfoHandle = (ticketId, number) => {
    handleVisibleTicketInfoModal()
    fetchLeftBlockValues({ Id: ticketId })
    fetchRightBlockValues({ ServiceRequest: ticketId })
    fetchTicketComments({ Incident: ticketId })
    fetchTicketFiles({ ServiceRequest: ticketId, useCache: false })
  }

  useEffect(() => {
    fetchTicketStatuses()
    fetchTicketsReasonsCategories()
    updateTickets()
  }, [])

  return (
    <Fragment>
      <FiltersWrapper>
        <TicketFilter
          filters={filters}
          onSubmit={updateTickets}
          onClear={handleFiltersClear}
          onFilterChange={updateHistoryFilterValue}
          statusOptions={renderStatusOptions()}
          reasonOptions={renderReasonOptions()}
          categoryOptions={renderCategoryOptions()}
        />
      </FiltersWrapper>
      <TicketGrid historyTicketsState={historyTicketsState} openModalInfoHandle={openModalInfoHandle} />
    </Fragment>
  )
}

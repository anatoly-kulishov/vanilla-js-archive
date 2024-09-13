/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import CreditLimitHistoryTable from 'components/CreditLimitHistoryTable'
import CreditLimitFilter from './CreditLimitFilter'

import FiltersWrapper from '../../components/FiltersWrapper'
import useHistoryContext from '../../HistoryContext/useHistoryContext'
import { initialHistoryState, dayStartTime, dayEndTime } from '../../HistoryContext/constants'

export default function CreditLimit ({
  personalAccount,
  getTrustCreditHistory,
  getTrustCreditReasonsHistory,
  isTrustCreditHistoryLoading,
  trustCreditHistory,
  isTrustCreditReasonsHistoryLoading,
  trustCreditReasonsHistory
}) {
  CreditLimit.propTypes = {
    personalAccount: PropTypes.shape({
      Msisdn: PropTypes.string,
      BillingBranchId: PropTypes.number
    }),
    trustCreditHistory: PropTypes.arrayOf(PropTypes.object),
    trustCreditReasonsHistory: PropTypes.object,
    isTrustCreditHistoryLoading: PropTypes.bool,
    isTrustCreditReasonsHistoryLoading: PropTypes.bool,
    getTrustCreditHistory: PropTypes.func,
    getTrustCreditReasonsHistory: PropTypes.func
  }

  const { filters, methods } = useHistoryContext()
  const { updateHistoryFilterValue } = methods

  const updateCreditLimit = () => {
    const { datePeriodStart, datePeriodFinish, creditChangeReason } = filters
    const { Msisdn: msisdn } = personalAccount

    getTrustCreditHistory({
      msisdn,
      dateFrom: moment.utc(datePeriodStart).set(dayStartTime).format(),
      dateTo: moment.utc(datePeriodFinish).set(dayEndTime).format(),
      changeReason: creditChangeReason
    })
  }

  const handleFiltersClear = () => {
    const { datePeriodStart, datePeriodFinish, creditChangeReason } = initialHistoryState.filters
    updateHistoryFilterValue({
      datePeriodStart,
      datePeriodFinish,
      creditChangeReason
    })
  }

  useEffect(() => {
    const { BillingBranchId: branchId } = personalAccount
    getTrustCreditReasonsHistory({ branchId })
    updateCreditLimit()
  }, [])

  return (
    <Fragment>
      <FiltersWrapper>
        <CreditLimitFilter
          filters={filters}
          isFiltersLoading={isTrustCreditReasonsHistoryLoading}
          trustCreditReasonsHistory={trustCreditReasonsHistory}
          onFilterChange={updateHistoryFilterValue}
          onSubmit={updateCreditLimit}
          onClear={handleFiltersClear}
        />
      </FiltersWrapper>
      <CreditLimitHistoryTable history={trustCreditHistory} isLoading={isTrustCreditHistoryLoading} />
    </Fragment>
  )
}

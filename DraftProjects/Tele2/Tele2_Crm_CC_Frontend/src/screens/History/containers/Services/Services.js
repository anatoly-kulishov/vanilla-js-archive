/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

import ServiceFilter from './ServiceFilter'
import ServiceGrid from './ServiceGrid'

import FiltersWrapper from '../../components/FiltersWrapper'
import { initialHistoryState } from '../../HistoryContext/constants'
import useHistoryContext from '../../HistoryContext/useHistoryContext'

export default function Services ({ serviceHistoryState, personalAccount, getServiceHistory }) {
  Services.propTypes = {
    serviceHistoryState: PropTypes.object,
    personalAccount: PropTypes.object,
    getServiceHistory: PropTypes.func
  }

  useEffect(() => {
    updateServices()
  }, [])

  const { filters, methods } = useHistoryContext()
  const { updateHistoryFilterValue } = methods

  const updateServices = () => {
    if (personalAccount) {
      const { Msisdn: msisdn, BillingBranchId: branchId } = personalAccount
      const { datePeriodStart, datePeriodFinish, serviceName } = filters
      const startDate = datePeriodStart.format('YYYY-MM-DD')
      const endDate = datePeriodFinish.format('YYYY-MM-DD')
      getServiceHistory({
        msisdn,
        branchId,
        startDate,
        endDate,
        serviceName,
        serviceStatus: null,
        message: 'История услуг'
      })
    }
  }

  const handleFiltersClear = () => {
    const { datePeriodStart, datePeriodFinish, serviceName } = initialHistoryState.filters
    updateHistoryFilterValue({
      datePeriodStart,
      datePeriodFinish,
      serviceName
    })
  }

  return (
    <Fragment>
      <FiltersWrapper>
        <ServiceFilter
          filters={filters}
          onSubmit={updateServices}
          onClear={handleFiltersClear}
          onFilterChange={updateHistoryFilterValue}
        />
      </FiltersWrapper>
      <ServiceGrid
        personalAccount={personalAccount}
        getServiceHistory={getServiceHistory}
        serviceHistoryState={serviceHistoryState}
      />
    </Fragment>
  )
}

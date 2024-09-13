/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import TariffFilters from './TariffFilters'
import TariffTable from './TariffTable'

import FiltersWrapper from '../../components/FiltersWrapper'
import useHistoryContext from '../../HistoryContext/useHistoryContext'
import { initialHistoryState, dayStartTime, dayEndTime } from '../../HistoryContext/constants'

export default function Tariff ({
  tariffHistory,
  isTariffHistoryLoading,
  fetchSubscriberTariffHistory,

  currentSubscriberMsisdn
}) {
  Tariff.propTypes = {
    tariffHistory: PropTypes.array,
    isTariffHistoryLoading: PropTypes.bool,
    fetchSubscriberTariffHistory: PropTypes.func.isRequired,

    currentSubscriberMsisdn: PropTypes.stirng
  }

  const { filters, methods } = useHistoryContext()
  const { updateHistoryFilterValue } = methods

  useEffect(() => {
    updateSubscriberTariffHistory()
  }, [])

  const updateSubscriberTariffHistory = () => {
    const { tariffDatePeriodStart, tariffDatePeriodFinish } = filters
    fetchSubscriberTariffHistory({
      msisdn: currentSubscriberMsisdn,
      ...(tariffDatePeriodStart && { beginDate: moment.utc(tariffDatePeriodStart).set(dayStartTime).format() }),
      ...(tariffDatePeriodFinish && { endDate: moment.utc(tariffDatePeriodFinish).set(dayEndTime).format() })
    })
  }

  const handleFiltersClear = () => {
    const { tariffDatePeriodStart, tariffDatePeriodFinish } = initialHistoryState.filters
    updateHistoryFilterValue({
      tariffDatePeriodStart,
      tariffDatePeriodFinish,
      msisdn: currentSubscriberMsisdn
    })
  }

  return (
    <Fragment>
      <FiltersWrapper>
        <TariffFilters
          filters={filters}
          onFilterChange={updateHistoryFilterValue}
          onSubmit={updateSubscriberTariffHistory}
          onClear={handleFiltersClear}
        />
      </FiltersWrapper>
      <TariffTable
        dataSource={tariffHistory}
        isLoading={isTariffHistoryLoading}
      />
    </Fragment>
  )
}

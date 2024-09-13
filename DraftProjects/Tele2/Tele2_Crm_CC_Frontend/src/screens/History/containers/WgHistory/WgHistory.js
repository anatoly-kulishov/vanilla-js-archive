/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import FiltersWg from './FiltersWg'
import WgGrid from './WgGrid'

import FiltersWrapper from '../../components/FiltersWrapper'
import useHistoryContext from '../../HistoryContext/useHistoryContext'
import { initialHistoryState, dayStartTime, dayEndTime } from '../../HistoryContext/constants'

export default function WgHistory ({ fetchWgHistory, wgHistory, msisdn }) {
  WgHistory.propTypes = {
    msisdn: PropTypes.string,
    fetchWgHistory: PropTypes.func,
    wgHistory: PropTypes.object
  }

  const { filters, methods } = useHistoryContext()
  const { updateHistoryFilterValue } = methods

  useEffect(() => {
    fetchWgHistory({ msisdn })
  }, [])

  const handleFiltersClear = () => {
    const { datePeriodStart, datePeriodFinish } = initialHistoryState.filters
    updateHistoryFilterValue({
      datePeriodStart,
      datePeriodFinish
    })
  }

  const onWgStatusClear = () => {
    updateHistoryFilterValue({
      wgStatus: ''
    })
  }

  const onSubmit = () => {
    const { datePeriodStart, datePeriodFinish, wgStatus } = filters
    fetchWgHistory({
      msisdn,
      status: wgStatus,
      date_from: moment.utc(datePeriodStart).set(dayStartTime).format(),
      date_to: moment.utc(datePeriodFinish).set(dayEndTime).format()
    })
  }

  return (
    <Fragment>
      <FiltersWrapper>
        <FiltersWg
          onWgStatusClear={onWgStatusClear}
          filters={filters}
          onFilterChange={updateHistoryFilterValue}
          onClear={handleFiltersClear}
          onSubmit={onSubmit}
        />
      </FiltersWrapper>
      <WgGrid wgHistory={wgHistory} />
    </Fragment>
  )
}

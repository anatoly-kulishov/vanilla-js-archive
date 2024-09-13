/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import OffersCbmTable from './OffersCbmTable'
import OffersCbmFilter from './OffersCbmFilter'
import OffersCbmModal from './OffersCbmModal'

import FiltersWrapper from '../../components/FiltersWrapper'
import useHistoryContext from '../../HistoryContext/useHistoryContext'
import { initialHistoryState, dayStartTime, dayEndTime } from '../../HistoryContext/constants'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { HISTORY_OFFERS_CBM_MODAL } from 'constants/logModalNames'

export default function OffersCbm ({
  globalMsisdn,
  offersCbmHistory,
  isOffersCbmHistoryLoading,
  getOffersCbmHistory
}) {
  OffersCbm.propTypes = {
    globalMsisdn: PropTypes.string,
    getOffersCbmHistory: PropTypes.func,
    isOffersCbmHistoryLoading: PropTypes.bool,
    offersCbmHistory: PropTypes.arrayOf(PropTypes.object)
  }

  const { filters, methods } = useHistoryContext()
  const { updateHistoryFilterValue } = methods

  const [offerCbm, setOfferCbm] = useState(null)
  const [isModalToggled, setIsModalToggled] = useState(false)

  const updateOffersCbm = () => {
    const { msisdn, cbmDatePeriodStart, cbmDatePeriodFinish } = filters

    getOffersCbmHistory({
      msisdn: msisdn || globalMsisdn,
      startDate: moment.utc(cbmDatePeriodStart).set(dayStartTime).format(),
      endDate: moment.utc(cbmDatePeriodFinish).set(dayEndTime).format()
    })
  }

  const handleFiltersClear = () => {
    const { cbmDatePeriodStart, cbmDatePeriodFinish } = initialHistoryState.filters
    updateHistoryFilterValue({
      msisdn: globalMsisdn,
      cbmDatePeriodStart,
      cbmDatePeriodFinish
    })

    getOffersCbmHistory({
      msisdn: globalMsisdn,
      startDate: moment.utc(cbmDatePeriodStart).set(dayStartTime).format(),
      endDate: moment.utc(cbmDatePeriodFinish).set(dayEndTime).format()
    })
  }

  const onMsisdnClear = () => {
    updateHistoryFilterValue({
      msisdn: ''
    })
  }

  const openModal = record => {
    setOfferCbm(record)
    setIsModalToggled(true)
    logIfEnabled({ type: MODAL_OPEN, log: HISTORY_OFFERS_CBM_MODAL })
  }

  const closeModal = () => {
    setIsModalToggled(false)
    setOfferCbm(null)
    logIfEnabled({ type: MODAL_CLOSE, log: HISTORY_OFFERS_CBM_MODAL })
  }

  useEffect(() => {
    const { msisdn } = filters
    if (!msisdn) {
      updateHistoryFilterValue({ msisdn: globalMsisdn })
    }
    updateOffersCbm()
  }, [])

  return (
    <Fragment>
      <OffersCbmModal
        record={offerCbm}
        closeModal={closeModal}
        isToggled={isModalToggled}
      />
      <FiltersWrapper>
        <OffersCbmFilter
          filters={filters}
          onSubmit={updateOffersCbm}
          onClear={handleFiltersClear}
          onFilterChange={updateHistoryFilterValue}
          onMsisdnClear={onMsisdnClear}
        />
      </FiltersWrapper>
      <OffersCbmTable
        history={offersCbmHistory}
        isLoading={isOffersCbmHistoryLoading}
        openModal={openModal}
      />
    </Fragment>
  )
}

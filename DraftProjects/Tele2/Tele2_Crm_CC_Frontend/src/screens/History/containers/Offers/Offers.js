/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState, useEffect } from 'react'
import { Spin, Button, Modal } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import LoadingSpinner from 'components/LoadingSpinner'
import OffersFilters from './OffersFilters'
import OffersGrid from './OffersGrid'
import OffersModalContent from './OffersModalContent'

import FiltersWrapper from '../../components/FiltersWrapper'
import useHistoryContext from '../../HistoryContext/useHistoryContext'
import { initialHistoryState, dayStartTime, dayEndTime } from '../../HistoryContext/constants'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { HISTORY_OFFERS_MODAL } from 'constants/logModalNames'

export default function Offers ({
  personalAccount,
  offersHistory,
  isOffersHistoryLoading,
  getOffersHistory
}) {
  Offers.propTypes = {
    personalAccount: PropTypes.objectOf(
      PropTypes.shape({
        Msisdn: PropTypes.string
      })
    ),
    offersHistory: PropTypes.arrayOf(
      PropTypes.object
    ),
    isOffersHistoryLoading: PropTypes.bool,
    getOffersHistory: PropTypes.func
  }

  const { filters, methods } = useHistoryContext()
  const { updateHistoryFilterValue } = methods

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [offer, setOffer] = useState(null)

  const updateOffers = () => {
    const { msisdn, offerName, datePeriodStart, datePeriodFinish } = filters

    getOffersHistory({
      msisdn: msisdn || personalAccount.Msisdn,
      startDate: moment.utc(datePeriodStart).set(dayStartTime).format(),
      endDate: moment.utc(datePeriodFinish).set(dayEndTime).format(),
      name: offerName
    })
  }

  const handleFiltersClear = () => {
    const { Msisdn: msisdn } = personalAccount
    const { datePeriodStart, datePeriodFinish, offerName } = initialHistoryState.filters
    updateHistoryFilterValue({
      msisdn,
      offerName,
      datePeriodStart,
      datePeriodFinish
    })

    getOffersHistory({
      msisdn,
      startDate: moment.utc(datePeriodStart).set(dayStartTime).format(),
      endDate: moment.utc(datePeriodFinish).set(dayEndTime).format(),
      name: offerName
    })
  }

  const onClickRemove = () => {
    updateHistoryFilterValue({
      msisdn: ''
    })
  }

  const onModalOpen = record => {
    setOffer(record)
    setIsModalOpen(true)
    logIfEnabled({ type: MODAL_OPEN, log: HISTORY_OFFERS_MODAL })
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setOffer(null)
    logIfEnabled({ type: MODAL_CLOSE, log: HISTORY_OFFERS_MODAL })
  }

  useEffect(() => {
    const { msisdn } = filters
    if (!msisdn) {
      updateHistoryFilterValue({ msisdn: personalAccount.Msisdn })
    }
    updateOffers()
  }, [])

  return (
    <Fragment>
      <FiltersWrapper>
        <OffersFilters
          filters={filters}
          onFilterChange={updateHistoryFilterValue}
          onSubmit={updateOffers}
          onClear={handleFiltersClear}
          onClickRemove={onClickRemove}
        />
      </FiltersWrapper>
      <Spin indicator={<LoadingSpinner spin />} spinning={isOffersHistoryLoading}>
        <OffersGrid history={offersHistory} onModalOpen={onModalOpen} />
      </Spin>
      <StyledModal
        title='Предложение'
        visible={isModalOpen}
        onCancel={onCloseModal}
        footer={
          <Button type='primary' onClick={onCloseModal}>
            Закрыть
          </Button>
        }
      >
        {offer && <OffersModalContent offer={offer} />}
      </StyledModal>
    </Fragment>
  )
}

const StyledModal = styled(Modal)`
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

/* eslint-disable id-length */
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Modal, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import TariffFilters from 'screens/History/containers/Tariff/TariffFilters'
import TariffTable from 'screens/History/containers/Tariff/TariffTable'

import { initialHistoryState, dayStartTime, dayEndTime } from 'screens/History/HistoryContext/constants'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { RARIFF_HISTORY_MODAL } from 'constants/logModalNames'

const { Group: ButtonGroup } = Button
const scrollY = { y: 400 }

export default function TariffHistoryModal ({
  isVisible,
  onClose,

  tariffHistory,
  isTariffHistoryLoading,
  fetchSubscriberTariffHistory,
  currentSubscriberMsisdn
}) {
  TariffHistoryModal.propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,

    tariffHistory: PropTypes.array,
    isTariffHistoryLoading: PropTypes.bool,
    fetchSubscriberTariffHistory: PropTypes.func.isRequired,
    currentSubscriberMsisdn: PropTypes.string.isRequired
  }

  const {
    filters: { tariffDatePeriodStart: initialDatePeriodStart, tariffDatePeriodFinish: initialDatePeriodFinish }
  } = initialHistoryState

  const [filters, setFilters] = useState({
    tariffDatePeriodStart: initialDatePeriodStart,
    tariffDatePeriodFinish: initialDatePeriodFinish
  })

  useEffect(() => {
    onSearch()
  }, [])

  const handleCloseModal = useCallback(() => {
    onClose()
    logIfEnabled({ type: MODAL_CLOSE, log: RARIFF_HISTORY_MODAL })
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      logIfEnabled({ type: MODAL_OPEN, log: RARIFF_HISTORY_MODAL })
    }
  }, [isVisible])

  const onSearch = useCallback(() => {
    const { tariffDatePeriodStart, tariffDatePeriodFinish } = filters
    fetchSubscriberTariffHistory({
      msisdn: currentSubscriberMsisdn,
      beginDate: moment.utc(tariffDatePeriodStart).set(dayStartTime).format(),
      endDate: moment.utc(tariffDatePeriodFinish).set(dayEndTime).format()
    })
  }, [tariffHistory])

  const handleFiltersChange = useCallback(
    ({ tariffDatePeriodStart, tariffDatePeriodFinish }) => {
      setFilters(currentFiltersState => ({
        ...currentFiltersState,
        tariffDatePeriodStart: tariffDatePeriodStart ?? currentFiltersState.tariffDatePeriodStart,
        tariffDatePeriodFinish: tariffDatePeriodFinish ?? currentFiltersState.tariffDatePeriodFinish
      }))
    },
    [filters]
  )

  const handleFiltersClear = useCallback(() => {
    setFilters(currentFiltersState => ({
      ...currentFiltersState,
      tariffDatePeriodStart: initialDatePeriodStart,
      tariffDatePeriodFinish: initialDatePeriodFinish
    }))
  }, [filters])

  return (
    <Wrapper width={'100%'} visible={isVisible} closeIcon={<CloseOutlined onClick={handleCloseModal} />} footer={null}>
      <FiltersWrapper>
        <TariffFilters onFilterChange={handleFiltersChange} filters={filters} />
        <ButtonGroup>
          <Button type='primary' onClick={onSearch}>
            Найти
          </Button>
          <Button onClick={handleFiltersClear}>Очистить</Button>
        </ButtonGroup>
      </FiltersWrapper>
      <TariffTable dataSource={tariffHistory} scroll={scrollY} isLoading={isTariffHistoryLoading} />
    </Wrapper>
  )
}

const Wrapper = styled(Modal)`
  padding: 0 10px;
  & .ant-modal-body {
    > div > :first-child {
      padding: 10px 0;
    }
  }
`

const FiltersWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`

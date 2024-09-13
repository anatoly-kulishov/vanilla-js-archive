import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

import { getPersonalAccountState } from 'selectors/index'
import { selectEndDate, selectStartDate } from '../../selectors'
import { changeStepStructureOfExpenses, getUrlStructureOfExpenses } from '../../reducer'

import * as moment from 'moment'
import { StructureOfExpensesStep } from '../../helpers'
import { formatDatesRange, getDisabledEndDate, getDisabledStartDate } from './helpers'
import { Button, DatePicker } from 'webseller/components'
import { DateFormat } from 'webseller/constants'

const PeriodSelection = () => {
  const startDateInStore = useSelector(selectStartDate)
  const endDateInStore = useSelector(selectEndDate)
  const startDate = startDateInStore
    ? moment(startDateInStore)
    : moment().startOf('month').startOf('day')
  const endDate = endDateInStore
    ? moment(endDateInStore)
    : moment()

  const [dateRange, setDateRange] = useState([startDate, endDate])
  const [startDateCurrent, endDateCurrent] = dateRange

  const dispatch = useDispatch()

  const { SubscriberFullInfo } = useSelector(getPersonalAccountState)
  const activationDate = SubscriberFullInfo?.SubscriberInfo?.ActivationDate

  const disabledStartDate = getDisabledStartDate(activationDate)
  const disabledEndDate = getDisabledEndDate(startDateCurrent, activationDate)

  const onChangeStartDate = startDate => {
    const startDatePlusThreeMonths = startDate.clone().add(3, 'months')

    if (endDateCurrent.isAfter(startDatePlusThreeMonths)) {
      const endDate = startDate.clone().add(3, 'months').subtract(1, 'day').endOf('day')
      setDateRange([startDate, endDate])
    } else setDateRange([startDate, endDateCurrent])
  }
  const onChangeEndDate = endDate => {
    const isToday = endDate.isSame(moment(), 'day')
    endDate = isToday ? moment() : endDate.endOf('day')
    setDateRange([startDateCurrent, endDate])
  }

  const goForward = () => {
    dispatch(getUrlStructureOfExpenses(formatDatesRange(dateRange)))
  }
  const goBack = () => dispatch(changeStepStructureOfExpenses(StructureOfExpensesStep.TYPE_OF_DETAILING))

  return (
    <Container>
      <Info>
        Укажите период для свода расходов с точностью до одного дня. Минимальный интервал - 1 день, максимальный - 3
        месяца. Свод расходов доступен за период до трех лет.
      </Info>
      <DateWrapper>
        <span>с</span>
        <DatePicker
          value={startDateCurrent}
          format={DateFormat.VIEW_DATE}
          disabledDate={disabledStartDate}
          onChange={onChangeStartDate}
        />
        <span>по</span>
        <DatePicker
          value={endDateCurrent}
          format={DateFormat.VIEW_DATE}
          disabledDate={disabledEndDate}
          onChange={onChangeEndDate}
        />
      </DateWrapper>
      <Footer>
        <Button onClick={goBack}>Назад</Button>
        <Button type='primary' onClick={goForward}>
          Получить файл
        </Button>
      </Footer>
    </Container>
  )
}

export default PeriodSelection

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 80%;
  max-width: 600px;
`

const Info = styled.p`
  font-size: 14px;
  text-align: center;
`

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

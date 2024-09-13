import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Radio, DatePicker, Button } from 'antd'
import styled from 'styled-components'
import * as moment from 'moment'

const { RangePicker, MonthPicker } = DatePicker

const filterOptionsMap = {
  month: { value: 'Месяц' },
  dates: { value: 'Даты' },
  wholeTime: { value: 'Все время' }
}

const VIEW_DATE_FORMAT = 'DD.MM.YYYY'
const TRANSPORT_DATE_FORMAT = 'YYYY-MM-DD'

const initDatesRange = () => {
  return {
    dateFrom: moment().startOf('month'),
    dateTo: moment()
  }
}

const formatDatesRange = datesRange => {
  const { dateFrom, dateTo } = datesRange

  if (!dateFrom || !dateTo) {
    return datesRange
  }

  return {
    dateFrom: moment(dateFrom).format(TRANSPORT_DATE_FORMAT),
    dateTo: moment(dateTo).format(TRANSPORT_DATE_FORMAT)
  }
}

const Filters = ({ findHandler }) => {
  const [filtersType, setFilterType] = useState(filterOptionsMap.dates.value)
  const [datesRange, setDatesRange] = useState(initDatesRange)

  useLayoutEffect(() => {
    if (filtersType === filterOptionsMap.wholeTime.value) {
      setDatesRange({
        dateFrom: moment('2023-01-01', TRANSPORT_DATE_FORMAT),
        dateTo: moment()
      })
      return
    }

    setDatesRange(initDatesRange())
  }, [filtersType])

  useEffect(() => {
    const formattedDatesRange = formatDatesRange(datesRange)
    findHandler(formattedDatesRange)
  }, [])

  const onChangeFilterType = e => {
    const newFilterType = e.target.value
    setFilterType(newFilterType)
  }

  const onChangeRangePicker = ([dateFrom, dateTo]) => {
    setDatesRange({
      dateFrom,
      dateTo
    })
  }

  const onChangeMonthPicker = date => {
    setDatesRange({
      dateFrom: moment(date).startOf('month'),
      dateTo: moment(date).endOf('month')
    })
  }

  const onClickFind = () => {
    const formattedDatesRange = formatDatesRange(datesRange)
    findHandler(formattedDatesRange)
  }

  const disableDate = date => date.isBefore(moment('2023-01-01', TRANSPORT_DATE_FORMAT)) || date.isAfter(moment())

  return (
    <Container>
      {filtersType === filterOptionsMap.dates.value && (
        <RangePicker
          value={[datesRange.dateFrom, datesRange.dateTo]}
          onChange={onChangeRangePicker}
          format={VIEW_DATE_FORMAT}
          autoFocus={false}
          allowClear={false}
          disabledDate={disableDate}
        />
      )}
      {filtersType === filterOptionsMap.month.value && (
        <MonthPicker
          value={datesRange.dateFrom}
          onChange={onChangeMonthPicker}
          format='MMMM'
          allowClear={false}
          disabledDate={disableDate}
        />
      )}
      {filtersType === filterOptionsMap.wholeTime.value && <>История обслуживания за весь период</>}
      <Radio.Group defaultValue={filterOptionsMap.dates.value} onChange={onChangeFilterType}>
        {Object.entries(filterOptionsMap).map(([key, { value }]) => (
          <Radio.Button key={key} value={value}>
            {value}
          </Radio.Button>
        ))}
      </Radio.Group>
      <Button type='primary' onClick={onClickFind}>
        Найти
      </Button>
    </Container>
  )
}

export default Filters

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding-right: 10px;
`

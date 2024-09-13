import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Radio, DatePicker } from 'antd'
import styled from 'styled-components'
import * as moment from 'moment'

import { DateFormat } from 'webseller/constants'

const { RangePicker, MonthPicker } = DatePicker

const filterOptionsMap = {
  month: { value: 'Месяц' },
  dates: { value: 'Даты' },
  wholeTime: { value: 'Все время' }
}

const VIEW_DATE_FORMAT = DateFormat.VIEW_DATE
const TRANSPORT_DATE_FORMAT = DateFormat.VIEW_DATE_DASH
const START_DATE = '2023-01-01'

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
    dateFrom: moment(dateFrom).utc().format(),
    dateTo: moment(dateTo).utc().format()
  }
}

const Filters = ({ findHandler }) => {
  const [filtersType, setFilterType] = useState(filterOptionsMap.dates.value)
  const [datesRange, setDatesRange] = useState(initDatesRange)

  useLayoutEffect(() => {
    if (filtersType === filterOptionsMap.wholeTime.value) {
      const params = {
        dateFrom: moment().subtract(3, 'months'),
        dateTo: moment()
      }
      onFindHandler(params)
      return
    }
    if (filtersType === filterOptionsMap.month.value) {
      const params = {
        dateFrom: moment().startOf('month'),
        dateTo: moment().endOf('month')
      }
      onFindHandler(params)
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
    const params = {
      dateFrom,
      dateTo
    }
    onFindHandler(params)
  }

  const onChangeMonthPicker = date => {
    const params = {
      dateFrom: moment(date).startOf('month'),
      dateTo: moment(date).endOf('month')
    }
    onFindHandler(params)
  }

  const onFindHandler = (datesRange) => {
    setDatesRange(datesRange)
    const formattedDatesRange = formatDatesRange(datesRange)
    findHandler(formattedDatesRange)
  }

  const disableDate = date => date.isBefore(moment(START_DATE, TRANSPORT_DATE_FORMAT)) || date.isAfter(moment())

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
          format={DateFormat.FULL_MONTH}
          allowClear={false}
          disabledDate={disableDate}
        />
      )}
      {filtersType === filterOptionsMap.wholeTime.value && <>История продаж за весь период</>}
      <Radio.Group defaultValue={filterOptionsMap.dates.value} onChange={onChangeFilterType}>
        {Object.entries(filterOptionsMap).map(([key, { value }]) => (
          <Radio.Button key={key} value={value}>
            {value}
          </Radio.Button>
        ))}
      </Radio.Group>
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

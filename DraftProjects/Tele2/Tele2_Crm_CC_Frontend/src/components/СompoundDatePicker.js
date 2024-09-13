/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import moment from 'moment'

import { DatePicker, TimePicker } from 'antd'
import { dateFormat } from 'screens/History/HistoryContext/constants'

const defaultDayFromValue = moment()
const defaultDayToValue = moment()

export default function CompoundDatePicker ({
  dayFormat = 'DD.MM.YYYY',
  timeFormat = 'HH:mm',
  fromLabelText = 'Начало периода',
  toLabelText = 'Окончание периода',
  onChange,
  defaultTimeFromValue = moment('00:00', 'HH:mm'),
  defaultTimeToValue = moment('23:59', 'HH:mm')

}) {
  CompoundDatePicker.propTypes = {
    timeFormat: PropTypes.string,
    dayFormat: PropTypes.string,

    fromLabelText: PropTypes.string,
    toLabelText: PropTypes.string,

    onChange: PropTypes.func.isRequired,

    defaultTimeFromValue: PropTypes.instanceOf(moment),
    defaultTimeToValue: PropTypes.instanceOf(moment)
  }

  const [dayRange, setDayRange] = useState({
    from: {
      value: defaultDayFromValue,
      get toString () {
        return defaultDayFromValue.format(dayFormat)
      }
    },
    to: {
      value: defaultDayToValue,
      get toString () {
        return defaultDayToValue.format(dayFormat)
      }
    }
  })
  const [timeRange, setTimeRange] = useState({
    from: {
      value: defaultTimeFromValue,
      get toString () {
        return defaultTimeFromValue.format(timeFormat)
      }
    },
    to: {
      value: defaultTimeToValue,
      get toString () {
        return defaultTimeToValue.format(timeFormat)
      }
    }
  })

  useEffect(() => {
    const from = moment(`${dayRange.from.toString} ${timeRange.from.toString}`, `${dateFormat} ${timeFormat}`)
    const to = moment(`${dayRange.to.toString} ${timeRange.to.toString}`, `${dateFormat} ${timeFormat}`)
    onChange(from, to)
  }, [dayRange.from, dayRange.to, timeRange.from, timeRange.to])

  return (
    <Wrapper>
      <DatePeriod>
        <RangeLabel htmlFor='date-range-from'>{fromLabelText}</RangeLabel>
        <DatePicker
          id='date-range-from'
          allowClear={false}
          defaultValue={defaultDayFromValue}
          format={dayFormat}
          onChange={(day, dayString) =>
            setDayRange(currentDayRange => ({
              ...currentDayRange,
              from: {
                value: day,
                get toString () {
                  return dayString
                }
              }
            }))
          }
        />
        <StyledTimePicker
          placeholder={null}
          id='time-range-from'
          allowClear={false}
          defaultValue={defaultTimeFromValue}
          suffixIcon={null}
          format={timeFormat}
          onChange={(time, timeString) =>
            setTimeRange(currentTimeRange => ({
              ...currentTimeRange,
              from: {
                value: time,
                get toString () {
                  return timeString
                }
              }
            }))
          }
        />
      </DatePeriod>
      <DatePeriod>
        <RangeLabel htmlFor='date-range-to'>{toLabelText}</RangeLabel>
        <DatePicker
          id='date-range-to'
          allowClear={false}
          defaultValue={defaultDayToValue}
          format={dayFormat}
          onChange={(day, dayString) =>
            setDayRange(currentDayRange => ({
              ...currentDayRange,
              to: {
                value: day,
                get toString () {
                  return dayString
                }
              }
            }))
          }
        />
        <StyledTimePicker
          placeholder={null}
          id='time-range-to'
          allowClear={false}
          defaultValue={defaultTimeToValue}
          suffixIcon={null}
          format={timeFormat}
          onChange={(time, timeString) =>
            setTimeRange(currentTimeRange => ({
              ...currentTimeRange,
              to: {
                value: time,
                get toString () {
                  return timeString
                }
              }
            }))
          }
        />
      </DatePeriod>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  > :not(:last-child) {
    margin-right: 20px;
  }
`

const DatePeriod = styled.div`
  > :not(:last-child) {
    margin-right: 10px;
  }
`

const RangeLabel = styled.label`
  display: block;
  color: rgba(0, 0, 0, 0.85);
  margin: 0;
`

const StyledTimePicker = styled(TimePicker)`
  width: 62px;
`

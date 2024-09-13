import React, { useCallback } from 'react'
import { DatePicker, Form, Row, Select } from 'antd'
import { isNil } from 'lodash-es'
import styled from 'styled-components'

import { findTimeSlotByDate, getTimeSlotDateAndInterval } from 'components/Broadband/helpers/timeslots'
import CopyTimeSlotButton from './CopyTimeSlotButton'

const TimeslotFormFields = props => {
  const { timeslotsData, form, onOpenChange, isTimeSlotDateDisabled, isTimeSlotTimeDisabled } = props

  const handleOpenChange = useCallback(
    isOpen => {
      onOpenChange?.(isOpen)
    },
    [onOpenChange]
  )

  const getDisableDate = useCallback(
    current => {
      const timeslot = findTimeSlotByDate(timeslotsData?.Timeslots, current)

      return current && !timeslot
    },
    [timeslotsData]
  )

  const getAvailableCount = useCallback(
    (timeslotDate, timeslotTime) => {
      const { timeSlotInterval } = getTimeSlotDateAndInterval(timeslotsData?.Timeslots, timeslotDate, timeslotTime)

      return timeSlotInterval?.Count
    },
    [form, timeslotsData]
  )

  const shouldUpdate = useCallback((prev, cur) => prev?.TimeSlotDate !== cur?.TimeSlotDate, [])
  const availableCountShouldUpdate = useCallback(
    (prev, cur) => prev?.TimeSlotDate !== cur?.TimeSlotDate || prev?.TimeSlotTime !== cur?.TimeSlotTime,
    []
  )
  const getPopupContainer = useCallback(trigger => trigger.parentNode, [])

  return (
    <>
      <StyledFormItem name='TimeSlotDate' label='Дата'>
        <StyledDatePicker
          format='DD.MM.YYYY'
          disabled={isTimeSlotDateDisabled}
          data-tid='datepicker__broadband-form__timeslot'
          disabledDate={getDisableDate}
          onOpenChange={handleOpenChange}
          getPopupContainer={getPopupContainer}
        />
      </StyledFormItem>
      <StyledFormItem noStyle shouldUpdate={shouldUpdate}>
        {() => {
          const timeSlotDate = form.getFieldValue('TimeSlotDate')
          const selectedDateItem = findTimeSlotByDate(timeslotsData?.Timeslots, timeSlotDate)
          const timeSlotIntervalOptions = selectedDateItem?.Intervals?.map(interval => ({
            key: interval?.Id,
            value: interval?.Id,
            label: interval?.TimeSlotTime + ' - ' + interval?.TimeSlotTimeEnd
          }))
          const areTimeSlotsExist = selectedDateItem && timeSlotIntervalOptions?.length

          return (
            <div>
              <TimeSlotTimeWrapper>
                <StyledFormItem name='TimeSlotTime' label='Время'>
                  <Select
                    placeholder='Выберите время'
                    data-tid='select__broadband-form__timeslot'
                    disabled={isNil(selectedDateItem) || isTimeSlotTimeDisabled}
                    options={timeSlotIntervalOptions}
                  />
                </StyledFormItem>
                {areTimeSlotsExist ? (
                  <CopyTimeSlotButtonWrapper>
                    <CopyTimeSlotButton timeSlotOptions={timeSlotIntervalOptions} />
                  </CopyTimeSlotButtonWrapper>
                ) : null}
              </TimeSlotTimeWrapper>
            </div>
          )
        }}
      </StyledFormItem>
      <AvailableWrapper>
        <StyledFormItem noStyle shouldUpdate={availableCountShouldUpdate}>
          {() => {
            const timeSlotDate = form.getFieldValue('TimeSlotDate')
            const timeSlotTime = form.getFieldValue('TimeSlotTime')

            return (
              <StyledFormItem label='Доступно' shouldUpdate={availableCountShouldUpdate}>
                <AvailableCount>{getAvailableCount(timeSlotDate, timeSlotTime)}</AvailableCount>
              </StyledFormItem>
            )
          }}
        </StyledFormItem>
      </AvailableWrapper>
    </>
  )
}

export default TimeslotFormFields

const AvailableWrapper = styled.div`
  width: 100%;
`

const AvailableCount = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding-left: 8px;
  line-height: 30px;
  min-height: 30px;
`

const StyledFormItem = styled(Form.Item)`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 0px;
`

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`

const TimeSlotTimeWrapper = styled(Row)`
  flex-wrap: nowrap;
  column-gap: 5px;
`

const CopyTimeSlotButtonWrapper = styled(Form.Item)`
  margin-top: auto;
  margin-bottom: 0px;
`

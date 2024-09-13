import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as moment from 'moment'

import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import * as WebSellerKit from 'webseller/components'

import { getTransferEarliestTimeSlot, getTransferTimeSlots, submitTransferTimeSlot } from '../actions'
import {
  selectIsTransferEarliestTimeSlotLoading,
  selectIsTransferTimeSlotsLoading,
  selectSubmittedTransferTimeSlot,
  selectTransferEarliestTimeSlot,
  selectTransferTimeSlots
} from '../selectors'

const { Title, DatePicker, Button } = WebSellerKit

export default function TransferTimeStep ({
  toNextStep,
  toPrevStep,
  transferNumberOld
}) {
  const dispatch = useDispatch()

  const isEarliestTimeSlotLoading = useSelector(selectIsTransferEarliestTimeSlotLoading)
  const isTimeSlotsLoading = useSelector(selectIsTransferTimeSlotsLoading)
  const earliestTimeSlot = useSelector(selectTransferEarliestTimeSlot)
  const currentTimeSlot = useSelector(selectSubmittedTransferTimeSlot)
  const timeSlots = useSelector(selectTransferTimeSlots)

  const [date, setDate] = useState(() => (currentTimeSlot ? moment(currentTimeSlot, 'YYYY-MM-DDTHH:mm') : undefined))
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)

  const refDatePicker = useRef(null)

  useEffect(() => {
    dispatch(getTransferEarliestTimeSlot(transferNumberOld))
  }, [])

  useLayoutEffect(() => {
    if (earliestTimeSlot && !currentTimeSlot) {
      setDate(moment(earliestTimeSlot))
    }
  }, [earliestTimeSlot])

  const disabledDate = date => {
    const minDate = moment().add(8, 'day')
    const maxDate = moment().add(188, 'day')

    return date.isBefore(minDate) || date.isAfter(maxDate)
  }

  const openDatePicker = () => {
    setIsOpenDatePicker(true)
  }

  const closeDatePicker = () => {
    setIsOpenDatePicker(false)
  }

  const onSelectDate = date => {
    const newDate = moment(date)
    dispatch(getTransferTimeSlots({ newDate, transferNumberOld }))
  }

  const onChangeDate = date => {
    const newDate = moment(date)
    setDate(newDate)
  }

  const onSelectTime = event => {
    const selectedTime = event.target.dataset.time
    setDate(moment(selectedTime))
    setIsOpenDatePicker(false)
    refDatePicker.current?.blur()
  }

  const onSubmitTimeSlot = () => {
    const formattedDate = moment(date).format('YYYY-MM-DDTHH:mm')
    dispatch(submitTransferTimeSlot(formattedDate))
    toNextStep()
  }

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Когда выполнить переход?
      </Title>
      <Main>
        <Info>
          <Title>Уточни у клиента желаемую дату и время переноса.</Title>
          <Title>Минимальный срок переноса - 8 дней.</Title>
        </Info>
        <DatePickerStyled
          inputRef={refDatePicker}
          open={isOpenDatePicker}
          format='DD MMMM YYYY, HH:mm'
          placeholder='Дата и время переноса'
          value={date}
          disabled={isEarliestTimeSlotLoading}
          disabledDate={disabledDate}
          showToday={false}
          dropdownAlign={{ offset: [395, -290] }}
          panelRender={original => (
            <Fragment>
              {original}
              <TimePanel>
                <Title bold>Доступное время на {moment(date).format('DD MMMM')}</Title>
                <div onClick={onSelectTime}>
                  {timeSlots?.map(slot => (
                    <button key={slot} data-time={slot}>
                      {moment(slot).format('HH:mm')}
                    </button>
                  ))}
                </div>
              </TimePanel>
            </Fragment>
          )}
          onFocus={openDatePicker}
          onBlur={closeDatePicker}
          onChange={onChangeDate}
          onSelect={onSelectDate}
        />
      </Main>
      <Footer>
        <Button onClick={toPrevStep}>Назад</Button>
        <Button
          type='primary'
          loading={isEarliestTimeSlotLoading || isTimeSlotsLoading}
          disabled={!date}
          onClick={onSubmitTimeSlot}
        >
          Далее
        </Button>
      </Footer>
    </Container>
  )
}

TransferTimeStep.propTypes = {
  toNextStep: PropTypes.func,
  toPrevStep: PropTypes.func,
  transferNumberOld: PropTypes.string
}

const Container = styled.div`
  width: 60%;
  max-width: 600px;
`

const Main = styled.div`
  margin: 24px 0;
`

const Info = styled.div`
  margin-bottom: 25px;
`

const DatePickerStyled = styled(DatePicker)`
  width: 100%;
`

const TimePanel = styled.div`
  width: 280px;
  padding: 16px;

  & > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;

    & > button {
      width: 77px;
      border: 1px solid #e7e7e7;
      border-radius: 16px;
      padding: 10px;
      font-family: T2_Rooftop_Regular;
      font-size: 12px;
      line-height: normal;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        background: rgba(63, 203, 255, 0.1);
      }
    }
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

import React, { useState, useCallback } from 'react'
import { Button, Form } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import { func, string, bool } from 'prop-types'
import debounce from 'lodash/debounce'
import DateConfirm from './hocs/DateConfirm'

const formItemShouldUpdate = (prevValues, curValues) => (
  prevValues.sum !== curValues.sum ||
  prevValues.package !== curValues.package
)

const CompensationsFooter = props => {
  const {
    onConfirm,
    confirmTitle,
    isSubmitDisabled,
    isLoading
  } = props

  const [isPendingOrder, setIsPendingOrder] = useState(false)
  const [targetOrderDate, setTargetOrderDate] = useState(null)

  const handleChangeDatePicker = useCallback(value => {
    setTargetOrderDate(moment.utc(value).format())
    setIsPendingOrder(true)
  })

  const disabledDate = useCallback(currentDate => {
    return currentDate && (currentDate < moment().startOf('days') || currentDate > moment().add(3, 'month'))
  }, [])

  const disabledTime = useCallback(date => {
    const range = (start, end) => {
      const result = []
      for (let idx = start; idx < end; idx++) {
        result.push(idx)
      }
      return result
    }

    if (moment().isSame(date, 'days')) {
      return {
        disabledHours: () => range(0, moment().get('hour')),
        disabledMinutes: selectedHour => {
          if (selectedHour === moment().get('hour')) {
            return range(0, moment().get('minute') + 1)
          }
          return []
        }
      }
    }
    const threeMonthLater = moment().add(3, 'month')
    if (threeMonthLater.isSame(date, 'days')) {
      return {
        disabledHours: () => range(threeMonthLater.get('hour') + 1, 24),
        disabledMinutes: selectedHour => {
          if (selectedHour === threeMonthLater.get('hour')) {
            return range(threeMonthLater.get('minute') + 1, 60)
          }
          return []
        }
      }
    }
    return {}
  }, [])

  const onConfirmHandle = debounce(
    event => {
      event.stopPropagation()
      onConfirm(targetOrderDate)
    },
    1000,
    { leading: true, trailing: false }
  )

  const handleClick = useCallback(() => {
    setTargetOrderDate(null)
    setIsPendingOrder(false)
  }, [setTargetOrderDate, setIsPendingOrder])

  return (
    <Form.Item noStyle shouldUpdate={formItemShouldUpdate}>
      {() => {
        return (
          <Wrapper>
            <DateConfirm
              isSubmitDisabled={isSubmitDisabled}
              confirmTitle={confirmTitle}
              isPendingOrder={isPendingOrder}
              handleClick={handleClick}
              disabledDate={disabledDate}
              disabledTime={disabledTime}
              handleChangeDatePicker={handleChangeDatePicker}
              onConfirmHandle={onConfirmHandle}
            >
              <StyledButton type='primary' disabled={isSubmitDisabled} loading={isLoading}>
                Начислить
              </StyledButton>
            </DateConfirm>
          </Wrapper>
        )
      }}
    </Form.Item>
  )
}

CompensationsFooter.propTypes = {
  onConfirm: func.isRequired,
  confirmTitle: string,
  isSubmitDisabled: bool,
  isLoading: bool
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 15px;
`
const StyledButton = styled(Button)`
  width: 120px;
`
export default CompensationsFooter

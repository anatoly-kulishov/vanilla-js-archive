/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Popconfirm, DatePicker, Button } from 'antd'

export default function DateConfirm (props) {
  const {
    children,

    isSubmitDisabled,
    confirmTitle,
    isPendingOrder,
    handleClick,
    disabledDate,
    disabledTime,

    handleChangeDatePicker,
    onConfirmHandle
  } = props

  const showTime = { defaultValue: moment('00:00:00', 'HH:mm:ss') }

  return (
    <Popconfirm
      placement='topRight'
      disabled={isSubmitDisabled}
      title={
        <Fragment>
          <Title>{confirmTitle}</Title>
          <ButtonWrapper
            isPendingOrder={isPendingOrder}
            onClick={handleClick}
          >
            Сейчас
          </ButtonWrapper>
          <DateLabel isPendingOrder={isPendingOrder}>на дату</DateLabel>
          <StyleDatePicker
            isPendingOrder={isPendingOrder}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
            onChange={handleChangeDatePicker}
            format='YYYY-MM-DD HH:mm:ss'
            showTime={showTime}
          />
        </Fragment>
      }
      onConfirm={onConfirmHandle}
      okText='Да'
      cancelText='Нет'
    >
      {children}
    </Popconfirm>
  )
}

const Title = styled.div`
  color: #000;
  font-family: T2HalvarBreit_ExtraBold;
`
const DateLabel = styled.span`
  margin: 0 15px;
  color: ${props => (props.isPendingOrder ? '#40bfee' : '#999')};
`
const StyleDatePicker = styled(DatePicker)`
  & input {
    color: ${props => (props.isPendingOrder ? 'rgba(0, 0, 0, 0.65)' : '#d9d9d9')};
  }
`
const ButtonWrapper = styled(Button)`
  margin-top: 15px;
  width: 120px;
  background: ${props => (props.isPendingOrder ? '#fff' : '#40bfee')};
  border-color: ${props => (props.isPendingOrder ? '#d9d9d9' : '#fff')};
  color: ${props => (props.isPendingOrder ? '#d9d9d9' : '#fff')};

  &:focus {
    background: ${props => (props.isPendingOrder ? '#fff' : '#40bfee')};
    border-color: ${props => (props.isPendingOrder ? '#d9d9d9' : '#fff')};
    color: ${props => (props.isPendingOrder ? '#d9d9d9' : '#fff')};
  }
`

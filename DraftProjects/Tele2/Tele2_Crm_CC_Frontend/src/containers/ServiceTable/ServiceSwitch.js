/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { Switch, notification, Popconfirm, DatePicker, Button } from 'antd'
import { disabledDate } from './ServiceTableHelper'

const ServiceSwitch = (props) => {
  const {
    record,
    changeServiceStatus,
    disableServiceLoading,
    msisdn,
    handlingId,
    disabled
  } = props

  const [isPendingOrder, setIsPendingOrder] = useState(false)
  const [targetOrderDate, setTargetOrderDate] = useState(null)

  const checkChangingStatus = !(record.AvailableServiceStatus === 'неактивна')

  const handleChangeDatePicker = value => {
    setTargetOrderDate(moment.utc(value).format())
    setIsPendingOrder(true)
  }

  const confirm = record => {
    if (record) {
      changeServiceStatus({
        msisdn,
        billingServiceId: record.BillingServiceId,
        changeOrder: 0,
        operation: 1,
        handlingId,
        targetOrderDate: isPendingOrder ? targetOrderDate : null
      })
    } else {
      notification.open({
        type: 'error',
        message: `Отключение услуги `,
        description: 'Невозможно отключить услугу, обратитесь к администратору'
      })
    }
  }

  return (
    <ServiceWrapper>
      <Popconfirm
        disabled={checkChangingStatus || !handlingId || disabled}
        placement='topLeft'
        title={
          <Fragment>
            <Title>Отключить услугу {record.ServiceName}?</Title>
            <ButtonWrapper
              isPendingOrder={isPendingOrder}
              onClick={() => setIsPendingOrder(false)}
            >
              Сейчас
            </ButtonWrapper>
            <DateLabel isPendingOrder={isPendingOrder}>на дату</DateLabel>
            <StyleDatePicker
              isPendingOrder={isPendingOrder}
              onChange={value => handleChangeDatePicker(value)}
              format='YYYY-MM-DD HH:mm:ss'
              disabledDate={disabledDate}
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            />
          </Fragment>
        }
        onConfirm={() => confirm(record)}
        okText='Да'
        cancelText='Нет'
      >
        <Switch
          onClick={() => setIsPendingOrder(false)}
          loading={disableServiceLoading}
          className='switch'
          checked
          disabled={checkChangingStatus || !handlingId || disabled}
        />
      </Popconfirm>
    </ServiceWrapper>
  )
}

export default ServiceSwitch

ServiceSwitch.propTypes = {
  record: PropTypes.object,
  changeServiceStatus: PropTypes.func,
  disableServiceLoading: PropTypes.bool,
  msisdn: PropTypes.string,
  handlingId: PropTypes.number,
  disabled: PropTypes.bool
}

const ServiceWrapper = styled.div`
  display: flex;
`
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

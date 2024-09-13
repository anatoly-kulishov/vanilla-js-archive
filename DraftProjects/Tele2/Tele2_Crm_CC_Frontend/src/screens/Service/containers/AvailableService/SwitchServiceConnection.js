/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Switch, Popconfirm, notification, Checkbox, Button, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

const showTime = { defaultValue: moment('00:00:00', 'HH:mm:ss') }

const SwitchServiceConnection = (props) => {
  SwitchServiceConnection.propTypes = {
    service: PropTypes.object,
    msisdn: PropTypes.object,
    disableServiceLoading: PropTypes.func,
    handlingId: PropTypes.object,
    changeServiceStatus: PropTypes.func,
    disabled: PropTypes.bool
  }
  const {
    service,
    msisdn,
    disableServiceLoading,
    handlingId,
    changeServiceStatus,
    disabled
  } = props
  const rubleSymbol = String.fromCharCode(8381)
  const isCheckChangingStatus = !(service.AvailableServiceStatus === 'активна')

  const [isPendingOrder, setIsPendingOrder] = useState(false)
  const [targetOrderDate, setTargetOrderDate] = useState(null)
  const [isPayment, setIsPayment] = useState(false)

  function disabledDate (current) {
    return current && current < moment().endOf('day')
  }

  function handleChangeDatePicker (value) {
    setTargetOrderDate(moment.utc(value).format())
    setIsPendingOrder(true)
  }

  const confirm = () => {
    if (service) {
      const param = {
        msisdn: msisdn,
        billingServiceId: service.BillingServiceId,
        changeOrder: isPayment ? 0 : 1,
        targetOrderDate: isPendingOrder ? targetOrderDate : null,
        operation: 0,
        handlingId
      }
      changeServiceStatus(param)
    } else {
      notification.open({
        type: 'error',
        message: 'Подключение услуги',
        description:
          'Невозможно подключить услугу, обратитесь к администратору'
      })
    }
  }

  return (
    <Fragment>
      <Popconfirm
        disabled={isCheckChangingStatus || !handlingId || disabled}
        placement='topLeft'
        title={
          <Fragment>
            <PopupTitle>Подключение услуги {service.ServiceName}</PopupTitle>
            <Wrapper marginTop='10px'>
              <span>Не списывать стоимость подключения</span>
              <Wrapper>
                <span>{service.CostOnWithTax + ' ' + rubleSymbol}</span>
                <span>
                  <CostOnCheckbox onChange={(value) => setIsPayment(value.target.checked)} />
                </span>
              </Wrapper>
            </Wrapper>
            <Wrapper marginTop='10px'>
              <span>Абонентская плата</span>
              <Wrapper>{service.SubscriptionFee + rubleSymbol}</Wrapper>
            </Wrapper>
            <Fragment>
              <ButtonWrapper isPendingOrder={isPendingOrder} onClick={() => setIsPendingOrder(false)}>Сейчас</ButtonWrapper>
              <DateLabel isPendingOrder={isPendingOrder}>на дату</DateLabel>
              <StyleDatePicker
                isPendingOrder={isPendingOrder}
                onChange={(value) => handleChangeDatePicker(value)}
                format='YYYY-MM-DD HH:mm:ss'
                disabledDate={disabledDate}
                showTime={showTime}
              />
            </Fragment>
          </Fragment>
        }
        onConfirm={() => confirm()}
        okText='Да'
        cancelText='Нет'
      >
        <Switch
          onClick={() => setIsPendingOrder(false)}
          loading={disableServiceLoading}
          className='switch'
          defaultChecked
          checked={false}
          disabled={isCheckChangingStatus || !handlingId || disabled}
        />
      </Popconfirm>
    </Fragment>
  )
}

export default SwitchServiceConnection

const CostOnCheckbox = styled(Checkbox)`
  font-weight: normal;
`

const PopupTitle = styled.div`
  font-family: T2HalvarBreit_ExtraBold;
  color: black;
`

const DateLabel = styled.span`
  margin: 0 15px;
  color: ${props => props.isPendingOrder ? '#40bfee' : '#999'};
`

const ButtonWrapper = styled(Button)`
  margin-top: 15px;
  width: 120px;
  background: ${props => props.isPendingOrder ? '#fff' : '#40bfee'};
  border-color: ${props => props.isPendingOrder ? '#d9d9d9' : '#fff'};
  color: ${props => props.isPendingOrder ? '#d9d9d9' : '#fff'};

  &:focus {
    background: ${props => props.isPendingOrder ? '#fff' : '#40bfee'};
    border-color: ${props => props.isPendingOrder ? '#d9d9d9' : '#fff'};
    color: ${props => props.isPendingOrder ? '#d9d9d9' : '#fff'};
  }
`

const StyleDatePicker = styled(DatePicker)`
  & input {
    color: ${props => props.isPendingOrder ? 'rgba(0, 0, 0, 0.65)' : '#d9d9d9'};
  }
`

const Wrapper = styled.div`
  min-width: 30%;
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.marginTop};
`

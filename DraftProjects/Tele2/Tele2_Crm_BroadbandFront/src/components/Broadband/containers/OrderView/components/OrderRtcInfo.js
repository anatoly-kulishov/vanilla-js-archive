/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/

import React, { useCallback, useMemo, useState } from 'react'
import { bool } from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Button, Input } from 'antd'

import { dateFormat } from 'constants/dateTime'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { OrderStatuses } from 'constants/orderStatuses'

const items = [
  { name: 'Идентификатор заявки', itemName: 'rtcOrderId', type: 'text', disabled: true },
  { name: 'Номер заявки в CRM РТК', itemName: 'crmOrderId', type: 'text', disabled: true },
  { name: 'Номер заявки', itemName: 'rtcOrderNum', type: 'text' },
  { name: 'Лицевой счет', itemName: 'rtcAccountNum', type: 'text' },
  { name: 'Номер наряда монтажника', itemName: 'installationOrderNum', type: 'text' },
  { name: 'Дата установки оборудования', itemName: 'factInstallationDate', type: 'date' },
  { name: 'Номер окна монтажника', itemName: 'rtcTimeslotId', type: 'text', disabled: true },
  { name: 'Старый лицевой счет', itemName: 'oldRtcAccountNumber', type: 'text', disabled: true }
]

export default function OrderRtcInfo (props) {
  const { isHidden } = props

  const { orderState, order, modifyOrder, orderStatusState } = useBroadbandContext()

  const [isEditingAvailable, setAvailability] = useState(false)
  const [oldRtcNumber, setRtcNumber] = useState(null)

  const orderRtcInfo = useMemo(
    () => ({
      rtcOrderId: orderState.RtcOrderId,
      crmOrderId: orderState.CrmOrderId,
      rtcOrderNum: order.data?.RtcOrderNum,
      rtcAccountNum: order.data?.RtcAccountNumber,
      installationOrderNum: order.data?.InstallationOrderNum,
      factInstallationDate: order.data?.FactInstallationDate,
      rtcTimeslotId: orderState.RtcTimeSlotId,
      oldRtcAccountNumber: orderState.OldRtcAccountNumber
    }),
    [orderState, order]
  )

  const getFieldValue = useCallback(
    item => {
      switch (item.type) {
        case 'date':
          const mDate = moment(orderRtcInfo[item.itemName])
          return mDate?.isValid() ? mDate.format(dateFormat) : ''
        default:
          return orderRtcInfo[item.itemName]
      }
    },
    [orderRtcInfo]
  )

  const onInputChange = (event) => {
    setRtcNumber(event.target.value)
  }

  const valueFieldRender = useCallback((item) => {
    const itemValue = getFieldValue(item)
    if (item.itemName === 'oldRtcAccountNumber') {
      return isEditingAvailable
        ? <Input defaultValue={itemValue} onChange={onInputChange} />
        : <Valuefield>{itemValue}</Valuefield>
    } else {
      return <Valuefield>{itemValue}</Valuefield>
    }
  }, [isEditingAvailable, orderRtcInfo])

  const onClick = () => setAvailability(true)

  const isButtonDisabled = useMemo(() => {
    return orderStatusState.statusId === OrderStatuses.InWork
  }, [orderStatusState])

  const handleSave = useCallback(() => {
    modifyOrder({
      OldRtcAccountNumber: oldRtcNumber || orderRtcInfo.oldRtcAccountNumber,
      OrderId: orderState.OrderId
    })
    setAvailability(false)
  }, [orderState, oldRtcNumber])

  const handleCancel = useCallback(() => {
    setAvailability(false)
    setRtcNumber(null)
  }, [])

  return (
    <div hidden={!isHidden}>
      <Wrapper>
        <Header>
          <Title>Информация по заявке РТК</Title>
          {isEditingAvailable ? (
            <div>
              <Button type='text' onClick={handleSave}>Сохранить</Button>
              <Button type='text' onClick={handleCancel}>Отменить</Button>
            </div>
          ) : (
            <Button type='text' onClick={onClick} disabled={isButtonDisabled}>Изменить</Button>
          )}
        </Header>
        <Cost>
          <FieldsWrapper>
            {items?.map(item => (
              <KeyValueField key={item.name}>
                <Field>{item.name}</Field>
                {valueFieldRender(item)}
              </KeyValueField>
            ))}
          </FieldsWrapper>
        </Cost>
      </Wrapper>
    </div>
  )
}

OrderRtcInfo.propTypes = {
  isHidden: bool
}

const Wrapper = styled.div`
  top: 0;
  z-index: 3;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  padding: 0px 21px 16px 21px;
  overflow: auto;
  border-bottom: 1px solid #f0f0f0;
`
const Cost = styled.div`
  padding: 5px 0px;
`

const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
`

const KeyValueField = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 24px;
`
const Field = styled.div`
  font-size: 12px;
`
const Valuefield = styled.div`
  color: #000;
  font-size: 13px;
  min-width: 169px;
  min-height: 20px;
`
const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 10px 0px;
`
const Title = styled.div`
  font-size: 14px;
  color: black;
`

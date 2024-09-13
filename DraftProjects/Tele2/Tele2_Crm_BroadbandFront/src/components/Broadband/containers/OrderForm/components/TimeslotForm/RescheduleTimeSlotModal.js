import React, { useMemo, useCallback } from 'react'
import { Alert, Button, Form, Modal } from 'antd'
import styled from 'styled-components'

import TimeslotFormFields from './TimeslotFormFields'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import AddressRestrictions from './AddressRestrictions'
import { getTimeslotsParams } from 'components/Broadband/helpers/broadband'
import { formatWarnings } from 'crmHostApp/utils/helpers'
import { getTimeSlotDateAndInterval } from 'components/Broadband/helpers/timeslots'
import { getAddressByType } from 'helpers/address'
import { AddressTypes } from 'constants/address'

const { useForm, Item } = Form

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24, offset: 0 }
}

function getChangeTimeslotParams (orderState, timeslotsData, selectedDate, selectedTime, user) {
  const { timeSlotDate, timeSlotInterval } = getTimeSlotDateAndInterval(timeslotsData, selectedDate, selectedTime)
  const installationAddress = getAddressByType(orderState, AddressTypes.Installation)
  return {
    RtcOrderId: orderState.RtcOrderId,
    OrderId: orderState.OrderId,
    IsOnlime: orderState.IsOnlime,
    TimeSlotDate: timeSlotDate?.TimeSlotDate,
    Duration: timeSlotInterval?.Duration,
    TimeSlotTime: timeSlotInterval?.TimeSlotTime,
    TimeSlotTimeEnd: timeSlotInterval?.TimeSlotTimeEnd,
    OrponId: installationAddress?.OrponId,
    FlatName: installationAddress?.FlatName,
    RtcOrderNum: timeSlotDate?.RtcOrderNum,
    RegionCode: orderState.OrderRegionCode,
    KladrRegion: orderState.KladrRegion,
    RtcTechnologyId: orderState.BcTechnologyId,
    IsTimeSlotReserveCRM: timeSlotDate?.IsTimeSlotReserveCRM,
    UserName: user?.Name,
    SystemId: orderState.SystemId,
    TimeslotId: orderState.TimeSlotId,
    RtcTimeSlotId: orderState?.RtcTimeSlotId
  }
}

const RescheduleTimeSlotModal = props => {
  const { isVisible, onClose, areControlsDisabled } = props

  const { timeslots, orderState, getTimeslots, changeTimeslot, formInitData, changeContextState } =
    useBroadbandContext()
  const [form] = useForm()

  const {
    data: timeslotsData,
    isError: isTimeslotError,
    isLoading: isTimeslotLoading,
    message,
    warnings
  } = timeslots.get

  const { user } = formInitData ?? {}

  const isTimeSlotDateDisabled = useMemo(
    () => isTimeslotError || areControlsDisabled,
    [isTimeslotError, areControlsDisabled]
  )
  const isTimeSlotTimeDisabled = useMemo(
    () => !timeslotsData || isTimeslotLoading || isTimeslotError || areControlsDisabled,
    [timeslotsData, isTimeslotLoading, isTimeslotError, areControlsDisabled]
  )

  const handleReserve = useCallback(() => {
    const selectedDate = form.getFieldValue('TimeSlotDate')
    const selectedTime = form.getFieldValue('TimeSlotTime')
    const params = getChangeTimeslotParams(orderState, timeslotsData?.Timeslots, selectedDate, selectedTime, user)

    changeContextState({
      selectedChangeTimeslotData: { TimeSlotDate: selectedDate, TimeSlotTime: selectedTime }
    })

    changeTimeslot(params)
  }, [orderState, timeslotsData?.Timeslots, user])

  const shouldUpdate = useCallback(
    (prev, cur) => prev?.TimeSlotDate !== cur?.TimeSlotDate || prev?.TimeSlotTime !== cur?.TimeSlotTime,
    []
  )

  const handleOpenChange = useCallback(
    isOpen => {
      if (isOpen) {
        const timeslotsParams = getTimeslotsParams(orderState)
        getTimeslots(timeslotsParams)
      }
    },
    [orderState]
  )

  const alertDescription = warnings ? formatWarnings(warnings) : undefined

  return (
    <StyledModal
      visible={isVisible}
      onCancel={onClose}
      zIndex='1002'
      width='70%'
      footer={null}
      title={<ModalTitle>Перенос даты и времени монтажника</ModalTitle>}
      closable={false}
    >
      {isTimeslotError && (
        <AlertWrapper>
          <Alert message={message} description={alertDescription} type='warning' showIcon />
        </AlertWrapper>
      )}
      <Form form={form} name='RescheduleTimeSlotForm' {...formItemLayout}>
        <FormGrid>
          <TimeslotFormFields
            form={form}
            timeslotsData={timeslotsData}
            isTimeSlotDateDisabled={isTimeSlotDateDisabled}
            isTimeSlotTimeDisabled={isTimeSlotTimeDisabled}
            onOpenChange={handleOpenChange}
          />
          <ButtonsWrapper>
            <Item noStyle shouldUpdate={shouldUpdate}>
              {() => {
                const timeslotDate = form.getFieldValue('TimeSlotDate')
                const timeslotTime = form.getFieldValue('TimeSlotTime')
                const isDisabled = !timeslotDate && !timeslotTime

                return (
                  <Button disabled={isDisabled} loading={timeslots.change.isLoading} onClick={handleReserve}>
                    Зарезервировать
                  </Button>
                )
              }}
            </Item>
            <Button onClick={onClose}>Вернуться к заявке</Button>
          </ButtonsWrapper>
          {timeslotsData?.Parameters?.length > 0 && (
            <AddressRestrictionsWrapper>
              <AddressRestrictions data={timeslotsData?.Parameters} disabled={areControlsDisabled} />
            </AddressRestrictionsWrapper>
          )}
        </FormGrid>
      </Form>
    </StyledModal>
  )
}

export default RescheduleTimeSlotModal

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
`

const AlertWrapper = styled.div`
  margin-bottom: 8px;
`

const ModalTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`

const AddressRestrictionsWrapper = styled.div`
  grid-column: 1 / span 4;
`

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding-top: 0;
  }
`

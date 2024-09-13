import React, { useCallback, useMemo, useEffect } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { Form, Button, Alert, Spin, Input } from 'antd'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import moment from 'moment'
import { isNil, isString } from 'lodash-es'

import { getDeleteTimeslotParams, getTimeslotsParams } from 'components/Broadband/helpers/broadband'
import { getTimeSlotDateAndInterval } from 'components/Broadband/helpers/timeslots'
import TimeslotFormFields from './TimeslotFormFields'
import RescheduleTimeSlotModal from './RescheduleTimeSlotModal'
import AddressRestrictions from './AddressRestrictions'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { dateFormat } from 'constants/dateTime'
import { getAddressByType } from 'helpers/address'
import { AddressTypes } from 'constants/address'
import servicesMessageTypes from 'constants/servicesMessageTypes'
import { formatWarnings } from 'crmHostApp/utils/helpers'
import { PhoneContactsTypes } from '../../constants/contacts'
import { OrderStatuses } from 'constants/orderStatuses'

const { Item } = Form

function getReserveTimeslotParams (orderState, timeslotsData, selectedDate, selectedTime) {
  const { timeSlotDate, timeSlotInterval } = getTimeSlotDateAndInterval(timeslotsData, selectedDate, selectedTime)
  const installationAddress = getAddressByType(orderState, AddressTypes.Installation)
  const contactWithPhone = orderState.Contact?.find(contact => contact.ContactTypeId in PhoneContactsTypes)
  return {
    RtcOrderId: orderState.RtcOrderId,
    IsOnlime: orderState.IsOnlime,
    OrponId: installationAddress?.OrponId,
    FlatName: installationAddress?.FlatName,
    RtcTechnologyId: orderState.BcTechnologyId,
    RegionCode: orderState.OrderRegionCode,
    OrderId: orderState.OrderId,
    TimeSlotDate: timeSlotDate?.TimeSlotDate,
    TimeSlotTime: timeSlotInterval?.TimeSlotTime,
    TimeSlotTimeEnd: timeSlotInterval?.TimeSlotTimeEnd,
    Duration: timeSlotInterval?.Duration,
    TimeSlotComment: orderState.TimeSlotComment,
    KladrRegion: orderState.KladrRegion,
    RtcOrderNum: timeSlotDate?.RtcOrderNum,
    IsTimeSlotReserveCRM: timeSlotDate?.IsTimeSlotReserveCRM,
    client: {
      ContactOwner: orderState.NickName,
      Msisdn: orderState.Msisdn,
      ContactData: contactWithPhone?.ContactData
    },
    Relocation: orderState.Relocation
  }
}

function checkStatus (statusId) {
  return ![OrderStatuses.TransferredToRtc, OrderStatuses.InWork, OrderStatuses.InstallerAppointed].includes(statusId)
}

export default function TimeslotForm (props) {
  const { form, areControlsDisabled, areActionsDisabled } = props
  const {
    timeslots,
    orderState,
    speedToTechnology,
    order,
    getTimeslots,
    reserveTimeslot,
    deleteTimeslot,
    checkAutoInterval,
    changeRescheduleModalVisibility,
    isRescheduleModalVisible,
    changeContextState,
    selectedTimeslotData,
    orderStatusState
  } = useBroadbandContext()

  const { RtcOrderId, IsOnlime, IsTimeSlotReserveCRM } = orderState
  const { statusId } = orderStatusState
  const { data: timeslotsData, message, isLoading, isError: isGetTimeslotsError, warnings } = timeslots.get
  const { isLoading: isCheckAutoIntervalLoading } = timeslots.checkAutoInterval

  const { isTimeslotReserved, isTimeslotsDisabled } = useMemo(
    () => ({
      isTimeslotReserved: isString(orderState.RtcTimeSlotId),
      isTimeslotsDisabled: isNil(orderState.BcSpeedId)
    }),
    [orderState]
  )

  const timeslotReservedOn = order.data?.TimeslotReservedOn
  const [timeslotReservedOnText, isTimeslotOutdated] = useMemo(() => {
    let isOutdated = false
    let reservationText = ' зарезервирован '
    if (timeslotReservedOn) {
      let now = moment()
      const thanReserved = moment.utc(timeslotReservedOn).local()
      const duration = moment.duration(now.diff(thanReserved)).asMinutes()
      if (duration >= 10) {
        isOutdated = true
        reservationText = ' зарезервирован, но устарел '
      }
      return [reservationText + thanReserved.format('DD.MM.YYYY HH:mm'), isOutdated]
    } else {
      return [reservationText, isOutdated]
    }
  }, [timeslotReservedOn])

  const expectedDateTimeMsk = useMemo(() => {
    const loadedTime = moment(order.data?.ExpectedDateTimeMsk)
    return loadedTime?.isValid() ? loadedTime.format(dateFormat) : null
  }, [order])

  // clear selects on delete
  const deleteTimeslotData = timeslots.delete.data
  useEffect(() => {
    const isStatusOk = ![OrderStatuses.Cancelled, OrderStatuses.Deleted].includes(statusId)

    if (deleteTimeslotData?.IsSuccess && !orderState?.RtcTimeSlotId && isStatusOk) {
      form.setFieldsValue({ TimeSlotDate: null, TimeSlotTime: null, TimeSlotComment: null })
      const timeslotsParams = getTimeslotsParams(orderState)
      getTimeslots(timeslotsParams)
    }
  }, [deleteTimeslotData, orderState, statusId])

  const handleCancel = useCallback(() => {
    const params = getDeleteTimeslotParams(orderState)
    deleteTimeslot(params)
  }, [deleteTimeslot, orderState, RtcOrderId, IsOnlime])

  const handleReserve = useCallback(() => {
    const selectedDate = form.getFieldValue('TimeSlotDate')
    const selectedTime = form.getFieldValue('TimeSlotTime')
    const params = getReserveTimeslotParams(orderState, timeslotsData?.Timeslots, selectedDate, selectedTime)
    reserveTimeslot(params)
  }, [form, orderState, timeslotsData, speedToTechnology])

  const handleCheckAutoInterval = useCallback(() => {
    const params = { RegionCode: orderState.OrderRegionCode }
    checkAutoInterval(params)
  }, [orderState])

  const isCanceledTimeslot = isString(order.data?.CanceledRtcTimeSlotId)
  const isTimeslotError = isGetTimeslotsError && message

  const renderRtcAlert = () => {
    if ((!isTimeslotReserved && !isCanceledTimeslot) || isTimeslotError) {
      return null
    }
    let text = null
    let type = null
    if (IsTimeSlotReserveCRM) {
      text = 'Резервирование/перенос/отмена таймслота в системе Tele2'
      type = 'info'
    } else {
      const timeslotsGet = timeslots.get
      const resultType = timeslotsGet?.type
      if (resultType === servicesMessageTypes.warning) {
        text = 'Резервирование/перенос/отмену таймслота необходимо производить в системах Ростелекома. ' + message
        type = 'warning'
      } else {
        text = 'Резервирование/перенос/отмену таймслота необходимо производить в системах Ростелекома'
        type = 'warning'
      }
    }
    return (
      <AlertWrapper>
        <Alert message={text} type={type} showIcon />
      </AlertWrapper>
    )
  }

  const isTimeSlotDateDisabled = useMemo(
    () => isTimeslotsDisabled || isTimeslotReserved || isTimeslotError || areControlsDisabled,
    [isTimeslotsDisabled, isTimeslotReserved, isTimeslotError, areControlsDisabled]
  )
  const isTimeSlotTimeDisabled = useMemo(
    () => isTimeslotReserved || areControlsDisabled,
    [isTimeslotReserved, areControlsDisabled]
  )
  const isReserveTimeSlotDisabled = useMemo(
    () =>
      isTimeslotReserved ||
      isNil(selectedTimeslotData?.TimeSlotDate) ||
      isNil(selectedTimeslotData?.TimeSlotTime) ||
      areControlsDisabled ||
      areActionsDisabled ||
      isTimeslotError,
    [isTimeslotReserved, selectedTimeslotData, areControlsDisabled, areActionsDisabled, isTimeslotError]
  )
  const isCancelReserveTimeSlotDisabled = useMemo(
    () => !isTimeslotReserved || areControlsDisabled || areActionsDisabled,
    [isTimeslotReserved, areControlsDisabled, areActionsDisabled]
  )
  const isTimeSlotCommentDisabled = useMemo(() => areControlsDisabled, [areControlsDisabled])
  const isRescheduleTimeSlotDisabled = useMemo(() => {
    return (
      !isTimeslotReserved ||
      areControlsDisabled ||
      areActionsDisabled ||
      (order?.data?.IsOnlime && checkStatus(order?.data?.StatusId))
    )
  }, [isTimeslotReserved, areControlsDisabled, areActionsDisabled, order])

  // const isRequestTimeSlotOnDateDisabled = !isTimeslotReserved || areControlsDisabled || areActionsDisabled

  const alertDescription = warnings ? formatWarnings(warnings) : undefined

  const handleCloseModal = useCallback(() => {
    changeContextState({ selectedChangedTimeslotData: null })
    changeRescheduleModalVisibility(false)
  }, [])

  return (
    <>
      <Divider />
      <Spin spinning={isLoading}>
        <SubHeaderWrapper>
          <SubHeader>Дата и время монтажника</SubHeader>
          {expectedDateTimeMsk && <span>Желаемая дата инсталляции: {expectedDateTimeMsk}</span>}
        </SubHeaderWrapper>
        {isTimeslotsDisabled && (
          <AlertWrapper>
            <Alert
              message='Выбор и резервирование таймслота доступны только после выбора оборудования'
              type='warning'
              showIcon
            />
          </AlertWrapper>
        )}
        {isTimeslotError && (
          <AlertWrapper>
            <Alert message={message} description={alertDescription} type='warning' showIcon />
          </AlertWrapper>
        )}
        {renderRtcAlert()}
        <FormGrid>
          <TimeslotFormFields
            form={form}
            timeslotsData={timeslotsData}
            isTimeSlotDateDisabled={isTimeSlotDateDisabled}
            isTimeSlotTimeDisabled={isTimeSlotTimeDisabled}
          />

          <ActionsWrapper>
            <ButtonWrapper>
              <FullWidthButton
                disabled={isReserveTimeSlotDisabled}
                loading={timeslots.reserve.isLoading}
                onClick={handleReserve}
              >
                Зарезервировать
              </FullWidthButton>
            </ButtonWrapper>
            {/* <ButtonWrapper>
              <FullWidthButton disabled={isRequestTimeSlotOnDateDisabled} onClick={() => null}>
                Запросить ТС на дату
              </FullWidthButton>
            </ButtonWrapper> */}
            <ButtonWrapper>
              <FullWidthButton
                disabled={isRescheduleTimeSlotDisabled}
                loading={isCheckAutoIntervalLoading}
                onClick={handleCheckAutoInterval}
              >
                Перенести ТС
              </FullWidthButton>
              <FullWidthButton
                disabled={isCancelReserveTimeSlotDisabled}
                loading={timeslots.delete.isLoading}
                onClick={handleCancel}
              >
                Отменить ТС
              </FullWidthButton>
            </ButtonWrapper>
          </ActionsWrapper>

          {timeslotsData?.Parameters?.length > 0 && (
            <WideItem>
              <AddressRestrictions data={timeslotsData?.Parameters} disabled={areControlsDisabled} />
            </WideItem>
          )}
          <WideItem name='TimeSlotComment' label='Комментарий'>
            <Input allowClear disabled={isTimeSlotCommentDisabled} />
          </WideItem>
        </FormGrid>
        {!isNil(timeslots.reserve.message) && (
          <IconWrapper>
            <StyledIcon as={CloseCircleFilled} color={'red'} />
            <Text>{`Не удалось зарезервировать таймслот: ${timeslots.reserve.message}`}</Text>
          </IconWrapper>
        )}
        {isTimeslotReserved && (
          <IconWrapper>
            <StyledIcon as={CheckCircleFilled} color={isTimeslotOutdated ? '#faad14' : '#52C41A'} />
            <Text>{`Таймслот ${timeslotReservedOnText}`}</Text>
          </IconWrapper>
        )}
        {deleteTimeslotData !== null && (
          <IconWrapper>
            <StyledIcon as={CheckCircleFilled} color='#52C41A' />
            <Text>{deleteTimeslotData?.MessageText}</Text>
          </IconWrapper>
        )}
      </Spin>
      <RescheduleTimeSlotModal
        isVisible={isRescheduleModalVisible}
        onClose={handleCloseModal}
        areControlsDisabled={areControlsDisabled}
      />
    </>
  )
}

TimeslotForm.propTypes = {
  form: object
}

const FormGrid = styled.div`
  display: grid;
  padding: 0 24px;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  align-items: start;
`

const AlertWrapper = styled.div`
  padding: 0 24px;
  margin-bottom: 8px;
`

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`

const FullWidthButton = styled(Button)`
  width: 100%;
`

const IconWrapper = styled.div`
  padding: 0 24px;
  display: flex;
  align-items: center;
`

const Text = styled.div`
  padding-left: 8px;
`

const StyledIcon = styled.div`
  font-size: 22px;
  color: ${({ color }) => color};
`

const Divider = styled.div`
  margin: 12px 0;
  display: flex;
  clear: both;
  width: 100%;
  min-width: 100%;
  border-top: 10px solid rgba(0, 0, 0, 0.06);
`

const SubHeaderWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

const SubHeader = styled.h4`
  padding: 12px 24px;
  font-size: 15px;
  font-weight: bold;
`

const WideItem = styled(Item)`
  grid-column: 1 / span 4;
`

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

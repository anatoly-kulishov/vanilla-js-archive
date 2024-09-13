import React, { useCallback, useMemo } from 'react'
import { Alert, Button, Divider, Form, Space } from 'antd'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import styled from 'styled-components'

import ShiftsFilters from './components/ShiftsFilters'
import ShiftInfo from './components/ShiftInfo'
import useShiftScenario from './hooks/useShiftScenario'

const Shifts = ({ user, hasShifts, onOpenOrder, orderId, isEditable }) => {
  const { operatorShifts, autoOrderSession, sessionsInfoState } = useBroadbandContext()
  const [form] = Form.useForm()

  useShiftScenario(form, onOpenOrder, user, hasShifts)

  const sessionData = sessionsInfoState.data
  const currentSessionOrder = useMemo(() => {
    if (sessionData?.length > 0) {
      return sessionData.find(item => !!item.orderId)
    }
    return null
  }, [sessionData])

  const { data } = operatorShifts.get
  const { message, data: autoOrderSessionData } = autoOrderSession

  const { msisdn, orderId: currentSessionOrderId } = currentSessionOrder ?? {}

  const handleFinishOrder = useCallback(() => {
    onOpenOrder({ orderId: currentSessionOrderId, msisdn: msisdn || null })
  }, [currentSessionOrderId, msisdn])

  const isSameOrder = orderId === currentSessionOrderId

  const alertMessage = isSameOrder
    ? `Необходимо завершить работу с текущей заявкой`
    : `Необходимо завершить работу с заявкой ${currentSessionOrder?.orderId}`
  const errorMessage = autoOrderSessionData?.message || message

  return (
    <>
      <ShiftsFilters form={form} hasShifts={hasShifts} user={user} isEditable={isEditable} />
      <ShiftInfo data={data?.[0]} errorMessage={errorMessage} />
      {currentSessionOrder && (
        <>
          <StyledDivider />
          <Space>
            <StyledAlert showIcon type='warning' message={alertMessage} />
            {!isSameOrder && (
              <Button type='primary' onClick={handleFinishOrder}>
                Завершить
              </Button>
            )}
          </Space>
        </>
      )}
    </>
  )
}

const StyledAlert = styled(Alert)`
  height: 32px;
`

const StyledDivider = styled(Divider)`
  margin: 10px 0;
`

export default Shifts

import React, { useCallback } from 'react'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import styled from 'styled-components'

import Card from 'crmHostApp/components/Card'
import Shifts from 'components/Shifts'
import useShiftInit from 'components/Shifts/hooks/useShiftInit'
import { constructUrl } from 'helpers/sessions'

const BroadbandShifts = ({ user }) => {
  const { operatorShifts } = useBroadbandContext()

  const { hasShifts } = useShiftInit()
  const { isLoading } = operatorShifts.get

  const handleOpenOrder = useCallback(params => {
    const path = constructUrl('/card/rtc-broadband/order', params)
    open(path, '_blank')
  }, [])

  return (
    <Card
      header='Журнал смен ШПД'
      isContentLoading={isLoading}
      menu={null}
      content={
        <Wrapper>
          <Shifts history={history} user={user} hasShifts={hasShifts} onOpenOrder={handleOpenOrder} isEditable />
        </Wrapper>
      }
    />
  )
}

const Wrapper = styled.div`
  padding: 0 32px 10px 32px;
`

export default BroadbandShifts

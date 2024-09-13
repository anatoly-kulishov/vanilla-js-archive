import styled from 'styled-components'
import { Button, Tag } from 'antd'
import { checkIsSessionPossible } from 'helpers/sessions'

export const prepareSessionInfo = ({ sessionData, user, orderId, statusId, onClick, isReadLimitedBCOrder }) => {
  if (isNaN(orderId)) return null

  const sessionItem = sessionData?.find(item => item.orderId === orderId)
  const userLogin = user?.login

  if (!sessionItem) {
    const isSessionPossible = checkIsSessionPossible(statusId)
    if (isSessionPossible && !isReadLimitedBCOrder) {
      return {
        content: (
          <Button type='primary' onClick={onClick}>
            Взять в работу
          </Button>
        )
      }
    }
  } else if (sessionItem.userLogin !== userLogin) {
    return { content: <StyledTag color='red'>В работе: {sessionItem.userLogin}</StyledTag> }
  } else {
    return { content: <StyledTag color='blue'>В работе</StyledTag> }
  }
}

export const prepareCloseSessionInfo = (isBCOrderSessionAdmin, handleCloseSession, loading) => {
  if (isBCOrderSessionAdmin) {
    return {
      content: (
        <Button type='primary' onClick={handleCloseSession} loading={loading}>
          Завершить без изменений
        </Button>
      )
    }
  }

  return null
}

export const isOwnSession = (sessionData, userLogin, orderId) => {
  const sessionItem = sessionData?.find(item => item.orderId === orderId)
  return sessionItem?.userLogin === userLogin
}

export const isEmptySession = (sessionData, userLogin, orderId) => {
  const sessionItem = sessionData?.find(item => item.orderId === orderId)
  return !sessionItem
}

export function prepareCreateSessionParams (orderState, orderStatusState) {
  return {
    OrderId: orderState.OrderId,
    StatusId: orderStatusState.statusId
  }
}

const StyledTag = styled(Tag)`
  font-size: 14px;
`

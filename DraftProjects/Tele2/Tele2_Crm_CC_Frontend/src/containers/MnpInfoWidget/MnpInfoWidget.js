import React, { useEffect, useMemo } from 'react'
import { bool, func, number, object, string, array } from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'
import { getMnpRights } from 'utils/helpers/rights'
import { cardModes } from 'constants/cardModes'
import { getTypeCard } from 'webseller/helpers'

const Widget = {
  Opened: 'Раскрыта',
  Closed: 'Свернута',
  Hidden: 'Не отображается'
}

const MnpInfoWidget = props => {
  const {
    mnpState,
    isMnpOrderVisible,
    toggleMnpInfoCards,
    checkMnpHandling,
    getMnpOrder,
    user,
    handlingId,
    clientCategoryId,
    toggleCheckMnpPassed,
    cardMode,
    isMnpQuestionaryVisible,
    toggleMnpQuestionary,
    markerMnp,
    isHandlingOpenPressed
  } = props
  const { mnpHandlingData, isCheckMNPHandlingSuccess } = mnpState
  const isWebSeller = user.isASSeller

  const { isb2b, isSubscriberFirstLevelCard } = getTypeCard(isWebSeller)

  const mnpRights = useMemo(() => getMnpRights(user), [user])
  const isMnpInfoAvailable =
    mnpRights.isMnpOutReact || mnpRights.isMnpSupport || mnpRights.isGetCanceledMnpOrder || mnpRights.isReadMnpOrder

  useEffect(() => {
    if (cardMode !== cardModes.anonymous && handlingId && !isHandlingOpenPressed) {
      checkMnpHandling()
    }
  }, [handlingId, cardMode])

  useEffect(() => {
    if (isMnpInfoAvailable) {
      if (mnpHandlingData?.OrderDisplay === Widget.Opened) {
        toggleMnpInfoCards(true)
      }
      if (mnpHandlingData?.QuestionaryDisplay === Widget.Opened) {
        toggleMnpQuestionary(true)
      }
    }
  }, [mnpRights, mnpHandlingData, markerMnp])

  useEffect(() => {
    const orderId = mnpHandlingData?.OrderId
    if (orderId) {
      getMnpOrder({ orderId, clientCategoryId })
    }
  }, [mnpHandlingData])

  const handleCardsShowButton = () => {
    toggleMnpQuestionary()
    toggleCheckMnpPassed()
  }

  const isNotB2bFirstLevelCard = !(isb2b && isSubscriberFirstLevelCard)

  return ((isWebSeller && isNotB2bFirstLevelCard) || !isWebSeller) && (isMnpInfoAvailable && isCheckMNPHandlingSuccess) ? (
    <MnpOrderWrapper>
      {mnpHandlingData?.OrderDisplay !== Widget.Hidden && (
        <Wrapper>
          <MnpOrderInfoWrapper>
            <span>Заявка MNP</span>
            <OrderNumber>{mnpHandlingData?.OrderId}</OrderNumber>
          </MnpOrderInfoWrapper>
          <StyledButton type='primary' onClick={() => toggleMnpInfoCards()}>
            {isMnpOrderVisible ? 'Скрыть' : 'Показать'}
          </StyledButton>
        </Wrapper>
      )}
      {mnpHandlingData?.QuestionaryDisplay !== Widget.Hidden && !isWebSeller && (
        <Wrapper>
          <span>Анкета MNP</span>
          <StyledButton type='primary' onClick={() => handleCardsShowButton()}>
            {isMnpQuestionaryVisible ? 'Скрыть' : 'Показать'}
          </StyledButton>
        </Wrapper>
      )}
    </MnpOrderWrapper>
  ) : null
}

export default MnpInfoWidget

MnpInfoWidget.propTypes = {
  mnpState: object,
  cardMode: number,
  isMnpOrderVisible: bool,
  toggleMnpInfoCards: bool,
  checkMnpHandling: func,
  getMnpOrder: func,
  user: object,
  handlingId: string,
  clientCategoryId: string,
  toggleCheckMnpPassed: bool,
  isMnpQuestionaryVisible: bool,
  toggleMnpQuestionary: func,
  markerMnp: array,
  isHandlingOpenPressed: bool
}

const MnpOrderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  width: 100%;
  padding: 6px;
  div :first-child {
    margin-right: 5px;
  }
`

const OrderNumber = styled.div`
  font-weight: bold;
`

const MnpOrderInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`

const StyledButton = styled(Button)`
  padding: 0 4px;
  width: 66px;
  margin-left: 5px;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

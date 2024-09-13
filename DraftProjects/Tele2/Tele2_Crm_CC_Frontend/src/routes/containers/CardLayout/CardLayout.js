import React, { useEffect, Fragment, useState, useMemo } from 'react'
import loadable from '@loadable/component'
import { bool, number, object, func, node, string } from 'prop-types'
import { Col } from 'antd'
import { Row } from 'antd/lib/grid'
import styled from 'styled-components'

import { usePersonalAccount } from 'routes/hooks/usePersonalAccount'
import RightBlock from 'screens/RightBlock/'
import Notifications from 'containers/NotificationsContainer'
import openKms from 'utils/helpers/kms'

import { layouts } from '../../constants/layouts'
import NavigationMenu from '../../components/NavigationMenu'
import CardHeader from '../CardHeader'
import { cardModes } from 'constants/cardModes'
import WebimButton from 'components/Buttons/WebimButton'
import { checkRight } from 'utils/helpers'
import { wsStatus } from 'constants/wsStatus'
import { Loader } from 'webseller/components'

const MultisubscriptionModal = loadable(() =>
  import(/* webpackChunkName: "MultisubscriptionModal" */ 'screens/MultisubscriptionModal/MultisubscriptionModal')
)
const OffersModal = loadable(() =>
  import(/* webpackChunkName: "OffersModal" */ 'containers/OfferComponents/OffersModal')
)
const RightModal = loadable(() => import(/* webpackChunkName: "RightModal" */ 'screens/RightModal'))
const CreateTicketModal = loadable(() =>
  import(/* webpackChunkName: "CreateTicketModal" */ 'screens/CreateTicketModal')
)
const ServicesPendingOrdersModal = loadable(() =>
  import(/* webpackChunkName: "ServicesPendingOrdersModal" */ 'containers/ServicesPendingOrdersModal')
)
const B2bAbonentModal = loadable(() => import(/* webpackChunkName: "B2bAbonentModal" */ 'containers/B2bAbonentModal'))
const TicketInfoModal = loadable(() => import(/* webpackChunkName: "TicketInfoModal" */ 'containers/TicketInfoModal'))
const TemporaryPayModal = loadable(() =>
  import(/* webpackChunkName: "TemporaryPayModal" */ 'containers/TemporaryPayModal')
)
const UserBirthdayContainer = loadable(() =>
  import(/* webpackChunkName: "BirthdayContainer" */ 'containers/UserBirthdayContainer')
)
const BirthdayMessagesContainer = loadable(() =>
  import(
    /* webpackChunkName: "BirthdayMesagesContainer" */ 'containers/BirthdayMessagesContainer/BirthdayMesagesContainer'
  )
)
const FeedbackModal = loadable(() => import(/* webpackChunkName: "FeedbackModal" */ 'containers/FeedbackModal'))

const propTypes = {
  msisdn: string,
  children: node,
  isOffersModalToggled: bool,
  isVisibleServicesPendingOrders: bool,
  isVisibleTicketInfoModal: bool,
  isTpNewVisible: bool,
  isPersonalAccountLoading: bool,
  user: object,
  personalAccount: object,
  isFeedbackModalVisible: bool.isRequired,
  isTwinspot: bool.isRequired,
  queryParams: object,
  processingParameters: object,
  handlingId: number,
  notifications: object,
  changeVisibilityNotification: func,
  cardMode: number,
  mnpMarkers: object,
  fetchWhoIsIt: func,
  isMultisubscriptionModalOpen: bool,
  fetchWebimHash: func,
  hash: string,
  id: string,
  hashError: string,
  getPersonId: func,
  personId: number,
  connectCustomerSegmentsPreviewWs: func,
  customerSegmentsPreviewWsStatus: number,
  disconnectCustomerSegmentsPreviewWs: func,
  fetchWebimDns: func,
  dns: string,
  dnsError: string,
  fetchTariffInfoPreview: func,
  isWebSeller: bool,
  hasRequiredMarkers: bool,
  isLoadingCard: bool
}
export default function CardLayout (props) {
  const {
    user,
    isTwinspot,
    queryParams: { msisdn },
    cardMode,
    personalAccount,
    processingParameters,
    handlingId,
    notifications,
    changeVisibilityNotification,
    children,
    isPersonalAccountLoading,
    isOffersModalToggled,
    isVisibleServicesPendingOrders,
    isVisibleTicketInfoModal,
    isTpNewVisible,
    user: { isBirthday },
    isFeedbackModalVisible,
    mnpMarkers,
    fetchWhoIsIt,
    isMultisubscriptionModalOpen,
    fetchWebimHash,
    hash,
    hashError,
    id,
    getPersonId,
    personId,
    connectCustomerSegmentsPreviewWs,
    customerSegmentsPreviewWsStatus,
    disconnectCustomerSegmentsPreviewWs,
    fetchWebimDns,
    dns,
    dnsError,
    fetchTariffInfoPreview,
    isWebSeller,
    hasRequiredMarkers,
    isLoadingCard
  } = props

  const isLeon = cardMode === cardModes.leon
  const isAnonymous = cardMode === cardModes.anonymous
  const isUnknown = cardMode === cardModes.unknown

  useEffect(() => {
    if (isLeon) {
      fetchWhoIsIt({ Msisdn: msisdn })
    }

    return disconnectCustomerSegmentsPreviewWs
  }, [])

  const layout = useMemo(() => {
    const isSeller = checkRight(user, 'AS:Seller')
    let layout = 'CRM'
    if (isSeller) {
      layout = 'WS'
    }
    if (isTwinspot) {
      layout = 'TWSP'
    }

    return layout
  }, [isTwinspot, user])

  usePersonalAccount({ layout: layout, ...props })
  const [isKmsOpened, setKmsOpened] = useState(false)

  useEffect(() => {
    const {
      queryParams: { interactionId, systemName }
    } = props
    const isCallAdmin = interactionId || systemName

    if (personalAccount && handlingId && isCallAdmin && !isKmsOpened) {
      openKms({ personalAccount, handlingId, isButtonClick: false })
      setKmsOpened(true)
    }
  }, [handlingId, personalAccount, isKmsOpened])

  const {
    isWebimChatAllowed,
    isReadCustomerSegment,
    isReadTariffGuaranteedPrice,
    isTariffManagement

  } = useMemo(
    () => ({
      isWebimChatAllowed: checkRight(user, 'CC:DiagnosticsChatBot'),
      isReadCustomerSegment: checkRight(user, 'CC:ReadCustomerSegment'),
      isReadTariffGuaranteedPrice: checkRight(user, 'CC:ReadTariffGuaranteedPrice'),
      isTariffManagement: checkRight(user, 'CC:TariffManagement')
    }),
    [user]
  )

  useEffect(() => {
    if (personalAccount?.BillingBranchId && handlingId && isWebimChatAllowed) {
      const params = { handlingId, billingBranchId: personalAccount.BillingBranchId, msisdn }
      fetchWebimHash(params)
      fetchWebimDns()
    }
  }, [msisdn, handlingId, personalAccount, isWebimChatAllowed])

  useEffect(() => {
    const { BillingBranchId, SubscriberId, Msisdn, ClientCategory } = personalAccount ?? {}
    const areRequiredParametersExist = Boolean(
      BillingBranchId && SubscriberId && Msisdn && ClientCategory && handlingId
    )
    if (areRequiredParametersExist && isReadCustomerSegment && !isWebSeller) {
      getPersonId()
    }
  }, [personalAccount, handlingId, isReadCustomerSegment])

  useEffect(() => {
    if (personId && handlingId && customerSegmentsPreviewWsStatus === wsStatus.connecting) {
      const params = { customerId: personId, handlingId }
      connectCustomerSegmentsPreviewWs(params)
    }
  }, [personId, handlingId, customerSegmentsPreviewWsStatus])

  useEffect(() => {
    const isAllowedCardMode = !isLeon && !isAnonymous && !isUnknown
    if (msisdn && isAllowedCardMode && isReadTariffGuaranteedPrice && isTariffManagement) {
      fetchTariffInfoPreview({ msisdn })
    }
  }, [msisdn, cardMode, isReadTariffGuaranteedPrice, isTariffManagement])

  const [isBirthdayMessagesVisible, birthdayMessages] = useMemo(() => {
    const birthdayMessages =
      mnpMarkers?.DiagnosticParams?.filter(item => item.Type?.toLowerCase().startsWith('birthday')) ?? null
    const isVisible = birthdayMessages?.length > 0
    return [isVisible, birthdayMessages]
  }, [mnpMarkers])

  const showWebimChatButton = isWebimChatAllowed && !hashError && hash && id && !dnsError && dns

  if (isLoadingCard) {
    return <LoaderWrapper>
      <Loader title='Загрузка карточки клиента' />
    </LoaderWrapper>
  }

  return (
    <Fragment>
      <HeaderWrapper isTwinspot={isTwinspot}>
        {!isTwinspot && <CardHeader />}
        {!isPersonalAccountLoading && (
          <NavigationMenu
            currentLayout={isTwinspot ? layouts.twinspot : layouts.card}
            currentMode={cardMode}
            notifications={notifications}
            user={user}
            changeVisibilityNotification={changeVisibilityNotification}
            isDisabled={isWebSeller && hasRequiredMarkers}
          />
        )}
      </HeaderWrapper>
      {/* {isPersonalAccountLoading && <div>Loading</div>} */}
      {personalAccount && processingParameters && (
        <Content>
          <RightModal />
          <CreateTicketModal />
          {isMultisubscriptionModalOpen && <MultisubscriptionModal isWebSellerView={isWebSeller} />}
          {isVisibleServicesPendingOrders && <ServicesPendingOrdersModal />}
          {isOffersModalToggled && <OffersModal />}
          {isVisibleTicketInfoModal && <TicketInfoModal />}
          {isTpNewVisible && <TemporaryPayModal />}
          {isFeedbackModalVisible && <FeedbackModal />}
          {showWebimChatButton && <WebimButton />}
          <B2bAbonentModal />
          <ContentWrapper>
            <RowWrapper>
              <Col span={18}>
                <Notifications />
                {isBirthday && <UserBirthdayContainer />}
                {isBirthdayMessagesVisible && <BirthdayMessagesContainer messages={birthdayMessages} />}
                {children}
              </Col>
              <Col span={6}>
                <RightBlock msisdn={msisdn} />
              </Col>
            </RowWrapper>
          </ContentWrapper>
        </Content>
      )}
    </Fragment>
  )
}

CardLayout.propTypes = propTypes

const LoaderWrapper = styled.div`
  height: 100vh;
`

const Content = styled.div`
  background-color: #fafafa;
`
const ContentWrapper = styled.div`
  background-color: #fafafa;
`
const RowWrapper = styled(Row)`
  padding: 0px 16px 0px 16px;
  width: 100%;
`
const HeaderWrapper = styled.div`
  position: sticky;
  top: ${({ isTwinspot }) => (isTwinspot ? '60px' : '0px')};
  z-index: 1001;
  margin-bottom: 10px;
`

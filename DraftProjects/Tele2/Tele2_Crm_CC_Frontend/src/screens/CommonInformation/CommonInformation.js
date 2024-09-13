/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { get } from 'lodash'

import { Input, notification } from 'antd'
import { ClockCircleOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons'

import Card from 'components/Card'
import ServiceTable from 'containers/ServiceTable'
import FinanceSubscriber from 'containers/Balances'
import ServiceHistoryModal from 'containers/ServiceHistory/ServiceHistoryModal'
import ErrorBoundary from 'components/ErrorBoundary'
import BalanceAccountTable from 'containers/Balances/BalanceAccountTable'
import Tag from 'components/Tag'
import Subscribers from './components/Subscribers'
import Subscriptions from './components/Subscriptions'
import Comments from './containers/Comments'
import Groups from './components/Groups'
import Offers from './containers/Offers'
import MnpOrder from './containers/MnpOrder'
import MnpQuestionnaire from 'containers/MnpQuestionnaire'
import propTypes from './constants/propTypes'
import { checkRight, routeMatch } from 'utils/helpers'
import open from 'utils/helpers/windowOpener'
import PopoverSubscriptions from 'containers/PopoverSubscriptions'
import LinkedHandlingModal from 'containers/LinkedHandlingModal'
import RatingMenu from 'containers/RatingMenu'
import { shouldRate } from 'containers/RatingMenu/shouldRate'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
import { cardModes } from 'constants/cardModes'
import { clientCategories } from 'constants/personalAccountStrings'

import MnpOrderStepper from 'webseller/features/mpnOrderStepper/components/MnpModal/MnpModal'
import Operations from './components/Operations'
import AnonymousOperations from './components/AnonymousOperations'
import RecreateClient from 'webseller/features/recreateClient/components/RecreateClientModal'
import TerminationClient from 'webseller/features/terminationClient/components/TerminationClient'
import ChangingClientStatus from 'webseller/features/changingClientStatus/components/ChangingClientStatus'
import ChangeCodeWord from 'webseller/features/changeCodeWord/components/ChangeCodeWordModal/ChangeCodeWordModal'
import { CHANGE_CODE_WORD_PROCESS_STEPS } from 'webseller/features/changeCodeWord/constants'
import { getTypeCard } from 'webseller/helpers'

const getFinanceMenu = (match, isLeon, _, isWebSeller) => {
  const { isb2b, isAnonymousCard, isSubscriberFirstLevelCard } = getTypeCard(isWebSeller)

  if (isLeon) {
    return [
      { path: `${match.url}/balance`, text: 'Балансы' },
      { path: `${match.url}/remains`, text: 'Остатки' },
      { path: `${match.url}/payinf`, text: 'Платежная информация' }
    ]
  }
  if (isAnonymousCard || (isb2b && isSubscriberFirstLevelCard)) {
    return [
      { path: `${match.url}/balance`, text: 'Балансы' },
      { path: `${match.url}/remains`, text: 'Остатки' }
    ]
  }
  return [
    { path: `${match.url}/balance`, text: 'Балансы' },
    { path: `${match.url}/remains`, text: 'Остатки' },
    { path: `${match.url}/operations`, text: 'Операции' }
  ]
}

const {
  commonFinanceFeatureId,
  commonSubscriptionsFeatureId,
  commonLinesFeatureId,
  commonServiceFeatureId,
  commonBalanceAccountFeatureId,
  offersId,
  commonCommentsFeatureId
} = ratingFeatureIds

const defaultSubscriberStatusId = 1 // по постановке 44924

class CommonInformation extends Component {
  static propTypes = propTypes
  state = {
    hideFilters: true,
    clientInfoReceived: false,
    connectedServices: [],
    valueSearch: '',
    isGroupHidden: false,
    isFirstTimeHidden: false,
    isGroupCardRender: false
  }

  static getDerivedStateFromProps = (props, state) => {
    const { connectedServices, groups } = props
    const { isFirstTimeHidden, isFirstTimeRender } = state

    const isGroupNotEmpty = groups.groupList && groups.groupInfo.CountAll !== 0
    const isGroupMember = groups.groupList && groups.groupInfo.CountCurrent === 0

    if (connectedServices && state.connectedServices !== connectedServices && state.valueSearch === '') {
      return { connectedServices: connectedServices }
    }
    if (isGroupMember && !isFirstTimeHidden) {
      return { isGroupHidden: true, isFirstTimeHidden: true }
    }
    if (isGroupNotEmpty && !isFirstTimeRender) {
      return { isGroupCardRender: true, isFirstTimeRender: true }
    }
    if (isFirstTimeHidden) {
      return { isGroupHidden: false }
    }
    if (isFirstTimeRender) {
      return { isGroupCardRender: true }
    }
    return null
  }

  componentDidMount = () => {
    const {
      getActiveSubscriptions,
      getConnectedServices,
      personalAccount: { Msisdn: msisdn, ClientId: clientId, BillingBranchId: branchId, SubClientId: subClientId },
      isActiveSuccess,
      connectedServices,
      fetchGroupList,
      groups: { groupList },
      fetchUnsibscribeReasons,
      unsubscribeReasons,
      finance,
      getClientBalance,
      cardMode,
      fetchRegisteredOffers,
      fetchOffers,
      offersState: { registeredOffers },
      commentsState: { comments },
      getComments,
      handlingId,
      checkMnpHandling,
      getAvailableServices,
      availableServices,
      queryParams: { delayedHandling }
    } = this.props

    if (!isActiveSuccess) {
      getActiveSubscriptions({ msisdn })
    }

    !availableServices && getAvailableServices({ msisdn })
    !connectedServices && getConnectedServices({ msisdn })
    !groupList && fetchGroupList({ msisdn, SubscriberStatusId: defaultSubscriberStatusId })
    !unsubscribeReasons && fetchUnsibscribeReasons()
    !finance && cardMode === cardModes.client && getClientBalance({ clientId, branchId })
    !registeredOffers && fetchRegisteredOffers()
    !comments &&
      getComments({
        clientId: clientId,
        subClientId: subClientId,
        msisdn: msisdn,
        branchId: branchId
      })
    !handlingId && delayedHandling && cardMode !== cardModes.anonymous && checkMnpHandling({ isDelayedHandling: true })
    !handlingId && delayedHandling && fetchOffers()
  }

  disable = req => {
    const { disableService } = this.props

    disableService(req)
  }

  onHistoryClick = () => {
    const {
      history,
      personalAccount: { Msisdn: msisdn, BillingBranchId: branchId },
      getServiceHistory,
      queryParams
    } = this.props

    history.push(`${routeMatch(history.location.pathname, 'history/services')}?msisdn=${queryParams.msisdn}`)
    const dateFormat = 'YYYY-MM-DD'
    getServiceHistory({
      msisdn,
      branchId,
      endDate: moment().format(dateFormat),
      startDate: moment().subtract('month', 1).format(dateFormat),
      message: 'История услуг'
    })
  }

  onShowCommentsClick = () => {
    const { history } = this.props
    history.push(`/card/comments${history.location.search}`)
  }

  onUnsubscribe = req => {
    const {
      unsubscribeSelected,
      queryParams: { msisdn }
    } = this.props
    unsubscribeSelected({ req, msisdn })
  }

  onUnsubscribeAll = reason => {
    const {
      personalAccount: { Msisdn, BillingBranchId: BranchId },
      activeSubscriptions,
      unsubscribeSelected,
      handlingId
    } = this.props
    const subscriptionsRemove = []

    if (activeSubscriptions && activeSubscriptions.length) {
      activeSubscriptions.forEach((item, index) => {
        subscriptionsRemove[index] = {
          SubscriptionId: item.Id,
          SubscriptionName: item.Name,
          SubscriptionTypeId: item.SubscriptionTypeId,
          ProviderName: item.ProviderName,
          ServiceNumber: item.ServiceNumber,
          ReasonId: reason
        }
      })

      const req = {
        Msisdn,
        Subscriptions: subscriptionsRemove,
        BranchId,
        HandlingId: handlingId
      }

      unsubscribeSelected({ req, msisdn: Msisdn })
    } else {
      notification.open({
        message: `Подписки `,
        description: 'У абонента отсутствуют активные подписки',
        type: 'error'
      })
    }
  }

  onServiceRequest = () => {
    const {
      getConnectedServices,
      personalAccount: { Msisdn: msisdn }
    } = this.props

    this.setState({
      valueSearch: '',
      connectedServices: null
    })
    getConnectedServices({ msisdn })
  }

  onSearchService = event => {
    const { connectedServices } = this.props
    if (connectedServices) {
      this.setState({
        valueSearch: event.target.value,
        connectedServices: connectedServices.filter(el =>
          el.ServiceName.toLowerCase().includes(event.target.value.toLowerCase())
        )
      })
    }
  }

  renderSearchBar = () => {
    const { valueSearch } = this.state

    return (
      <Input
        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)', cursor: 'text' }} />}
        placeholder='Поиск по подключенным услугам'
        onChange={event => this.onSearchService(event)}
        style={{ width: 270 }}
        value={valueSearch}
        allowClear
      />
    )
  }

  handleCreatingDocuments = () => {
    const {
      payments: { paymentsUrl, paymentsUrlError }
    } = this.props

    paymentsUrl
      ? open(paymentsUrl.Url)
      : notification.error({
        message: 'Движение средств: отчетные документы',
        description: paymentsUrlError
      })
  }

  onAcceptNewTemporaryPay = value => {
    const {
      personalAccount: { SubscriberFullInfo, Msisdn, Email, SubscriberId, BillingBranchId, ClientId },
      addPayment,
      handlingId
    } = this.props
    const { SubscriberStatusId, SubscriberTypeId } = SubscriberFullInfo?.SubscriberInfo ?? {}

    addPayment({
      SystemName: 'MSDCRM',
      PaySum: value,
      Msisdn,
      HandlingId: handlingId,
      ClientId,
      Email,
      SubscriberId,
      SubscriberBranchId: BillingBranchId,
      SubscriberTypeId,
      SubscriberStatusId
    })
  }

  clearMessages = () => {
    const { clearCompensationsMessages, clearValidationMessages } = this.props
    clearCompensationsMessages()
    clearValidationMessages()
  }

  handleCompensationHistoryModalOpen = () => {
    const { changeCompensationsHistoryModalVisibility } = this.props

    changeCompensationsHistoryModalVisibility()
  }

  render = () => {
    const {
      match,
      isActiveSubscriptionsLoading,
      isConnectedServicesLoading,
      handlingId,
      personalAccount,
      isPersonalAccountLoading,
      subscribersState,
      changeAbonentsModalVisibility,
      balance,
      user,
      contentBalance,
      activeSubscriptions,
      groups: { groupList, groupInfo, isGroupListLoading },
      discounts,
      groupsSubscribers,
      handleToggleServicesPendingOrders,
      fetchDiscountsList,
      clearDiscountsList,
      fetchSubscribersList,
      clearSubscribersList,
      fetchGroupList,
      deleteGroup,
      validateAutopayService,
      getUnpaidChargeDataAndShowAlert,
      processingParameters,
      fetchGroupNotificationMessages,
      toggleLinkedHandlingModalVisibility,
      isUnsubscribeLoading,
      offersState,
      cardMode,
      commentsState: { isCommentsLoading, comments },
      queryParams: { delayedHandling },

      // WebSeller
      isShowRecreateClientModal,
      isShowTerminationClient,
      isShowChangingClientStatus,
      isShowMnpOrderStepper,
      isWebSeller,
      hasRequiredMarkers
    } = this.props
    const hasRequiredMarkersInWebSeller = Boolean(isWebSeller && hasRequiredMarkers)
    const { SubscriberCounts } = personalAccount
    const { connectedServices, isGroupHidden, isGroupCardRender } = this.state
    const parentPersonalAccountId = get(personalAccount, 'ParentClientInfo.PersonalAccountId', null)
    const subscriberPersonalAccountId = get(
      personalAccount,
      'SubscriberFullInfo.SubscriberInfo.PersonalAccountId',
      null
    )

    const isSubscriberMode = cardMode === cardModes.subscriber
    const isLeonMode = cardMode === cardModes.leon

    const {
      isSubscriberFirstLevelCard,
      isNonSubscriberCard,
      isAnonymousCard,
      isPersonalAccountCard,
      isLimitedCard,
      isb2b
    } = getTypeCard(isWebSeller)

    const ClientCategory = get(personalAccount, 'ClientCategory', null)
    const isB2b = ClientCategory?.toUpperCase() === clientCategories.B2B

    const personalAccountNumber = isB2b ? parentPersonalAccountId : subscriberPersonalAccountId
    const isDeleteGroupUser = handlingId && checkRight(user, 'CC:DeleteGroupUser')
    const isGroupMember = groupList && groupList.CountCurrent === 0

    const isCompensationRights = checkRight(user, 'CC:PaydComp')
    const isOperationsTab = location.pathname.includes('/operations')

    const financeAdditional = [
      shouldRate(commonFinanceFeatureId) && { content: <RatingMenu currentFeatureId={commonFinanceFeatureId} /> },
      isB2b &&
        !isOperationsTab &&
        !isPersonalAccountCard &&
        !(isb2b && isSubscriberFirstLevelCard) && {
        content: 'Предоставить отчетные документы',
        onClick: this.handleCreatingDocuments
      },
      isCompensationRights &&
        isOperationsTab && { content: 'История компенсаций', onClick: () => this.handleCompensationHistoryModalOpen() }
    ]

    const subscriptionsAddition = [
      shouldRate(commonSubscriptionsFeatureId) && {
        content: <RatingMenu currentFeatureId={commonSubscriptionsFeatureId} />
      },
      {
        content: handlingId && (
          <PopoverSubscriptions title='Отключить все подписки?' confirm={this.onUnsubscribeAll}>
            <Label disabled={isUnsubscribeLoading}>Отключить все</Label>
          </PopoverSubscriptions>
        ),
        onClick: null
      }
    ]

    const groupsAddition = [
      shouldRate(commonLinesFeatureId) && {
        content: !isGroupHidden && <RatingMenu currentFeatureId={commonLinesFeatureId} />,
        isSearchBar: true
      },
      {
        content: isGroupMember && (
          <Tag width={100} color='grey'>
            Не состоит
          </Tag>
        )
      }
    ]

    const serviceAddition = [
      shouldRate(commonServiceFeatureId) && { content: <RatingMenu currentFeatureId={commonServiceFeatureId} /> },
      { content: this.renderSearchBar(), onClick: null, isSearchBar: true },
      { content: <SyncIcon />, onClick: this.onServiceRequest },
      { content: <ClockCircleIcon />, onClick: handleToggleServicesPendingOrders },
      { content: 'История изменений', onClick: this.onHistoryClick }
    ]

    const commentsHeader = (
      <>Комментарии{comments?.length && <CommentsNum>{comments.filter(c => c.Popup).length}</CommentsNum>}</>
    )

    const commentsAddition = [
      shouldRate(commonCommentsFeatureId) && { content: <RatingMenu currentFeatureId={commonCommentsFeatureId} /> },
      {
        content: 'Показать больше',
        onClick: this.onShowCommentsClick
      }
    ]

    const isCommentsAvailable = !isWebSeller && comments?.some(comment => !!comment.Popup) && !isLeonMode

    const isChangeCodeWordStepActive = this.props.changeCodeWordStep !== CHANGE_CODE_WORD_PROCESS_STEPS.NONE

    const wasLinkedHandlingModalOpened = window.sessionStorage.getItem('wasLinkedHandlingModalOpened')
    const isBalanceAvailable = checkRight(user, 'CC:Balance')
    const isAddOfferWithInteractionPermission = checkRight(user, 'CC:AddOfferWithInteractionPermission')
    const isAddOfferPermission = checkRight(user, 'CC:AddOfferPermission')
    const isServicesPermission = checkRight(user, 'CC:ServiceCategoryRoleRead')
    const isSubscriptionPermission = checkRight(user, 'CC:Subscription')
    const isShowBalance = isWebSeller ? true : (isSubscriberMode || isLeonMode) && isBalanceAvailable
    const isOfferAvailable = isWebSeller
      ? true
      : offersState?.availableOffers?.Offers?.length &&
        isSubscriberMode &&
        (isAddOfferWithInteractionPermission || isAddOfferPermission)

    const isShowOperation = isWebSeller && !isb2b && !isNonSubscriberCard && !isLimitedCard && !isAnonymousCard
    const isShowAnonymousOperation = isWebSeller && !isb2b && !isNonSubscriberCard && !isLimitedCard && isAnonymousCard

    const isNotB2bFirstLevelCard = !(isb2b && isSubscriberFirstLevelCard)

    return (
      <ErrorBoundary>
        {/* WebSeller operations */}
        {isShowRecreateClientModal && <RecreateClient />}
        {isShowTerminationClient && <TerminationClient />}
        {isShowChangingClientStatus && <ChangingClientStatus />}
        {isChangeCodeWordStepActive && <ChangeCodeWord />}
        {isShowMnpOrderStepper && <MnpOrderStepper />}
        {/************************/}
        {isSubscriberMode && <ServiceHistoryModal />}
        <LinkedHandlingModal
          isLinkedHandlingToggled={!wasLinkedHandlingModalOpened && processingParameters?.IsOtherHandling}
          handleToggleLinkedHandlingModal={toggleLinkedHandlingModalVisibility}
        />
        <MnpOrder />
        {!isWebSeller && <MnpQuestionnaire />}
        {!isWebSeller && SubscriberCounts.SubscriberTotalCount > 1 && (
          <Subscribers
            subscribersState={subscribersState}
            isPersonalAccountLoading={isPersonalAccountLoading}
            subscriberCounts={SubscriberCounts}
            changeAbonentsModalVisibility={changeAbonentsModalVisibility}
          />
        )}
        {isWebSeller &&
          !isAnonymousCard &&
          !(isb2b && isSubscriberFirstLevelCard) &&
          SubscriberCounts.SubscriberTotalCount > 1 && (
          <Subscribers
            subscribersState={subscribersState}
            isPersonalAccountLoading={isPersonalAccountLoading}
            subscriberCounts={SubscriberCounts}
            changeAbonentsModalVisibility={changeAbonentsModalVisibility}
          />
        )}
        <>
          <FirtRow>
            {isShowOperation && <Operations isForbiddenMode={hasRequiredMarkersInWebSeller} />}
            {isShowAnonymousOperation && (
              <AnonymousOperations isForbiddenMode={hasRequiredMarkersInWebSeller} />
            )}
            {isOfferAvailable && (
              <Card
                isForbiddenMode={hasRequiredMarkersInWebSeller}
                flex={2}
                header='Предложения'
                additional={[shouldRate(offersId) && { content: <RatingMenu currentFeatureId={offersId} /> }]}
                isContentLoading={
                  offersState.isLoadingOffers || offersState.isLoadingAddOffer || offersState.isLoadingDeleteOffer
                }
                content={<Offers isDelayedHandling={delayedHandling} />}
              />
            )}
          </FirtRow>
          {isWebSeller && !isAnonymousCard && isNotB2bFirstLevelCard && (
            <Card
              isForbiddenMode={hasRequiredMarkersInWebSeller}
              flex={1}
              additional={[
                shouldRate(commonBalanceAccountFeatureId) && {
                  content: <RatingMenu currentFeatureId={commonBalanceAccountFeatureId} />
                }
              ]}
              header={`Баланс лицевого счета ${personalAccountNumber}`}
              isContentLoading={balance.isBalanceLoading}
              content={<BalanceAccountTable {...balance} isASSeller={isWebSeller} />}
            />
          )}
          {!isWebSeller && (
            <Card
              isForbiddenMode={hasRequiredMarkersInWebSeller}
              flex={1}
              additional={[
                shouldRate(commonBalanceAccountFeatureId) && {
                  content: <RatingMenu currentFeatureId={commonBalanceAccountFeatureId} />
                }
              ]}
              header={`Баланс лицевого счета ${personalAccountNumber}`}
              isContentLoading={balance.isBalanceLoading}
              content={<BalanceAccountTable {...balance} isASSeller={isWebSeller} />}
            />
          )}
          {isCommentsAvailable && !isWebSeller && (
            <Card
              isForbiddenMode={hasRequiredMarkersInWebSeller}
              header={commentsHeader}
              additional={commentsAddition}
              isContentLoading={isCommentsLoading}
              content={<Comments comments={comments} />}
            />
          )}
          {isShowBalance && (
            <Card
              isForbiddenMode={hasRequiredMarkersInWebSeller}
              header='Финансы'
              additional={financeAdditional}
              menu={getFinanceMenu(match, isLeonMode, user, isWebSeller)}
              isContentLoading={balance.isBalanceLoading}
              content={<FinanceSubscriber isASSeller={isWebSeller} />}
            />
          )}
          {isGroupCardRender && isSubscriberMode && (
            <Card
              isForbiddenMode={hasRequiredMarkersInWebSeller}
              header='Группы абонента'
              isContentLoading={isGroupListLoading}
              additional={groupsAddition}
              defaultHidden={isGroupHidden}
              content={
                <Groups
                  isDeleteGroupUser={isDeleteGroupUser}
                  personalAccount={personalAccount}
                  groupList={groupList}
                  groupInfo={groupInfo}
                  discounts={discounts}
                  groupsSubscribers={groupsSubscribers}
                  fetchDiscountsList={fetchDiscountsList}
                  clearDiscountsList={clearDiscountsList}
                  fetchSubscribersList={fetchSubscribersList}
                  clearSubscribersList={clearSubscribersList}
                  fetchGroupList={fetchGroupList}
                  deleteGroup={deleteGroup}
                  validateAutopayService={validateAutopayService}
                  getUnpaidChargeDataAndShowAlert={getUnpaidChargeDataAndShowAlert}
                  handlingId={handlingId}
                  processingParameters={processingParameters}
                  fetchGroupNotificationMessages={fetchGroupNotificationMessages}
                />
              }
            />
          )}
          {(isSubscriberMode || isLeonMode) && isServicesPermission && !isWebSeller && (
            <Card
              isForbiddenMode={hasRequiredMarkersInWebSeller}
              header='Услуги'
              additional={serviceAddition}
              isContentLoading={isConnectedServicesLoading}
              content={<ServiceTable connectedServices={connectedServices} isScrollEnable />}
            />
          )}
          {isSubscriberMode && isSubscriptionPermission && !isWebSeller && (
            <Card
              isForbiddenMode={hasRequiredMarkersInWebSeller}
              header='Подписки'
              additional={subscriptionsAddition}
              isContentLoading={isActiveSubscriptionsLoading}
              content={
                <Subscriptions
                  activeSubscriptions={activeSubscriptions}
                  isActiveSubscriptionsLoading={isActiveSubscriptionsLoading}
                  personalAccount={personalAccount}
                  contentBalance={contentBalance}
                  location={location}
                  handlingId={handlingId}
                  onUnsubscribe={this.onUnsubscribe}
                  isUnsubscribeLoading={isUnsubscribeLoading}
                />
              }
            />
          )}
        </>
      </ErrorBoundary>
    )
  }
}

export default CommonInformation

const FirtRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const ClockCircleIcon = styled(ClockCircleOutlined)`
  font-size: 21px;
`
const SyncIcon = styled(SyncOutlined)`
  font-size: 21px;
`
const Label = styled.div`
  border-bottom: 1px solid rgb(127, 130, 133);
  padding-bottom: 1px;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}

  &:hover {
    border-color: #40bfee;
  }
`

const CommentsNum = styled.span`
  margin-left: 8px;
  color: #7f8285;
  opacity: 75%;
`

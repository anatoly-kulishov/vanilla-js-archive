/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent } from 'react'
import propTypes from './constants/propTypes'
import { notification } from 'antd'
import { get } from 'lodash'
import CardNew from 'components/Card'
import ErrorBoundary from 'components/ErrorBoundary'
import BalanceAccountTable from 'containers/Balances/BalanceAccountTable'
import FinanceSubscriber from 'containers/Balances'
import FundsFlow from './components/FundsFlow'
// import FinanceCard from './components/FinanceCard'
import { checkRight } from 'utils/helpers'
import open from 'utils/helpers/windowOpener'
import RatingMenu from 'containers/RatingMenu'
import ClientFilter from './components/ClientFilter'
import { shouldRate } from 'containers/RatingMenu/shouldRate'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
import { cardModes } from 'constants/cardModes'
import { getTypeCard } from 'webseller/helpers'
import { CLIENT_TYPE_NAMES } from 'webseller/constants/clientCategory'

const { financeFeatureId, ddsFeatureId } = ratingFeatureIds

export default class Finance extends PureComponent {
  static propTypes = propTypes
  state = {
    clientType: 0
  }

  handleClientFilterChange = clientType => {
    this.setState({ clientType })
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

  generatePathForFirstCard = (location, match, firstTabName) =>
    `${location.pathname.replace(
      location.pathname.substring(match.url.length, location.pathname.lastIndexOf('/')),
      `/${firstTabName}`
    )}`

  getFinanceMenu (isLeon, isASSeller) {
    const { isb2b, isAnonymousCard, isSubscriberFirstLevelCard } = getTypeCard(isASSeller)

    if (isLeon) {
      return [
        { path: this.generatePathForFirstCard(location, this.props.match, 'balance'), text: 'Балансы' },
        { path: this.generatePathForFirstCard(location, this.props.match, 'remains'), text: 'Остатки' },
        { path: this.generatePathForFirstCard(location, this.props.match, 'payinf'), text: 'Платежная информация' }
      ]
    }
    if (isAnonymousCard || (isb2b && isSubscriberFirstLevelCard)) {
      return [
        { path: this.generatePathForFirstCard(location, this.props.match, 'balance'), text: 'Балансы' },
        { path: this.generatePathForFirstCard(location, this.props.match, 'remains'), text: 'Остатки' }
      ]
    }
    return [
      { path: this.generatePathForFirstCard(location, this.props.match, 'balance'), text: 'Балансы' },
      { path: this.generatePathForFirstCard(location, this.props.match, 'remains'), text: 'Остатки' },
      { path: this.generatePathForFirstCard(location, this.props.match, 'operations'), text: 'Операции' }
    ]
  }

  generatePathForSecondCard = (location, secondCardTabName) =>
    `${location.pathname.substring(0, location.pathname.lastIndexOf('/'))}/${secondCardTabName}`

  clearMessages = () => {
    const { clearCompensationsMessages, clearValidationMessages } = this.props
    clearCompensationsMessages()
    clearValidationMessages()
  }

  handleCompensationHistoryModalOpen = () => {
    const { changeCompensationsHistoryModalVisibility } = this.props

    changeCompensationsHistoryModalVisibility()
  }

  foundsFlowCardMenu = (isASSeller) => {
    const { isb2b, isUnionEnv, isSubscriberFirstLevelCard } = getTypeCard(isASSeller)
    const clientTypeName = this.props?.personalAccount?.SubscriberFullInfo?.SubscriberClientInfo?.ClientTypeName

    if (isASSeller && isb2b && isSubscriberFirstLevelCard) {
      if (isUnionEnv || clientTypeName === CLIENT_TYPE_NAMES.MEDIUM_BUSINESSES) {
        return [
          { path: this.generatePathForSecondCard(location, 'payments'), text: 'Платежи' },
          { path: this.generatePathForSecondCard(location, 'costs'), text: 'Расходы' }
        ]
      }

      return [
        { path: this.generatePathForSecondCard(location, 'payments'), text: 'Платежи' }
      ]
    }

    return [
      { path: this.generatePathForSecondCard(location, 'resources'), text: 'Всё сразу' },
      { path: this.generatePathForSecondCard(location, 'payments'), text: 'Платежи' },
      { path: this.generatePathForSecondCard(location, 'costs'), text: 'Расходы' },
      { path: this.generatePathForSecondCard(location, 'invoices'), text: 'Счета' }
    ]
  }

  render = () => {
    const {
      location,
      match,
      personalAccount,
      balance,
      payments,
      servicesState,
      fetchPaymentsHistory,
      fetchPaymentsHistoryFilters,
      fetchInvoicesHistory,
      fetchCostsHistory,
      fetchResourcesHistory,
      getChargeServiceList,
      fetchDigestId,
      resetDigestId,
      user,
      cancelCompensation,
      modifyCompensation,
      fetchPaydComments,
      paydComments,
      handlingId,
      cardMode
    } = this.props
    const { isASSeller } = user
    const { clientType } = this.state

    const clientTypeName = get(personalAccount, 'SubscriberFullInfo.SubscriberClientInfo.ClientTypeName', null)
    const personalAccountNumber = get(personalAccount, 'ParentClientInfo.PersonalAccountId', null)
    const ClientCategory = get(personalAccount, 'ClientCategory', null)

    const isB2b = ClientCategory === 'B2B'
    const isB2c = ClientCategory === 'B2C'

    const { isb2b, isSubscriberFirstLevelCard, isAnonymousCard, isNonSubscriberCard, isUnionEnv } = getTypeCard(isASSeller)

    const isOperationsTab = location.pathname.includes('/operations')
    const isResourcesTab = location.pathname.includes('/resources')
    const isCompensationRights = checkRight(user, 'CC:PaydComp')
    const isBalanceAvailable = isASSeller ? true : checkRight(user, 'CC:Balance')
    const isUnionOrSmallBusiness = (isb2b && isSubscriberFirstLevelCard) && (isUnionEnv || clientTypeName === CLIENT_TYPE_NAMES.SMALL_BUSINESS)
    const isNotB2bFirstLevelCard = !(isb2b && isSubscriberFirstLevelCard)

    const financeAdditional = [
      shouldRate(financeFeatureId) && { content: <RatingMenu currentFeatureId={financeFeatureId} /> },
      isB2b && isNotB2bFirstLevelCard &&
        !isOperationsTab && { content: 'Предоставить отчетные документы', onClick: this.handleCreatingDocuments },
      isCompensationRights &&
        isOperationsTab && { content: 'История компенсаций', onClick: () => this.handleCompensationHistoryModalOpen() }
    ]

    const foundsFlowAddition = [
      shouldRate(ddsFeatureId) && { content: <RatingMenu currentFeatureId={ddsFeatureId} /> },
      !isResourcesTab && {
        content: <ClientFilter clientType={clientType} onChange={this.handleClientFilterChange} isB2c={isB2c} />,
        isSearchBar: true
      }
    ]

    const menuItems = this.getFinanceMenu(cardMode === cardModes.leon, isASSeller)

    return (
      <ErrorBoundary>
        {isASSeller && (isNotB2bFirstLevelCard || isUnionOrSmallBusiness) && (
          <CardNew
            defaultHidden
            header={`Баланс лицевого счета ${personalAccountNumber}`}
            isContentLoading={balance.isBalanceLoading}
            content={<BalanceAccountTable {...balance} isASSeller={isASSeller} />}
          />
        )}
        {!isASSeller && (
          <CardNew
            defaultHidden
            header={`Баланс лицевого счета ${personalAccountNumber}`}
            isContentLoading={balance.isBalanceLoading}
            content={<BalanceAccountTable {...balance} />}
          />
        )}
        {/* <FinanceCard /> */}
        {isBalanceAvailable && (
          <CardNew
            header='Финансы'
            menu={menuItems}
            additional={financeAdditional}
            isContentLoading={balance.isBalanceLoading}
            content={<FinanceSubscriber />}
          />
        )}
        {!isAnonymousCard && !isNonSubscriberCard && (
          <CardNew
            header='Денежные средства'
            menu={this.foundsFlowCardMenu(isASSeller)}
            additional={foundsFlowAddition}
            isContentLoading={
              payments.isPaymentsHistoryLoading ||
            payments.isCostsHistoryLoading ||
            payments.isResourcesHistoryLoading ||
            payments.isInvoicesHistoryLoading
            }
            isHeaderLimited
            content={
              <FundsFlow
                isB2c={isB2c}
                match={match}
                personalAccount={personalAccount}
                payments={payments}
                clientType={clientType}
                servicesState={servicesState}
                fetchPaymentsHistory={fetchPaymentsHistory}
                fetchPaymentsHistoryFilters={fetchPaymentsHistoryFilters}
                fetchInvoicesHistory={fetchInvoicesHistory}
                fetchCostsHistory={fetchCostsHistory}
                fetchResourcesHistory={fetchResourcesHistory}
                digestId={payments.digestId}
                fetchDigestId={fetchDigestId}
                resetDigestId={resetDigestId}
                getChargeServiceList={getChargeServiceList}
                generatePathForSecondCard={this.generatePathForSecondCard}
                handleClientFilterChange={this.handleClientFilterChange}
                user={user}
                cancelCompensation={cancelCompensation}
                modifyCompensation={modifyCompensation}
                fetchPaydComments={fetchPaydComments}
                paydComments={paydComments}
                handlingId={handlingId}
                cardMode={cardMode}
              />
            }
          />
        )}
      </ErrorBoundary>
    )
  }
}

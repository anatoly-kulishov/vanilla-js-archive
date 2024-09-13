import React, { useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Switch, useRouteMatch } from 'react-router-dom'

import BalancesLayouts from './BalancesRouter'

import BalancesSubscriber from './BalancesSubscriber'
import FinanceOperations from './FinanceOperations'
import PaymentInformation from './PaymentInformation'
import Remains from 'components/Remains'
import { PersonalAccountStateProps } from 'constants/personalAccount'
import AppRoute from 'components/AppRoute'
FinanceSubscriber.propTypes = {
  quantumData: PropTypes.object,
  detailsData: PropTypes.object,
  trustCreditInfo: PropTypes.object,
  balance: PropTypes.object,
  personalAccount: PersonalAccountStateProps,
  mnpMarkers: PropTypes.object,
  mixxBalance: PropTypes.string,

  getBalance: PropTypes.func,
  getRemainsDetailsData: PropTypes.func,
  getQuantumData: PropTypes.func,
  getTrustCreditInfo: PropTypes.func,
  getMixxBalance: PropTypes.func,
  fetchPaymentsUrl: PropTypes.func
}

const { DefaultLayout, ProtectedLayout } = BalancesLayouts

export default function FinanceSubscriber (props) {
  const { url } = useRouteMatch()
  const { mnpMarkers, isASSeller } = props

  useLayoutEffect(() => {
    const {
      personalAccount: {
        Msisdn: msisdn,
        BaseFunctionalParams: { AppMode }
      },
      getRemainsDetailsData,
      getQuantumData,
      getTrustCreditInfo,
      getMixxBalance,

      quantumData,
      detailsData,

      mixxBalance,

      trustCreditInfo
    } = props

    const isMixxCustomer = AppMode === 'MixxCustomer'

    !detailsData && getRemainsDetailsData({ msisdn })
    !quantumData && getQuantumData({ msisdn })
    !trustCreditInfo && getTrustCreditInfo({ msisdn })
    isMixxCustomer && !mixxBalance && getMixxBalance({ msisdn })
  }, [])

  useEffect(() => {
    const {
      getBalance,
      personalAccount: {
        PersonalAccountId: accountNumber,
        OwnerClientId: parentClientId,
        Msisdn: msisdn,
        BillingBranchId: branchId,
        ClientCategory: clientCategory,
        ClientId: clientId
      },
      balance
    } = props

    if (!balance && mnpMarkers?.PayPackPersonalAccount && !isASSeller) {
      getBalance({
        msisdn,
        personalAccountId: accountNumber,
        branchId,
        clientCategory,
        clientId,
        parentClientId,
        payPackPersonalAccountId: mnpMarkers?.PayPackPersonalAccount
      })
    }
  }, [mnpMarkers?.PayPackPersonalAccount])

  useEffect(() => {
    const {
      personalAccount: { BillingBranchId: branchId, ClientCategory: clientCategory },
      fetchPaymentsUrl
    } = props
    const accountNumber = mnpMarkers?.PayPackPersonalAccount
    if (accountNumber) {
      fetchPaymentsUrl({ accountNumber, branchId, clientCategory })
    }
  }, [mnpMarkers?.PayPackPersonalAccount])

  return (
    <Switch>
      <AppRoute path={`${url}/balance`} layout={DefaultLayout} component={BalancesSubscriber} />
      <AppRoute path={`${url}/remains`} layout={DefaultLayout} component={Remains} />
      <AppRoute path={`${url}/operations`} layout={ProtectedLayout} component={FinanceOperations} />
      <AppRoute path={`${url}/payinf`} layout={DefaultLayout} component={PaymentInformation} />
    </Switch>
  )
}

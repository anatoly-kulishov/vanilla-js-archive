import { useEffect, useState } from 'react'
import { clientCategories } from 'constants/personalAccountStrings'
import { SUBS_PER_PAGE_COUNT } from 'constants/subscriberList'
import { isEqual } from 'lodash'
import qs from 'query-string'

import { getTypeCard } from 'webseller/helpers'

export function usePersonalAccount (props) {
  const {
    layout,
    queryParams: {
      msisdn,
      email,
      interactionType,
      serviceChannelId,
      regionName,
      ivrHistory,
      clientId,
      branchId,
      dialogChannel,
      dialogNickname,
      dialogId,
      interactionAddress,
      delayedHandling
    },
    passQueryParams,
    getPersonalAccount,
    personalAccount,
    fetchParametersProcessing,
    fetchSubscriberStatuses,
    getSubscriberList,
    fetchAllocatedInfo,
    processingParameters,
    isWhoIsItLoading,
    user
  } = props

  const [isQueryParamsChanged, setQueryParamsChanged] = useState(false)
  const [isPersonalAccountRequested, setPersonalAccountRequested] = useState(false)
  const [isParametersProcessingRequested, setParametersProcessingRequested] = useState(false)
  const [isHandlingRequested, setHandlingRequested] = useState(false)

  const { isSubscriberSecondLevelCard } = getTypeCard(user.isASSeller)

  useEffect(() => {
    const {
      queryParams: { msisdn: msisdnState, email: emailState, clientId, branchId }
    } = props
    const params = { ...qs.parse(window.location.search + window.location.hash) }
    if (!msisdnState) {
      let msisdn = params.msisdn || ''
      let email = params.email || ''

      if (params.MSISDN) {
        msisdn = params.MSISDN
        params.msisdn = msisdn
      }
      if (params.interactionAddress) {
        if (params.interactionType === '0' || params.interactionType === '1') {
          msisdn = params.interactionAddress
        }
        if (params.interactionType === '2') {
          email = params.interactionAddress
        }

        params.email = email
        params.msisdn = msisdn
      }

      const isInteractionChanged = !isEqual(msisdn, msisdnState) || !isEqual(email, emailState)
      if (isInteractionChanged) {
        document.title = `${layout}: ${msisdn || email}`
        passQueryParams(params)
        setQueryParamsChanged(true)
      }
    }

    if (!isEqual(params.clientId, clientId) || !isEqual(params.branchId, branchId)) {
      passQueryParams(params)
      setQueryParamsChanged(true)
    }
  }, [msisdn, email, clientId, branchId])

  useEffect(() => {
    const {
      queryParams: { msisdn, email, interactionType, clientId, branchId }
    } = props
    if ((msisdn || email || dialogNickname || (clientId && branchId)) && !isPersonalAccountRequested && !personalAccount) {
      getPersonalAccount({ msisdn, email, interactionType, clientId, branchId })
      setPersonalAccountRequested(true)
    }
    if (personalAccount && isQueryParamsChanged) {
      getPersonalAccount({ msisdn, email, interactionType, clientId, branchId })
      setPersonalAccountRequested(true)
    }
  }, [msisdn, email, branchId, clientId])

  useEffect(() => {
    if (!isParametersProcessingRequested && isPersonalAccountRequested && personalAccount) {
      const {
        personalAccount: { BillingBranchId, ClientId, ClientCategory },
        queryParams: { serviceId }
      } = props

      const requestParams = {
        interactionTypeId: interactionType,
        serviceChannelId,
        callAdminRegion: regionName,
        subscriberbranchId: BillingBranchId,
        LastIvrNode: ivrHistory && ivrHistory.replace('#', ''),
        dialogChannel,
        msisdn: msisdn || interactionAddress,
        email,
        dialogNickname,
        dialogId,
        serviceId
      }

      if (isSubscriberSecondLevelCard) {
        requestParams.clientId = clientId
        requestParams.clientBranchId = branchId
      }

      fetchParametersProcessing(requestParams)
      fetchSubscriberStatuses()
      getSubscriberList({
        branchId: BillingBranchId,
        clientId: ClientId,
        firstNumber: 1,
        subscribersCount: SUBS_PER_PAGE_COUNT
      })

      if (ClientCategory && ClientCategory.toUpperCase() !== clientCategories.anonimous) {
        fetchAllocatedInfo()
      }
      setParametersProcessingRequested(true)
    }
  }, [isPersonalAccountRequested, personalAccount])

  useEffect(() => {
    if (!isHandlingRequested && isParametersProcessingRequested && isPersonalAccountRequested && personalAccount && processingParameters && !isWhoIsItLoading) {
      const { createHandling, fetchPopupComment } = props
      const { Msisdn, ClientId, SubscriberId, BillingBranchId } = personalAccount

      delayedHandling !== 'true' && createHandling({ permission: 'CC:CasesHandling' })
      fetchPopupComment({
        ClientId,
        SubsId: SubscriberId,
        Msisdn,
        BranchId: BillingBranchId
      })
      setHandlingRequested(true)
    }
  }, [isParametersProcessingRequested, processingParameters, isWhoIsItLoading])

  useEffect(() => {
    const params = { ...qs.parse(window.location.search + window.location.hash) }
    if (!isEqual(params.delayedHandling, delayedHandling)) {
      passQueryParams(params)
      setQueryParamsChanged(true)
    }
  })
}

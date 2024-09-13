import React, { Fragment, useCallback, useEffect, useMemo } from 'react'
import { object, bool, shape, func, arrayOf } from 'prop-types'
import moment from 'moment'
import { Select } from 'antd'

import { checkRight } from 'utils/helpers'

import PromoFilter from './PromoFilter'
import ServiceGrid from './PromoGrid'

import autoInteractionPropType from 'constants/propTypes/autoInteractionPropType'
import { keyValueArray } from 'constants/propTypes/keyValueArrayPropType'

import FiltersWrapper from '../../components/FiltersWrapper'
import { initialHistoryState, dayStartTime, dayEndTime, HistoryType } from '../../HistoryContext/constants'
import useHistoryContext from '../../HistoryContext/useHistoryContext'

import promoPropType from 'constants/propTypes/promo/promoPropType'
import promoAction from 'constants/promo/promoActions'

export default function Promo ({
  promoHistory,
  promoHistoryFilters,
  isPromoHistoryLoading,
  personalAccount,
  getPromoHistory,
  getPromoHistoryFilters,
  user,
  activatePromo,
  cancelPromo,
  notifyPromo,
  autoInteractionData
}) {
  Promo.propTypes = {
    promoHistory: arrayOf(
      promoPropType
    ),
    isPromoHistoryLoading: bool,
    personalAccount: object,
    getPromoHistory: func,
    user: object,
    promoHistoryFilters: shape({
      Statuses: keyValueArray,
      Campaigns: keyValueArray
    }),
    getPromoHistoryFilters: func,
    activatePromo: func,
    cancelPromo: func,
    notifyPromo: func,
    autoInteractionData: autoInteractionPropType
  }

  useEffect(() => {
    updatePromo(true)
    getPromoHistoryFilters()
  }, [])

  const filtersOptions = useMemo(() => {
    const stateCodes = promoHistoryFilters?.Statuses.map(status => <Select.Option key={status.Key}>{status.Value}</Select.Option>)
    const campaignIds = promoHistoryFilters?.Campaigns.map(campaign => <Select.Option key={campaign.Key}>{campaign.Value}</Select.Option>)

    return { stateCodes, campaignIds }
  }, [promoHistoryFilters])

  const promoRights = useMemo(() => {
    return {
      isActivateRight: checkRight(user, 'CC:ActivatePromoCode'),
      isCancelRight: checkRight(user, 'CC:CancelPromoCode'),
      isAllCancelRight: checkRight(user, 'CC:CancelAllPromoCode'),
      isNotificationRight: checkRight(user, 'CC:NotificationPromoCode')
    }
  }, [user])

  const { filters, methods } = useHistoryContext(HistoryType.Promo)
  const { updateHistoryFilterValue } = methods

  const updatePromo = useCallback((firstRender) => {
    if (personalAccount) {
      const { Msisdn: msisdn } = personalAccount
      const { datePeriodStart, datePeriodFinish, stateCode, campaignId } = filters

      const startDate = firstRender
        ? moment.utc(moment().subtract(6, 'months')).set(dayStartTime).format()
        : moment.utc(datePeriodStart).set(dayStartTime).format()
      const endDate = moment.utc(datePeriodFinish).set(dayEndTime).format()

      getPromoHistory({
        msisdn,
        dateFrom: startDate,
        dateTo: endDate,
        stateCode,
        campaignId
      })
    }
  }, [getPromoHistory, filters])

  const handleFiltersClear = useCallback(() => {
    const { stateCode, campaignId } = initialHistoryState.filters
    const datePeriodStart = moment().subtract(6, 'months')
    const datePeriodFinish = moment()
    updateHistoryFilterValue({
      datePeriodStart,
      datePeriodFinish,
      stateCode,
      campaignId
    })
  }, [updateHistoryFilterValue])

  const handlePromo = useCallback((action, promo) => {
    const { Msisdn: msisdn } = personalAccount
    const { PromocodeValue: promocodeValue, PromocodeId: promocodeId, CampaignId: promocodeCampaignId } = promo
    const { datePeriodStart, datePeriodFinish, stateCode, campaignId } = filters
    const startDate = moment.utc(datePeriodStart).set(dayStartTime).format()
    const endDate = moment.utc(datePeriodFinish).set(dayEndTime).format()

    const filtersValue = {
      dateFrom: startDate,
      dateTo: endDate,
      stateCode,
      campaignId,
      msisdn
    }

    switch (action) {
      case promoAction.activate:
        activatePromo({
          msisdn,
          promocodeValue,
          filtersValue,
          ...autoInteractionData
        })
        break
      case promoAction.cancel:
        cancelPromo({
          msisdn,
          promocodeValue,
          promocodeId,
          promocodeCampaignId,
          filtersValue,
          ...autoInteractionData
        })
        break
      case promoAction.notify:
        notifyPromo({
          msisdn,
          promocodeValue,
          promocodeId,
          filtersValue,
          ...autoInteractionData
        })
    }
  }, [personalAccount, filters, activatePromo, cancelPromo, notifyPromo])

  return (
    <Fragment>
      <FiltersWrapper>
        <PromoFilter
          filters={filters}
          filtersOptions={filtersOptions}
          onSubmit={updatePromo}
          onClear={handleFiltersClear}
          onFilterChange={updateHistoryFilterValue}
        />
      </FiltersWrapper>
      <ServiceGrid
        promoRights={promoRights}
        promoHistory={promoHistory}
        isPromoHistoryLoading={isPromoHistoryLoading}
        handlePromo={handlePromo}
      />
    </Fragment>
  )
}

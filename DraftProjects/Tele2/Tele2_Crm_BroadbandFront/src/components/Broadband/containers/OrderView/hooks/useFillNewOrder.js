import { useEffect, useState } from 'react'
import moment from 'moment'

import { fillForm } from 'components/Broadband/helpers/broadband'
import { StateStatus } from 'context/constants/initialState'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { AddressTypes } from 'constants/address'
import { getInstallationAddress } from 'helpers/address'

function fillFullName (subscriberFullName) {
  if (!subscriberFullName) {
    return { fullNameState: {}, contactOwner: '' }
  }
  const [lastName, firstName, ...rest] = subscriberFullName.split(' ')
  const middleName = rest.join(' ')
  const contactOwner = `${lastName} ${firstName}`
  const fullNameState = {
    LastName: lastName,
    FirstName: firstName,
    MiddleName: middleName,
    NickName: subscriberFullName
  }
  return { fullNameState, contactOwner }
}

function fillMsisdn (msisdn, isAnonymous, contactOwner) {
  if (msisdn && msisdn !== 'null') {
    const msisdnData = !isAnonymous ? { Msisdn: msisdn } : {}
    const contactsData = {
      Contacts: [
        {
          ContactTypeId: 2,
          ContactOwner: contactOwner,
          ContactData: msisdn
        }
      ]
    }
    return { ...msisdnData, ...contactsData }
  }
  return {}
}

export function useFillNewOrder (form, isCreating, formInitData) {
  const {
    orderState,
    changeMainFormState,
    regionIsoCodeState,
    checkSubscriberTariff,
    changeContextState,
    autoActions,
    getAddressSuggestion,
    addressSuggestion
  } = useBroadbandContext()
  const { isAnonymous, billingBranchId, subscriberFullName, birthDate, msisdn, serviceChannelId, subscriberId } =
    formInitData

  const [formPrefilled, setFormPrefilled] = useState(false)
  const [birthDatePrefilled, setBirthDatePrefilled] = useState(false)

  useEffect(() => {
    const regionIsoStatus = autoActions.regionIsoCode
    if (regionIsoStatus === StateStatus.NeedAction) {
      const regionState = {
        OrderRegionCode: regionIsoCodeState?.RegionIsoCode
      }
      changeMainFormState(regionState)
      changeContextState({ autoActions: { ...autoActions, regionIsoCode: StateStatus.Done } })
      form.setFieldsValue(regionState)
    }
  }, [autoActions, regionIsoCodeState])

  // prefill form
  useEffect(() => {
    if (!isCreating || formPrefilled) {
      return
    }

    const { fullNameState, contactOwner } = fillFullName(subscriberFullName)

    const msisdnState = fillMsisdn(msisdn, isAnonymous, contactOwner)
    const isMnp = isAnonymous ? { IsMnp: false } : {}
    const newOrderData = {
      ...fillForm(orderState, {}),
      ...fullNameState,
      ...msisdnState,
      ...isMnp
    }

    form.setFieldsValue(newOrderData)
    changeMainFormState({
      ...newOrderData,
      SubscriberId: subscriberId,
      SubscriberBranchId: billingBranchId,
      ContactPoint: null,
      SystemId: 5,
      ChannelId: serviceChannelId
    })
    setFormPrefilled(true)
  }, [isCreating])

  // prefill birthday date
  useEffect(() => {
    if (!isCreating || birthDatePrefilled || !birthDate) {
      return
    }

    let birthDateMoment = birthDate && moment(birthDate)
    if (!birthDateMoment || birthDateMoment?.isBefore('1900-01-01')) {
      birthDateMoment = undefined
    }
    const birthDateState = { Birthday: birthDateMoment }
    form.setFieldsValue(birthDateState)
    changeMainFormState(birthDateState)
    setBirthDatePrefilled(true)
  }, [birthDate])

  // Fill Agreement.Tariff with type=`tariff` item from `BroadbandConnectionTariff/Available`
  const [isAgreementTariffChecked, setAgreementTariffChecked] = useState(false)
  useEffect(() => {
    if (!isCreating || isAgreementTariffChecked) {
      return
    }
    if (orderState?.OrderRegionCode) {
      const { subscriberId, msisdn, billingBranchId, billingBranchIdReserve } = formInitData
      const params = {
        SubscriberId: subscriberId,
        BranchId: billingBranchId ?? billingBranchIdReserve,
        Msisdn: msisdn,
        OrderRegionCode: orderState.OrderRegionCode
      }
      checkSubscriberTariff(params)
      setAgreementTariffChecked(true)
    }
  }, [orderState, formInitData, isAgreementTariffChecked])

  useEffect(() => {
    if (isCreating && regionIsoCodeState) {
      const { RegionName, RegionIsoCode } = regionIsoCodeState
      const shortRegionName = RegionName?.slice(0, 3)
      const searchParams = { query: shortRegionName, regionCode: RegionIsoCode, searchType: 'Region' }
      getAddressSuggestion({ searchParams, addressType: AddressTypes.Installation })
    }
  }, [regionIsoCodeState])

  const [isRegionFilled, setIsRegionFilled] = useState(false)
  const installationAddress = getInstallationAddress(orderState)

  useEffect(() => {
    if (!installationAddress?.RegionName && addressSuggestion?.installationAddress?.Region && !isRegionFilled) {
      const addressData = {
        [AddressTypes.Installation]: {
          Region: {
            label: addressSuggestion.installationAddress.Region?.[0]?.Value,
            value: addressSuggestion.installationAddress.Region?.[0]?.Key
          }
        }
      }
      changeMainFormState(addressData)
      form.setFieldsValue(addressData)
      setIsRegionFilled(true)
    }
  }, [addressSuggestion, installationAddress])
}

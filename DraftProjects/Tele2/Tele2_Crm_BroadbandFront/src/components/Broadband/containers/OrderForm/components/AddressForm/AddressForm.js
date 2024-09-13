/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useCallback, useMemo, useState } from 'react'
import { debounce, isString } from 'lodash-es'
import styled, { createGlobalStyle } from 'styled-components'
import { Button, Popconfirm, Tag, notification } from 'antd'

import {
  getSearchFunction,
  concatAndTrimStrings,
  EmptyFieldError,
  checkFields
} from 'components/Broadband/helpers/address'
import { AddressTypes } from 'constants/address'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { getInstallationAddress } from 'helpers/address'

import CheckAddressResult from './CheckAddressResult'
import SelectItem from './SelectItem'
import InputItem from './InputItem'
import DisabledTooltip from './DisabledTooltip'
import { getSpeedToTechnologyParams } from 'helpers/speedToTechnology'
import AutoCompleteItem from './AutoCompleteItem'

function getCheckAddressParams (orderState, orderStatusState, isFormDisabled) {
  const installationAddress = getInstallationAddress(orderState) ?? {}
  const {
    DistrictName,
    CityName,
    LocalityName,
    StreetType,
    StreetName,
    PostIndex,
    BuildingName,
    BuildingType,
    RegionCode,
    Entrance,
    Floor,
    FlatName,
    HouseName,
    FullAddress,
    HouseId,
    StreetId,
    RegionId,
    CityId,
    Block,
    RegionName
  } = installationAddress
  const {
    Person: { FirstName, MiddleName, LastName },
    SystemId,
    SubscriberId,
    Msisdn,
    RtcOrderId,
    IsOnlime,
    RtcTimeSlotId,
    Relocation
  } = orderState
  const { statusId } = orderStatusState
  return {
    District: DistrictName,
    City: CityName,
    Locality: LocalityName,
    Street: StreetName ? concatAndTrimStrings([StreetType, StreetName]) : null,
    PostCode: PostIndex,
    House: BuildingName ? concatAndTrimStrings([HouseName, BuildingType, BuildingName]) : HouseName,
    OrderRegionCode: RegionCode,
    Entrance: Entrance,
    Floor: Floor,
    Flat: FlatName,
    FullAddress: FullAddress,
    Settlement: LocalityName,
    Region: RegionName,
    Area: DistrictName,
    HouseFiasId: HouseId,
    StreetFiasId: StreetId,
    CityFiasId: CityId,
    RegionFiasId: RegionId,
    Block: Block,
    Name: FirstName,
    Surname: LastName,
    MiddleName: MiddleName,
    Channel: SystemId?.toString(),
    SubscriberId: SubscriberId,
    Msisdn: Msisdn,
    RtcOrderId: RtcOrderId,
    IsOnlime: IsOnlime,
    StatusId: statusId,
    RtcTimeSlotId: RtcTimeSlotId,
    IsDeleteOrder: isFormDisabled,
    Relocation: Relocation ? true : undefined
  }
}

export default function AddressForm (props) {
  const { form, isFormDisabled, areControlsDisabled } = props

  const {
    addressSuggestion,
    checkAddressState,
    order,
    orderState,
    orderStatusState,
    getAddressSuggestion,
    checkAddress,
    changeMainFormState,
    recheckAddress,
    formInitData
  } = useBroadbandContext()

  const { subscriberRatePlanId } = formInitData ?? {}

  const [searchMade, setSearchMade] = useState(false)

  const installationAddress = getInstallationAddress(orderState)
  const isAddressChecked = useMemo(() => {
    return !!installationAddress?.OrponId
  }, [installationAddress])

  const [isCheckNeeded] = useMemo(() => {
    const isCheckNeeded = !installationAddress?.OrponId || !installationAddress?.PostIndex
    return [isCheckNeeded]
  }, [installationAddress])

  const isCheckButtonDisabled = useMemo(() => {
    const house = installationAddress?.HouseName
    return isAddressChecked || !house || (isCheckNeeded && !searchMade)
  }, [installationAddress, isAddressChecked, isCheckNeeded, searchMade])

  const searchFunction = useCallback(
    getSearchFunction(form, getAddressSuggestion, AddressTypes.Installation, setSearchMade),
    [form, getAddressSuggestion]
  )
  const handleSearch = useCallback(
    debounce((searchText, searchType) => {
      if (searchText) {
        searchFunction(addressSuggestion, searchText, searchType)
      }
    }, 500),
    [addressSuggestion, searchFunction]
  )

  const handleDeleteAddress = useCallback(() => {
    form.resetFields([[AddressTypes.Installation, 'Address']])
    changeMainFormState({
      [AddressTypes.Installation]: { Address: undefined, City: undefined, Street: undefined, House: undefined }
    })
  }, [])

  const handleAddressCheck = useCallback(() => {
    const { Relocation: isRelocation, Msisdn } = orderState
    const { subscriberId, billingBranchId, userRights } = formInitData
    const { isRelocationCheckbox } = userRights
    try {
      checkFields(form, ['LastName', 'FirstName'])
      const checkAddressParams = getCheckAddressParams(orderState, orderStatusState, isFormDisabled)
      const speedToTechParams = { ...getSpeedToTechnologyParams(orderState, subscriberRatePlanId) }
      const relocationInfoParams = {
        data: {
          Msisdn,
          SubscriberId: subscriberId,
          SubscriberBranchId: billingBranchId
        },
        permissions: {
          isRelocationCheckbox,
          isRelocation
        }
      }
      checkAddress({ checkAddressParams, speedToTechParams, relocationInfoParams })
    } catch (error) {
      notification.error({
        message: 'Недостаточно данных на форме заявки ШПД',
        description: error instanceof EmptyFieldError ? 'Пожалуйста, проверьте поля `Фамилия`, `Имя`' : error.message
      })
    }
  }, [form, orderState, orderStatusState, isFormDisabled])

  const originalAddressData = order.data?.Address?.OriginalAddressText
  const handleAddressRecheck = useCallback(() => {
    const params = { query: originalAddressData, count: 1 }
    recheckAddress({ params, addressType: AddressTypes.Installation })
    setSearchMade(true)
  }, [originalAddressData, recheckAddress])

  const handleSelect = (name, value) => {
    form.setFieldsValue({ [name]: value })
  }

  const isFieldDisabled = useCallback((addressType, fieldName) => {
    const fieldValue = form.getFieldValue([addressType, fieldName])
    return !fieldValue?.value && !fieldValue?.label
  }, [])

  const rtcTimeslotId = orderState?.RtcTimeSlotId
  const isTimeslotReserved = useMemo(() => isString(rtcTimeslotId), [rtcTimeslotId])

  const suggestionsData = addressSuggestion.installationAddress
  const suggestionOptions = useMemo(() => {
    const region = suggestionsData?.Region?.map(suggestion => ({ Key: suggestion.Key, Value: suggestion.Value })) ?? []
    const address =
      suggestionsData?.Address?.map(suggestion => ({
        Key: suggestion.Value,
        Value: suggestion.Value
      })) ?? []
    return { region, address }
  }, [suggestionsData])

  const [originalAddress, isRecheckButtonDisabled] = useMemo(() => {
    const originalAddress = originalAddressData ?? ''
    const isButtonDisabled = !originalAddress || installationAddress?.OrponId
    return [originalAddress, isButtonDisabled]
  }, [originalAddressData, installationAddress])

  return (
    <>
      <TooltipStyle />
      <Divider />
      <SubHeaderWrapper>
        <SubHeader>Адрес</SubHeader>
        {originalAddress}
        <CheckInfoWrapper>
          {isCheckNeeded && <CheckTag color='error'>Требуется проверка</CheckTag>}
          <RecheckButton
            size='small'
            disabled={isRecheckButtonDisabled || areControlsDisabled}
            onClick={handleAddressRecheck}
          >
            Перепроверить адрес
          </RecheckButton>
        </CheckInfoWrapper>
      </SubHeaderWrapper>
      <FormGrid>
        <SelectItem
          itemName={[AddressTypes.Installation, 'Region']}
          label='Регион'
          dataTid='select__broadband-form__address-region'
          onSearch={text => handleSearch(text, 'Region')}
          disabled={isTimeslotReserved || areControlsDisabled}
          options={suggestionOptions.region}
          tooltipDisabled={!isTimeslotReserved}
        />
        <HouseWrapper>
          <AutoCompleteItem
            itemName={[AddressTypes.Installation, 'Address']}
            label='Адрес'
            onSelect={handleSelect}
            dataTid='select__broadband-form__address'
            onSearch={text => handleSearch(text, 'Address')}
            disabled={
              isFieldDisabled(AddressTypes.Installation, 'Region') ||
              isAddressChecked ||
              isTimeslotReserved ||
              areControlsDisabled
            }
            options={suggestionOptions.address}
            tooltipDisabled={!isTimeslotReserved}
          />
          <Popconfirm
            placement='top'
            title='Изменение адреса приведет к удалению большинства данных заявки'
            onConfirm={handleDeleteAddress}
            okText='Изменить'
            cancelText='Отмена'
            disabled={isTimeslotReserved || areControlsDisabled}
          >
            <div>
              <DisabledTooltip disabled={!isTimeslotReserved} defaultPosition>
                <ChangeAddressButton
                  data-tid='button__broadband-form__change-address'
                  disabled={isTimeslotReserved || areControlsDisabled}
                >
                  Изменить адрес
                </ChangeAddressButton>
              </DisabledTooltip>
            </div>
          </Popconfirm>
        </HouseWrapper>
        <InputItem
          name={[AddressTypes.Installation, 'FlatName']}
          label='Квартира'
          gridColumn='1'
          dataTid='input__broadband-form__address-flat'
          disabled={isTimeslotReserved || areControlsDisabled}
          tooltipDisabled={!isTimeslotReserved}
        />
        <InputItem
          name={[AddressTypes.Installation, 'Entrance']}
          label='Подъезд'
          dataTid='input__broadband-form__address-entrance'
          disabled={isTimeslotReserved || areControlsDisabled}
          tooltipDisabled={!isTimeslotReserved}
        />
        <InputItem
          name={[AddressTypes.Installation, 'Floor']}
          label='Этаж'
          dataTid='input__broadband-form__address-floor'
          disabled={isTimeslotReserved || areControlsDisabled}
          tooltipDisabled={!isTimeslotReserved}
        />
        <InputItem
          name={[AddressTypes.Installation, 'Intercom']}
          label='Домофон'
          dataTid='input__broadband-form__address-intercom'
          disabled={isTimeslotReserved || areControlsDisabled}
          tooltipDisabled={!isTimeslotReserved}
        />
        <InputItem
          name={[AddressTypes.Installation, 'Comment']}
          label='Комментарий'
          gridColumn='span 4'
          dataTid='input__broadband-form__address-comment'
          disabled={isTimeslotReserved || areControlsDisabled}
          tooltipDisabled={!isTimeslotReserved}
          rules={[
            {
              max: 255,
              message: `Максимальная длина комментария: 255 символов`
            }
          ]}
        />
        <CheckAddressButton
          data-tid='button__broadband-form__check-address'
          disabled={isCheckButtonDisabled || isTimeslotReserved || areControlsDisabled}
          loading={checkAddressState.isLoading}
          onClick={handleAddressCheck}
        >
          Проверка возможности подключения
        </CheckAddressButton>
      </FormGrid>
      <CheckAddressResult />
    </>
  )
}

const FormGrid = styled.div`
  display: grid;
  padding: 0 24px;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
`

const Divider = styled.div`
  margin: 12px 0;
  display: flex;
  clear: both;
  width: 100%;
  min-width: 100%;
  border-top: 10px solid rgba(0, 0, 0, 0.06);
`

const SubHeaderWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

const SubHeader = styled.h4`
  padding: 12px 24px;
  font-size: 15px;
  font-weight: bold;
`

const CheckInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 24px;
`

const CheckTag = styled(Tag)`
  margin-left: auto;
  margin-right: 0;
  margin-bottom: 8px;
`

const RecheckButton = styled(Button)`
  margin-left: auto;
`

const HouseWrapper = styled.div`
  grid-column: span 3;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const CheckAddressButton = styled(Button)`
  margin-bottom: 10px;
  grid-column: span 4;
`

const TooltipStyle = createGlobalStyle`
  .broadband-form__address__tooltip .ant-tooltip-content {
    transform: translateY(40%);
  }

  .broadband-form__address__tooltip .ant-tooltip-arrow {
    transform: translateY(60%);
  }
`

const ChangeAddressButton = styled(Button)`
  flex: 1;
  margin-bottom: 8px;
  margin-left: 10px;
`

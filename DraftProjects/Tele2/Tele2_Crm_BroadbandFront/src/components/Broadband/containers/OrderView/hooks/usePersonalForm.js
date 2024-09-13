import { useEffect, useState } from 'react'
import moment from 'moment'
import { Form } from 'antd'

import { processEmptyData, processHouse } from 'components/Broadband/helpers/broadband'
import { AddressTypeIds, AddressTypes } from 'constants/address'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { StateStatus } from 'context/constants/initialState'
import { getAddressByType, checkAddressType } from 'helpers/address'

function fillAddress (addressState) {
  const address = addressState?.find(address => checkAddressType(address, AddressTypeIds.Registration)) ?? null
  return {
    Region: {
      label: processEmptyData([address?.RegionName, address?.RegionType]),
      value: processEmptyData([address?.RegionName, address?.RegionType])
    },
    City: {
      label: processEmptyData([address?.DistrictType, address?.DistrictName, address?.CityType, address?.CityName, address?.LocalityType, address?.LocalityName]),
      value: processEmptyData([address?.DistrictType, address?.DistrictName, address?.CityType, address?.CityName, address?.LocalityType, address?.LocalityName])
    },
    Street: {
      label: processEmptyData([address?.StreetType, address?.StreetName]),
      value: processEmptyData([address?.StreetId])
    },
    House: { label: processHouse(address), value: processHouse(address) },
    FlatName: processEmptyData([address?.FlatName])
  }
}

function fillPersonalForm (documentState, addressState) {
  const issueDate = moment(documentState?.IssueDate)
  const endDate = moment(documentState?.EndDate)
  return {
    DocumentTypeId: documentState?.DocumentTypeId,
    Series: processEmptyData([documentState?.Series]),
    Number: processEmptyData([documentState?.Number]),
    IssueDate: issueDate?.isValid() ? issueDate : null,
    IssueBy: processEmptyData([documentState?.IssueBy]),
    UnitCode: processEmptyData([documentState?.UnitCode]),
    EndDate: endDate?.isValid() ? endDate : null,
    [AddressTypes.Registration]: fillAddress(addressState)
  }
}

export function usePersonalForm () {
  const [form] = Form.useForm()

  const [formPrefilled, setFormPrefilled] = useState(false)

  const { orderState, autoActions, changeContextState } = useBroadbandContext()

  useEffect(() => {
    if (!formPrefilled && orderState?.Document) {
      form.setFieldsValue(fillPersonalForm(orderState?.Document, orderState.Address))
      setFormPrefilled(true)
    }
  }, [orderState])

  const registrationAddress = getAddressByType(orderState, AddressTypes.Registration)
  const postIndex = registrationAddress?.PostIndex
  const House = registrationAddress?.HouseName
  useEffect(() => {
    if (House) {
      form.setFieldsValue({
        PostIndex: postIndex
      })
    }
  }, [postIndex, House])

  // Auto refill address after recheck
  const recheckAddressStatus = autoActions.recheckAddress[AddressTypes.Registration]
  useEffect(() => {
    if (recheckAddressStatus === StateStatus.NeedAction) {
      form.setFieldsValue({
        [AddressTypes.Registration]: fillAddress(orderState.Address)
      })
      changeContextState({
        autoActions: {
          ...autoActions,
          recheckAddress: { ...autoActions.recheckAddress, [AddressTypes.Registration]: StateStatus.Done }
        }
      })
    }
  }, [orderState.Address, recheckAddressStatus])

  return form
}

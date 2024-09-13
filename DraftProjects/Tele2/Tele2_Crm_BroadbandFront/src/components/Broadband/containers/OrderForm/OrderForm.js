/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { object, bool } from 'prop-types'
import { Form } from 'antd'
import { isBoolean } from 'lodash-es'

import { AddressTypes } from 'constants/address'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'

import EquipmentForm from './components/EquipmentForm'
import ContactsForm from './components/ContactsForm'
import AddressForm from './components/AddressForm'
import { MainInformationForm } from './components/MainInformationForm'
import { clearAddressFieldsOnChange } from '../../helpers/address'
import { undefToNull } from '../../helpers'
import { getTimeslotsParams } from '../../helpers/broadband'
import { StateStatus } from 'context/constants/initialState'
import TimeslotForm from './components/TimeslotForm'
import { getSelectedSpeedToTechnology } from 'helpers/speedToTechnology'
import { MainFormFields } from 'constants/form'
import { OrderStatuses } from 'constants/orderStatuses'
import { getEquipmentTypeParams } from 'components/Broadband/helpers/equipments'

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24, offset: 0 }
}

const propTypes = {
  form: object,
  isCreating: bool,
  isFormDisabled: bool,
  isAnonymous: bool,
  areFormControlsEnabled: bool,
  areFormActionsEnabled: bool,
  isReducedForm: bool
}

export default function OrderForm (props) {
  const {
    form,
    isCreating,
    isFormDisabled,
    isAnonymous,
    areFormControlsEnabled,
    areFormActionsEnabled,
    isReducedForm
  } = props

  const {
    order,
    orderState,
    rtcKey,
    equipmentTypes,
    speedToTechnology,
    changeMainFormState,
    getEquipmentTypes,
    getTimeslots,
    changeAutoActionsState,
    orderStatusState
  } = useBroadbandContext()

  const orderData = order.data

  const handleServiceIdChange = useCallback(
    value => {
      form.setFieldsValue({ Equipments: [] })
      changeMainFormState({ EquipmentCodeList: [] })
      if (value !== undefined) {
        const statusId = orderStatusState?.statusId

        const params = getEquipmentTypeParams(speedToTechnology, orderData, value, rtcKey, statusId)
        getEquipmentTypes(params)
        changeAutoActionsState({ fillEquipments: StateStatus.NeedAction })

        const selectedTechnology = getSelectedSpeedToTechnology(speedToTechnology, value)
        const timeslotsParams = getTimeslotsParams(orderState, selectedTechnology)
        const isStatusOk = ![OrderStatuses.Cancelled, OrderStatuses.Deleted].includes(statusId)
        if (isBoolean(timeslotsParams?.IsOnlime) && timeslotsParams?.RtcTechnologyId && isStatusOk) {
          getTimeslots(timeslotsParams)
        }
      }
    },
    [form, getTimeslots, speedToTechnology, rtcKey, equipmentTypes, getEquipmentTypes, orderState, orderData]
  )

  const handleEquipmentsChange = useCallback(
    changedFields => {
      const formValue = form.getFieldValue('Equipments')
      changedFields.Equipments = formValue
    },
    [orderState, orderStatusState]
  )

  const handleValuesChange = useCallback(
    changedFields => {
      const { IsMnp, ServiceId, Equipments, Contacts, Relocation } = changedFields
      clearAddressFieldsOnChange(form, changedFields, AddressTypes.Installation)

      if (MainFormFields.ServiceId in changedFields) {
        handleServiceIdChange(ServiceId)
      }
      if (IsMnp) {
        form.setFieldsValue({ IsNewSubscriber: true })
      }
      if (Equipments) {
        handleEquipmentsChange(changedFields)
      }
      if (Contacts) {
        changedFields.Contacts = form.getFieldValue('Contacts')
      }
      if (Relocation === false) {
        handleServiceIdChange()
        form.setFieldsValue({ ServiceId: undefined })
      }
      changeMainFormState(undefToNull(changedFields))
    },
    [form, handleServiceIdChange, handleEquipmentsChange]
  )

  if (isCreating && isFormDisabled) {
    return (
      <StyledForm
        {...formItemLayout}
        onValuesChange={handleValuesChange}
        form={form}
        name='RtcBroadbandOrder'
        labelAlign='left'
      >
        <DisabledFormWrapper>
          <AddressForm form={form} isFormDisabled={isFormDisabled} />
        </DisabledFormWrapper>
      </StyledForm>
    )
  }

  return (
    <StyledForm
      {...formItemLayout}
      onValuesChange={handleValuesChange}
      form={form}
      name='RtcBroadbandOrder'
      labelAlign='left'
    >
      <MainGrid>
        <MainInformationForm
          form={form}
          isAnonymous={isAnonymous}
          divider={isFormDisabled}
          areControlsDisabled={!areFormControlsEnabled}
          isReducedForm={isReducedForm}
          isCreating={isCreating}
        />
        <ContactsForm form={form} areControlsDisabled={!areFormControlsEnabled} isReducedForm={isReducedForm} />
        <AddressForm form={form} isFormDisabled={isFormDisabled} areControlsDisabled={!areFormControlsEnabled} />
        <EquipmentForm form={form} areControlsDisabled={!areFormControlsEnabled} />
        <TimeslotForm
          form={form}
          areControlsDisabled={!areFormControlsEnabled}
          areActionsDisabled={!areFormActionsEnabled}
        />
      </MainGrid>
    </StyledForm>
  )
}

OrderForm.propTypes = propTypes

const StyledForm = styled(Form)`
  .ant-form-item-label {
    padding: 0;
  }
  .ant-form-item {
    margin-bottom: 8px;
  }
`
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`
const DisabledFormWrapper = styled.div`
  padding-bottom: 8px;
`

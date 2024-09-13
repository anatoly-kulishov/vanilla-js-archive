import React, { useCallback } from 'react'
import { MinusCircleOutlined, WarningFilled } from '@ant-design/icons'
import { Button, Form, Select } from 'antd'
import styled from 'styled-components'

import { getEquipmentPurchaseTypeLabel } from '../helpers/equipments'

const FORM_ITEM_REQUIRED = [{ required: true }]

const FIELDS_QUEUE = ['TypeId', 'SegmentId', 'PurchaseTypeId']

const shouldListFormUpdate = (prevValues, curValues) => {
  return prevValues.Equipments !== curValues.Equipments
}

const EquipmentField = props => {
  const {
    index,
    field,
    remove,
    form,
    equipmentTypes,
    disabled,
    listValue,
    dataTidParentComponent,
    listName,
    onSelect,
    speedToTechnologyFieldName,
    canBeRemoved,
    typeIdOptions,
    onRemove,
    subheaderLabel
  } = props

  const isRequired = listValue?.[index]?.IsRequired

  const getListValue = useCallback(() => form.getFieldValue(listName), [listName])

  const getAvailableSegments = useCallback(
    index => {
      const selectedEquipments = getListValue()
      if (!(index in selectedEquipments)) {
        return []
      }

      const selectedTypeId = selectedEquipments[index]?.TypeId?.value

      return equipmentTypes?.find(equipmentType => equipmentType.EquipmentTypeId === selectedTypeId)?.Segments ?? []
    },
    [equipmentTypes]
  )

  const getAvailablePurchaseTypes = useCallback(
    index => {
      const selectedEquipments = getListValue()
      if (!(index in selectedEquipments)) {
        return []
      }

      const selectedTypeId = selectedEquipments[index]?.TypeId?.value
      const purchaseTypes = equipmentTypes?.find(
        equipmentType => equipmentType.EquipmentTypeId === selectedTypeId
      )?.PurchaseTypes

      const selectedSegmentId = selectedEquipments[index]?.SegmentId?.value

      return purchaseTypes?.filter(item => item.SegmentId === selectedSegmentId) ?? []
    },
    [equipmentTypes]
  )

  const handleSelect = useCallback(
    ({ value, option, fullFieldName }) => {
      const [listName, index, fieldName] = fullFieldName

      const fieldIndex = FIELDS_QUEUE.findIndex(field => field === fieldName)
      const isNotLastElement = fieldIndex + 1 !== FIELDS_QUEUE.length

      if (isNotLastElement) {
        const fieldsToClear = FIELDS_QUEUE.slice(fieldIndex + 1)
        fieldsToClear.forEach(field => {
          const fieldNameToReset = [listName, index, field]
          form.setFieldValue(fieldNameToReset, undefined)
        })
      }

      onSelect?.({ value, option, fieldName })
    },
    [onSelect]
  )

  const handleRemove = useCallback(() => {
    if (onRemove) {
      const listValue = getListValue()
      const removedEquipment = listValue[field.name]
      onRemove(removedEquipment)
    }
    remove(field.name)
  }, [onRemove, field])

  const isRemoveDisabled = (!canBeRemoved && isRequired) || disabled

  return (
    <div data-tid={`form-item__${dataTidParentComponent}__equipment-field`}>
      <Actions>
        <Wrapper>
          <Header>{`Оборудование ${index + 1}`}</Header>
          {subheaderLabel && (
            <>
              <StyledIcon />
              <Subheader>{subheaderLabel}</Subheader>
            </>
          )}
        </Wrapper>
        <Button
          disabled={isRemoveDisabled}
          data-tid={`button__${dataTidParentComponent}__equipment-remove`}
          type='text'
          onClick={handleRemove}
          icon={<MinusCircleOutlined />}
        >
          Удалить
        </Button>
      </Actions>
      <FormGrid>
        <Form.Item noStyle shouldUpdate={shouldListFormUpdate}>
          {() => {
            const speedToTechnologyValue = form.getFieldValue(speedToTechnologyFieldName)

            const typeIdFieldName = [field.name, 'TypeId']
            const rules = isRequired ? FORM_ITEM_REQUIRED : undefined
            const isTypeIdSelectDisabled = !speedToTechnologyValue || isRequired || disabled

            const handleSelectTypeId = (value, option) =>
              handleSelect({ value, option, fullFieldName: [listName, ...typeIdFieldName] })

            return (
              <Form.Item label='Тип оборудования' name={typeIdFieldName} rules={rules}>
                <Select
                  data-tid={`select__${dataTidParentComponent}__technology-type`}
                  disabled={isTypeIdSelectDisabled}
                  itemId={index}
                  labelInValue
                  options={typeIdOptions}
                  onSelect={handleSelectTypeId}
                />
              </Form.Item>
            )
          }}
        </Form.Item>
        <Form.Item noStyle shouldUpdate={shouldListFormUpdate}>
          {() => {
            const availableSegments = getAvailableSegments(index)
            const listValue = getListValue()
            const typeIdValue = listValue[index]?.TypeId

            const segmentsOptions = availableSegments.map(segment => ({
              label: segment.SegmentName,
              value: segment.SegmentId,
              key: segment.SegmentId
            }))

            const isDisabled = !typeIdValue || availableSegments.length < 1 || disabled
            const rules = isRequired ? FORM_ITEM_REQUIRED : undefined
            const segmentIdFieldName = [field.name, 'SegmentId']

            const handleSelectSegment = (value, option) =>
              handleSelect({ value, option, fullFieldName: [listName, ...segmentIdFieldName] })

            return (
              <Form.Item label='Сегмент оборудования' name={segmentIdFieldName} rules={rules}>
                <Select
                  data-tid={`select__${dataTidParentComponent}__technology-segment`}
                  disabled={isDisabled}
                  labelInValue
                  onSelect={handleSelectSegment}
                  options={segmentsOptions}
                />
              </Form.Item>
            )
          }}
        </Form.Item>
        <Form.Item noStyle shouldUpdate={shouldListFormUpdate}>
          {() => {
            const availablePurchaseTypes = getAvailablePurchaseTypes(index)

            const purchaseTypeOptions = availablePurchaseTypes.map(item => ({
              label: getEquipmentPurchaseTypeLabel(item),
              value: item.PurchaseTypeId,
              key: item.PurchaseTypeId
            }))

            const isPurchaseTypeDisabled = availablePurchaseTypes?.length < 1 || disabled
            const rules = isRequired ? FORM_ITEM_REQUIRED : undefined
            const purchaseTypeIdFieldName = [field.name, 'PurchaseTypeId']
            const purchaseTypeIdDependencies = [field.name, 'SegmentId']

            const handleSelectPurchaseType = (value, option) =>
              handleSelect({ value, option, fullFieldName: [listName, ...purchaseTypeIdFieldName] })

            return (
              <Form.Item
                label='Форма приобретения'
                name={purchaseTypeIdFieldName}
                rules={rules}
                dependencies={purchaseTypeIdDependencies}
              >
                <Select
                  data-tid={`select__${dataTidParentComponent}__technology-pay-form`}
                  disabled={isPurchaseTypeDisabled}
                  labelInValue
                  onSelect={handleSelectPurchaseType}
                  options={purchaseTypeOptions}
                />
              </Form.Item>
            )
          }}
        </Form.Item>
      </FormGrid>
      <DividerAfter />
    </div>
  )
}

export default EquipmentField

const Actions = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

const DividerAfter = styled.div`
  margin: 5px 0px;
  display: flex;
  clear: both;
  width: 100%;
  min-width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`

const Header = styled.h4`
  padding: 6px 0 6px 0;
  font-size: 14px;
  font-weight: lighter;
  margin: 0;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  grid-column-gap: 10px;
`
const StyledIcon = styled(WarningFilled)`
  font-size: 20px;
  color: #ffa500;
  margin: 0 10px;
`
const Subheader = styled.span`
  color: #531dab;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

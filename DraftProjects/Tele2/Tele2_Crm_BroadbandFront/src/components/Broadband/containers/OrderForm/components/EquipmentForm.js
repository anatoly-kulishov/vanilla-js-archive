/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Col, Form, Popconfirm, Row, Checkbox, Spin } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { bool, object } from 'prop-types'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'

import EquipmentAlerts from './EquipmentAlerts'
import { BlockChangesStatuses, EquipmentTypeId } from 'constants/equipment'
import SpeedToTechnologyBlock from 'components/Broadband/components/SpeedToTechnologyBlock'
import OrderHistoryModal from 'components/Broadband/modals/OrderHistoryModal/OrderHistoryModal'
import ManualUpSaleModal from 'components/Broadband/modals/ManualUpSaleModal/ManualUpSaleModal'
import AutoUpSaleModal from 'components/Broadband/modals/AutoUpSaleModal/AutoUpSaleModal'
import EquipmentField from 'components/Broadband/components/EquipmentField'
import { UpsaleStatuses } from 'constants/upsaleStatuses'
import { OrderStatuses } from 'constants/orderStatuses'
import { TariffTypes } from 'constants/tariff'
import { getEquipmentTypeIdOptions } from 'components/Broadband/helpers/equipments'
import { getTariffItemByType } from 'helpers/agreement'
import { OrderLoadingStatus } from 'constants/form'

const MAX_EQUIPMENT_AMOUNT = 5

const speedToTechnologyFieldName = 'ServiceId'

const propTypes = { form: object, areControlsDisabled: bool }

export default function EquipmentForm (props) {
  const { form, areControlsDisabled } = props

  const {
    orderStatusState,
    order,
    orderState,
    equipmentTypes,
    speedToTechnology,
    changeMainFormState,
    changeManualUpSaleModalVisibility,
    formInitData,
    changedOrder,
    handleAutoChangeOrder: onAutoChangeOrder,
    createOrderEditSessionState,
    orderEditSessionState,
    isChangeManualUpSaleLoading,
    isFormChanged,
    relocationInfo
  } = useBroadbandContext()

  const [isSpeedToTechnologyOutdated, setSpeedToTechnologyOutdated] = useState(false)
  const [isOpenOrderHistoryModal, setIsOpenOrderHistoryModal] = useState(false)

  const equipments = Form.useWatch('Equipments', form)

  // TODO remove??
  useEffect(() => {
    const serviceId = form.getFieldValue(speedToTechnologyFieldName)
    if (speedToTechnology && serviceId) {
      const isTechnologyOutdated =
        speedToTechnology.findIndex(speedToTechnologyItem => speedToTechnologyItem.ServiceId === serviceId) === -1
      setSpeedToTechnologyOutdated(isTechnologyOutdated)
      if (isTechnologyOutdated) {
        form.resetFields([speedToTechnologyFieldName, 'Equipments'])
      }
    }
  }, [form, speedToTechnology, relocationInfo])

  const upsaleOrderStatusId = order.data?.UpsaleOrderStatusId
  const isUpsaleBcOrder = formInitData?.userRights?.isUpsaleBcOrder
  const isPerformBCOrder = formInitData?.userRights?.isPerformBCOrder
  const isModifyBCOrder = formInitData?.userRights?.isModifyBCOrder
  const statusId = orderStatusState.statusId
  const autoProductId = order.data?.AutoProductId

  const EquipmentStatusInfo = useMemo(() => {
    if (!autoProductId) {
      return '-'
    } else if (autoProductId === 1) {
      return 'создается оператором'
    } else {
      return [OrderStatuses.Draft, OrderStatuses.New, OrderStatuses.Waiting].includes(statusId)
        ? 'создается автоматически'
        : 'создан автоматически'
    }
  }, [statusId, autoProductId])

  const hasManualOrderChange = useMemo(() => {
    const isCorrectStatusId = upsaleOrderStatusId !== UpsaleStatuses.InProcessing || upsaleOrderStatusId === null

    if (isPerformBCOrder && isModifyBCOrder && isCorrectStatusId && !areControlsDisabled) {
      return [
        OrderStatuses.TransferredToRtc,
        OrderStatuses.ErrorWithRTC,
        OrderStatuses.InWork,
        OrderStatuses.InstallerAppointed
      ].includes(statusId)
    }

    return false
  }, [statusId, isPerformBCOrder, isModifyBCOrder, upsaleOrderStatusId, areControlsDisabled])

  const hasAutomaticOrderChange = useMemo(() => {
    const isCorrectStatusId = upsaleOrderStatusId !== UpsaleStatuses.InProcessing || upsaleOrderStatusId === null

    if (isUpsaleBcOrder && isCorrectStatusId && !areControlsDisabled) {
      return [OrderStatuses.TransferredToRtc, OrderStatuses.InWork, OrderStatuses.InstallerAppointed].includes(statusId)
    }

    return false
  }, [statusId, isUpsaleBcOrder, upsaleOrderStatusId, areControlsDisabled])

  const handleOpenManualUpSaleModal = useCallback(() => {
    changeManualUpSaleModalVisibility(true)
  }, [changeManualUpSaleModalVisibility])

  const handleClickManualUpSaleButton = useCallback(() => {
    if (!isFormChanged) {
      handleOpenManualUpSaleModal()
    }
  }, [isFormChanged, handleOpenManualUpSaleModal])

  const handleAutoChangeOrder = () => {
    onAutoChangeOrder({ order: order.data, orderStatusState, orderState })
  }

  const handleClickAutoUpSaleButton = useCallback(() => {
    if (!isFormChanged) {
      handleAutoChangeOrder()
    }
  }, [isFormChanged, handleAutoChangeOrder])

  const handleOpenOrderHistoryModal = useCallback(() => {
    setIsOpenOrderHistoryModal(true)
  }, [setIsOpenOrderHistoryModal])

  const handleCloseOrderHistoryModal = useCallback(() => {
    setIsOpenOrderHistoryModal(false)
  }, [setIsOpenOrderHistoryModal])

  const handleTypeIdSelect = useCallback(({ option }) => {
    if (option?.value === EquipmentTypeId.TVSetTopBox) {
      form.setFieldsValue({ IsWinkSetting: true })
      changeMainFormState({ IsWinkSetting: true })
    }
  }, [])

  const handleEquipmentSelect = useCallback(
    actionInfo => {
      const { fieldName, ...restActionInfo } = actionInfo

      switch (fieldName) {
        case 'TypeId':
          handleTypeIdSelect(restActionInfo)
          break
        default:
      }
    },
    [handleTypeIdSelect]
  )

  const handleEquipmentRemove = useCallback(removedEquipment => {
    const { TypeId } = removedEquipment ?? {}
    const isWinkSetting = form.getFieldValue('IsWinkSetting')

    if (TypeId?.value === EquipmentTypeId.TVSetTopBox && isWinkSetting) {
      form.setFieldsValue({ IsWinkSetting: false })
      changeMainFormState({ IsWinkSetting: false })
    }
  }, [])

  const isAllChangesDisabled = useMemo(() => {
    return BlockChangesStatuses.includes(statusId)
  }, [statusId])

  const orderEquipmentSpeed = useMemo(() => getTariffItemByType(order.data, TariffTypes.BroadbandAccess), [order.data])

  const isSpeedToTechnology = speedToTechnology?.length > 0

  const isAutoOrderChangeLoading =
    createOrderEditSessionState.isLoading || changedOrder.isLoading || orderEditSessionState.isLoading

  const [isRelocationInfoLoading, isRelocationInfoCompleated] = useMemo(() => {
    return [relocationInfo.isLoading, relocationInfo.status === OrderLoadingStatus.Finished]
  }, [relocationInfo.isLoading, relocationInfo.status])

  const availableEquipmentTypes = useMemo(() => {
    if (relocationInfo.data && relocationInfo.data?.IsSameTechnology && orderState.Relocation) {
      return equipmentTypes?.map(type => {
        const currentEquipment = relocationInfo.data?.CurrentEquipment.find(
          item => item.TypeId === type.EquipmentTypeId
        )
        if (currentEquipment?.IsAvailable) {
          return type
        } else {
          const filteredPurchaseTypes = type.PurchaseTypes.filter(
            item => currentEquipment?.ServId !== item.ServiceRentId
          )
          const newEquipmentType = { ...type }
          newEquipmentType.PurchaseTypes = filteredPurchaseTypes
          return newEquipmentType
        }
      })
    } else return equipmentTypes
  }, [relocationInfo.data, equipmentTypes])

  return (
    <>
      <Divider />
      <SubHeaderWrapper>
        <CustomRow gutter={8}>
          <Col span={13}>
            <SubHeader>Требуемое оборудование</SubHeader>
          </Col>
          <Col span={11}>
            <Button type='default' htmlType='button' onClick={handleOpenOrderHistoryModal}>
              История изменений
            </Button>
          </Col>
        </CustomRow>
        <EquipmentInfoWrapper>
          Заказ на оборудование в системах РТК: <b>{EquipmentStatusInfo}</b>
        </EquipmentInfoWrapper>
      </SubHeaderWrapper>
      <Spin spinning={isRelocationInfoLoading}>
        <ComplexFormWrapper>
          <EquipmentAlerts
            isSpeedToTechnologyOutdated={isSpeedToTechnologyOutdated}
            isSpeedToTechnology={isSpeedToTechnology}
            orderEquipmentSpeed={orderEquipmentSpeed}
            upsaleOrderStatusId={upsaleOrderStatusId}
            infoCode={relocationInfo.data?.InfoCode}
            selectedEquipments={equipments}
          />
          {isSpeedToTechnology && (
            <Form.Item name={speedToTechnologyFieldName} label='Технология и скорость подключения'>
              <SpeedToTechnologyBlock
                speedToTechnology={speedToTechnology}
                disabled={isAllChangesDisabled || areControlsDisabled}
                canBeDeselected
                orderEquipmentSpeed={orderEquipmentSpeed}
                isRelocation={orderState.Relocation}
                isRelocationInfoCompleated={isRelocationInfoCompleated}
                relocationInfoData={relocationInfo.data}
              />
            </Form.Item>
          )}
          <Form.List name='Equipments'>
            {(fields, { add, remove }) => {
              const typeIdOptions = getEquipmentTypeIdOptions(equipments, availableEquipmentTypes)
              const isNewEquipmentAdded = equipments?.some(value => value === undefined)

              const isAddDisabled =
                !form.getFieldValue(speedToTechnologyFieldName) ||
                fields.length >= MAX_EQUIPMENT_AMOUNT ||
                areControlsDisabled ||
                !typeIdOptions.length ||
                isNewEquipmentAdded

              return (
                <>
                  {fields.map((field, index) => {
                    const serviceName = relocationInfo.data?.CurrentEquipment[index]?.Name
                    const isSameTechnology = relocationInfo.data?.IsSameTechnology
                    const subheaderLabel =
                      isSameTechnology && serviceName && orderState.Relocation
                        ? `У абонента подключена услуга ${serviceName}`
                        : undefined

                    return (
                      <EquipmentField
                        index={index}
                        field={field}
                        remove={remove}
                        canBeRemoved
                        equipmentTypes={availableEquipmentTypes}
                        form={form}
                        listValue={equipments}
                        listName='Equipments'
                        disabled={isAllChangesDisabled || areControlsDisabled}
                        dataTidParentComponent='broadband-form'
                        speedToTechnologyFieldName={speedToTechnologyFieldName}
                        typeIdOptions={typeIdOptions}
                        onSelect={handleEquipmentSelect}
                        onRemove={handleEquipmentRemove}
                        subheaderLabel={subheaderLabel}
                      />
                    )
                  })}
                  <ButtonGroup justify='space-around' align='center'>
                    {hasManualOrderChange && (
                      <Popconfirm
                        title='Перед изменением заказа убедитесь, что данные заявки сохранены'
                        placement='topLeft'
                        disabled={!isFormChanged}
                        okText='Изменить'
                        cancelText='Отменить'
                        onConfirm={handleOpenManualUpSaleModal}
                      >
                        <Button
                          htmlType='button'
                          type='text'
                          loading={isChangeManualUpSaleLoading}
                          onClick={handleClickManualUpSaleButton}
                        >
                          <EditOutlined />
                          Ручное изменение заказа
                        </Button>
                      </Popconfirm>
                    )}
                    {hasAutomaticOrderChange && (
                      <Popconfirm
                        title='Перед изменением заказа убедитесь, что данные заявки сохранены'
                        placement='topLeft'
                        disabled={!isFormChanged}
                        okText='Изменить'
                        cancelText='Отменить'
                        onConfirm={handleAutoChangeOrder}
                      >
                        <Button
                          htmlType='button'
                          type='text'
                          loading={isAutoOrderChangeLoading}
                          onClick={handleClickAutoUpSaleButton}
                        >
                          <EditOutlined />
                          Автоматическое изменение заказа
                        </Button>
                      </Popconfirm>
                    )}
                  </ButtonGroup>
                  {!isAllChangesDisabled && (
                    <Button
                      data-tid='button__broadband-form__add-equipment'
                      disabled={isAddDisabled}
                      type='text'
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Добавить оборудование
                    </Button>
                  )}
                </>
              )
            }}
          </Form.List>
          <Form.Item name='IsWinkSetting' valuePropName='checked'>
            <Checkbox disabled={!speedToTechnology || isAllChangesDisabled || areControlsDisabled}>
              Требуется настройка Wink
            </Checkbox>
          </Form.Item>
          <OrderHistoryModal isVisible={isOpenOrderHistoryModal} handleClose={handleCloseOrderHistoryModal} />
          <ManualUpSaleModal mainForm={form} orderEquipmentSpeed={orderEquipmentSpeed} />
          <AutoUpSaleModal orderEquipmentSpeed={orderEquipmentSpeed} />
        </ComplexFormWrapper>
      </Spin>
    </>
  )
}

EquipmentForm.propTypes = propTypes

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
  padding: 12px 24px;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.5em;
`
const SubHeader = styled.h4`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 0;
`
const EquipmentInfoWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`

const ComplexFormWrapper = styled.div`
  padding: 0 24px;
`
const CustomRow = styled(Row)`
  align-items: center;
`
const ButtonGroup = styled(Row)`
  margin: 10px 0;
`

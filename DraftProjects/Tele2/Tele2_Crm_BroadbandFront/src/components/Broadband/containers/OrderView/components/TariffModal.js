import React, { useState, useCallback, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Modal, Row, Col, Tooltip, Alert, Checkbox, Button, Tag, Spin, Switch } from 'antd'
import { ExclamationCircleOutlined, InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { isNumber } from 'lodash-es'

import { preparePerformParams } from 'components/Broadband/helpers/orderFooter'
import { getTariffItemByType, prepareAgreementStateChange } from 'helpers/agreement'
import { initialState } from 'context/constants/initialState'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { Operation } from 'constants/operations'
import { checkNumber } from 'helpers/number'
import { TariffTypes } from 'constants/tariff'

export default function TariffModal (props) {
  const { openTariffConstructorModal, validateForm, areFormActionsEnabled } = props

  const {
    availableTariffsState,
    servicesForSellState,
    tariffConstructorCosts,
    formInitData,
    orderState,
    orderStatusState,
    speedToTechnology,
    equipmentTypes,
    getAvailableTariffs,
    getServicesForSell,
    changeBroadbandServices,
    changeContextState,
    changeMainFormState,
    performOrder,
    isTariffModalVisible,
    changeTariffModalVisibility,
    reserveMsisdn
  } = useBroadbandContext()

  const tariffData = availableTariffsState.data
  const servicesData = servicesForSellState.data
  const costsData = tariffConstructorCosts.data

  const [selectedTariff, setSelectedTariff] = useState(null)
  const [servicesState, setServicesState] = useState({})

  const equipmentBuyCost = useMemo(() => {
    if (!equipmentTypes) return null

    const equipmentCodes = new Set(orderState.EquipmentCodeList)
    let buyCost = 0
    equipmentTypes.forEach(eType => {
      eType.PurchaseTypes.forEach(pType => {
        if (pType.PurchaseTypeId === 2 && equipmentCodes.has(pType.RtcCode)) {
          buyCost += pType.ServiceRentPrice
        }
      })
    })

    return buyCost
  }, [orderState, equipmentTypes])

  const servicesInfo = useMemo(
    () =>
      servicesData?.map(service => ({
        ...service,
        IsEnabled: servicesState[service.BillingServiceId] ?? service.IsEnabled
      })),
    [servicesData, servicesState]
  )

  const tariffsList = useMemo(() => {
    const selectedItems = []
    const otherItems = []
    availableTariffsState.data?.AvailableTariffs?.map(item => {
      if (item?.IsSelectBroadbandAccess) {
        selectedItems.push(item)
      } else {
        otherItems.push(item)
      }
    })
    if (selectedItems.length > 0) {
      setSelectedTariff(0)
    }
    return [...selectedItems, ...otherItems] ?? []
  }, [availableTariffsState, setSelectedTariff])

  // clear available tariffs state
  useEffect(() => {
    if (availableTariffsState.isError) {
      changeContextState({ availableTariffsState: initialState.availableTariffsState })
    }
  }, [])

  useEffect(() => {
    const availbleTariffCondition =
      !availableTariffsState.data && !availableTariffsState.isLoading && !availableTariffsState.isError
    if (isTariffModalVisible && formInitData && orderState?.OrderRegionCode && availbleTariffCondition) {
      const { subscriberId, msisdn, billingBranchId, billingBranchIdReserve } = formInitData
      const tariffItem = getTariffItemByType(orderState, TariffTypes.Tariff)
      const params = {
        SubscriberId: subscriberId,
        BranchId: billingBranchId ?? billingBranchIdReserve,
        Msisdn: msisdn,
        TariffId: tariffItem?.Id,
        OrderRegionCode: orderState?.OrderRegionCode
      }
      getAvailableTariffs(params)
    }
  }, [isTariffModalVisible, formInitData, orderState, availableTariffsState])

  useEffect(() => {
    if (
      formInitData &&
      !servicesForSellState.data &&
      !servicesForSellState.isLoading &&
      !servicesForSellState.isError
    ) {
      const { subscriberId, billingBranchId, billingBranchIdReserve, msisdn } = formInitData
      const tariff = tariffsList.at(selectedTariff)
      if (!tariff) return
      const params = {
        SubscriberId: subscriberId,
        BranchId: billingBranchId ?? billingBranchIdReserve,
        Msisdn: msisdn,
        TariffId: tariff?.BillingRateId,
        OrderRegionCode: orderState?.OrderRegionCode
      }
      getServicesForSell(params)
    }
  }, [selectedTariff, servicesForSellState, formInitData, orderState, tariffsList, getServicesForSell])

  const [isAvailabilityReady, isBroadbandAvailable] = useMemo(() => {
    return [
      !availableTariffsState.isLoading && availableTariffsState.data,
      availableTariffsState.data?.IsAvailableBroadbandAccess
    ]
  }, [availableTariffsState])

  const tariffInfo = useMemo(
    () => ({
      name: tariffData?.RateName,
      description: tariffData?.Description,
      cost: tariffData?.CostMonthWithTax ? `${tariffData?.CostMonthWithTax} ${tariffData?.Currency}` : null,
      tariffId: tariffData?.BillingRateId,
      isAvailableBroadbandAccess: tariffData?.IsAvailableBroadbandAccess
    }),
    [tariffData]
  )

  const agreementData = orderState.Agreement?.Tariff
  const selectedSpeedId = orderState.BcSpeedId
  const speedInfo = useMemo(() => {
    if (speedToTechnology && selectedSpeedId) {
      const speedItem = speedToTechnology?.find(item => item.SpeedId === selectedSpeedId)
      return { name: speedItem?.SpeedName, cost: speedItem?.ServicePrice, serviceId: speedItem?.ServiceId }
    } else if (agreementData?.length > 0) {
      const agreementSpeedItem = agreementData?.find(item => item?.Type === TariffTypes.BroadbandAccess)
      return { name: agreementSpeedItem?.Name, cost: agreementSpeedItem?.Cost, serviceId: agreementSpeedItem?.Id }
    }
    return null
  }, [selectedSpeedId, speedToTechnology, agreementData])

  const selectedEquipmentCodes = orderState.EquipmentCodeList
  const equipmentInfo = useMemo(() => {
    if (selectedEquipmentCodes?.length > 0) {
      const equipmentCodeToData = new Map()
      equipmentTypes?.forEach(eType => {
        eType.PurchaseTypes.forEach(pType => {
          equipmentCodeToData.set(pType.RtcCode, {
            name: pType.Name,
            cost: pType.ServiceRentPrice,
            serviceId: pType.ServiceRentId
          })
        })
      })
      return selectedEquipmentCodes?.map(code => equipmentCodeToData.get(code)).filter(code => !!code) ?? null
    } else if (agreementData?.length > 0) {
      const agreementEquipmentItems = agreementData
        ?.filter(item => item?.Type === TariffTypes.BroadbandDevice)
        ?.map(item => ({ name: item?.Name, cost: item?.Cost, serviceId: item?.Id }))
      return agreementEquipmentItems
    }
    return null
  }, [selectedEquipmentCodes, equipmentTypes, agreementData])

  const handleConnectTariff = useCallback(() => {
    const tariffId = isNumber(selectedTariff) ? tariffsList?.at(selectedTariff)?.BillingRateId : 0
    openTariffConstructorModal(tariffId)
    changeTariffModalVisibility(false)
  }, [openTariffConstructorModal, tariffsList, selectedTariff, changeTariffModalVisibility])

  const handleServiceSwitch = useCallback(
    index => value => {
      const changedId = servicesData?.at(index)?.BillingServiceId
      if (changedId) {
        setServicesState(prev => ({ ...prev, [changedId]: value }))
      }
    },
    [servicesData, setServicesState]
  )

  const handleTariffCheckboxChange = useCallback(
    index => event => {
      setSelectedTariff(event.target.checked ? index : null)
      changeContextState({ servicesForSellState: initialState.servicesForSellState })
    },
    [selectedTariff, setSelectedTariff, changeContextState]
  )

  const handleSaveButton = useCallback(() => {
    if (orderStatusState.statusId < 0) {
      changeTariffModalVisibility(false)
      return
    }

    const currentTariffData = tariffData?.IsAvailableBroadbandAccess
      ? {
        BillingRateId: tariffData?.BillingRateId,
        BillingRateName: tariffData?.BillingRateName,
        CostMonthWithTax: tariffData?.CostMonthWithTax
      }
      : null
    const agreement = prepareAgreementStateChange(
      orderState,
      isNumber(selectedTariff) ? tariffsList?.at(selectedTariff) : currentTariffData,
      servicesState,
      servicesData,
      costsData?.TotalMonthlyChargeCostWithTaxTariff
    )
    changeMainFormState({ Agreement: agreement })
    const params = preparePerformParams(Operation.Save, orderState, orderStatusState)
    params.Agreement = agreement
    validateForm(() => {
      performOrder(params)
    })
    changeTariffModalVisibility(false)
  }, [
    orderState,
    tariffData,
    selectedTariff,
    servicesState,
    servicesData,
    costsData,
    orderStatusState,
    performOrder,
    changeMainFormState,
    changeTariffModalVisibility
  ])

  const handleCostButton = useCallback(() => {
    const tariffId = isNumber(selectedTariff) ? tariffsList?.at(selectedTariff)?.BillingRateId : tariffInfo?.tariffId
    const speedId = speedInfo?.serviceId
    const equipmentIds = equipmentInfo?.filter(data => data?.serviceId)?.map(data => data?.serviceId) ?? []
    const servicesIds =
      Object.entries(servicesState)
        .filter(([, isEnabled]) => isEnabled)
        .map(([serviceId]) => serviceId) ?? []

    const params = {
      TariffId: tariffId,
      RegionCode: orderState?.OrderRegionCode,
      ServiceIds: [speedId, ...servicesIds, ...equipmentIds]
    }
    changeBroadbandServices(params)
  }, [
    tariffInfo,
    equipmentInfo,
    speedInfo,
    servicesState,
    tariffsList,
    selectedTariff,
    orderState,
    changeBroadbandServices,
    formInitData
  ])

  const handleClearButton = useCallback(() => {
    setSelectedTariff(null)
  }, [setSelectedTariff])

  const handleNewSim = useCallback(() => {
    const params = {
      regionCode: orderState.OrderRegionCode,
      orderId: orderState.OrderId,
      systemId: 1
    }
    reserveMsisdn(params)
    changeTariffModalVisibility(false)
  }, [orderState])

  const isButtonsDisabled = useMemo(() => {
    return availableTariffsState.isLoading || tariffConstructorCosts.isLoading || !areFormActionsEnabled
  }, [availableTariffsState, tariffConstructorCosts, areFormActionsEnabled])

  const isButtonsRightsPresent =
    formInitData?.userRights.isReserveMsisdn && formInitData?.userRights.isReadReserveMsisdn

  const [saveButtonType, connectButtonType] = useMemo(() => {
    const saveButtonType = !isNumber(selectedTariff) ? 'primary' : 'default'
    const connectButtonType = isNumber(selectedTariff) ? 'primary' : 'default'
    return [saveButtonType, connectButtonType]
  }, [selectedTariff])

  const isClearSelectVisible = useMemo(() => isNumber(selectedTariff), [selectedTariff])

  const isAlertVisible = isAvailabilityReady && !isBroadbandAvailable

  return (
    <StyledModal
      visible={isTariffModalVisible}
      zIndex='1002'
      width='73vw'
      footer={
        <div>
          <Button disabled={isButtonsDisabled} onClick={handleCostButton}>
            Cтоимость
          </Button>
          <Button disabled={isButtonsDisabled} type={connectButtonType} onClick={handleConnectTariff}>
            Подключить
          </Button>
          <Button disabled={isButtonsDisabled} type={saveButtonType} onClick={handleSaveButton}>
            Сохранить
          </Button>
        </div>
      }
      mask={null}
      closable={false}
      title={
        <HeaderWrapper>
          <ModalHeader>Конструктор тарифов</ModalHeader>
          <Spin spinning={tariffConstructorCosts.isLoading} indicator={<LoadingIcon spin />}>
            <CostsWrapper>
              <StyledTag color='default'>
                Итоговая стоимость услуги ШПД: {costsData?.TotalMonthlyChargeCostWithTax?.toFixed(2) ?? '-'} руб.
              </StyledTag>
              <StyledTag color='default'>
                Тариф и дополнительные услуги: {costsData?.TotalMonthlyChargeCostWithTaxTariff?.toFixed(2) ?? '-'} руб.
              </StyledTag>
              <StyledTag color='default'>Покупка оборудования: {equipmentBuyCost?.toFixed(2) ?? '-'} руб.</StyledTag>
              <StyledTag color='default'>Требуется SIM: {orderState.IsNewSubscriber ? 'Да' : 'Нет'}</StyledTag>
              <StyledTag color='default'>Переход абонента по MNP: {orderState.IsMnp ? 'Да' : 'Нет'}</StyledTag>
              <StyledTag color='default'>
                Новый номер: {checkNumber(orderState.ReservedMsisdn) ? orderState.ReservedMsisdn : '-'}
              </StyledTag>
              <StyledTag color='default'>
                Переносимый номер: {checkNumber(orderState.MnpMsisdn) ? orderState.MnpMsisdn : '-'}
              </StyledTag>
            </CostsWrapper>
          </Spin>
        </HeaderWrapper>
      }
    >
      <Wrapper>
        <Spin spinning={availableTariffsState.isLoading} indicator={<LoadingIcon spin />}>
          <StyledRow>
            <StyledCol span={12}>
              <ColHeader>Текущий тариф</ColHeader>
              <InsideColWrapper>
                <InfoRow>
                  <InfoCol span={16}>
                    <InfoHeader>Название тарифа</InfoHeader>
                  </InfoCol>
                  <InfoCol span={8}>
                    <InfoHeader>Базовая абонентская плата</InfoHeader>
                  </InfoCol>
                </InfoRow>
                <InfoRow>
                  <InfoCol span={16}>
                    {tariffInfo?.name ?? '-'}
                    {tariffInfo?.description && (
                      <Tooltip placement='bottom' title={tariffInfo?.description ?? ''}>
                        <StyledInfoIcon />
                      </Tooltip>
                    )}
                  </InfoCol>
                  <InfoCol span={8}>{tariffInfo.cost ?? '-'}</InfoCol>
                </InfoRow>
                {isAlertVisible && (
                  <AlertWrapper>
                    <Alert
                      message='Для текущего тарифа абонента создание заявки ШПД невозможно.'
                      type='warning'
                      showIcon
                    />
                    {isButtonsRightsPresent && (
                      <Button type='primary' onClick={handleNewSim}>
                        Новое подключение
                      </Button>
                    )}
                  </AlertWrapper>
                )}
              </InsideColWrapper>
              <ColHeader>Услуга ШПД</ColHeader>
              <InsideColWrapper>
                <InfoRow>
                  <InfoCol span={16}>
                    <InfoHeader>Название</InfoHeader>
                  </InfoCol>
                  <InfoCol span={8}>
                    <InfoHeader>Абонентская плата</InfoHeader>
                  </InfoCol>
                </InfoRow>
                <InfoRow>
                  <InfoCol span={16}>{speedInfo?.name ?? '-'}</InfoCol>
                  <InfoCol span={8}>{speedInfo?.cost?.toFixed(2) ?? '-'}</InfoCol>
                </InfoRow>
              </InsideColWrapper>
            </StyledCol>
            <StyledCol span={12}>
              <ColHeader>
                <ChangeTariffHeaderWrapper>
                  Выбор тарифа
                  {isClearSelectVisible && (
                    <Button size='small' type='primary' ghost onClick={handleClearButton}>
                      Очистить выбор
                    </Button>
                  )}
                </ChangeTariffHeaderWrapper>
              </ColHeader>
              <InsideColWrapper last>
                <ScrollWrapper>
                  <InfoRow>
                    <InfoCol span={12}>
                      <InfoHeader>Название тарифа</InfoHeader>
                    </InfoCol>
                    <InfoCol span={6}>
                      <InfoHeader>Cтоимость перехода</InfoHeader>
                    </InfoCol>
                    <InfoCol span={6}>
                      <InfoHeader>Абонентская плата</InfoHeader>
                    </InfoCol>
                  </InfoRow>
                  {tariffsList?.map((tariff, index) => {
                    return (
                      <InfoRow key={index}>
                        <InfoCol span={12}>
                          <Checkbox checked={selectedTariff === index} onChange={handleTariffCheckboxChange(index)}>
                            {tariff?.RateName}
                            {tariff?.Description && (
                              <Tooltip placement='bottom' title={tariff?.Description}>
                                <StyledInfoIcon />
                              </Tooltip>
                            )}
                          </Checkbox>
                        </InfoCol>
                        <InfoCol span={6}>{tariff?.СhangeTrplCost + ' ' + tariff?.Currency}</InfoCol>
                        <InfoCol span={6}>{tariff?.CostMonthWithTax + ' ' + tariff?.Currency}</InfoCol>
                      </InfoRow>
                    )
                  })}
                </ScrollWrapper>
              </InsideColWrapper>
            </StyledCol>
          </StyledRow>
          <StyledRow>
            <StyledCol span={12}>
              <ColHeader>Оборудование</ColHeader>
              <InsideColWrapper>
                <ScrollWrapper>
                  <InfoRow>
                    <InfoCol span={16}>
                      <InfoHeader>Название</InfoHeader>
                    </InfoCol>
                    <InfoCol span={8}>
                      <InfoHeader>Абонентская плата</InfoHeader>
                    </InfoCol>
                  </InfoRow>
                  {equipmentInfo?.map(equipmentData => (
                    <InfoRow>
                      <InfoCol span={16}>{equipmentData?.name ?? '-'}</InfoCol>
                      <InfoCol span={8}>{equipmentData?.cost?.toFixed(2) ?? '-'}</InfoCol>
                    </InfoRow>
                  ))}
                </ScrollWrapper>
              </InsideColWrapper>
            </StyledCol>
            <StyledCol span={12}>
              <Spin spinning={servicesForSellState.isLoading} indicator={<LoadingIcon spin />}>
                <ColHeader>Дополнительные услуги</ColHeader>
                <InsideColWrapper last>
                  <ScrollWrapper>
                    <InfoRow>
                      <InfoCol span={12}>
                        <InfoHeader>Название услуги</InfoHeader>
                      </InfoCol>
                      <InfoCol span={6}>
                        <InfoHeader>Стоимость подключения</InfoHeader>
                      </InfoCol>
                      <InfoCol span={6}>
                        <InfoHeader>Абонентская плата</InfoHeader>
                      </InfoCol>
                    </InfoRow>
                    {servicesInfo?.map((service, index) => {
                      return (
                        <InfoServicesRow key={index}>
                          <InfoCol span={12}>
                            <StyledSwitch defaultChecked={service?.IsEnabled} onChange={handleServiceSwitch(index)} />
                            {service?.ServiceName}
                          </InfoCol>
                          <InfoCol padding span={6}>
                            {service?.CostFirstOnWithTax?.toFixed(2)}
                          </InfoCol>
                          <InfoCol padding span={6}>
                            {service?.CostNextMonthWithTax?.toFixed(2) + ' в мес.'}
                            {service?.CostNextMonthWithTax !== service?.CostFirstMonthWithTax && (
                              <Tooltip
                                placement='bottom'
                                title={'Абонентская плата за первый месяц ' + service?.CostFirstMonthWithTax}
                              >
                                <StyledExclamationIcon />
                              </Tooltip>
                            )}
                          </InfoCol>
                        </InfoServicesRow>
                      )
                    })}
                  </ScrollWrapper>
                </InsideColWrapper>
              </Spin>
            </StyledCol>
          </StyledRow>
        </Spin>
      </Wrapper>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  position: absolute;
  padding: 0;
  top: 110px;
  left: 0;

  & .ant-modal-body {
    padding: 0;
  }

  & .ant-modal-header {
    padding: 4px 16px;
  }

  & .ant-spin-nested-loading {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  & .ant-spin-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const CostsWrapper = styled.div`
  max-width: 760px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const ModalHeader = styled.span`
  font-family: T2_DisplaySerif_Bold_Short;
  font-size: 16px;
`

const StyledTag = styled(Tag)`
  font-size: 14px;
  margin-bottom: 4px;
`

const Wrapper = styled.div`
  height: calc(100vh - 220px);
`

const ColHeader = styled.span`
  font-weight: bold;
  font-size: 16px;
  background: rgb(236, 249, 255);
  padding: 8px 16px 8px 16px;
`

const ChangeTariffHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledRow = styled(Row)`
  height: 50%;
`

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
`

const InsideColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  ${props => props.last && 'padding-right: 0;'}
  border-right: 1px solid #e5e5e5;
  height: 100%;
`

const InfoRow = styled(Row)`
  display: flex;
  flex-direction: row;
  min-height: 32px;
`

const InfoServicesRow = styled(Row)`
  display: flex;
  flex-direction: row;
  min-height: 48px;
  border-bottom: 1px solid #e5e5e5;
`

const InfoHeader = styled.div`
  font-weight: bold;
`

const InfoCol = styled(Col)`
  min-height: 18px;
  display: flex;
  flex-flow: row;
  align-items: center;
  ${props => props.padding && 'padding-left: 24px;'}
`

const StyledInfoIcon = styled(InfoCircleOutlined)`
  margin-left: 8px;
  font-size: 16px;
`

const AlertWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  & > div {
    max-height: 32px;
  }
`

const ScrollWrapper = styled.div`
  max-height: calc(50vh - 156px);
  overflow-y: auto;
`

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 32px;
`

const StyledExclamationIcon = styled(ExclamationCircleOutlined)`
  margin-left: 8px;
  color: red;
  font-size: 16px;
`

const StyledSwitch = styled(Switch)`
  margin-right: 8px;
`

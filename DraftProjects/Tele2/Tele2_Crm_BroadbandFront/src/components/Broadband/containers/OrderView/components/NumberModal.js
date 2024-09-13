import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Col, Modal, Row, Spin, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { isNumber } from 'lodash-es'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { changeTariff } from 'helpers/agreement'
import { NumberModalTypes } from 'constants/number'
import { Operation } from 'constants/operations'
import { preparePerformParams } from '../../../helpers/orderFooter'

const NumberModal = () => {
  const {
    msisdnState,
    orderState,
    orderStatusState,
    availableTariffsState,
    changeMainFormState,
    changeNumberModalVisibility,
    getAvailableTariffs,
    // getMsisdn,
    isNumberModalVisible,
    numberModalType,
    performOrder
  } = useBroadbandContext()

  const [selectedTariff, setSelectedTariff] = useState(null)

  useEffect(() => {
    const availbleTariffCondition = !availableTariffsState.data && !availableTariffsState.isLoading && !availableTariffsState.isError
    if (isNumberModalVisible && availbleTariffCondition && orderState?.OrderRegionCode) {
      getAvailableTariffs({ OrderRegionCode: orderState?.OrderRegionCode })
    }
  }, [isNumberModalVisible, orderState, availableTariffsState])

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

  const handleClearButton = useCallback(() => {
    setSelectedTariff(null)
  }, [setSelectedTariff])

  const handleTariffCheckboxChange = useCallback((index) => (event) => {
    setSelectedTariff(event.target.checked ? index : null)
  }, [selectedTariff, setSelectedTariff])

  const handleSave = useCallback(() => {
    if (selectedTariff) {
      const newAgreement = changeTariff(orderState.Agreement, selectedTariff)
      changeMainFormState({ Agreement: newAgreement })
    }
    performOrder(preparePerformParams(Operation.Save, orderState, orderStatusState))
    changeNumberModalVisibility(false)
  }, [numberModalType, orderState, orderStatusState])

  const handleCancel = useCallback(() => {
    changeNumberModalVisibility(false)
  }, [changeNumberModalVisibility])

  const isClearSelectVisible = useMemo(() => isNumber(selectedTariff), [selectedTariff])

  return (
    <StyledModal
      zIndex='1002'
      centered
      width='50%'
      visible={isNumberModalVisible}
      closable={false}
      title={
        <HeaderWrapper>
          <ModalHeader>{numberModalType === NumberModalTypes.NewNumber ? 'Временный номер' : 'Проверка номера'}</ModalHeader>
        </HeaderWrapper>
      }
      footer={
        <div>
          <Button onClick={handleCancel}>Отмена</Button>
          <Button type='primary' onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      }
    >
      <Wrapper>
        <Row>
          <StyledCol span={8}>
            {numberModalType === NumberModalTypes.NewNumber && (
              <>
                <ColHeader>Номер</ColHeader>
                <Spin spinning={msisdnState.isLoading}>
                  <ColContent>
                    <InfoRow><InfoHeader>Временный номер</InfoHeader><InfoText>{orderState.ReservedMsisdn ?? '-'}</InfoText></InfoRow>
                  </ColContent>
                </Spin>
              </>)}
            {numberModalType === NumberModalTypes.MnpNumber && (
              <>
                <ColHeader>Номер</ColHeader>
                <ColContent>
                  <InfoRow><InfoHeader>Переносимый номер</InfoHeader><InfoText>{orderState.MnpMsisdn ?? '-'}</InfoText></InfoRow>
                  <InfoRow><InfoHeader>Временный номер</InfoHeader><InfoText>{orderState.ReservedMsisdn ?? '-'}</InfoText></InfoRow>
                </ColContent>
              </>)}
          </StyledCol>
          <StyledCol span={16}>
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
            <Spin spinning={availableTariffsState.isLoading}>
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
            </Spin>
          </StyledCol>
        </Row>
      </Wrapper>
    </StyledModal>
  )
}

export default NumberModal

const StyledModal = styled(Modal)`
  & .ant-modal-body {
    padding: 0;
  }

  & .ant-modal-header {
    padding: 4px 16px;
  }

  & .ant-spin-nested-loading {
    display: flex;
    flex-direction: column;
    height: 100%
  }

  & .ant-spin-container {
    display: flex;
    flex-direction: column;
    height: 100%
  }
`

const HeaderWrapper = styled.div`
  height: 46px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ModalHeader = styled.span`
  font-family: T2_DisplaySerif_Bold_Short;
  font-size: 16px;
`

const Wrapper = styled.div`
  min-height: 300px;
`

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
`

const ColHeader = styled.span`
  font-weight: bold;
  font-size: 16px;
  background: rgb(236, 249, 255);
  padding: 8px 16px 8px 16px;
`

const ColContent = styled.div`
  padding: 16px;
  
  .ant-radio-group {
    display: flex;
    flex-direction: column;
  }
`

const ChangeTariffHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const InsideColWrapper = styled.div`
  min-height: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  ${props => props.last && 'padding-right: 0;'}
  border-right: 1px solid #e5e5e5;
`

const ScrollWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

const InfoRow = styled(Row)`
  display: flex;
  flex-direction: row;
  min-height: 32px;
`

const InfoCol = styled(Col)`
  min-height: 18px;
  display: flex;
  flex-flow: row;
  align-items: center;
  ${props => props.padding && 'padding-left: 24px;'}
`

const InfoHeader = styled.div`
  font-weight: bold;
`

const InfoText = styled.span`
  margin-left: 8px;
`

const StyledInfoIcon = styled(InfoCircleOutlined)`
  margin-left: 8px;
  font-size: 16px;
`

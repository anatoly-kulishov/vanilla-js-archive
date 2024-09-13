import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Spin, Affix, Button, Alert } from 'antd'

import OrderForm from '../OrderForm'

import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import OrderFooter from './components/OrderFooter'
import OrderStatusBar from './components/OrderStatusBar'
import TariffModal from './components/TariffModal'
import { PersonalModal } from './components/PersonalModal'
import { useMainForm } from './hooks/useMainForm'
import { useInit } from './hooks/useInit'
import { useAutoActions } from './hooks/useAutoActions'
import NumberModal from './components/NumberModal'

const alertMessage = 'Для текущего тарифа абонента создание заявки ШПД невозможно.'

export default function OrderView (props) {
  const {
    // Parent
    isCreating,
    orderId,
    formInitData,
    userRights,
    openTariffConstructorModal,
    handleOpenOrder
  } = props

  const { order, changeTariffModalVisibility } = useBroadbandContext()

  useInit(orderId, isCreating, formInitData)
  const { form, isFormDisabled, validateForm, areFormControlsEnabled, areFormActionsEnabled, isReducedForm } =
    useMainForm(isCreating, formInitData)
  useAutoActions(form, handleOpenOrder, isCreating)

  const [isPersonalModalVisible, changePersonalModalVisibility] = useState(false)

  const handleConstructorButton = useCallback(() => {
    changeTariffModalVisibility(true)
  }, [changeTariffModalVisibility])

  return (
    <>
      <NumberModal />
      <TariffModal
        openTariffConstructorModal={openTariffConstructorModal}
        validateForm={validateForm}
        areFormActionsEnabled={areFormActionsEnabled}
      />
      <PersonalModal
        isModalVisible={isPersonalModalVisible}
        isModifyAvailable={userRights.isPersonalModify}
        changeVisibility={changePersonalModalVisibility}
      />
      <Spin spinning={order.isLoading}>
        <OrderStatusBar
          isPersonalDataAvailable={userRights.isPersonalRead}
          changePersonalDataVisibility={changePersonalModalVisibility}
          areFormControlsEnabled={areFormControlsEnabled}
          areFormActionsEnabled={areFormActionsEnabled}
        />
        {isFormDisabled && (
          <AlertWrapper>
            <Alert message={alertMessage} type='warning' showIcon />
            <StyledButton type='text' onClick={handleConstructorButton}>
              Открыть конструктор
            </StyledButton>
          </AlertWrapper>
        )}
        <OrderForm
          form={form}
          isCreating={isCreating}
          isFormDisabled={isFormDisabled}
          isAnonymous={formInitData.isAnonymous}
          areFormControlsEnabled={areFormControlsEnabled}
          areFormActionsEnabled={areFormActionsEnabled}
          isReducedForm={isReducedForm}
        />
        <Affix offsetBottom={0}>
          <OrderFooter
            form={form}
            userRights={userRights}
            areFormControlsEnabled={areFormControlsEnabled}
            areFormActionsEnabled={areFormActionsEnabled}
          />
        </Affix>
      </Spin>
    </>
  )
}

const AlertWrapper = styled.div`
  padding: 12px 24px 0;
`

const StyledButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
`

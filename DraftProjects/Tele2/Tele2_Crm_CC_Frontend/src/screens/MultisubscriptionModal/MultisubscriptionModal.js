import React, { useEffect, useState, useMemo, Fragment, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Modal, Row, Slider, Space, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { reduce, findIndex, toPairs } from 'lodash'
import styled from 'styled-components'
import {
  fetchMultisubscriptionService,
  closeMultisubscriptionModal,
  fetchClientOfferingProfile,
  сhangeMultisubscriptionService
} from 'reducers/services/serviceReducer'
import { getMixxBalance } from 'reducers/finance/remainsReducer'
import AccumulatedGbsBlock from './components/AccumulatedGbsBlock'
import { useChangingMultisubscriptionWebSeller } from './webseller.helpers'

const getServicesState = state => state.services.servicesState
const getMsisdn = state => state.personalInfo.personalAccountState.personalAccount.Msisdn
const getAppMode = state => state.personalInfo.personalAccountState.personalAccount.BaseFunctionalParams?.AppMode
const getHandlingId = state => state.internal.handlingState.Id
const userFullName = state => state.internal.userState.user.DisplayName
const getRemainsState = state => state.finance.remains

const mapState = state => ({
  servicesState: getServicesState(state),
  Msisdn: getMsisdn(state),
  AppMode: getAppMode(state),
  handlingId: getHandlingId(state),
  userName: userFullName(state),
  remainsState: getRemainsState(state)
})

let fontColor = 'blue'

const MultisubscriptionModal = ({ isWebSellerView }) => {
  const dispatch = useDispatch()
  const { servicesState, Msisdn: msisdn, AppMode, handlingId, userName, remainsState } = useSelector(mapState)
  const [sliderValue, setSliderValue] = useState(0)

  const {
    multisubscriptionService,
    isMultisubscriptionServiceLoading,
    multisubscriptionServiceErrorMessage,
    isMultisubscriptionModalOpen,
    clientProductOfferingProfileError,
    clientProductOfferingProfileCount,
    isClientProductOfferingProfileLoading,
    clientProductOfferingProfileMessage,
    shouldBeServiceLoaded,
    isChangeMultisubscriptionServiceLoading,
    isChangeMultisubscriptionServiceSuccess
  } = servicesState

  const { mixxBalance, isMixxBalanceLoading, mixxBalanceMessage, isMixxBalanceSuccess } = remainsState

  const {
    Description,
    CostConnection,
    ChargeSumNext,
    Balance,
    MultisubscriptionServiceChild = [],
    StatusActive,
    ServiceName,
    BillingServiceId,
    ChPeriodEndDate
  } = multisubscriptionService[sliderValue] ?? {}
  const operation = StatusActive === 1 ? 0 : 1

  const changingMultisubscriptionWebSeller = useChangingMultisubscriptionWebSeller({
    msisdn,
    billingServiceId: BillingServiceId,
    handlingId,
    chPeriodEndDate: ChPeriodEndDate,
    userName
  })

  const submitButtonText =
    StatusActive === 1
      ? 'Подключить' : changingMultisubscriptionWebSeller.isNeedToUse
        ? 'Отключить' : 'Отключить на дату АП'
  const OkText = isMultisubscriptionServiceLoading ? 'Загрузка' : submitButtonText
  const isMixxCustomer = AppMode === 'MixxCustomer'

  if (clientProductOfferingProfileError) fontColor = 'red'
  if (!clientProductOfferingProfileError && clientProductOfferingProfileCount > 0) {
    fontColor = 'blue'
  } else fontColor = 'green'

  const marks = useMemo(
    () =>
      reduce(
        multisubscriptionService,
        function (result, current, index) {
          const { ServiceName } = current
          result = { ...result, ...{ [index]: ServiceName } }

          return result
        },
        {}
      ),
    [multisubscriptionService]
  )

  const marksLength = useMemo(() => toPairs(marks), [marks])
  const activeService = useMemo(
    () => multisubscriptionService.find(({ StatusActive }) => StatusActive !== 1),
    [multisubscriptionService]
  )

  const { BillingServiceId: ServiceId } = activeService ?? {}

  const onCancelHandler = useCallback(() => dispatch(closeMultisubscriptionModal()), [])

  const onCancelWebSellerHandler = () => {
    dispatch(closeMultisubscriptionModal())
    if (isChangeMultisubscriptionServiceSuccess) {
      window.location.reload()
    }
  }

  const okButtonProps = useMemo(
    () => ({
      loading: isMultisubscriptionServiceLoading,
      disabled: isMultisubscriptionServiceLoading || multisubscriptionServiceErrorMessage || isMixxCustomer
    }),
    [isMultisubscriptionServiceLoading, multisubscriptionServiceErrorMessage]
  )

  const okWebSellerButtonProps = ({
    loading: isMultisubscriptionServiceLoading,
    disabled: isMultisubscriptionServiceLoading || multisubscriptionServiceErrorMessage || isMixxCustomer || isChangeMultisubscriptionServiceLoading || isChangeMultisubscriptionServiceSuccess
  })

  const changeMultisubscriptionServiceHandler = () => {
    switch (operation) {
      case 1:
        if (changingMultisubscriptionWebSeller.isNeedToUse) {
          changingMultisubscriptionWebSeller.handleClick()
          break
        }

        dispatch(
          сhangeMultisubscriptionService({
            msisdn,
            BillingServiceId,
            Operation: operation,
            handlingId,
            ChPeriodEndDate,
            userName
          })
        )
        break
      case 0:
        dispatch(
          сhangeMultisubscriptionService({
            msisdn,
            BillingServiceId,
            Operation: operation,
            handlingId,
            userName
          })
        )
        break
      default:
        break
    }
  }

  useEffect(() => {
    const activeServiceIndex = findIndex(multisubscriptionService, multiService => multiService.StatusActive !== 1) // 1 - неактивен, 0/2/3 - активны
    setSliderValue(activeServiceIndex === -1 ? 0 : activeServiceIndex)
  }, [multisubscriptionService])

  useEffect(() => {
    if (msisdn && isMultisubscriptionModalOpen) {
      dispatch(fetchMultisubscriptionService({ msisdn, ismixxcustomer: isMixxCustomer }))
      if (isMixxCustomer) {
        dispatch(getMixxBalance({ msisdn }))
      }
    }
  }, [msisdn, isMultisubscriptionModalOpen, isMixxCustomer])

  useEffect(() => {
    if (shouldBeServiceLoaded && ServiceId && msisdn) dispatch(fetchClientOfferingProfile({ msisdn, ServiceId }))
  }, [shouldBeServiceLoaded, ServiceId, msisdn])

  const isDescriptionVisible = useMemo(() => {
    return StatusActive === 1 && Description
  }, [StatusActive, Description])

  const isProductOfferingVisible = useMemo(() => {
    return StatusActive !== 1
  }, [StatusActive])

  return (
    <Fragment>
      {changingMultisubscriptionWebSeller.isNeedToUse && changingMultisubscriptionWebSeller.renderAdditional()}
      <StyledModal
        title='Подключение мультиподписки'
        visible={isMultisubscriptionModalOpen}
        onCancel={isWebSellerView ? onCancelWebSellerHandler : onCancelHandler}
        okText={OkText}
        okButtonProps={isWebSellerView ? okWebSellerButtonProps : okButtonProps}
        onOk={changeMultisubscriptionServiceHandler}
        isWebSellerView={isWebSellerView}
      >
        <Spin spinning={isMultisubscriptionServiceLoading} indicator={<LoadingOutlined spin />}>
          <StyledTitle>{ServiceName}</StyledTitle>
          <StyledSlider
            marks={marks}
            step={null}
            max={marksLength.length - 1}
            tipFormatter={null}
            value={sliderValue}
            onChange={setSliderValue}
          />
          <Space direction='vertical' size='middle' style={{ width: '100%' }}>
            {MultisubscriptionServiceChild !== null && (
              <Row gutter={12}>
                <Col span={12} gutter={12}>
                  Состав подписки:
                  <Spin spinning={isMixxBalanceLoading} indicator={<LoadingOutlined spin />}>
                    {mixxBalance !== 0 && (
                      <AccumulatedGbsBlock
                        value={mixxBalance}
                        message={mixxBalanceMessage}
                        isSuccess={isMixxBalanceSuccess}
                      />
                    )}
                  </Spin>
                </Col>
                <Col span={12}>
                  {MultisubscriptionServiceChild.map(({ ServiceName }, index) => (
                    <div key={`${ServiceName}${index}`}>{ServiceName}</div>
                  ))}
                </Col>
              </Row>
            )}
            {isDescriptionVisible && (
              <Row gutter={12}>
                <Col span={12} gutter={12}>
                  Состав подписки:
                </Col>
                <Col span={12}>{Description}</Col>
              </Row>
            )}
            <Row gutter={12}>
              <Col span={12}>Стоимость операции:</Col>
              <Col span={12}>{CostConnection}</Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>Абонентская плата:</Col>
              <Col span={12}>{ChargeSumNext}</Col>
            </Row>
            {Balance !== null && (
              <Row gutter={12}>
                <Col span={12}>Баланс:</Col>
                <Col span={12}>{Balance}</Col>
              </Row>
            )}
          </Space>
          {multisubscriptionServiceErrorMessage && (
            <StyledErrorMessage>{multisubscriptionServiceErrorMessage}</StyledErrorMessage>
          )}
        </Spin>
        {isClientProductOfferingProfileLoading ? (
          <StyledLoader spin />
        ) : (
          isProductOfferingVisible && (
            <ChangingsCount fontColor={fontColor}>{clientProductOfferingProfileMessage}</ChangingsCount>
          )
        )}
      </StyledModal>
    </Fragment>
  )
}

export default MultisubscriptionModal

const StyledModal = styled(Modal)`
  top: ${props => props.isWebSellerView ? '25%' : '120px'};
`

const StyledSlider = styled(Slider)`
  margin: 0 64px 60px 0;

  .ant-slider-mark {
    left: 30px;
    margin-bottom: 32px;
  }

  .ant-slider-mark-text {
    width: 100px;
  }
`
const StyledErrorMessage = styled.div`
  margin-top: 16px;
  color: red;
`
const StyledLoader = styled(LoadingOutlined)`
  margin-top: 16px;
`
const ChangingsCount = styled.div`
  color: ${props => props.fontColor};
  margin-top: 16px;
`

const StyledTitle = styled.h4`
  font-weight: bold;
`

import React, { Component } from 'react'
import styled from 'styled-components'
import { Alert, Button, Modal, Radio, Tooltip } from 'antd'
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import moment from 'moment'
import { get } from 'lodash'

import SettingsTariff from './SettingsTariff'
import RubSvg from './assets/rub.svg'

const RadioGroup = Radio.Group

export default class Constructor extends Component {
  static propTypes = {
    isTariffChange: PropTypes.bool,
    isASSeller: PropTypes.bool,
    selectedData: PropTypes.number,
    tariffState: PropTypes.object,
    personalAccountState: PropTypes.object,
    HandlingId: PropTypes.object,
    handleInitChangingTariffPlan: PropTypes.func,
    changeServices: PropTypes.func,
    changeTariff: PropTypes.func,
    handleSelectData: PropTypes.func
  }

  state = {
    currentValues: {
      TrafficTypeOneSliders: null,
      TrafficTypeTwoSliders: null,
      TrafficTypeThreeSliders: null,
      Services: []
    },
    fullPrice: 0,
    subscriptionFee: 0,

    activatedSliders: {
      TrafficTypeOneSliders: null,
      TrafficTypeTwoSliders: null,
      TrafficTypeThreeSliders: null
    },
    deactivatedSliders: {
      TrafficTypeOneSliders: null,
      TrafficTypeTwoSliders: null,
      TrafficTypeThreeSliders: null
    },
    sliderMarksPrice: {},
    activatedServices: [],
    deactivatedServices: []
  }

  footerElement = null
  listStyle = { paddingBottom: this.footerElement?.clientHeight }

  footerElementRef = node => { this.footerElement = node }

  componentDidMount () {
    this.handleDefaultValue()
    this.listStyle = { paddingBottom: this.footerElement?.clientHeight }
  }

  handleChangeSliders = (value, index) => {
    const {
      fullPrice,
      subscriptionFee,
      activatedSliders,
      deactivatedSliders,
      sliderMarksPrice,
      currentValues
    } = this.state
    const {
      tariffState: { tariffSettings },
      isTariffChange
    } = this.props
    const {
      settings: {
        AvailableSliders
      },
      sliderSettings
    } = tariffSettings

    const newDeactivatedSliders = Object.assign({}, deactivatedSliders)
    const newActivatedSliders = Object.assign({}, activatedSliders)
    const currentSlider = AvailableSliders[index]
    const newSliderId = currentSlider[value].ServIdSliders

    let priceSlider = 0
    for (let index = 1; index <= value; index++) {
      priceSlider += currentSlider[index].CostMonthSliders + currentSlider[index].CostOnSliders // пересчет стоимости текущего слайдера
    }

    if (isTariffChange) {
      if (value !== 0) {
        newActivatedSliders[index] = newSliderId
      } else {
        newActivatedSliders[index] = null
      }
    } else {
      // при настройке тарифа, выбор слайдеров до действующего отключает услуги
      // смена слайдера на после действующего подключает услуги
      if (value < sliderSettings[index].defaultMarks) {
        newActivatedSliders[index] = null
        newDeactivatedSliders[index] = currentSlider[value + 1].ServIdSliders // отключение происходит следующего слайдера после выбранного
      } else if (value === sliderSettings[index].defaultMarks) {
        newActivatedSliders[index] = null
        newDeactivatedSliders[index] = null
      } else {
        newActivatedSliders[index] = newSliderId
        newDeactivatedSliders[index] = null
      }
    }

    this.setState({
      currentValues: {
        ...currentValues,
        [index]: value
      },
      fullPrice: fullPrice + priceSlider - sliderMarksPrice[index], // при смене слайдера из стоимости вычетается предыдущая стоимость и добавляется новая
      subscriptionFee: subscriptionFee + priceSlider - sliderMarksPrice[index],
      sliderMarksPrice: {
        ...this.state.sliderMarksPrice,
        [index]: priceSlider
      },
      deactivatedSliders: newDeactivatedSliders,
      activatedSliders: newActivatedSliders
    })
  }

  handleChangeServices = (value, index, price, idServ) => {
    const {
      fullPrice,
      subscriptionFee,
      activatedServices,
      deactivatedServices,
      currentValues
    } = this.state
    const { tariffState: { tariffSettings } } = this.props
    const { settings: { PersonalizingServices } } = tariffSettings

    let newActivatedServices = [...activatedServices]
    const newDeactivatedServices = [...deactivatedServices]
    let changePrice

    const ServiceStatusPs = PersonalizingServices[index].ServiceStatusPs
    const isActive = ServiceStatusPs.toLowerCase() === 'active' ||
                     ServiceStatusPs.toLowerCase() === 'unblocked' ||
                     ServiceStatusPs.toLowerCase() === 'blocked'

    if (value.target.checked) {
      changePrice = price
      if (isActive) { // при активации/деактивации услуги важно была ли она активна изначально
        newActivatedServices = newDeactivatedServices.filter(el => el !== idServ)
      } else {
        newActivatedServices.push(idServ) // если услуга изначально была не активна то при активации надо запомнить ее id
      }
    } else {
      changePrice = -price
      if (isActive) {
        newDeactivatedServices.push(idServ) // наоборот если услуга изначально была активна то важно запомнить ее id при деактивации
      } else {
        newActivatedServices = newActivatedServices.filter(el => el !== idServ)
      }
    }

    const newCurrentServices = [...currentValues.Services]
    newCurrentServices[index] = value.target.checked
    this.setState({
      currentValues: {
        ...currentValues,
        Services: newCurrentServices
      },
      activatedServices: newActivatedServices,
      deactivatedServices: newDeactivatedServices,
      fullPrice: fullPrice + changePrice,
      subscriptionFee: subscriptionFee + changePrice
    })
  }

  handleDefaultValue = () => {
    const { tariffState } = this.props
    const SettingsTariffState = get(tariffState, 'tariffSettings', {})
    const {
      sliderSettings,
      priceSlider,
      settings
    } = SettingsTariffState
    const {
      ChargeSumNext,
      ChangeTrplCost
    } = settings

    let priceSettings = 0
    const currentValues = { Services: [] }
    for (const key in sliderSettings) {
      currentValues[key] = sliderSettings[key].defaultMarks || 0
      priceSettings += priceSlider[key]
    }
    for (let index = 0; index < settings.PersonalizingServices?.length; index++) {
      const serv = settings.PersonalizingServices[index]
      currentValues.Services.push(
        serv.ServiceStatusPs?.toLowerCase() === 'active' ||
          serv.ServiceStatusPs?.toLowerCase() === 'unblocked' ||
          serv?.ServiceStatusPs.toLowerCase() === 'blocked'
      )
      if (
        serv.ServiceStatusPs?.toLowerCase() === 'active' ||
        serv.ServiceStatusPs?.toLowerCase() === 'unblocked' ||
        serv.ServiceStatusPs?.toLowerCase() === 'blocked'
      ) {
        priceSettings += serv.CostMonthWithTaxPs
      }
    }

    this.setState({
      currentValues: currentValues,
      fullPrice: ChangeTrplCost,
      subscriptionFee: ChargeSumNext + priceSettings,
      sliderMarksPrice: priceSlider
    })
  }

  handleSelect = event => this.props.handleSelectData(event.target.value)

  render () {
    const {
      fullPrice,
      subscriptionFee,
      activatedServices,
      deactivatedServices,
      activatedSliders,
      deactivatedSliders,
      currentValues
    } = this.state
    const {
      tariffState,
      isTariffChange,
      personalAccountState,
      changeServices,
      HandlingId,
      selectedData,
      handleInitChangingTariffPlan,
      isASSeller,
      changeTariff
    } = this.props
    const SettingsTariffState = get(tariffState, 'tariffSettings', {
      settings: {}
    })
    const {
      RateName,
      Description,
      Currency,
      PeriodName,
      CompletelyFreeChange,
      BalanceSum,
      BillingRateId,
      BillingRateName
    } = SettingsTariffState.settings
    const ChargeNextDate = get(tariffState, 'tariffInfo.Fee.ChargeNextDate', '')
    const OrederRuleInfo = get(tariffState, 'tariffInfo.ReconfigParameters.OrederRuleInfo')

    const confirm = Modal.confirm

    function showConfirm () {
      const {
        personalAccount: {
          SubscriberFullInfo,
          ClientId,
          BillingBranchId,
          Msisdn,
          SubscriberId
        }
      } = personalAccountState
      const {
        SubscriberTypeId,
        SubscriberStatusId
      } = SubscriberFullInfo?.SubscriberInfo ?? {}

      // собираем id услуг и слайдеров
      const activated = [...activatedServices]
      const deactivated = [...deactivatedServices]
      for (const key in activatedSliders) {
        if (activatedSliders[key]) {
          activated.push(activatedSliders[key])
        }
        if (deactivatedSliders[key]) {
          deactivated.push(deactivatedSliders[key])
        }
      }

      const tariffMin = SettingsTariffState.marksSliders.TrafficTypeOneSliders[currentValues?.TrafficTypeOneSliders]
      const tariffSms = SettingsTariffState.marksSliders.TrafficTypeTwoSliders[currentValues?.TrafficTypeTwoSliders]
      const tariffTraffic = SettingsTariffState.marksSliders.TrafficTypeThreeSliders[currentValues?.TrafficTypeThreeSliders]

      if (isASSeller) {
        handleInitChangingTariffPlan({
          hasTariffSetting: true,
          msisdn: Msisdn,
          rate: BillingRateId,
          targetDate: selectedData === 0 ? moment().format() : ChargeNextDate,
          activatedServices: activated,
          deactivatedServices: deactivated,
          handlingId: HandlingId,
          clientId: ClientId,
          subscriberId: SubscriberId,
          subscriberBranchId: BillingBranchId,
          subscriberTypeId: SubscriberTypeId,
          subscriberStatusId: SubscriberStatusId,
          rateName: RateName || BillingRateName,
          tariffCost: subscriptionFee,
          tariffTraffic,
          tariffMin,
          tariffSms
        })
      } else {
        isTariffChange
          ? confirm({
            title: 'Переход на новый тариф',
            content: `Выполнить переход на тариф ${RateName}?`,
            onOk () {
              if (!tariffState.changeTariffLoading) {
                changeTariff({
                  msisdn: Msisdn,
                  rate: BillingRateId,
                  targetDate: selectedData === 0 ? null : ChargeNextDate,
                  activatedServices: activated,
                  deactivatedServices: deactivated,
                  handlingId: HandlingId,
                  clientId: ClientId,
                  subscriberId: SubscriberId,
                  subscriberBranchId: BillingBranchId,
                  subscriberTypeId: SubscriberTypeId,
                  subscriberStatusId: SubscriberStatusId,
                  rateName: RateName || BillingRateName
                })
              }
            }
          })
          : confirm({
            title: 'Изменение тарифа',
            content: `Выполнить изменение тарифа ${RateName}?`,
            onOk () {
              if (!tariffState.changeServicesLoading) {
                changeServices({
                  msisdn: Msisdn,
                  targetDate: selectedData === 0 ? null : ChargeNextDate,
                  activatedServices: activated,
                  deactivatedServices: deactivated,
                  handlingId: HandlingId,
                  clientId: ClientId,
                  subscriberId: SubscriberId,
                  subscriberBranchId: BillingBranchId,
                  subscriberTypeId: SubscriberTypeId,
                  subscriberStatusId: SubscriberStatusId,
                  rateName: RateName || BillingRateName
                })
              }
            }
          })
      }
    }

    return (
      <Wrapper>
        <div style={this.listStyle} >
          <LineColor>
            <StyleTariffName>{RateName}</StyleTariffName>
            <Tooltip placement='bottom' title={Description}>
              <StyleIcon />
            </Tooltip>
          </LineColor>
          <SettingsTariff
            SettingsTariffState={SettingsTariffState}
            handleChangeSliders={this.handleChangeSliders}
            handleChangeServices={this.handleChangeServices}
            currentValues={currentValues}
            handleDefaultValue={this.handleDefaultValue}
          />
        </div>
        <Footer ref={this.footerElementRef}>
          {!isTariffChange && OrederRuleInfo &&
            <AlertStyled
              message={OrederRuleInfo}
              type='error'
              showIcon
              icon={<ExclamationCircleOutlined />} />
          }
          <TotalSum margin='7px'>
            <div>Абонентская плата</div>
            <PaymentForTime>{subscriptionFee.toFixed(2)} {Currency} в {PeriodName}</PaymentForTime>
          </TotalSum>
          {isTariffChange &&
            <TotalSum>
              <div>Полная стоимость перехода</div>
              <FullCost>
                <span>{CompletelyFreeChange === 1 ? 0 : fullPrice.toFixed(2) + ' ' + Currency }</span>
                { BalanceSum < fullPrice &&
                  <Tooltip placement='bottom' title='Недостаточно средств для смены тарифа'>
                    <RubSvg />
                  </Tooltip>
                }
              </FullCost>
            </TotalSum>
          }
          <WrapperFooter>
            <RadioGroup value={selectedData} onChange={this.handleSelect}>
              <StyledRadio value={0}>Сейчас</StyledRadio>
              { ChargeNextDate &&
                <StyledRadio value={1}>
                  Следующее списание АП {ChargeNextDate && moment(ChargeNextDate).format('DD.MM.YYYY, HH.mm')}
                </StyledRadio>
              }
            </RadioGroup>
            <Button type='primary' onClick={showConfirm}>{ isTariffChange ? 'Подключить' : 'Настроить' }</Button>
          </WrapperFooter>
        </Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20px;
  position: relative;
  font-size: 16px;

  @media (max-width: 1400px) {
    font-size: 14px;
  }
`

const LineColor = styled.div`
  min-height: 43px;
  background: rgb(236, 249, 255);
  display: flex;
  align-items: center;
  padding: 0 30px;
`

const StyleTariffName = styled.span`
  line-height: 20px;
  color: #000;
  margin-right: 5px;
`

const Footer = styled.div`
  z-index: 10;
  width: calc(35vw);
  bottom: 0;
  position: fixed;
  padding: 0 30px 20px;
  margin-left: 2px;
  background-color: white;
`

const WrapperFooter = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`

const TotalSum = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.margin || '10px'};
  color: #000;
  font-weight: bold;
  line-height: 24px;
`

const PaymentForTime = styled.div`
  width: 30%;
`

const FullCost = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
`

const StyleIcon = styled(InfoCircleOutlined)`
  & svg {
    width: 20px;
    height: 20px;
  }
`

const StyledRadio = styled(Radio)`
  height: 30px;
  line-height: 20px;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
`

const AlertStyled = styled(Alert)`
  padding: 5px 4px 5px 27px;
  line-height: 1.3;
  .anticon {
    top: 6.5px;
    left: 8px;
  }
`
